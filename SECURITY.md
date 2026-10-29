# Security Policy

## Audit Status Disclaimer

> [!WARNING]
> **Unaudited Codebase**: AgriResolve smart contracts and associated services are currently deployed on the **Stellar Testnet** for testing, evaluation, and Drips Wave 11 maintainer demonstrations. The contracts have **not** yet undergone an independent third-party security audit. Do not deploy these contracts to Stellar Mainnet with real financial assets without completing a formal cryptographic and logic audit.

---

## Supported Versions

Only the latest release on the `main` branch is actively supported with security updates and bug fixes:

| Version | Supported | Status |
|---|:---:|---|
| `v0.1.x` | ✅ | Active Development (Testnet) |
| `< v0.1.0` | ❌ | Deprecated / Experimental |

---

## Scope

The following components are considered in scope for vulnerability reports:

1. **Soroban Smart Contracts** (`agriresolve-contract/contracts/escrow_engine`):
   - Escrow state machine transitions (`Funded` -> `Delivered` -> `Disputed` -> `Resolved` / `Refunded`).
   - Role-based access controls and authorization checks (`buyer`, `farmer`, `arbiter`).
   - Mathematical balance conservation invariants (`buyer_share + farmer_share == trade.amount`).
   - Soroban SAC Token client deposit and transfer execution.
   - Persistent storage TTL management.

2. **Web Application & Front-End Client** (`agriresolve-app/apps/web`):
   - Freighter wallet transaction assembly, signing, and submission pipelines.
   - Escrow status deserialization and display.
   - API routes handling dispute data intake.

3. **AI Resolution Proof Bridge** (`agriresolve-app/services/ai_agent`):
   - Proof bridge calculation logic (`proof_bridge.py`).
   - REST API validation endpoints.

### Out of Scope

- Vulnerabilities in third-party wallet extensions (e.g., Freighter).
- Upstream issues in the Stellar Network protocol or Soroban SDK.
- Attacks requiring physical access to a user's machine or compromised local browser sessions.
- Denial of Service (DoS) attacks on public Stellar Testnet Horizon or Soroban RPC endpoints.

---

## Reporting a Vulnerability

We take protocol and user fund security seriously. If you discover a security vulnerability or potential exploit, please report it responsibly:

### 1. Preferred Method: GitHub Private Security Advisory
Please use the **[GitHub Private Security Advisories](https://github.com/HassanKorey/Agrires/security/advisories/new)** feature to submit your report confidentially.

### 2. Alternative Contact: Security Email & Direct Messaging
If you cannot use GitHub Advisories, send an encrypted or direct email:
- **Email:** `security@agriresolve.network` (Subject: `[VULNERABILITY] AgriResolve Protocol`)
- **Maintainer Telegram:** `@HassanKorey`

### What to Include in Your Report
To help us triage and patch the issue quickly, please include:
- A clear description of the vulnerability.
- Steps to reproduce, proof of concept (PoC) script, or Soroban test case.
- Potential impact and scenario analysis (e.g., unauthorized payout, fund freezing).
- Your name or handle for public credit/acknowledgement once resolved.

---

## Response Timeline

- **Initial Response:** Within 48 hours of report receipt.
- **Triage & Assessment:** Within 3 to 5 business days.
- **Fix & Public Advisory:** Dependent on severity, typically within 7 to 14 business days.

We kindly request that you do not disclose any vulnerability publicly or to third parties until a fix has been verified and deployed.

---

## Security Best Practices for Maintainers & Integrators

1. **Strict Key Management:** Never commit private keys, Stellar secret seeds (`S...`), or sensitive RPC credentials to Git. Use environment variables (`.env.local`).
2. **Checked Arithmetic:** Always utilize Soroban's checked arithmetic methods (`checked_add`, `checked_sub`) to prevent arithmetic overflow or underflow.
3. **Signer Verification:** Ensure all state-changing entrypoints explicitly call `caller.require_auth()` before mutating storage.
