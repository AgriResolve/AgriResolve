"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, UserRole } from "../../lib/auth";
import { LeafLogo } from "../../components/LeafLogo";
import {
  Wheat,
  Building2,
  Gavel,
  ArrowRight,
  Lock,
  Mail,
  User,
  Globe,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup } = useAuth();

  const [role, setRole] = useState<UserRole>("farmer");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("United States");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const roleParam = searchParams.get("role") as UserRole;
    if (roleParam && ["farmer", "buyer", "arbiter"].includes(roleParam)) {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await signup({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        companyName: companyName.trim() || undefined,
        country,
        walletAddress: walletAddress.trim() || undefined,
      });

      setIsSuccess(true);
      // Seamlessly navigate into dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (err: any) {
      setError(err?.message || "Failed to create account. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 sm:py-12 px-4 space-y-6">
      <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center mb-1">
            <LeafLogo className="w-10 h-10 text-[#1E4D2B]" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Create an AgriResolve Account
          </h1>
          <p className="text-xs text-stone-600">
            Sign up to access your tailored agricultural escrow and dispute dashboard
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#DCEBCA] text-[#1E4D2B] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">
              Account Created Successfully!
            </h3>
            <p className="text-xs text-stone-600">
              Initializing your secure profile and redirecting to your dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Role Selector Tabs */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-2">
                Select Your Role in the Supply Chain
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("farmer")}
                  className={`p-3 rounded-md border text-left transition-colors cursor-pointer flex flex-col gap-1.5 ${
                    role === "farmer"
                      ? "bg-[#1E4D2B] text-white border-[#1E4D2B]"
                      : "bg-[#F8FAF7] text-stone-700 border-[#D1D9D1] hover:bg-[#EBF3EA]"
                  }`}
                >
                  <Wheat className="w-4 h-4" />
                  <div className="text-xs font-bold">Farmer / Seller</div>
                  <div
                    className={`text-[10px] ${
                      role === "farmer" ? "text-stone-200" : "text-stone-500"
                    }`}
                  >
                    Agricultural Producer
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`p-3 rounded-md border text-left transition-colors cursor-pointer flex flex-col gap-1.5 ${
                    role === "buyer"
                      ? "bg-[#1E4D2B] text-white border-[#1E4D2B]"
                      : "bg-[#F8FAF7] text-stone-700 border-[#D1D9D1] hover:bg-[#EBF3EA]"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <div className="text-xs font-bold">Buyer / Importer</div>
                  <div
                    className={`text-[10px] ${
                      role === "buyer" ? "text-stone-200" : "text-stone-500"
                    }`}
                  >
                    Commodity Processor
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("arbiter")}
                  className={`p-3 rounded-md border text-left transition-colors cursor-pointer flex flex-col gap-1.5 ${
                    role === "arbiter"
                      ? "bg-[#1E4D2B] text-white border-[#1E4D2B]"
                      : "bg-[#F8FAF7] text-stone-700 border-[#D1D9D1] hover:bg-[#EBF3EA]"
                  }`}
                >
                  <Gavel className="w-4 h-4" />
                  <div className="text-xs font-bold">Arbiter Node</div>
                  <div
                    className={`text-[10px] ${
                      role === "arbiter" ? "text-stone-200" : "text-stone-500"
                    }`}
                  >
                    Inspection Lab / Oracle
                  </div>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maria Santos"
                      required
                      className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1E4D2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Company / Cooperative Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. GreenValley Co-op"
                      className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1E4D2B]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Business Email *
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
                    Country of Operation
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
                    >
                      <option value="United States">United States</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Create Password * <span className="font-normal text-stone-500">(minimum 6 characters)</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1E4D2B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Account Wallet Address <span className="font-normal text-stone-500">(Optional — auto-generated if blank)</span>
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="G... (Leave blank to generate a secure digital address)"
                  className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3 py-2 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1E4D2B]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer pt-2.5"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Creating Your Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account &amp; Access Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="border-t border-[#D1D9D1] pt-4 text-center">
              <p className="text-xs text-stone-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#1E4D2B] hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-xl mx-auto py-12 text-center text-xs text-stone-600">
          Loading registration...
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
