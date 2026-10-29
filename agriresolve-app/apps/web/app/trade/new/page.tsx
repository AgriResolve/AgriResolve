"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../lib/auth";
import { ArrowLeft, ShieldCheck, AlertCircle, Loader2, Lock } from "lucide-react";
import { NETWORK_CONFIG } from "../../../lib/stellar";

export default function NewTradePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [farmer, setFarmer] = useState("GBJ5W4M4R5VTYOUCYA3E62L6JCG37VHYK2YGB6U2NZZK3J6D22A7FARM");
  const [arbiter, setArbiter] = useState("GCS3ZJ46V3K2LL6A5Z9Z4K2M3G4N5B6V7C8X9Z0A1S2D3F4G5H6J7K8L");
  const [token, setToken] = useState(NETWORK_CONFIG.usdcAddress);
  const [amount, setAmount] = useState("15000.0");
  const [durationDays, setDurationDays] = useState("14");
  const [commodity, setCommodity] = useState("500 MT Grade-1 Non-GMO Soybeans");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Authentication guard
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?redirect=/trade/new");
    }
  }, [user, isLoading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (!farmer || farmer.length < 20) {
        throw new Error("Invalid Farmer address");
      }
      if (!amount || Number(amount) <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      await new Promise((resolve) => setTimeout(resolve, 1200));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to initialize trade");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-3">
        <Loader2 className="w-8 h-8 text-[#1E4D2B] animate-spin" />
        <p className="text-xs text-stone-600 font-medium">Verifying credentials...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="bg-white border border-[#D1D9D1] rounded-2xl p-8 text-center space-y-4 shadow-none">
          <div className="w-12 h-12 rounded-full bg-[#E4EDE2] text-[#1E4D2B] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">
            Sign In Required
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            You must be signed in to initiate a new secure agricultural deal.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <Link
              href="/login?redirect=/trade/new"
              className="w-full py-2.5 rounded-lg bg-[#1E4D2B] hover:bg-[#163820] text-white text-xs font-semibold transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="w-full py-2.5 rounded-lg border border-[#CAD8C8] bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
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

      <div className="bg-white border border-[#D1D9D1] rounded-2xl p-6 sm:p-8 space-y-6 shadow-none">
        <div className="flex items-center gap-2 text-[#1E4D2B]">
          <ShieldCheck className="w-6 h-6" />
          <h1 className="text-xl font-bold text-stone-900">Initiate Protected Farm Deal</h1>
        </div>
        <p className="text-xs text-stone-600">
          Place funds into secure holding. Collateral remains locked until produce delivery is
          confirmed or any dispute is settled with verified proof.
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
              Farmer / Seller Digital Address
            </label>
            <input
              type="text"
              value={farmer}
              onChange={(e) => setFarmer(e.target.value)}
              required
              className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Commodity Description
            </label>
            <input
              type="text"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              required
              className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Holding Amount (USDC)
              </label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Inspection Window (Days)
              </label>
              <input
                type="number"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                required
                min={1}
                max={90}
                className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-lg bg-[#1E4D2B] hover:bg-[#173B21] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-none"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Securing Funds in Holding...</span>
                </>
              ) : (
                <span>Fund Escrow &amp; Lock Deal</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
