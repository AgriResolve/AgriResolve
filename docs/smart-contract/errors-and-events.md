# Contract Errors & Event Emissions

This document cataloges the error codes and structured events emitted by `AgriResolveEscrowContract`.

---

## Error Codes (`ContractError`)

All contract entrypoints return `Result<T, ContractError>`. Errors abort the transaction, revert state changes, and emit the error code in the Soroban RPC return payload.

```rust
#[contracterror]
#[repr(u32)]
pub enum ContractError {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    Unauthorized = 3,
    TradeNotFound = 4,
    InvalidState = 5,
    InvalidAmount = 6,
    TradeExpired = 7,
    SplitMismatch = 8,
    Overflow = 9,
    AlreadyDelivered = 10,
    DisputeLocked = 11,
    ZeroAddress = 12,
    IdenticalParties = 13,
    InvalidExpiry = 14,
}
```

| Code | Error Name | Cause | Resolution / Remedy |
|:---:|---|---|---|
| **1** | `AlreadyInitialized` | Protocol admin key already configured. | Contract can only be initialized once. |
| **2** | `NotInitialized` | Contract requires administration setup before function call. | Run deploy script initialization. |
| **3** | `Unauthorized` | Caller address does not match the authorized participant. | Verify active wallet address against trade roles (`buyer`, `farmer`, `arbiter`). |
| **4** | `TradeNotFound` | `escrow_id` does not exist in persistent storage. | Check `get_trade_count` and verify escrow ID. |
| **5** | `InvalidState` | Invoked operation is illegal in current trade state. | Check current state (e.g. cannot confirm delivery on a refunded trade). |
| **6** | `InvalidAmount` | `amount <= 0` during trade creation, or split share $< 0$. | Ensure non-zero trade value. |
| **7** | `TradeExpired` | Attempting to operate on a trade past its cutoff timestamp. | Escrow has expired; invoke `refund_trade`. |
| **8** | `SplitMismatch` | `buyer_share + farmer_share != trade.amount`. | Ensure the sum of proposed shares strictly equals the exact escrow balance. |
| **9** | `Overflow` | Integer addition or multiplication exceeded `i128::MAX`. | Check token scale; utilize valid integers. |
| **10** | `AlreadyDelivered` | `confirm_delivery` invoked on a trade already in `Delivered` state. | Delivery hash has already been registered. |
| **11** | `DisputeLocked` | Attempting delivery or unilateral refund while in `Disputed` state. | Trade is locked in dispute; must be settled by arbiter via `execute_resolution`. |
| **12** | `ZeroAddress` | `buyer`, `farmer`, or `arbiter` passed as null/empty address. | Pass valid 56-character `G...` or `C...` Stellar addresses. |
| **13** | `IdenticalParties` | `buyer == farmer`. | Buyer and farmer must be distinct economic entities. |
| **14** | `InvalidExpiry` | `expiry <= env.ledger().timestamp()`. | Provide an expiry timestamp in the future. |

---

## Structured Event Emissions

All state transitions emit contract events indexed on Stellar Horizon and Soroban RPC endpoints:

### 1. `TradeInitialized`
- **Topics:** `["init", trade_id: u64, buyer: Address]`
- **Data Payload:** `(farmer: Address, token: Address, amount: i128, expiry: u64)`

### 2. `DeliveryConfirmed`
- **Topics:** `["deliver", trade_id: u64, farmer: Address]`
- **Data Payload:** `delivery_hash: BytesN<32>`

### 3. `DisputeFlagged`
- **Topics:** `["dispute", trade_id: u64, caller: Address]`
- **Data Payload:** `()`

### 4. `ResolutionExecuted`
- **Topics:** `["resolve", trade_id: u64, arbiter: Address]`
- **Data Payload:** `(buyer_share: i128, farmer_share: i128)`

### 5. `TradeRefunded`
- **Topics:** `["refund", trade_id: u64, buyer: Address]`
- **Data Payload:** `amount: i128`
