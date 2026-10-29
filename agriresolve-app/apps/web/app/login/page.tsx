"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "../../lib/auth";
import { LeafLogo } from "../../components/LeafLogo";
import {
  Wheat,
  Building2,
  Gavel,
  ArrowRight,
  Lock,
  Mail,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsRole, loginWithWallet } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await login(email);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    loginAsRole(role);
    router.push("/dashboard");
  };

  const handleWalletLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithWallet();
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8 sm:py-12 px-4 space-y-6">
      <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center mb-1">
            <LeafLogo className="w-10 h-10 text-[#1E4D2B]" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Sign In to AgriResolve
          </h1>
          <p className="text-xs text-stone-600">
            Access your B2B agricultural escrow and dispute dashboard
          </p>
        </div>

        {/* 1-Click Fast Testnet Demo Profiles */}
        <div className="border border-[#D1D9D1] bg-[#F8FAF7] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-stone-900">1-Click Testnet Demo Access</span>
            <span className="text-[10px] bg-[#DCEBCA] text-[#1E4D2B] px-2 py-0.5 rounded font-mono font-bold">
              Instant
            </span>
          </div>
          <p className="text-[11px] text-stone-600">
            Select a role to immediately enter the dashboard with active test escrows:
          </p>

          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleDemoLogin("farmer")}
              className="flex items-center justify-between p-2.5 rounded-md border border-[#D1D9D1] bg-white hover:bg-[#EBF3EA] text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#1E4D2B] text-white flex items-center justify-center">
                  <Wheat className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 group-hover:text-[#1E4D2B]">
                    Farmer Maria Santos
                  </div>
                  <div className="text-[10px] text-stone-500">
                    GreenValley Produce Co-op • 14.5k USDC
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#1E4D2B]" />
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("buyer")}
              className="flex items-center justify-between p-2.5 rounded-md border border-[#D1D9D1] bg-white hover:bg-[#EBF3EA] text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#2D6A4F] text-white flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 group-hover:text-[#1E4D2B]">
                    Buyer John Thornton
                  </div>
                  <div className="text-[10px] text-stone-500">
                    AgriCorp Commodities Intl • 48.2k USDC
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#1E4D2B]" />
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("arbiter")}
              className="flex items-center justify-between p-2.5 rounded-md border border-[#D1D9D1] bg-white hover:bg-[#EBF3EA] text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#4E7A58] text-white flex items-center justify-center">
                  <Gavel className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 group-hover:text-[#1E4D2B]">
                    Arbiter Dr. Evelyn Vance
                  </div>
                  <div className="text-[10px] text-stone-500">
                    SGS Agro-Quality Node • Verified Arbiter
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#1E4D2B]" />
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#D1D9D1] w-full" />
          <span className="bg-white px-3 text-[11px] text-stone-500 font-medium absolute">
            or sign in with credentials
          </span>
        </div>

        {/* Email / Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1E4D2B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1E4D2B]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* Connect Stellar Wallet option */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleWalletLogin}
            disabled={isLoading}
            className="w-full py-2.5 rounded-md border border-[#D1D9D1] bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Connect Stellar / Freighter Wallet</span>
          </button>
        </div>

        {/* Signup Redirect Footer */}
        <div className="border-t border-[#D1D9D1] pt-4 text-center">
          <p className="text-xs text-stone-600">
            Don't have an account yet?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#1E4D2B] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
