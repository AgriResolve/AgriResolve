# Local Environment Setup & Configuration

This guide provides instructions for setting up the AgriResolve development environment from source.

---

## Prerequisites

Ensure the following runtimes and toolchains are installed on your workstation:

| Dependency | Minimum Version | Installation / Verification |
|---|---|---|
| **Rust** | `1.84.0+` | `rustup default stable` |
| **WASM Target** | `wasm32v1-none` | `rustup target add wasm32v1-none` |
| **Stellar CLI** | `v28.1.0+` | `cargo install --locked stellar-cli --features opt` |
| **Node.js** | `v22.0.0+` | `node --version` |
| **pnpm** | `v10.0.0+` | `corepack enable && corepack prepare pnpm@latest --activate` |
| **Python** | `3.11.0+` | `python3 --version` |

---

## 1. Clone & Workspace Setup

```bash
git clone https://github.com/HassanKorey/Agrires.git
cd Agrires
```

The repository is structured into two clean workspaces:
- `agriresolve-contract/` — Pure Rust Soroban smart contract workspace.
- `agriresolve-app/` — Next.js 15 frontend application and Python AI service.

---

## 2. Smart Contract Build & Test

```bash
cd agriresolve-contract

# Run the 11 unit test suite
cargo test

# Build optimized WebAssembly artifact
stellar contract build
# Compiled binary located at: target/wasm32v1-none/release/escrow_engine.wasm
```

---

## 3. Web Application Setup

```bash
cd ../agriresolve-app/apps/web

# Install pnpm workspace dependencies
pnpm install

# Copy environment configuration
cp .env.example .env.local
```

### Environment Variables (`.env.local`)

```ini
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
NEXT_PUBLIC_CONTRACT_ID=CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4
NEXT_PUBLIC_USDC_ADDRESS=CCQGOTGN6HTQE74XYERYSYVU57T5NPYWV5DLCROMB56OXTV6RSO6KIGK
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
```

### Launch Development Server

```bash
pnpm dev
# Running at http://localhost:3000
```

---

## 4. AI Evidence Agent Service

```bash
cd ../../services/ai_agent

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run CLI demonstration on dispute scenario
python3 demo.py --scenario DISP-MAIZE-002-DISPUTE

# Start the REST proof bridge server
python3 server.py
# Listening on http://localhost:8000
```
