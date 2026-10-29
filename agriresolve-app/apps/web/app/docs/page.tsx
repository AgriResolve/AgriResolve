"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Scale,
  Cpu,
  Code2,
  Users,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  FileCode,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");

  return (
    <div className="max-w-7xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-8 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          Protocol Documentation Hub
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          AgriResolve Documentation
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-3xl">
          Complete technical specifications, economic formulas, smart contract API reference, and integration guides for the Soroban-powered agricultural dispute protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 space-y-1 text-sm sticky top-24 self-start">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection("intro")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors text-left ${
                activeSection === "intro"
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <Scale className="w-4 h-4" />
              1. Overview & FAO Crisis
            </button>

            <button
              onClick={() => setActiveSection("state-machine")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors text-left ${
                activeSection === "state-machine"
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <Cpu className="w-4 h-4" />
              2. Protocol State Machine
            </button>

            <button
              onClick={() => setActiveSection("economic-model")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors text-left ${
                activeSection === "economic-model"
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <DollarSign className="w-4 h-4" />
              3. Worked Economic Model
            </button>

            <button
              onClick={() => setActiveSection("smart-contract")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors text-left ${
                activeSection === "smart-contract"
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <FileCode className="w-4 h-4" />
              4. Soroban API Reference
            </button>

            <button
              onClick={() => setActiveSection("user-guides")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors text-left ${
                activeSection === "user-guides"
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <Users className="w-4 h-4" />
              5. Role Guides (Farmer / Buyer)
            </button>

            <button
              onClick={() => setActiveSection("developers")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors text-left ${
                activeSection === "developers"
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <Code2 className="w-4 h-4" />
              6. Developer & SDK Guide
            </button>
          </nav>

          <div className="pt-6 border-t border-zinc-800/80 mt-6 space-y-2">
            <a
              href="https://stellar.expert/explorer/testnet/contract/CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between text-xs text-zinc-400 hover:text-emerald-400 transition-colors p-2 rounded-lg bg-zinc-900/60 border border-zinc-800"
            >
              <span>Testnet Contract</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/HassanKorey/Agrires"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between text-xs text-zinc-400 hover:text-emerald-400 transition-colors p-2 rounded-lg bg-zinc-900/60 border border-zinc-800"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-10">
          {/* Section 1: Overview */}
          {activeSection === "intro" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">1. The Agricultural Dispute Problem</h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Cross-border and domestic agricultural commodity trade in emerging markets is crippled by counterparty trust deadlock. Smallholder farmers refuse to dispatch harvest without advance guarantees, while commercial buyers and feed millers refuse prepayment without physical lab inspection.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <div className="text-2xl font-black text-emerald-400">14%</div>
                  <div className="text-xs font-semibold text-zinc-200 mt-1">Post-Harvest Loss</div>
                  <p className="text-xs text-zinc-400 mt-2">
                    FAO SOFA report: 14% of global food production lost between harvest and wholesale, valued at &gt;$400B.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <div className="text-2xl font-black text-amber-400">&gt;$30B</div>
                  <div className="text-xs font-semibold text-zinc-200 mt-1">Frozen Liquidity</div>
                  <p className="text-xs text-zinc-400 mt-2">
                    8% to 12% of agricultural trade volume in Sub-Saharan Africa and LatAm ties up in payment disputes annually.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <div className="text-2xl font-black text-blue-400">95%</div>
                  <div className="text-xs font-semibold text-zinc-200 mt-1">Excluded SMEs</div>
                  <p className="text-xs text-zinc-400 mt-2">
                    Commercial bank Letters of Credit demand 110% cash collateral and 2-4 week cycles, locking out 95% of agricultural producers.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  How AgriResolve Solves This
                </h3>
                <ol className="text-xs text-zinc-300 space-y-2 list-decimal list-inside leading-relaxed">
                  <li><strong className="text-white">Escrow Lock:</strong> Buyer deposits USDC into the immutable Soroban smart contract.</li>
                  <li><strong className="text-white">Proof of Delivery:</strong> Farmer delivers grain and submits a cryptographic SHA-256 warehouse receipt hash.</li>
                  <li><strong className="text-white">Objective Inspection:</strong> If physical moisture or dockage deviates from contract tolerances, either party flags a dispute.</li>
                  <li><strong className="text-white">Empirical Formula Resolution:</strong> The AI evidence engine verifies laboratory sheets and calculates standard commodity discount deductions, generating an exact balance split.</li>
                  <li><strong className="text-white">Atomic Settlement:</strong> The arbitrator executes the payout on Stellar with zero stranded funds.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Section 2: State Machine */}
          {activeSection === "state-machine" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">2. Escrow State Machine Mechanics</h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  The protocol enforces a deterministic finite state machine on-chain via the <code className="text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded">escrow_engine.wasm</code> contract.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                  <thead className="bg-zinc-900 text-zinc-300">
                    <tr>
                      <th className="p-3 border-b border-zinc-800">State</th>
                      <th className="p-3 border-b border-zinc-800">Code</th>
                      <th className="p-3 border-b border-zinc-800">Trigger Entrypoint</th>
                      <th className="p-3 border-b border-zinc-800">Authorized Caller</th>
                      <th className="p-3 border-b border-zinc-800">Next Valid States</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300 bg-zinc-950/40">
                    <tr>
                      <td className="p-3 font-semibold text-blue-400">Funded</td>
                      <td className="p-3 font-mono">0</td>
                      <td className="p-3 font-mono">initialize_trade()</td>
                      <td className="p-3">Buyer</td>
                      <td className="p-3">Delivered, Disputed, Refunded</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-emerald-400">Delivered</td>
                      <td className="p-3 font-mono">1</td>
                      <td className="p-3 font-mono">confirm_delivery()</td>
                      <td className="p-3">Farmer</td>
                      <td className="p-3">Disputed, Resolved</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-amber-400">Disputed</td>
                      <td className="p-3 font-mono">2</td>
                      <td className="p-3 font-mono">flag_dispute()</td>
                      <td className="p-3">Buyer or Farmer</td>
                      <td className="p-3">Resolved</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-purple-400">Resolved</td>
                      <td className="p-3 font-mono">3</td>
                      <td className="p-3 font-mono">execute_resolution()</td>
                      <td className="p-3">Arbitrator</td>
                      <td className="p-3 text-zinc-500">Terminal (None)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-zinc-400">Refunded</td>
                      <td className="p-3 font-mono">4</td>
                      <td className="p-3 font-mono">refund_trade()</td>
                      <td className="p-3">Buyer (after expiry) / Farmer</td>
                      <td className="p-3 text-zinc-500">Terminal (None)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-2">
                <div className="font-semibold text-white">Dispute Locking Invariant</div>
                <p>
                  Once either party triggers <code className="text-amber-400">flag_dispute()</code>, normal delivery releases and unilateral refunds are permanently locked on-chain. Funds can only leave contract custody through <code className="text-purple-400">execute_resolution()</code> with cryptographic proof that <code className="text-emerald-400">buyer_share + farmer_share == trade.amount</code>.
                </p>
              </div>
            </div>
          )}

          {/* Section 3: Economic Model */}
          {activeSection === "economic-model" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">3. Worked Economic Model: White Maize Case Study</h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Unlike traditional binary litigation where buyers withhold 100% of an invoice for minor moisture variances, AgriResolve executes empirical standard grain trade discounts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs">
                  <div className="font-semibold text-emerald-300 text-sm">Contract Specification</div>
                  <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
                    <span>Commodity</span>
                    <span className="font-medium text-white">Grade 2 White Maize</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
                    <span>Contracted Quantity</span>
                    <span className="font-medium text-white">50.00 Metric Tons (50,000 kg)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
                    <span>Contract Price</span>
                    <span className="font-medium text-white">$240.00 USDC / MT</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
                    <span>Total Escrow Balance</span>
                    <span className="font-mono font-bold text-emerald-400">12,000.00 USDC</span>
                  </div>
                  <div className="flex justify-between py-1 text-zinc-300">
                    <span>Moisture Baseline</span>
                    <span className="font-medium text-white">13.50% (Max: 14.00%)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs">
                  <div className="font-semibold text-amber-300 text-sm">Arrival Lab Inspection</div>
                  <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
                    <span>Gross Delivered Weight</span>
                    <span className="font-medium text-amber-400">49,200 kg (-800 kg shortfall)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
                    <span>Arrival Moisture</span>
                    <span className="font-medium text-amber-400">15.50% (+2.00% excess)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
                    <span>Arrival Foreign Matter</span>
                    <span className="font-medium text-amber-400">2.50% (+1.00% dockage)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800 text-zinc-300">
                    <span>Aflatoxin Concentration</span>
                    <span className="font-medium text-emerald-400">4.2 ppb (Compliant &lt;10)</span>
                  </div>
                  <div className="flex justify-between py-1 text-zinc-300">
                    <span>Grain Elevator Drying Factor</span>
                    <span className="font-medium text-white">1.25x per 1% excess moisture</span>
                  </div>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="text-sm font-semibold text-white">Discrepancy Formula Calculation</div>
                <div className="space-y-2 text-xs text-zinc-300 font-mono">
                  <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800/80">
                    1. Weight Shortfall Refund: 800 kg @ $0.24/kg = <span className="text-emerald-400">$192.00 USDC</span>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800/80">
                    2. Artificial Drying Deduction: 2.0% excess * 1.25 = 2.50% * $11,808 delivered value = <span className="text-emerald-400">$295.20 USDC</span>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800/80">
                    3. Grain Cleaning Dockage: 1.0% excess foreign matter * $11,808 = <span className="text-emerald-400">$118.08 USDC</span>
                  </div>
                  <div className="p-3 rounded bg-zinc-950 border border-emerald-500/30 flex justify-between items-center text-sm">
                    <span className="text-zinc-300 font-sans font-semibold">Total Buyer Refund (Deduction):</span>
                    <span className="text-amber-400 font-bold">$605.28 USDC (5.044%)</span>
                  </div>
                  <div className="p-3 rounded bg-zinc-950 border border-emerald-500/30 flex justify-between items-center text-sm">
                    <span className="text-zinc-300 font-sans font-semibold">Net Farmer Compensation:</span>
                    <span className="text-emerald-400 font-bold">$11,394.72 USDC (94.956%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Smart Contract */}
          {activeSection === "smart-contract" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">4. Smart Contract API Reference</h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Compiled WebAssembly contract deployed at:{" "}
                  <code className="text-xs font-mono text-emerald-400 bg-zinc-900 px-2 py-1 rounded">
                    CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4
                  </code>
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="font-mono text-sm text-emerald-400 font-semibold">
                    initialize_trade(buyer, farmer, arbiter, token, amount, expiry) -&gt; u64
                  </div>
                  <p className="text-xs text-zinc-300">
                    Initializes escrow state, transfers tokens from buyer to contract address via SEP-41 SAC token client, increments trade counter, and sets state to <code className="text-blue-400">Funded</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="font-mono text-sm text-emerald-400 font-semibold">
                    confirm_delivery(caller, escrow_id, delivery_hash: BytesN&lt;32&gt;)
                  </div>
                  <p className="text-xs text-zinc-300">
                    Enforces <code className="text-white">caller == farmer</code>. Records cryptographic SHA-256 delivery digest on-chain and updates state to <code className="text-emerald-400">Delivered</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="font-mono text-sm text-emerald-400 font-semibold">
                    flag_dispute(caller, escrow_id)
                  </div>
                  <p className="text-xs text-zinc-300">
                    Permitted by either buyer or farmer. Locks the trade in <code className="text-amber-400">Disputed</code> status, disabling unilateral withdrawals or delivery confirmation releases.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="font-mono text-sm text-emerald-400 font-semibold">
                    execute_resolution(arbiter, escrow_id, buyer_share: i128, farmer_share: i128)
                  </div>
                  <p className="text-xs text-zinc-300">
                    Enforces <code className="text-white">caller == arbiter</code>. Validates <code className="text-white">buyer_share + farmer_share == trade.amount</code> with checked arithmetic, transfers split balances atomically, and marks trade as <code className="text-purple-400">Resolved</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="font-mono text-sm text-emerald-400 font-semibold">
                    refund_trade(caller, escrow_id)
                  </div>
                  <p className="text-xs text-zinc-300">
                    Permitted by farmer at any time before delivery, or by buyer after expiry timestamp. Returns 100% of collateral to buyer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: User Guides */}
          {activeSection === "user-guides" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">5. Persona User Guides</h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Operational instructions tailored for agricultural stakeholders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    For Farmers &amp; Cooperatives
                  </h3>
                  <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
                    <li><strong className="text-white">Inspect Before Dispatch:</strong> Check that trade status is <code className="text-blue-400">Funded</code> in dApp before loading grain trucks.</li>
                    <li><strong className="text-white">Take Delivery Slip:</strong> Obtain physical weighbridge ticket at destination silo.</li>
                    <li><strong className="text-white">Register Hash:</strong> Click &quot;Confirm Delivery&quot; on the trade page to record proof on Stellar Testnet.</li>
                    <li><strong className="text-white">Transparent Arbitration:</strong> In case of moisture dispute, upload departure moisture reading to protect against unwarranted buyer discounts.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    For Buyers &amp; Millers
                  </h3>
                  <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
                    <li><strong className="text-white">Zero Prepayment Risk:</strong> Deposit purchase price in USDC into contract escrow. Funds cannot be taken without delivery confirmation.</li>
                    <li><strong className="text-white">Inspection Window:</strong> Test representative samples for moisture, foreign matter, and aflatoxin.</li>
                    <li><strong className="text-white">Flag Non-Compliance:</strong> Click &quot;Flag Dispute&quot; to freeze escrow if specs are violated.</li>
                    <li><strong className="text-white">Automated Compensation:</strong> AI engine applies grain drying and dockage formulas to return your refund directly to your wallet.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Developer Guide */}
          {activeSection === "developers" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">6. Developer &amp; SDK Guide</h2>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Build and interact with the AgriResolve protocol using standard Stellar libraries.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="text-xs font-semibold text-zinc-200">TypeScript / Stellar SDK Simulation</div>
                  <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-emerald-300 font-mono overflow-x-auto">
{`import { rpc, Contract, nativeToScVal } from "@stellar/stellar-sdk";

const server = new rpc.Server("https://soroban-testnet.stellar.org");
const contract = new Contract("CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4");

// Read trade details without transaction fees
const tx = contract.call("get_trade", nativeToScVal(1, { type: "u64" }));
const sim = await server.simulateTransaction(tx);
console.log("Simulated Trade State:", sim.result.retval);`}
                  </pre>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <div className="text-xs font-semibold text-zinc-200">Local Contract Compilation &amp; Unit Tests</div>
                  <pre className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono overflow-x-auto">
{`# 1. Run unit test suite (11 unit tests covering state machine & invariants)
cd agriresolve-contract && cargo test

# 2. Build optimized release Wasm (<10 KB)
stellar contract build
# Output: target/wasm32v1-none/release/escrow_engine.wasm`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
