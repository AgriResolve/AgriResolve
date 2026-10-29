# AI Evidence Pipeline & Proof Bridge API

The AgriResolve AI Evidence Pipeline audits multi-modal agricultural evidence (bills of lading, moisture meter outputs, weighbridge scale tickets), verifies physical causality via the Meterless World Model, and outputs deterministic split parameters for the Soroban contract.

---

## Service Overview

- **Service File:** `agriresolve-app/services/ai_agent/server.py`
- **Core Pipeline:** `agriresolve/investigator.py` & `proof_bridge.py`
- **Default Port:** `http://localhost:8000`
- **Inference Models:** Nemotron-4-340B-Instruct (audit analysis) + Meterless World Model (provenance validation)

---

## REST Endpoints

### 1. Health & Status Check
`GET /api/health`

#### Response:
```json
{
  "status": "healthy",
  "service": "agriresolve-ai-agent",
  "model": "Nemotron-4-340B-Instruct"
}
```

---

### 2. Autonomous Dispute Investigation & Proof Generation
`POST /api/dispute/evaluate`

Accepts dispute case metadata and triggers the investigation pipeline.

#### Request Headers:
```http
Content-Type: application/json
```

#### Request Payload:
```json
{
  "dispute_id": "DISP-MAIZE-002-DISPUTE",
  "escrow_id": 1,
  "amount": 10000000
}
```

- `dispute_id: string` — Case identifier linking to uploaded evidence files.
- `escrow_id: number` — Target trade ID on Stellar Soroban testnet.
- `amount: number` — Total locked escrow deposit in base stroops (e.g. `10000000` = 1.0 USDC).

#### Response Payload (`200 OK`):
```json
{
  "success": true,
  "proof": {
    "dispute_id": "DISP-MAIZE-002-DISPUTE",
    "escrow_id": 1,
    "buyer_share": 6000000,
    "farmer_share": 4000000,
    "total_escrow_amount": 10000000,
    "evidence_hashes": [
      "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
    ],
    "reasoning_summary": "Transit moisture variance verified at +2.0% above 13.5% baseline. 800 kg physical weight shortfall identified across certified weighbridge tickets. Standard drying factor (1.25x) and dockage deduction applied.",
    "auditor_signature": "sig_ed25519_84f9cfa549c318847d1cede87688c73cf9d125893c3a5a90ba74b82c5e325565",
    "timestamp": 1730198400
  },
  "contract_params": {
    "escrow_id": 1,
    "buyer_share": 6000000,
    "farmer_share": 4000000,
    "is_valid_conservation": true
  }
}
```

---

## Contract Parameter Conservation Guarantee

Before returning the proof, `ProofBridge` validates the integer invariant:

```python
def validate_conservation(proof: DisputeResolutionProof) -> bool:
    return (proof.buyer_share + proof.farmer_share) == proof.total_escrow_amount
```

If rounding or truncation produces a 1-stroop mismatch, the bridge adjusts the buyer's deduction to ensure exact on-chain mathematical conservation, preventing `ContractError::SplitMismatch` (Error 8) when calling `execute_resolution`.
