"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { NETWORK_CONFIG } from "../../../lib/stellar";

export default function NewTradePage() {
  const router = useRouter();
  const [farmer, setFarmer] = useState("GBJ5W4M4R5VTYOUCYA3E62L6JCG37VHYK2YGB6U2NZZK3J6D22A7FARM");
  const [arbiter, setArbiter] = useState("GCS3ZJ46V3K2LL6A5Z9Z4K2M3G4N5B6V7C8X9Z0A1S2D3F4G5H6J7K8L");
  const [token, setToken] = useState(NETWORK_CONFIG.usdcAddress);
  const [amount, setAmount] = useState("15000.0");
  const [durationDays, setDurationDays] = useState("14");
  const [commodity, setCommodity] = useState("500 MT Grade-1 Non-GMO Soybeans");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (!farmer || farmer.length < 50) {
        throw new Error("Invalid Farmer Stellar address");
      }
      if (!amount || Number(amount) <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to initialize trade");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#1E4D2B] font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-[#1E4D2B]">
          <ShieldCheck className="w-6 h-6" />
          <h1 className="text-xl font-bold text-stone-900">Initiate Agricultural Escrow</h1>
        </div>
        <p className="text-xs text-stone-600">
          Fund tokens into the Soroban escrow contract. Collateral remains locked until delivery is
          confirmed or any dispute is reconciled by off-chain AI analysis.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Farmer / Seller Stellar Address
            </label>
            <input
              type="text"
              value={farmer}
              onChange={(e) => setFarmer(e.target.value)}
              required
              placeholder="G..."
              className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3.5 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Arbiter / Oracle Multi-Sig Address
            </label>
            <input
              type="text"
              value={arbiter}
              onChange={(e) => setArbiter(e.target.value)}
              required
              placeholder="G..."
              className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3.5 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Agricultural Commodity Specification
            </label>
            <input
              type="text"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              required
              placeholder="e.g. 500 MT Grade-1 Non-GMO Soybeans"
              className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Escrow Amount (USDC)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3.5 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Escrow Duration (Days)
              </label>
              <input
                type="number"
                min="1"
                max="90"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                required
                className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3.5 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 px-4 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors pt-3"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Initializing Soroban Escrow Contract...</span>
              </>
            ) : (
              <span>Deploy Escrow Contract</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
