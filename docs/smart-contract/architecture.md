# Smart Contract Architecture

The AgriResolve smart contract (`escrow_engine.wasm`) is a single-responsibility Soroban contract implementing atomic agricultural escrow, delivery confirmation, and multi-party split payouts.

---

## Technical Specifications

- **Language:** Rust (edition 2021)
- **Target:** `wasm32v1-none`
- **Soroban SDK Version:** `29.0.1`
- **Binary Size:** 9.5 KB (optimized release profile with LTO and `opt-level = "z"`)
- **Stellar Network:** Stellar Protocol 22 / Protocol 29 Testnet
- **Token Standard:** SEP-41 Fungible Token Standard via built-in Soroban Asset Contract (SAC) client

---

## Storage Layout

The contract employs Soroban's **Persistent Storage** tier to guarantee data durability across billing ledgers:

```rust
#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,
    TradeCount,
    Trade(u64),
}
```

### Storage Entities

| Key | Type | Description |
|---|---|---|
| `DataKey::Admin` | `Address` | Protocol administrator address. |
| `DataKey::TradeCount` | `u64` | Monotonically increasing counter of total trades created. |
| `DataKey::Trade(u64)` | `TradeDetails` | Complete historical and active record for trade with ID `u64`. |

### `TradeDetails` Struct

```rust
#[contracttype]
#[derive(Clone, Debug, PartialEq)]
pub struct TradeDetails {
    pub id: u64,
    pub buyer: Address,
    pub farmer: Address,
    pub arbiter: Address,
    pub token: Address,
    pub amount: i128,
    pub state: EscrowState,
    pub delivery_hash: Option<BytesN<32>>,
    pub expiry: u64,
    pub buyer_share: i128,
    pub farmer_share: i128,
    pub created_at: u64,
}
```

---

## TTL Extension Policy

Soroban requires state entries to maintain storage rent. The contract calls an internal helper on every state access:

```rust
const DAY_IN_LEDGERS: u32 = 17_280; // ~5 seconds per ledger
const PERSISTENT_BUMP_THRESHOLD: u32 = 10 * DAY_IN_LEDGERS; // 172,800 ledgers (~10 days)
const PERSISTENT_BUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS;    // 518,400 ledgers (~30 days)

fn bump_trade_ttl(env: &Env, key: &DataKey) {
    env.storage().persistent().extend_ttl(
        key,
        PERSISTENT_BUMP_THRESHOLD,
        PERSISTENT_BUMP_AMOUNT,
    );
}
```

Whenever a trade is initialized, queried, flagged, or resolved, its storage lifetime is automatically bumped to 30 days ahead, ensuring no active agricultural contract expires due to state rent.

---

## Token Transfers & Invariants

Token operations interact strictly with the SEP-41 token client:
```rust
let client = soroban_sdk::token::Client::new(env, &trade.token);
```

1. **Atomic Deposit:** When `initialize_trade` is called, tokens move directly from the `buyer` to `env.current_contract_address()`.
2. **Balance Conservation:** During `execute_resolution`, the contract validates:
   $$\text{buyer\_share} + \text{farmer\_share} == \text{trade.amount}$$
   Tokens are transferred out in the same transaction. The contract never retains residual balances from settled escrows.
