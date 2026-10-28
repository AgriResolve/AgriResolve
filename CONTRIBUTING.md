# Contributing to AgriResolve

Thank you for your interest in contributing to **AgriResolve**! We welcome community contributions to both the Soroban smart contracts and the application/AI pipeline.

## Code of Conduct

All contributors are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat all participants with respect and professionalism.

## Repository Structure

- `agriresolve-contract/`: Pure Rust workspace containing the escrow state machine.
- `agriresolve-app/apps/web/`: Next.js 15 dApp with Freighter wallet integration.
- `agriresolve-app/services/ai_agent/`: Python dispute investigation pipeline with Meterless World Model provenance.

## Development Workflow

1. **Fork and Clone** the repository.
2. **Branch**: Create a feature branch (`git checkout -b feat/my-feature`).
3. **Smart Contract Development**:
   ```bash
   cd agriresolve-contract
   cargo test
   stellar contract build
   ```
4. **Web Frontend Development**:
   ```bash
   cd agriresolve-app/apps/web
   pnpm install
   pnpm dev
   pnpm build
   ```
5. **AI Pipeline Development**:
   ```bash
   cd agriresolve-app/services/ai_agent
   pip install -r requirements.txt
   python3 demo.py --scenario DISP-MAIZE-002-DISPUTE
   ```
6. **Commit**: Use Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`).
7. **Submit a Pull Request**: Provide a detailed description of your changes and reference any related issues.
