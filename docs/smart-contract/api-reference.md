# Smart Contract API Reference

This document details all public entrypoints for `AgriResolveEscrowContract`.

---

## State-Mutating Entrypoints

### 1. `initialize_trade`
Initializes a new trade escrow and atomically transfers the collateral deposit from the buyer into contract custody.

```rust
pub fn initialize_trade(
    env: Env,
    buyer: Address,
    farmer: Address,
    arbiter: Address,
    token: Address,
    amount: i128,
    expiry: u64,
) -> Result<u64, ContractError>
```

- **Caller:** Must be `buyer`. Enforces `buyer.require_auth()`.
- **Parameters:**
  - `buyer: Address` - Stellar address of the commodity buyer / purchaser.
  - `farmer: Address` - Stellar address of the commodity producer / seller.
  - `arbiter: Address` - Stellar address authorized to execute dispute resolutions.
  - `token: Address` - Stellar address of the SEP-41 token contract (e.g. USDC).
  - `amount: i128` - Total purchase deposit in stroops/base units (must be $> 0$).
  - `expiry: u64` - Unix timestamp in seconds when buyer may unilateral refund if undelivered.
- **Returns:** `Result<u64, ContractError>` - New monotonically assigned trade ID.
- **Events Emitted:** `emit_trade_initialized`

---

### 2. `confirm_delivery`
Records the farmer's cryptographic proof of physical commodity delivery.

```rust
pub fn confirm_delivery(
    env: Env,
    caller: Address,
    escrow_id: u64,
    delivery_hash: BytesN<32>,
) -> Result<(), ContractError>
```

- **Caller:** Must be the designated `trade.farmer`. Enforces `caller.require_auth()`.
- **Parameters:**
  - `caller: Address` - Invoking address.
  - `escrow_id: u64` - Identifier of the active escrow.
  - `delivery_hash: BytesN<32>` - SHA-256 digest of warehouse receipt or bill of lading.
- **State Transition:** `Funded` -> `Delivered`.
- **Returns:** `Result<(), ContractError>`
- **Events Emitted:** `emit_delivery_confirmed`

---

### 3. `flag_dispute`
Freezes trade progression when non-compliance, weight loss, or quality defects are observed.

```rust
pub fn flag_dispute(
    env: Env,
    caller: Address,
    escrow_id: u64,
) -> Result<(), ContractError>
```

- **Caller:** Must be either `trade.buyer` OR `trade.farmer`. Enforces `caller.require_auth()`.
- **Parameters:**
  - `caller: Address` - Invoking address.
  - `escrow_id: u64` - Identifier of the trade to dispute.
- **State Transition:** `Funded` | `Delivered` -> `Disputed`.
- **Returns:** `Result<(), ContractError>`
- **Events Emitted:** `emit_dispute_flagged`

---

### 4. `execute_resolution`
Distributes locked escrow collateral between buyer and farmer according to arbitration findings.

```rust
pub fn execute_resolution(
    env: Env,
    arbiter: Address,
    escrow_id: u64,
    buyer_share: i128,
    farmer_share: i128,
) -> Result<(), ContractError>
```

- **Caller:** Must be the designated `trade.arbiter`. Enforces `arbiter.require_auth()`.
- **Parameters:**
  - `arbiter: Address` - Invoking arbitrator address.
  - `escrow_id: u64` - Identifier of the disputed trade.
  - `buyer_share: i128` - Amount to refund to buyer ($ \ge 0 $).
  - `farmer_share: i128` - Amount to disburse to farmer ($ \ge 0 $).
- **Constraints:**
  - Trade state must be `Disputed` (or `Delivered`).
  - `buyer_share + farmer_share == trade.amount`.
- **State Transition:** `Disputed` -> `Resolved`.
- **Returns:** `Result<(), ContractError>`
- **Events Emitted:** `emit_resolution_executed`

---

### 5. `refund_trade`
Cancels the trade and returns 100% of collateral to the buyer if unfulfilled past expiry or mutually canceled.

```rust
pub fn refund_trade(
    env: Env,
    caller: Address,
    escrow_id: u64,
) -> Result<(), ContractError>
```

- **Caller:**
  - If called by `farmer`: Consensual cancellation allowed anytime prior to delivery.
  - If called by `buyer`: Permitted only if `env.ledger().timestamp() >= trade.expiry`.
- **State Transition:** `Funded` -> `Refunded`.
- **Returns:** `Result<(), ContractError>`
- **Events Emitted:** `emit_trade_refunded`

---

## Read-Only View Functions

### 6. `get_trade`
Retrieves the complete state record for a given trade.

```rust
pub fn get_trade(env: Env, escrow_id: u64) -> Result<TradeDetails, ContractError>
```

- **Caller:** Public / Unauthenticated.
- **Parameters:** `escrow_id: u64`.
- **Returns:** `Result<TradeDetails, ContractError>`.

---

### 7. `get_trade_count`
Retrieves the cumulative number of trades initialized on the contract.

```rust
pub fn get_trade_count(env: Env) -> u64
```

- **Caller:** Public / Unauthenticated.
- **Returns:** `u64`.
