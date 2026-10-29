#!/usr/bin/env bash
set -e

REPO="HassanKorey/Agrires"

echo "=== Seeding Planned GitHub Issues for $REPO ==="

# 1. Multi-token whitelist
gh issue create --repo "$REPO" \
  --title "feat(contract): implement multi-token support beyond USDC via token whitelist" \
  --label "enhancement,contract,difficulty:medium" \
  --body "### Summary
Currently, the contract allows depositing any token passed into \`initialize_trade\`. To prevent illegitimate or counterfeit token deposits, add an admin whitelist configuration for approved settlement tokens (e.g., EURC, XLM, or certified agricultural stablecoins).

### Acceptance Criteria
- [ ] Implement persistent storage key for approved token addresses
- [ ] Add \`add_token(admin: Address, token: Address)\` and \`remove_token(admin: Address, token: Address)\` entrypoints with admin authorization
- [ ] Validate requested token against whitelist in \`initialize_trade\`
- [ ] Add unit test coverage for authorized vs. unauthorized token initialization

### Tech Stack
Rust, Soroban SDK v29"

# 2. Milestone payments
gh issue create --repo "$REPO" \
  --title "feat(contract): add partial milestone payments for staggered commodity shipments" \
  --label "enhancement,contract,difficulty:high" \
  --body "### Summary
Agricultural trade often moves in multiple transit legs (e.g. 25% upon silo loading, 50% upon port weigh-in, 25% upon final buyer quality clearance). Extend the escrow contract state machine to support multi-stage milestone releases.

### Acceptance Criteria
- [ ] Extend \`TradeDetails\` to support milestone disbursement percentages
- [ ] Implement \`confirm_milestone(caller: Address, escrow_id: u64, milestone_index: u32, delivery_hash: BytesN<32>)\`
- [ ] Enforce that already released milestones cannot be claimed twice
- [ ] Ensure that a flagged dispute locks any unreleased milestone funds
- [ ] Add unit tests verifying a 3-stage milestone delivery sequence

### Tech Stack
Rust, Soroban SDK v29"

# 3. Contractevent macro migration
gh issue create --repo "$REPO" \
  --title "refactor(contract): replace deprecated env.events().publish with #[contractevent] macro" \
  --label "good first issue,contract,difficulty:low" \
  --body "### Summary
Soroban SDK v29 deprecates untyped \`env.events().publish()\` in favor of the strongly typed \`#[contractevent]\` macro. Refactor \`contracts/escrow_engine/src/events.rs\` to eliminate compilation deprecation warnings.

### Acceptance Criteria
- [ ] Define strongly typed event structs with \`#[contractevent]\` for \`TradeInitialized\`, \`DeliveryConfirmed\`, \`DisputeFlagged\`, \`ResolutionExecuted\`, and \`TradeRefunded\`
- [ ] Update \`events.rs\` helper functions to emit the typed events
- [ ] Verify \`cargo test\` compiles with zero compiler warnings

### Tech Stack
Rust, Soroban SDK v29"

# 4. Transaction simulation
gh issue create --repo "$REPO" \
  --title "feat(web): integrate transaction simulation and estimated gas fee breakdown in TradeCard" \
  --label "enhancement,frontend,difficulty:medium" \
  --body "### Summary
Improve UX for users executing delivery confirmations and dispute resolution by simulating the transaction beforehand via Soroban RPC and displaying estimated resource fees (CPU, memory, storage footprint).

### Acceptance Criteria
- [ ] Add simulation call in \`lib/stellar.ts\` before invoking Freighter wallet sign
- [ ] Display estimated fee breakdown in \`ResolutionModal\` and \`TradeCard\`
- [ ] Gracefully catch simulation failures and display human-readable error messages

### Tech Stack
Next.js 15, TypeScript, @stellar/stellar-sdk"

# 5. Real-time toaster
gh issue create --repo "$REPO" \
  --title "feat(web): add real-time transaction status toaster with Stellar Expert link" \
  --label "good first issue,frontend,difficulty:low" \
  --body "### Summary
When submitting transactions on-chain (trade creation, delivery confirmation, dispute escalation), provide immediate visual feedback with a progress toaster and a direct clickable link to the transaction on Stellar Expert testnet.

### Acceptance Criteria
- [ ] Implement toast notification component (using Sonner or Tailwind)
- [ ] Display transaction stages: \`Submitting...\`, \`Confirming on Stellar Testnet...\`, \`Success\`
- [ ] Include hyperlink to \`https://stellar.expert/explorer/testnet/tx/{hash}\` upon confirmation

### Tech Stack
Next.js 15, Tailwind CSS, TypeScript"

# 6. Multi-file upload
gh issue create --repo "$REPO" \
  --title "feat(web): support multi-file drag and drop with thumbnail preview in EvidenceUploader" \
  --label "frontend,difficulty:medium" \
  --body "### Summary
Agricultural disputes frequently involve multiple documents (e.g. Bill of Lading, moisture meter readout, phytosanitary certificate, photos of degraded grain). Enhance \`EvidenceUploader\` to accept multiple documents simultaneously.

### Acceptance Criteria
- [ ] Allow batch selection and drag-and-drop of multiple files (PDF, PNG, JPG)
- [ ] Display individual document previews, file sizes, and remove buttons
- [ ] Pass combined payload to \`/api/disputes/evaluate\`

### Tech Stack
Next.js 15, React, Tailwind CSS"

# 7. QR code verification
gh issue create --repo "$REPO" \
  --title "feat(agent): support automated phytosanitary certificate QR code verification" \
  --label "enhancement,ai-agent,difficulty:medium" \
  --body "### Summary
Official agricultural export certificates typically include a digital QR code or barcode linking to government registry databases (e.g. KEPHIS, USDA-APHIS). Enhance the agent to decode QR codes from evidence documents and verify certificate authenticity against mock/real registry endpoints.

### Acceptance Criteria
- [ ] Integrate QR code decoding library (e.g., \`pyzbar\` or \`opencv\`)
- [ ] Extract registry URL or certificate ID from QR payload
- [ ] Cross-reference certificate ID with mock inspection registry
- [ ] Include verification status in \`DisputeResolutionProof\` findings

### Tech Stack
Python 3.11, OpenCV/pyzbar, FastAPI"

# 8. Decentralized oracle consensus
gh issue create --repo "$REPO" \
  --title "feat(agent): implement decentralized oracle consensus bridge with multi-arbiter signing" \
  --label "enhancement,ai-agent,difficulty:high" \
  --body "### Summary
To avoid a single-point-of-failure in dispute arbitration, enable multiple independent AI agent nodes or human arbiters to submit signed resolution votes, executing on-chain resolution only when an m-of-n threshold is reached.

### Acceptance Criteria
- [ ] Support threshold signature scheme (m-of-n) for arbiters
- [ ] Update \`execute_resolution\` contract entrypoint or multi-sig wrapper to verify aggregate signatures
- [ ] Python agent utility to sign resolution payload with node's ed25519 keypair

### Tech Stack
Python, Rust Soroban SDK, Cryptography"

echo "=== All 8 planned issues successfully created! ==="
