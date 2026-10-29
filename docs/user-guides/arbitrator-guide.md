# Arbitrator & Oracle Operator Guide

This guide details the responsibilities and execution workflows for human arbitrators, cooperative trade boards, and automated AI oracle operators using AgriResolve.

---

## 1. Arbiter Authority & Single Responsibility

In AgriResolve, the designated `arbiter` address possesses exactly one privileged power:
- **`execute_resolution(arbiter, escrow_id, buyer_share, farmer_share)`**

The arbiter:
- **Cannot** initiate trades or withdraw deposits to personal accounts.
- **Cannot** alter contract rules or seize funds unilaterally.
- **Must** submit shares satisfying `buyer_share + farmer_share == trade.amount`.

---

## 2. Reviewing Dispute Evidence

When a trade enters the `Disputed` state:
1. Access the dispute case dashboard at `/disputes`.
2. Inspect the uploaded case files:
   - Initial trade contract specification.
   - Departure weigh ticket and origin quality report.
   - Destination laboratory moisture and grade certificate.
3. Review the automated findings output from the **Meterless World Model**:
   - Cryptographic timestamp verification.
   - Physical plausibility checks (e.g., verifying that distance traveled and weather conditions align with recorded moisture absorption).
   - Numerical deduction calculation.

---

## 3. The `DisputeResolutionProof` Object

The AI pipeline packages findings into a verified proof structure:

```json
{
  "escrow_id": 1,
  "status": "VALID_DISCREPANCY",
  "contract_amount": "120000000000",
  "buyer_share": "6052800000",
  "farmer_share": "113947200000",
  "findings": [
    "Weight shortfall: 800 kg (-1.60%) => $192.00 refund",
    "Moisture excess: 2.00% (15.5% vs 13.5% baseline) => $295.20 drying penalty",
    "Foreign matter dockage: 1.00% (2.5% vs 1.5% max) => $118.08 dockage deduction"
  ],
  "proof_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
}
```

---

## 4. Executing Settlement On-Chain

### Manual Review (Human Arbiter)
1. Open the trade page: `/trade/[id]`.
2. The modal pre-fills the AI-calculated `buyer_share` and `farmer_share`.
3. Verify that the shares sum to the exact trade total.
4. Click **Execute Resolution Split**.
5. Approve the transaction with your designated arbiter Freighter key.

### Automated Execution (Oracle Daemon)
For high-volume cooperative trade desks, the arbiter daemon runs `python3 services/ai_agent/server.py` with an ed25519 signing key, invoking the contract automatically once consensus is validated across independent evaluation nodes.
