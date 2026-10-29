# Contributing to AgriResolve

We welcome contributions to the AgriResolve Soroban escrow protocol, web dApp, and AI dispute pipeline.

---

## Workspace Structure

The repository is organized into distinct, decoupled workspaces:

- `agriresolve-contract/`: Pure Rust Soroban smart contract workspace. Contains state machine logic, storage layouts, and contract unit tests.
- `agriresolve-app/apps/web/`: Next.js 15 App Router dApp with Freighter wallet and Soroban RPC bindings.
- `agriresolve-app/services/ai_agent/`: Python service providing evidence parsing and proof formatting.
- `docs/`: GitBook-compatible protocol documentation.

---

## Development Workflow

### 1. Branch Naming Conventions
- `feat/feature-name` — New feature or contract entrypoint.
- `fix/bug-description` — Bug fix or error remediation.
- `refactor/scope` — Non-functional code improvements.
- `docs/doc-update` — Documentation improvements.

### 2. Commit Message Standards
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat(contract): add partial milestone payments`
- `fix(web): correct stroops formatting in resolution modal`
- `test(contract): add edge-case test for dispute locking`
- `docs(api): document get_trade return types`

---

## Pre-Submission Verification Checklist

Before opening a pull request, run all quality gates locally:

### 1. Smart Contract (`agriresolve-contract`)
```bash
cd agriresolve-contract
cargo fmt --check
cargo clippy --all-targets -- -D warnings
cargo test
stellar contract build
```
Ensure all 11 unit tests pass and the contract compiles without warnings.

### 2. Web Application (`agriresolve-app/apps/web`)
```bash
cd agriresolve-app/apps/web
pnpm install
pnpm build
```
Verify that TypeScript type-checking and Next.js static page generation complete cleanly (`Exit code: 0`).

### 3. AI Service (`agriresolve-app/services/ai_agent`)
```bash
cd agriresolve-app/services/ai_agent
python3 demo.py --scenario DISP-MAIZE-002-DISPUTE
```
Verify that the demo scenario parses evidence and outputs a valid `DisputeResolutionProof`.

---

## Pull Request Guidelines

1. **Focus:** Keep pull requests scoped to a single logical issue or task.
2. **Issue Linking:** Reference the corresponding issue number in the PR description (e.g., `Resolves #4`).
3. **CI Status Checks:** Pull requests will run GitHub Actions (`Soroban Smart Contracts (Rust)` and `Next.js 15 Web Application (TypeScript)`). Branch protection requires both status checks to pass before merging.
