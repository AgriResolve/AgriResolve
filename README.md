# AgriResolve

> **Soroban-Powered Agricultural Dispute Escrow Protocol**  
> Drips Wave 11 Maintainer Application Blueprint & Protocol Architecture

[![Soroban Contract Tests](https://img.shields.io/badge/Soroban%20Contract-11%20Tests%20Passing-brightgreen)](agriresolve-contract)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5.28%20App%20Router-black)](agriresolve-app/apps/web)
[![Rust 2021](https://img.shields.io/badge/Rust-2021%20wasm32-orange)](agriresolve-contract)
[![Stellar Protocol](https://img.shields.io/badge/Stellar-Protocol%2022%2F29%20Testnet-blue)](https://stellar.expert)

---

## 1. Project Overview & Strategic Rationale

AgriResolve solves a major real-world economic problem: **agricultural supply chain disputes in emerging markets**. 

Agricultural trade suffers from friction around quality, weight shrinkage, and delayed inspection certificates. When disputes arise between farmers and buyers, funds are typically frozen or lost in arbitration limbo.

AgriResolve bridges **off-chain AI evidence analysis** with **immutable on-chain financial settlement** on Stellar. By enforcing that the AI's investigation output can only trigger state changes via a cryptographically secure Soroban escrow contract, blockchain mechanics are **strictly load-bearing, not decorative**.

---

## 2. Repository Scope & Structure

Optimized in accordance with Drips Wave maintainer guidelines into two focused workspaces:

```
AgriResolve/
├── agriresolve-contract/                    # Pure Rust Soroban workspace containing escrow state machine
│   ├── Cargo.toml                           # Workspace root configuration with release profile optimization
│   ├── Makefile                             # build, test, check, clean
│   ├── README.md                            # Smart contract architecture & error documentation
│   └── contracts/
│       └── escrow_engine/                   # Escrow Engine Soroban Contract Crate
│           ├── Cargo.toml                   # soroban-sdk v29.0.1, cdylib + rlib
│           └── src/
│               ├── lib.rs                   # State machine entrypoints & SAC token integration
│               ├── storage.rs               # EscrowState, TradeDetails, DataKey persistent layout
│               ├── errors.rs                # Custom ContractError enum
│               ├── events.rs                # Structured event emissions
│               └── test.rs                  # 11 unit tests covering full lifecycle
│
└── agriresolve-app/                         # Application & off-chain services workspace
    ├── package.json                         # Workspace root
    ├── pnpm-workspace.yaml                  # pnpm workspace definition
    ├── README.md                            # App setup & execution guide
    ├── apps/
    │   └── web/                             # Next.js 15 App Router dApp with Freighter wallet
    │       ├── app/
    │       │   ├── layout.tsx               # Responsive layout & theme
    │       │   ├── page.tsx                 # Escrow trades dashboard & metrics
    │       │   ├── trade/
    │       │   │   ├── new/                 # Initiate trade form (buyer, farmer, token, amount, expiry)
    │       │   │   └── [id]/                # Escrow lifecycle controls (Deliver, Dispute, Refund, Resolve)
    │       │   ├── disputes/                # Evidence upload & AI audit dashboard
    │       │   └── api/disputes/evaluate/   # API bridge to AI agent
    │       ├── components/
    │       │   ├── Navbar.tsx               # Navigation & branding
    │       │   ├── WalletConnect.tsx        # Freighter wallet connector
    │       │   ├── TradeCard.tsx            # Escrow summary card
    │       │   ├── EvidenceUploader.tsx     # Drag-and-drop document intake
    │       │   └── ResolutionModal.tsx      # On-chain resolution execution modal
    │       └── lib/stellar.ts               # Testnet configuration, helpers & contract bindings
    │
    └── services/
        └── ai_agent/                        # Evidence parsing pipeline & proof generator
            ├── agriresolve/                 # Meterless World Model, Nemotron investigator, and tools
            ├── proof_bridge.py              # DisputeResolutionProof and contract params formatter
            ├── server.py                    # REST API server for web dashboard integration
            ├── demo.py                      # Multi-scenario CLI demonstration
            └── requirements.txt             # Python dependencies
```

---

## 3. Core Contract State Machine & Logic

### Escrow States (`EscrowState`)

| State | Code | Description |
|---|:---:|---|
| `Funded` | `0` | Buyer deposits USDC into the escrow contract. |
| `Delivered` | `1` | Farmer submits cryptographic delivery confirmation hash. |
| `Disputed` | `2` | Either buyer or farmer flags non-compliance, locking funds. |
| `Resolved` | `3` | Arbitrator multi-sig or AI oracle signs off on atomic split payout. |
| `Refunded` | `4` | Mutual cancellation or return to buyer before dispatch/expiry. |

```
                       [Initiate Trade]
                              │
                              ▼
                         ┌─────────┐
                         │ Funded  │ ◄── Buyer deposits USDC
                         └────┬────┘
                              │
        ┌─────────────────────┴───────────────────────┐
        ▼                                             ▼
  ┌───────────┐                                 ┌──────────┐
  │ Delivered │ ◄── Farmer confirms delivery     │ Refunded │ ◄── Buyer refund if canceled
  └─────┬─────┘                                 └──────────┘
        │
        ├─────────────────────────────┐
        ▼                             ▼
  ┌───────────┐                 ┌──────────┐
  │ Disputed  │ ◄── Dispute     │ Resolved │
  └─────┬─────┘     flagged     └──────────┘
        │
        ▼
  ┌───────────┐
  │ Resolved  │ ◄── AI/Arbiter atomic split payout
  └───────────┘     execute_resolution(arbiter, escrow_id, buyer_share, farmer_share)
```

### Entry Point Functions

```rust
// 1. Initialize trade & atomically deposit tokens via SAC Token Client
initialize_trade(buyer: Address, farmer: Address, arbiter: Address, token: Address, amount: i128, expiry: u64) -> Result<u64, ContractError>

// 2. Farmer submits proof of delivery
confirm_delivery(caller: Address, escrow_id: u64, delivery_hash: BytesN<32>) -> Result<(), ContractError>

// 3. Either party flags non-compliance, locking funds
flag_dispute(caller: Address, escrow_id: u64) -> Result<(), ContractError>

// 4. Arbiter executes atomic balance split based on AI evidence investigation
execute_resolution(arbiter: Address, escrow_id: u64, buyer_share: i128, farmer_share: i128) -> Result<(), ContractError>

// 5. Cancel and refund buyer before delivery
refund_trade(caller: Address, escrow_id: u64) -> Result<(), ContractError>

// 6. View functions
get_trade(escrow_id: u64) -> Result<TradeDetails, ContractError>
get_trade_count() -> u64
```

---

## 4. Deployed Testnet Deployment

AgriResolve is configured for Stellar Soroban Testnet:

| Resource | Address / ID |
|---|---|
| **AgriResolve Contract** | `<CONTRACT_ID>` |
| **SEP-41 USDC Token** | `<USDC_TOKEN_ID>` |
| **Admin Deployer** | `<ADMIN_ADDRESS>` |
| **Testnet RPC** | `https://soroban-testnet.stellar.org` |
| **Testnet Network Passphrase** | `Test SDF Network ; September 2015` |

---

## 5. Verification & Testing

### 1. Smart Contract (`agriresolve-contract`)

```bash
cd agriresolve-contract

# Run comprehensive test suite (11 unit tests)
cargo test

# Build optimized WebAssembly contract (under 10KB)
stellar contract build
# Output: target/wasm32v1-none/release/escrow_engine.wasm
```

### 2. Web Application (`agriresolve-app/apps/web`)

```bash
cd agriresolve-app/apps/web

# Install dependencies
pnpm install

# Build Next.js 15 production app
pnpm build

# Start development server
pnpm dev
# Running on http://localhost:3000
```

### 3. AI Evidence Pipeline (`agriresolve-app/services/ai_agent`)

```bash
cd agriresolve-app/services/ai_agent

# Install dependencies
pip install -r requirements.txt

# Run CLI demonstration on agricultural dispute scenarios
python3 demo.py --scenario DISP-MAIZE-002-DISPUTE

# Start the REST proof bridge service
python3 server.py
# Listening on http://localhost:8000
```

---

## 6. Security & Protocol Invariants

1. **Strict Role-Based Validation**: Only the designated `buyer` can fund, only the designated `farmer` can confirm delivery, and only the authorized `arbiter` (or AI oracle multi-sig) can execute resolution splits.
2. **Mathematical Invariant Conservation**: In `execute_resolution`, the contract enforces `buyer_share + farmer_share == trade.amount` with checked integer arithmetic, preventing underflow, overflow, or stranded funds.
3. **Dispute Locking**: Once a trade transitions to `Disputed`, normal delivery confirmations and unilateral refunds are permanently locked until resolution is executed.
4. **TTL Storage Extension**: All trade storage entries automatically extend persistent TTL storage to preserve on-chain state indefinitely.

---

## License

MIT License. Built for the Stellar Community & Drips Wave 11.
