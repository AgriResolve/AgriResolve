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
  ArrowLeft,
} from "lucide-react";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-[#1E4D2B] text-xs font-mono uppercase tracking-wider mb-2 font-bold">
          <BookOpen className="w-4 h-4" />
          Protocol Documentation Hub
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          AgriResolve Documentation
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
          Complete technical specifications, economic formulas, smart contract API reference, and integration guides for the Soroban-powered agricultural dispute protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 space-y-1 text-xs sticky top-24 self-start bg-white border border-[#D1D9D1] rounded-xl p-3">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection("intro")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-semibold transition-colors text-left cursor-pointer ${
                activeSection === "intro"
                  ? "bg-[#1E4D2B] text-white"
                  : "text-stone-700 hover:text-stone-950 hover:bg-stone-50"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>1. Overview & Crisis</span>
            </button>

            <button
              onClick={() => setActiveSection("state-machine")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-semibold transition-colors text-left cursor-pointer ${
                activeSection === "state-machine"
                  ? "bg-[#1E4D2B] text-white"
                  : "text-stone-700 hover:text-stone-950 hover:bg-stone-50"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>2. State Machine</span>
            </button>

            <button
              onClick={() => setActiveSection("economic-model")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-semibold transition-colors text-left cursor-pointer ${
                activeSection === "economic-model"
                  ? "bg-[#1E4D2B] text-white"
                  : "text-stone-700 hover:text-stone-950 hover:bg-stone-50"
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>3. Economic Model</span>
            </button>

            <button
              onClick={() => setActiveSection("smart-contract")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-semibold transition-colors text-left cursor-pointer ${
                activeSection === "smart-contract"
                  ? "bg-[#1E4D2B] text-white"
                  : "text-stone-700 hover:text-stone-950 hover:bg-stone-50"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>4. Contract API</span>
            </button>

            <button
              onClick={() => setActiveSection("user-guides")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-semibold transition-colors text-left cursor-pointer ${
                activeSection === "user-guides"
                  ? "bg-[#1E4D2B] text-white"
                  : "text-stone-700 hover:text-stone-950 hover:bg-stone-50"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>5. User Guides</span>
            </button>

            <button
              onClick={() => setActiveSection("developers")}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-semibold transition-colors text-left cursor-pointer ${
                activeSection === "developers"
                  ? "bg-[#1E4D2B] text-white"
                  : "text-stone-700 hover:text-stone-950 hover:bg-stone-50"
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>6. Developer SDK</span>
            </button>
          </nav>

          <div className="pt-3 border-t border-[#D1D9D1] mt-3">
            <Link
              href="/dashboard"
              className="flex items-center justify-between text-xs text-stone-700 hover:text-[#1E4D2B] font-semibold p-2 rounded-md bg-[#F8FAF7] border border-[#D1D9D1] transition-colors"
            >
              <span>Back to Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Section 1: Overview */}
          {activeSection === "intro" && (
            <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-2">1. The Agricultural Dispute Problem</h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Cross-border and domestic agricultural commodity trade in emerging markets is crippled by counterparty trust deadlock. Smallholder farmers refuse to dispatch harvest without advance guarantees, while commercial buyers refuse prepayment without physical lab inspection.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1]">
                  <div className="text-2xl font-black text-[#1E4D2B]">14%</div>
                  <div className="text-xs font-bold text-stone-900 mt-1">Post-Harvest Loss</div>
                  <p className="text-xs text-stone-600 mt-1">
                    FAO SOFA report: 14% of global food production lost between harvest and wholesale, valued at &gt;$400B.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1]">
                  <div className="text-2xl font-black text-[#2D6A4F]">&gt;$30B</div>
                  <div className="text-xs font-bold text-stone-900 mt-1">Frozen Liquidity</div>
                  <p className="text-xs text-stone-600 mt-1">
                    8% to 12% of agricultural trade volume in Sub-Saharan Africa and LatAm ties up in payment disputes annually.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1]">
                  <div className="text-2xl font-black text-[#4E7A58]">95%</div>
                  <div className="text-xs font-bold text-stone-900 mt-1">Excluded SMEs</div>
                  <p className="text-xs text-stone-600 mt-1">
                    Commercial bank Letters of Credit demand 110% cash collateral and 2-4 week cycles, locking out 95% of agricultural producers.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-3">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E4D2B]" />
                  How AgriResolve Solves This
                </h3>
                <ol className="text-xs text-stone-700 space-y-2 list-decimal list-inside leading-relaxed">
                  <li><strong className="text-stone-900">Escrow Lock:</strong> Buyer deposits USDC into the immutable Soroban smart contract.</li>
                  <li><strong className="text-stone-900">Proof of Delivery:</strong> Farmer delivers grain and submits a cryptographic SHA-256 warehouse receipt hash.</li>
                  <li><strong className="text-stone-900">Objective Inspection:</strong> If physical moisture or dockage deviates from contract tolerances, either party flags a dispute.</li>
                  <li><strong className="text-stone-900">Empirical Formula Resolution:</strong> The AI evidence engine verifies laboratory sheets and calculates standard commodity discount deductions, generating an exact balance split.</li>
                  <li><strong className="text-stone-900">Atomic Settlement:</strong> The arbitrator executes the payout on Stellar with zero stranded funds.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Section 2: State Machine */}
          {activeSection === "state-machine" && (
            <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-2">2. Escrow State Machine Mechanics</h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  The protocol enforces a deterministic finite state machine on-chain via the <code className="text-[#1E4D2B] bg-[#F8FAF7] border border-[#D1D9D1] px-1.5 py-0.5 rounded font-mono font-bold">escrow_engine.wasm</code> contract.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-[#D1D9D1] rounded-lg overflow-hidden">
                  <thead className="bg-[#F8FAF7] text-stone-900 font-bold border-b border-[#D1D9D1]">
                    <tr>
                      <th className="p-3 border-r border-[#D1D9D1]">State</th>
                      <th className="p-3 border-r border-[#D1D9D1]">Code</th>
                      <th className="p-3 border-r border-[#D1D9D1]">Trigger Entrypoint</th>
                      <th className="p-3 border-r border-[#D1D9D1]">Authorized Caller</th>
                      <th className="p-3">Next Valid States</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D1D9D1] text-stone-800">
                    <tr>
                      <td className="p-3 font-semibold border-r border-[#D1D9D1]">Funded</td>
                      <td className="p-3 font-mono border-r border-[#D1D9D1]">0</td>
                      <td className="p-3 font-mono border-r border-[#D1D9D1]">initialize_trade()</td>
                      <td className="p-3 border-r border-[#D1D9D1]">Buyer</td>
                      <td className="p-3">Delivered, Disputed, Refunded</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#1E4D2B] border-r border-[#D1D9D1]">Delivered</td>
                      <td className="p-3 font-mono border-r border-[#D1D9D1]">1</td>
                      <td className="p-3 font-mono border-r border-[#D1D9D1]">confirm_delivery()</td>
                      <td className="p-3 border-r border-[#D1D9D1]">Farmer</td>
                      <td className="p-3">Disputed, Resolved</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-amber-700 border-r border-[#D1D9D1]">Disputed</td>
                      <td className="p-3 font-mono border-r border-[#D1D9D1]">2</td>
                      <td className="p-3 font-mono border-r border-[#D1D9D1]">flag_dispute()</td>
                      <td className="p-3 border-r border-[#D1D9D1]">Buyer or Farmer</td>
                      <td className="p-3">Resolved</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-[#1E4D2B] border-r border-[#D1D9D1]">Resolved</td>
                      <td className="p-3 font-mono border-r border-[#D1D9D1]">3</td>
                      <td className="p-3 font-mono border-r border-[#D1D9D1]">execute_resolution()</td>
                      <td className="p-3 border-r border-[#D1D9D1]">Arbitrator</td>
                      <td className="p-3 text-stone-500">Terminal (None)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-stone-500 border-r border-[#D1D9D1]">Refunded</td>
                      <td className="p-3 font-mono border-r border-[#D1D9D1]">4</td>
                      <td className="p-3 font-mono border-r border-[#D1D9D1]">refund_trade()</td>
                      <td className="p-3 border-r border-[#D1D9D1]">Buyer (after expiry) / Farmer</td>
                      <td className="p-3 text-stone-500">Terminal (None)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] text-xs text-stone-700 space-y-2">
                <div className="font-bold text-stone-900">Dispute Locking Invariant</div>
                <p>
                  Once either party triggers <code className="text-amber-800 font-mono font-bold">flag_dispute()</code>, normal delivery releases and unilateral refunds are permanently locked on-chain. Funds can only leave contract custody through <code className="text-[#1E4D2B] font-mono font-bold">execute_resolution()</code> with cryptographic proof that <code className="font-mono">buyer_share + farmer_share == trade.amount</code>.
                </p>
              </div>
            </div>
          )}

          {/* Section 3: Economic Model */}
          {activeSection === "economic-model" && (
            <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-2">3. Worked Economic Model: White Maize Case Study</h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Unlike traditional binary litigation where buyers withhold 100% of an invoice for minor moisture variances, AgriResolve executes empirical standard grain trade discounts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-2 text-xs">
                  <div className="font-bold text-[#1E4D2B] text-sm">Contract Specification</div>
                  <div className="flex justify-between py-1 border-b border-[#D1D9D1] text-stone-700">
                    <span>Commodity</span>
                    <span className="font-semibold text-stone-900">Grade 2 White Maize</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#D1D9D1] text-stone-700">
                    <span>Contracted Quantity</span>
                    <span className="font-semibold text-stone-900">50.00 Metric Tons (50,000 kg)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#D1D9D1] text-stone-700">
                    <span>Contract Price</span>
                    <span className="font-semibold text-stone-900">$240.00 USDC / MT</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#D1D9D1] text-stone-700">
                    <span>Total Escrow Balance</span>
                    <span className="font-mono font-bold text-[#1E4D2B]">12,000.00 USDC</span>
                  </div>
                  <div className="flex justify-between py-1 text-stone-700">
                    <span>Moisture Baseline</span>
                    <span className="font-semibold text-stone-900">13.50% (Max: 14.00%)</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-2 text-xs">
                  <div className="font-bold text-amber-800 text-sm">Arrival Lab Inspection</div>
                  <div className="flex justify-between py-1 border-b border-[#D1D9D1] text-stone-700">
                    <span>Gross Delivered Weight</span>
                    <span className="font-medium text-amber-900">49,200 kg (-800 kg shortfall)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#D1D9D1] text-stone-700">
                    <span>Arrival Moisture</span>
                    <span className="font-medium text-amber-900">15.50% (+2.00% excess)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#D1D9D1] text-stone-700">
                    <span>Arrival Foreign Matter</span>
                    <span className="font-medium text-amber-900">2.50% (+1.00% dockage)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#D1D9D1] text-stone-700">
                    <span>Aflatoxin Concentration</span>
                    <span className="font-medium text-[#1E4D2B]">4.2 ppb (Compliant &lt;10)</span>
                  </div>
                  <div className="flex justify-between py-1 text-stone-700">
                    <span>Grain Elevator Drying Factor</span>
                    <span className="font-semibold text-stone-900">1.25x per 1% excess moisture</span>
                  </div>
                </div>
              </div>

              {/* Deductions Breakdown */}
              <div className="p-5 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-3">
                <div className="text-sm font-bold text-stone-900">Discrepancy Formula Calculation</div>
                <div className="space-y-2 text-xs text-stone-800 font-mono">
                  <div className="p-2.5 rounded bg-white border border-[#D1D9D1]">
                    1. Weight Shortfall Refund: 800 kg @ $0.24/kg = <span className="text-[#1E4D2B] font-bold">$192.00 USDC</span>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#D1D9D1]">
                    2. Artificial Drying Deduction: 2.0% excess * 1.25 = 2.50% * $11,808 delivered value = <span className="text-[#1E4D2B] font-bold">$295.20 USDC</span>
                  </div>
                  <div className="p-2.5 rounded bg-white border border-[#D1D9D1]">
                    3. Grain Cleaning Dockage: 1.0% excess foreign matter * $11,808 = <span className="text-[#1E4D2B] font-bold">$118.08 USDC</span>
                  </div>
                  <div className="p-3 rounded bg-white border border-[#D1D9D1] flex justify-between items-center text-sm">
                    <span className="text-stone-700 font-sans font-semibold">Total Buyer Refund (Deduction):</span>
                    <span className="text-amber-800 font-bold">$605.28 USDC (5.044%)</span>
                  </div>
                  <div className="p-3 rounded bg-white border border-[#1E4D2B] flex justify-between items-center text-sm">
                    <span className="text-stone-700 font-sans font-semibold">Net Farmer Compensation:</span>
                    <span className="text-[#1E4D2B] font-bold">$11,394.72 USDC (94.956%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Smart Contract */}
          {activeSection === "smart-contract" && (
            <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-2">4. Smart Contract API Reference</h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Compiled WebAssembly contract deployed at:{" "}
                  <code className="text-xs font-mono text-[#1E4D2B] bg-[#F8FAF7] border border-[#D1D9D1] px-2 py-1 rounded font-bold">
                    CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4
                  </code>
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-2">
                  <div className="font-mono text-xs text-[#1E4D2B] font-bold">
                    initialize_trade(buyer, farmer, arbiter, token, amount, expiry) -&gt; u64
                  </div>
                  <p className="text-xs text-stone-700">
                    Initializes escrow state, transfers tokens from buyer to contract address via SEP-41 SAC token client, increments trade counter, and sets state to <code className="font-bold">Funded</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-2">
                  <div className="font-mono text-xs text-[#1E4D2B] font-bold">
                    confirm_delivery(caller, escrow_id, delivery_hash: BytesN&lt;32&gt;)
                  </div>
                  <p className="text-xs text-stone-700">
                    Enforces <code className="font-bold">caller == farmer</code>. Records cryptographic SHA-256 delivery digest on-chain and updates state to <code className="font-bold">Delivered</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-2">
                  <div className="font-mono text-xs text-[#1E4D2B] font-bold">
                    flag_dispute(caller, escrow_id)
                  </div>
                  <p className="text-xs text-stone-700">
                    Permitted by either buyer or farmer. Locks the trade in <code className="text-amber-800 font-bold">Disputed</code> status, disabling unilateral withdrawals or delivery confirmation releases.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-2">
                  <div className="font-mono text-xs text-[#1E4D2B] font-bold">
                    execute_resolution(arbiter, escrow_id, buyer_share: i128, farmer_share: i128)
                  </div>
                  <p className="text-xs text-stone-700">
                    Enforces <code className="font-bold">caller == arbiter</code>. Validates <code className="font-bold">buyer_share + farmer_share == trade.amount</code> with checked arithmetic, transfers split balances atomically, and marks trade as <code className="font-bold">Resolved</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-2">
                  <div className="font-mono text-xs text-[#1E4D2B] font-bold">
                    refund_trade(caller, escrow_id)
                  </div>
                  <p className="text-xs text-stone-700">
                    Permitted by farmer at any time before delivery, or by buyer after expiry timestamp. Returns 100% of collateral to buyer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: User Guides */}
          {activeSection === "user-guides" && (
            <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-2">5. Persona User Guides</h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Operational instructions tailored for agricultural supply chain stakeholders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-3">
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#1E4D2B]" />
                    For Farmers &amp; Cooperatives
                  </h3>
                  <ul className="text-xs text-stone-700 space-y-2 list-disc list-inside leading-relaxed">
                    <li><strong className="text-stone-900">Inspect Before Dispatch:</strong> Check that trade status is <code className="font-bold text-[#1E4D2B]">Funded</code> in dApp before loading grain trucks.</li>
                    <li><strong className="text-stone-900">Take Delivery Slip:</strong> Obtain physical weighbridge ticket at destination silo.</li>
                    <li><strong className="text-stone-900">Register Hash:</strong> Click &quot;Confirm Delivery&quot; on the trade page to record proof on Stellar Testnet.</li>
                    <li><strong className="text-stone-900">Transparent Arbitration:</strong> In case of moisture dispute, upload departure moisture reading to protect against unwarranted buyer discounts.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-3">
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1E4D2B]" />
                    For Buyers &amp; Millers
                  </h3>
                  <ul className="text-xs text-stone-700 space-y-2 list-disc list-inside leading-relaxed">
                    <li><strong className="text-stone-900">Zero Prepayment Risk:</strong> Deposit purchase price in USDC into contract escrow. Funds cannot be taken without delivery confirmation.</li>
                    <li><strong className="text-stone-900">Inspection Window:</strong> Test representative samples for moisture, foreign matter, and aflatoxin.</li>
                    <li><strong className="text-stone-900">Flag Non-Compliance:</strong> Click &quot;Flag Dispute&quot; to freeze escrow if specs are violated.</li>
                    <li><strong className="text-stone-900">Automated Compensation:</strong> AI engine applies grain drying and dockage formulas to return your refund directly to your wallet.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Developer Guide */}
          {activeSection === "developers" && (
            <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-2">6. Developer &amp; SDK Guide</h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Build and interact with the AgriResolve protocol using standard Stellar libraries.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-2">
                  <div className="text-xs font-bold text-stone-900">TypeScript / Stellar SDK Simulation</div>
                  <pre className="p-3 rounded-md bg-white border border-[#D1D9D1] text-xs text-[#1E4D2B] font-mono overflow-x-auto">
{`import { rpc, Contract, nativeToScVal } from "@stellar/stellar-sdk";

const server = new rpc.Server("https://soroban-testnet.stellar.org");
const contract = new Contract("CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4");

// Read trade details without transaction fees
const tx = contract.call("get_trade", nativeToScVal(1, { type: "u64" }));
const sim = await server.simulateTransaction(tx);
console.log("Simulated Trade State:", sim.result.retval);`}
                  </pre>
                </div>

                <div className="p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] space-y-2">
                  <div className="text-xs font-bold text-stone-900">Local Contract Compilation &amp; Unit Tests</div>
                  <pre className="p-3 rounded-md bg-white border border-[#D1D9D1] text-xs text-stone-800 font-mono overflow-x-auto">
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
