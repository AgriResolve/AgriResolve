# Farmer & Cooperative Aggregator Guide

This guide explains how farmers, producers, and agricultural cooperative managers use AgriResolve to guarantee payment for commodity deliveries without counterparty credit risk.

---

## 1. Prerequisites

1. **Stellar Wallet:** Install the [Freighter Wallet](https://www.freighter.app/) extension in Chrome, Brave, or Firefox.
2. **Network Selection:** Ensure your Freighter wallet is switched to **Testnet**.
3. **Public Address:** Copy your Stellar account address (starts with `G...`, 56 characters). Provide this address to the grain buyer or commodity aggregator.

---

## 2. Step-by-Step Delivery Workflow

### Step 1: Verify Funded Escrow
Before loading trucks at your silo or farm gate:
1. Open the AgriResolve web dashboard.
2. Connect your Freighter wallet via the top-right button.
3. Locate the trade card matching your trade agreement.
4. Confirm that the status displays **`Funded`** and verify:
   - **Token Amount:** Matches agreed volume $\times$ price (e.g. 12,000 USDC).
   - **Expiry Date:** Allows sufficient time for transport transit and inspection.
   - **Arbiter Address:** Designated dispute resolver.

> **Rule:** Never release grain for transport until the trade status displays `Funded` on-chain.

---

### Step 2: Physical Transport & Handover
1. Dispatch the grain shipment to the destination warehouse, mill, or port silo.
2. Upon arrival at the buyer's gate, witness the gross weighbridge weighing.
3. Collect the official stamped **Delivery Note** or **Warehouse Receipt**.

---

### Step 3: Confirm Delivery On-Chain
1. Open your trade details page: `/trade/[id]`.
2. Locate the **"Confirm Delivery"** section.
3. Enter or generate the SHA-256 hash of your delivery note (e.g., using document data or the AgriResolve receipt generator).
4. Click **Confirm Delivery**.
5. Approve the transaction in your Freighter popup.

Once confirmed on-chain, the trade transitions to **`Delivered`**. The buyer can no longer cancel or refund the escrow unilaterally.

---

## 3. Handling Quality Disputes

If the buyer flags a discrepancy (e.g., moisture was 15.5% instead of 13.5%):
1. The trade enters **`Disputed`** status.
2. Navigate to `/disputes`.
3. Upload your original departure inspection certificate, scale weight ticket, and dispatch bill of lading.
4. The AgriResolve AI engine audits both departure and arrival evidence.
5. You receive your proportional payout automatically when the arbiter executes the resolution split.
