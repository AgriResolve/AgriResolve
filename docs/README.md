# Introduction to AgriResolve

AgriResolve is a decentralized escrow and dispute settlement protocol built on Stellar Soroban. It provides cryptographic payment security for agricultural commodity trade by coupling on-chain fund locking with deterministic dispute arbitration.

---

## The Agricultural Dispute Problem

Global food supply chains depend on trust between parties who rarely meet face-to-face. In emerging markets, this trust model routinely fails:

1. **Trade Volume at Risk:** According to the UN Food and Agriculture Organization (FAO) *State of Food and Agriculture*, approximately 14% of global grain and food production is lost or delayed post-harvest prior to retail. In cross-border commodity trade across Sub-Saharan Africa, Latin America, and South Asia, trade disputes affect 8% to 12% of total transaction volume, tying up over $30 billion in frozen working capital annually.
2. **The Liquidity Deadlock:** 
   - Farmers and cooperative aggregators cannot afford to ship 50 metric tons of grain without guaranteed payment. Unilateral buyer default or payment delays of 60 to 90 days destroy seasonal farm cash flow.
   - Commodity buyers and commercial millers cannot prepay without inspecting physical moisture content, aflatoxin levels, and foreign matter.
3. **Traditional Banking Failure:** Traditional bank Letters of Credit (LCs) require 110% cash collateral and charge 2% to 5% origination fees, with issuing cycles spanning 2 to 4 weeks. Over 95% of agricultural small-and-medium enterprises (SMEs) cannot qualify.
4. **Dispute Vulnerabilities:** The majority of disputes stem from measurable physical variances:
   - **Moisture content deviation** during open-truck transport (e.g., maize loaded at 13.5% moisture absorbing ambient humidity and arriving at 15.2%).
   - **Weight shrinkage** from drying or handling loss (1% to 3% weight decrease over transit).
   - **Delayed inspection certificates** held by local inspectors.

When a variance occurs, buyers often reject entire shipments or unilaterally withhold 100% of payment, leaving the producer with perishable stock stranded at the depot.

---

## Protocol Architecture

AgriResolve replaces discretionary arbitration with an automated, load-bearing state machine:

```
┌─────────────────────────────────────────────────────────────┐
│                     Buyer Web Client                        │
│         (Next.js 15 + Freighter Wallet + Soroban SDK)       │
└──────────────┬──────────────────────────────▲───────────────┘
               │ 1. initialize_trade()         │
               ▼                               │ 5. view status
┌──────────────────────────────────────────────┴──────────────┐
│             Stellar Soroban Escrow Contract                 │
│                 (escrow_engine.wasm)                        │
│                                                             │
│   States: Funded -> Delivered -> Disputed -> Resolved       │
│                                           -> Refunded       │
└──────────────▲──────────────────────────────▲───────────────┘
               │ 2. confirm_delivery()         │ 4. execute_resolution()
┌──────────────┴──────────────┐ ┌──────────────┴──────────────┐
│      Farmer Web Client      │ │     Arbitrator / Oracle     │
│   (Freighter / Delivery)    │ │   (AI Evidence Pipeline)    │
└─────────────────────────────┘ └──────────────▲──────────────┘
                                               │
                                ┌──────────────┴──────────────┐
                                │     Evidence Investigation  │
                                │   - Bill of Lading Intake   │
                                │   - Moisture Readout Audit  │
                                │   - Discrepancy Split Math  │
                                └─────────────────────────────┘
```

---

## How AgriResolve Works Step-by-Step

### Step 1: Escrow Initialization & Deposit
The buyer inputs trade parameters into the dApp: farmer address, arbiter address, token contract address (e.g., SEP-41 USDC), trade amount, and expiry timestamp. The buyer signs `initialize_trade()`. The contract transfers USDC from the buyer to the escrow contract account and enters the `Funded` state.

### Step 2: Physical Shipment & Delivery Confirmation
The farmer transports the agricultural shipment to the agreed destination warehouse or mill. Upon handover, the farmer collects the receipt or warehouse weight slip, hashes the receipt data (SHA-256), and invokes `confirm_delivery(caller, escrow_id, delivery_hash)`. The trade enters the `Delivered` state.

### Step 3: Inspection & Dispute Flagging
The buyer inspects the delivered grain within the agreed inspection window:
- **Conforming Quality:** If the grain meets specifications, the trade completes. (The buyer releases funds or allows expiry release).
- **Non-Conforming Quality:** If moisture, foreign matter, or weight violates the purchase contract, either party invokes `flag_dispute(caller, escrow_id)`. The contract transitions to `Disputed`. All normal payouts and cancellations are frozen on-chain.

### Step 4: Evidence Audit & Discrepancy Resolution
Both parties upload supporting documents:
- Initial contract specifications (e.g. 13.5% maximum moisture, $240/MT).
- Departure weighbridge scale ticket.
- Arrival lab moisture analysis and destination weighbridge receipt.

The AgriResolve AI evidence engine verifies document signatures, extracts physical metrics, calculates standard trade discount deductions, and computes the exact proportional split:
$$\text{Buyer Refund} + \text{Farmer Payout} = \text{Total Escrow Amount}$$

### Step 5: On-Chain Atomic Settlement
The designated arbiter submits the calculated split through `execute_resolution(arbiter, escrow_id, buyer_share, farmer_share)`. The Soroban contract verifies that:
1. The caller matches the authorized `arbiter` address.
2. The current state is strictly `Disputed`.
3. `buyer_share + farmer_share == trade.amount`.

The contract transfers `buyer_share` to the buyer and `farmer_share` to the farmer in a single atomic transaction. The state updates to `Resolved`.
