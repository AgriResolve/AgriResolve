"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "../lib/auth";
import { LeafLogo } from "../components/LeafLogo";
import {
  FileText,
  ShieldCheck,
  Check,
  ExternalLink,
  ArrowRight,
  Upload,
  Copy,
  Users,
  Building2,
  Wheat,
  Gavel,
  CheckCircle2,
  FileUp,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { user, loginAsRole } = useAuth();

  const handleQuickRole = (role: UserRole) => {
    loginAsRole(role);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* ========================================================= */}
      {/* 1. HERO SECTION (Flat Utilitarian White Panel)            */}
      {/* ========================================================= */}
      <section className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-10 space-y-6">
        <div className="inline-block bg-[#DCEBCA] text-[#1E4D2B] text-xs font-bold px-3 py-1 rounded">
          B2B Agricultural Escrow Protocol • Stellar Soroban
        </div>

        <div className="space-y-3 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Trust-Minimized Agricultural Trade & Automated Dispute Resolution
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
            AgriResolve replaces cumbersome documentary letters of credit with programmable Soroban
            escrows on Stellar. Agricultural buyers lock USDC collateral; producers verify shipment;
            and automated AI inspection oracles adjudicate moisture, weight, and grade disputes in seconds.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard"
            className="bg-[#1E4D2B] hover:bg-[#173B21] text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {!user && (
            <>
              <Link
                href="/login"
                className="bg-white hover:bg-stone-50 border border-[#D1D9D1] text-stone-900 font-semibold text-sm px-6 py-3 rounded-md transition-colors cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-[#2D6A4F] hover:bg-[#23533E] text-white font-semibold text-sm px-6 py-3 rounded-md transition-colors cursor-pointer"
              >
                Create Account
              </Link>
            </>
          )}

          <Link
            href="/docs"
            className="text-stone-700 hover:text-stone-950 font-medium text-sm px-4 py-3 transition-colors"
          >
            Protocol Docs &rarr;
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. INSTANT TESTNET 1-CLICK ROLES SELECTOR                 */}
      {/* ========================================================= */}
      <section className="bg-white border border-[#D1D9D1] rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D1D9D1] pb-3">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Interactive Testnet Sandbox
            </h2>
            <p className="text-xs text-stone-600">
              Select any role to immediately test the live escrow workflow on Stellar Testnet:
            </p>
          </div>
          <span className="text-[11px] font-mono font-medium text-stone-600 bg-[#E4EDE2] px-2.5 py-1 rounded">
            Network: Stellar Testnet (Soroban v22)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Farmer Card */}
          <button
            onClick={() => handleQuickRole("farmer")}
            className="p-4 rounded-lg border border-[#D1D9D1] bg-[#F8FAF7] hover:bg-[#EBF3EA] text-left transition-colors flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#1E4D2B] text-white flex items-center justify-center flex-shrink-0">
                <Wheat className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 group-hover:text-[#1E4D2B]">
                  Farmer: Maria Santos
                </div>
                <div className="text-[11px] text-stone-600">
                  GreenValley Produce Co-op
                </div>
              </div>
            </div>
            <div className="text-[11px] text-stone-500 font-mono">
              GBJ5...FARM • 14,500 USDC
            </div>
            <div className="text-xs font-semibold text-[#1E4D2B] flex items-center gap-1">
              <span>Sign in as Farmer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Buyer Card */}
          <button
            onClick={() => handleQuickRole("buyer")}
            className="p-4 rounded-lg border border-[#D1D9D1] bg-[#F8FAF7] hover:bg-[#EBF3EA] text-left transition-colors flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#2D6A4F] text-white flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 group-hover:text-[#1E4D2B]">
                  Buyer: John Thornton
                </div>
                <div className="text-[11px] text-stone-600">
                  AgriCorp Commodities Intl
                </div>
              </div>
            </div>
            <div className="text-[11px] text-stone-500 font-mono">
              GAHY...O6SS • 48,200 USDC
            </div>
            <div className="text-xs font-semibold text-[#1E4D2B] flex items-center gap-1">
              <span>Sign in as Buyer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Arbiter Card */}
          <button
            onClick={() => handleQuickRole("arbiter")}
            className="p-4 rounded-lg border border-[#D1D9D1] bg-[#F8FAF7] hover:bg-[#EBF3EA] text-left transition-colors flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#4E7A58] text-white flex items-center justify-center flex-shrink-0">
                <Gavel className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 group-hover:text-[#1E4D2B]">
                  Arbiter: Dr. Evelyn Vance
                </div>
                <div className="text-[11px] text-stone-600">
                  SGS Quality Inspection Node
                </div>
              </div>
            </div>
            <div className="text-[11px] text-stone-500 font-mono">
              GCS3...J7K8L • 3,800 USDC
            </div>
            <div className="text-xs font-semibold text-[#1E4D2B] flex items-center gap-1">
              <span>Sign in as Arbiter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PROTOCOL INTERFACE SPECIFICATION & ARCHITECTURE        */}
      {/* ========================================================= */}
      <section className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#D1D9D1] pb-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Protocol Specifications & Smart Contract Configuration
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Strict deterministic state machine executing on Soroban WASM runtime
            </p>
          </div>
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4D2B] hover:underline"
          >
            <span>Open In Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#D1D9D1]">
            <thead className="bg-[#F8FAF7] border-b border-[#D1D9D1] text-stone-700 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 border-r border-[#D1D9D1]">Component</th>
                <th className="py-3 px-4 border-r border-[#D1D9D1]">Value / Contract Reference</th>
                <th className="py-3 px-4">Deterministic Rules</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D1D9D1] text-stone-800">
              <tr>
                <td className="py-3 px-4 font-semibold border-r border-[#D1D9D1] bg-[#F8FAF7]">
                  Soroban Contract ID
                </td>
                <td className="py-3 px-4 font-mono font-medium border-r border-[#D1D9D1]">
                  CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4
                </td>
                <td className="py-3 px-4 text-stone-600">
                  Holds locked collateral. Implements initialize_trade, confirm_delivery, flag_dispute, resolve, and refund.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold border-r border-[#D1D9D1] bg-[#F8FAF7]">
                  Settlement Currency
                </td>
                <td className="py-3 px-4 font-mono font-medium border-r border-[#D1D9D1]">
                  CCQGOTGN6HTQE74XYERYSYVU57T5NPYWV5DLCROMB56OXTV6RSO6KIGK
                </td>
                <td className="py-3 px-4 text-stone-600">
                  Circle USDC on Stellar Testnet. 7-decimal stroops accounting. Zero slippage or volatility.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold border-r border-[#D1D9D1] bg-[#F8FAF7]">
                  Escrow Stepper Lifecycle
                </td>
                <td className="py-3 px-4 font-medium border-r border-[#D1D9D1]">
                  Funded &rarr; Delivered &rarr; Disputed &rarr; Resolved / Refunded
                </td>
                <td className="py-3 px-4 text-stone-600">
                  Completed steps lock cryptographically. Disputed step halts automatic payout and requests AI oracle audit.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold border-r border-[#D1D9D1] bg-[#F8FAF7]">
                  AI Evidence Verification
                </td>
                <td className="py-3 px-4 font-medium border-r border-[#D1D9D1]">
                  SHA-256 Digest Matching & Multimodal Analysis
                </td>
                <td className="py-3 px-4 text-stone-600">
                  Parses laboratory moisture (max 14.0%), grain foreign matter (&lt;1.5%), and phytosanitary seal certification.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold border-r border-[#D1D9D1] bg-[#F8FAF7]">
                  Dispute Resolution Rule
                </td>
                <td className="py-3 px-4 font-medium border-r border-[#D1D9D1]">
                  Continuous Pro-Rata Settlement Split
                </td>
                <td className="py-3 px-4 text-stone-600">
                  Fair payout distribution: BuyerShare = Total &times; (ActualMoisture - MaxMoisture) / MaxTolerance.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-white text-xs font-semibold transition-colors"
          >
            <span>Proceed to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
