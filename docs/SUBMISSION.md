# AgriResolve — Drips Wave 11 Submission Package

> **Protocol Name:** AgriResolve  
> **Ecosystem:** Stellar (Soroban Protocol 22/29)  
> **Maintainer:** Hassan Korey ([@HassanKorey](https://github.com/HassanKorey))  
> **Primary Repository:** [https://github.com/HassanKorey/Agrires](https://github.com/HassanKorey/Agrires)  
> **Release Tag:** [v0.1.0](https://github.com/HassanKorey/Agrires/releases/tag/v0.1.0)  

---

## 1. Verified Project Links

| Asset / Deliverable | Target URL / Reference | Status |
|---|---|:---:|
| **Primary GitHub Repository** | [https://github.com/HassanKorey/Agrires](https://github.com/HassanKorey/Agrires) | Verified & Public |
| **Deployed Soroban Contract** | [CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4](https://stellar.expert/explorer/testnet/contract/CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4) | Live on Testnet |
| **SEP-41 Testnet USDC Token** | [CCQGOTGN6HTQE74XYERYSYVU57T5NPYWV5DLCROMB56OXTV6RSO6KIGK](https://stellar.expert/explorer/testnet/contract/CCQGOTGN6HTQE74XYERYSYVU57T5NPYWV5DLCROMB56OXTV6RSO6KIGK) | Live on Testnet |
| **Release v0.1.0 (with Wasm Binary)** | [v0.1.0 Release Notes & Artifacts](https://github.com/HassanKorey/Agrires/releases/tag/v0.1.0) | Published |
| **Protocol Documentation Hub** | [GitHub Docs / SUMMARY.md](https://github.com/HassanKorey/Agrires/blob/main/docs/README.md) | 14 Spec Docs |
| **In-App Documentation Route** | `/docs` (Interactive Tabbed Viewer) | Compiled & Live |
| **CI Quality Gates** | [GitHub Actions Workflow](https://github.com/HassanKorey/Agrires/actions/workflows/ci.yml) | Passing (Rust & TS) |

---

## 2. Project Description (Submission Form One-Paragraph)

> Agricultural commodity trade across emerging markets suffers from severe counterparty trust deadlock: according to the UN Food and Agriculture Organization (FAO), roughly 14% of global food production is lost post-harvest, while 8% to 12% of cross-border trade volume ties up over $30 billion in frozen liquidity and counterparty default disputes annually over transit weight shrinkage, moisture variations, and delayed quality certificates. AgriResolve is an agricultural escrow and dispute settlement protocol built on Stellar Soroban that bridges off-chain multi-modal AI evidence analysis with immutable on-chain financial settlement. When commodity quality deviates from contractual baselines, the protocol freezes unilateral fund withdrawals and replaces binary non-payment with empirical international trade discount formulas (such as GAFTA/USDA moisture and dockage deductions). The resulting atomic split payout is executed directly on Stellar with zero stranded funds, guaranteeing liquidity protection for smallholder producers and cost remediation for commercial buyers.

---

## 3. Technical Architecture & Workspace Relationships

The AgriResolve repository uses a modular monorepo structure designed for maintainability and audit isolation:

```
AgriResolve/
├── agriresolve-contract/             # Soroban Smart Contract (Rust)
├── agriresolve-app/
│   ├── apps/web/                    # Next.js 15 Web Application
│   └── services/ai_agent/           # AI Evidence & Resolution Engine (Python)
└── docs/                            # GitBook-compatible Protocol Docs
```

### Technical Interconnections
1. **Smart Contract Layer (`agriresolve-contract`):**
   - Implements a single-responsibility state machine in pure Rust (`soroban-sdk v29.0.1`), compiled to an optimized 9.5 KB Wasm binary (`wasm32v1-none`).
   - Manages state transitions (`Funded` $\rightarrow$ `Delivered` $\rightarrow$ `Disputed` $\rightarrow$ `Resolved` / `Refunded`) and enforces mathematical balance conservation (`buyer_share + farmer_share == trade.amount`) using checked 128-bit arithmetic.
   - Interacts atomically with the SEP-41 Soroban Asset Contract (SAC) token client for collateral locking and dual-recipient payouts.
2. **Application Layer (`agriresolve-app/apps/web`):**
   - Next.js 15 App Router dApp with TypeScript, Tailwind CSS, and Freighter wallet integration via `@stellar/freighter-api` and `@stellar/stellar-sdk`.
   - Reads contract state without transaction fees via Soroban RPC transaction simulation (`get_trade`, `get_trade_count`).
   - Assembles, simulates footprint/resource fees, and broadcasts state-changing transactions signed by the user's keypair.
3. **AI Evidence Bridge (`agriresolve-app/services/ai_agent`):**
   - Fast Python service integrating the Meterless World Model for document provenance verification (timestamps, physical transit plausibility) and Nemotron-4-340B for evidence discrepancy auditing.
   - `proof_bridge.py` applies commercial drying and dockage formulas to calculate exact stroop balances and emits an auditor-signed `DisputeResolutionProof`, which is fed directly into the dApp for on-chain submission.

---

## 4. Planned Issues Roadmap (For Reviewers & Contributors)

AgriResolve has 8 active, well-scoped GitHub issues ready for community contributions:

### Smart Contract Enhancements
- **[Issue #1](https://github.com/HassanKorey/Agrires/issues/1) — `feat(contract): implement multi-token support beyond USDC via token whitelist`**  
  *Complexity: Medium | Stack: Rust, Soroban SDK v29*  
  Adds admin-governed token address whitelist to enable trading in certified agricultural stablecoins, EURC, and regional tokens while preventing counterfeit token injections.
- **[Issue #2](https://github.com/HassanKorey/Agrires/issues/2) — `feat(contract): add partial milestone payments for staggered commodity shipments`**  
  *Complexity: High | Stack: Rust, Soroban SDK v29*  
  Supports multi-leg trade disbursements (e.g., 25% on silo loading, 50% on port weigh-in, 25% upon final buyer quality clearance).
- **[Issue #3](https://github.com/HassanKorey/Agrires/issues/3) — `refactor(contract): replace deprecated env.events().publish with #[contractevent] macro`**  
  *Complexity: Low / Good First Issue | Stack: Rust, Soroban SDK v29*  
  Migrates event emissions to Soroban SDK v29's strongly-typed `#[contractevent]` macro to eliminate compiler deprecation warnings.

### Web Frontend & User Experience
- **[Issue #4](https://github.com/HassanKorey/Agrires/issues/4) — `feat(web): integrate transaction simulation and estimated gas fee breakdown in TradeCard`**  
  *Complexity: Medium | Stack: Next.js 15, TypeScript, @stellar/stellar-sdk*  
  Pre-simulates Soroban RPC calls to display CPU, memory, and storage fee estimates before triggering the Freighter signing popup.
- **[Issue #5](https://github.com/HassanKorey/Agrires/issues/5) — `feat(web): add real-time transaction status toaster with Stellar Expert link`**  
  *Complexity: Low / Good First Issue | Stack: Next.js 15, Tailwind CSS, TypeScript*  
  Adds visual toast feedback tracking transaction stages (`Submitting`, `Ledger Inclusion`, `Confirmed`) with direct hyperlinks to Stellar Expert.
- **[Issue #6](https://github.com/HassanKorey/Agrires/issues/6) — `feat(web): support multi-file drag and drop with thumbnail preview in EvidenceUploader`**  
  *Complexity: Medium | Stack: Next.js 15, React, Tailwind CSS*  
  Enables concurrent upload of bills of lading, weighbridge receipts, and laboratory moisture analysis sheets.

### AI Engine & Decentralized Oracles
- **[Issue #7](https://github.com/HassanKorey/Agrires/issues/7) — `feat(agent): support automated phytosanitary certificate QR code verification`**  
  *Complexity: Medium | Stack: Python 3.11, OpenCV/pyzbar, FastAPI*  
  Extracts and cross-references government QR verification barcodes against agricultural registry databases.
- **[Issue #8](https://github.com/HassanKorey/Agrires/issues/8) — `feat(agent): implement decentralized oracle consensus bridge with multi-arbiter signing`**  
  *Complexity: High | Stack: Python, Rust Soroban SDK, Cryptography*  
  Enables multi-node consensus with m-of-n threshold signing for arbitration decisions, preventing single-point-of-failure vulnerabilities.

---

## 5. End-to-End Product Flow & Demo Video Script

A working product walkthrough video (2 to 3 minutes) is recommended for submission. Follow this exact flow:

### Scene 1: The Trust Problem & Trade Creation (0:00 – 0:45)
- **Visual:** Open AgriResolve dApp (`/trade/new`).
- **Narrative:** "In emerging market grain trade, buyers and farmers face a deadlock: farmers can't risk shipping 50 tons of maize without payment, and buyers can't prepay without inspecting moisture and quality. AgriResolve solves this with Soroban-powered escrow."
- **Action:** Connect Freighter wallet. Enter farmer address, 10,000,000 stroops (1.0 USDC or 12,000 USDC), set 7-day expiry. Click **Initialize Escrow & Deposit Funds**. Approve in Freighter. Show trade entering `Funded` state.

### Scene 2: Transit & Delivery Confirmation (0:45 – 1:15)
- **Visual:** Trade detail page (`/trade/1`).
- **Narrative:** "Once the grain reaches the buyer's destination silo, the farmer receives an official weighbridge receipt. To secure their delivery on-chain, the farmer registers the cryptographic receipt hash."
- **Action:** Paste receipt SHA-256 hash and click **Confirm Delivery**. Approve in Freighter. Trade updates to `Delivered`.

### Scene 3: Inspection Variance & Dispute Locking (1:15 – 1:50)
- **Visual:** Buyer tests the cargo. Moisture is 15.5% (against a 13.5% baseline), and net weight shows an 800 kg shortfall.
- **Narrative:** "The buyer inspects the grain and detects 2% excess moisture and weight shrinkage. Instead of canceling or withholding payment in arbitration limbo, the buyer clicks Flag Dispute."
- **Action:** Click **Flag Dispute**. The contract locks in `Disputed`. Emphasize that unilateral refunds and releases are now permanently locked on-chain.

### Scene 4: AI Evidence Audit & Proportional Settlement (1:50 – 2:30)
- **Visual:** Navigate to `/disputes`. Upload departure weigh ticket and destination moisture lab sheet.
- **Narrative:** "Both parties submit evidence. The AI engine audits the documents, calculates standard drying and dockage deductions, and outputs an exact split."
- **Action:** Show the calculated proof: Buyer refund $605.28, Farmer payout $11,394.72. The arbiter clicks **Execute Resolution Split**.
- **Result:** Show the transaction confirming on Stellar Expert testnet. The state changes to `Resolved`, and both wallets receive their atomic settlement.
