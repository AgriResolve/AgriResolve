# Commodity Buyer & Commercial Miller Guide

This guide explains how commodity buyers, feed millers, and food processors use AgriResolve to eliminate supplier prepayment risk and automate non-conformance discounts.

---

## 1. Initiating a Trade Escrow

1. Navigate to `/trade/new` on the AgriResolve web app.
2. Ensure your Freighter wallet holds sufficient USDC on Stellar Testnet (use the SDF Testnet Friendbot for XLM and mint test USDC).
3. Fill in trade parameters:
   - **Farmer Address:** The supplier's 56-character Stellar public key (`G...`).
   - **Token Address:** Standard SEP-41 USDC address (`CCQGOTGN6HTQE74XYERYSYVU57T5NPYWV5DLCROMB56OXTV6RSO6KIGK`).
   - **Trade Amount:** Total contractual value in USDC (e.g. `12000`).
   - **Inspection Expiry:** Duration allocated for shipment transit plus inspection (e.g. 14 days).
   - **Arbiter Address:** Certified AI Oracle or designated multi-sig arbitrator address.
4. Click **Initialize Escrow & Deposit Funds**.
5. Sign the transfer transaction in Freighter. Your USDC moves into contract custody.

---

## 2. Receiving and Inspecting the Commodity

When the shipment arrives at your facility:
1. Direct the truck onto the facility weighbridge. Record gross weight.
2. Collect composite representative samples across the truck bed using an automated pneumatic grain probe or hand trier.
3. Test sample metrics in the on-site quality laboratory:
   - Moisture content via calibrated dielectric moisture meter.
   - Foreign matter dockage percentage via mechanical sieve.
   - Rapid test strip for aflatoxin (ppb) if applicable.

---

## 3. Discrepancy & Dispute Protocol

### Scenario A: Conforming Delivery
If all parameters meet contract specifications, allow the trade to settle smoothly. The farmer receives full compensation.

### Scenario B: Non-Conforming Delivery (Dispute)
If moisture exceeds tolerance, foreign matter is excessive, or net weight is short:
1. Open the trade detail page: `/trade/[id]`.
2. Click **Flag Dispute**.
3. Confirm the transaction in Freighter. The contract immediately locks the escrow in the **`Disputed`** state, preventing premature fund release.
4. Navigate to `/disputes`.
5. Upload your laboratory analysis sheet and weighbridge ticket.
6. The AI evidence system applies international grain trade formula discounts (e.g., GAFTA standards) and generates a verifiable settlement split.
7. Upon resolution, your calculated refund is deposited directly back into your Stellar wallet.
