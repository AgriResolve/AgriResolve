"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../lib/auth";
import { LeafLogo } from "../../components/LeafLogo";
import {
  Wheat,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

type PublicRole = "farmer" | "buyer";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup } = useAuth();

  const [role, setRole] = useState<PublicRole>("farmer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("United States (Midwest / Corn Belt)");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const roleParam = searchParams.get("role") as PublicRole;
    if (roleParam && (roleParam === "farmer" || roleParam === "buyer")) {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please provide your full name or business name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid business email address.");
      return;
    }
    if (!phone.trim()) {
      setError("Please provide a contact phone number.");
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
        phone: phone.trim(),
        password,
        role,
        companyName: name.trim(),
        country: location,
        walletAddress: walletAddress.trim() || undefined,
      });

      setIsSuccess(true);
      // Seamlessly navigate to dashboard
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
      <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6 shadow-none">
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
            {/* 2-Column Role Selector Grid */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-2">
                Select Your Role in the Supply Chain
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 1: Farmer / Seller */}
                <button
                  type="button"
                  onClick={() => setRole("farmer")}
                  className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer flex flex-col gap-1.5 ${
                    role === "farmer"
                      ? "bg-[#1E4D2B] text-white border-[#1E4D2B]"
                      : "bg-[#F8FAF7] text-stone-700 border-[#D1D9D1] hover:bg-[#EBF3EA]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Wheat className="w-5 h-5" />
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        role === "farmer"
                          ? "bg-white/20 text-white"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      Seller
                    </span>
                  </div>
                  <div className="text-xs font-bold mt-1">Farmer / Seller</div>
                  <div
                    className={`text-[11px] ${
                      role === "farmer" ? "text-stone-200" : "text-stone-500"
                    }`}
                  >
                    Agricultural Producer
                  </div>
                </button>

                {/* Option 2: Buyer / Importer */}
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer flex flex-col gap-1.5 ${
                    role === "buyer"
                      ? "bg-[#1E4D2B] text-white border-[#1E4D2B]"
                      : "bg-[#F8FAF7] text-stone-700 border-[#D1D9D1] hover:bg-[#EBF3EA]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Building2 className="w-5 h-5" />
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        role === "buyer"
                          ? "bg-white/20 text-white"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      Buyer
                    </span>
                  </div>
                  <div className="text-xs font-bold mt-1">Buyer / Importer</div>
                  <div
                    className={`text-[11px] ${
                      role === "buyer" ? "text-stone-200" : "text-stone-500"
                    }`}
                  >
                    Commodity Processor
                  </div>
                </button>
              </div>
            </div>

            {/* Form Fields: Centered cleanly beneath role selector */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name or Business Name */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Full Name or Business Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maria Santos or GreenValley Co-op"
                    required
                    className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1E4D2B]"
                  />
                </div>
              </div>

              {/* Email Address & Phone Number (Responsive 2-column on sm, 1-col on mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Email Address *
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
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 234-5678"
                      required
                      className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1E4D2B]"
                    />
                  </div>
                </div>
              </div>

              {/* Farm / Business Location Dropdown */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Farm / Business Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
                  >
                    <option value="United States (Midwest / Corn Belt)">
                      United States (Midwest / Corn Belt)
                    </option>
                    <option value="Brazil (Mato Grosso / Cerrado)">
                      Brazil (Mato Grosso / Cerrado)
                    </option>
                    <option value="Argentina (Pampas Agricultural Hub)">
                      Argentina (Pampas Agricultural Hub)
                    </option>
                    <option value="Netherlands (Rotterdam Agri-Trading Hub)">
                      Netherlands (Rotterdam Agri-Trading Hub)
                    </option>
                    <option value="Canada (Prairie Grain Corridor)">
                      Canada (Prairie Grain Corridor)
                    </option>
                    <option value="Ukraine (Black Sea Basin)">
                      Ukraine (Black Sea Basin)
                    </option>
                    <option value="Nigeria (Grain &amp; Cassava Corridor)">
                      Nigeria (Grain &amp; Cassava Corridor)
                    </option>
                    <option value="Kenya (Rift Valley Produce Region)">
                      Kenya (Rift Valley Produce Region)
                    </option>
                    <option value="India (Punjab / Northern Agri-Zone)">
                      India (Punjab / Northern Agri-Zone)
                    </option>
                    <option value="Australia (Western Grain Belt)">
                      Australia (Western Grain Belt)
                    </option>
                    <option value="Other Global Agricultural Region">
                      Other Global Agricultural Region
                    </option>
                  </select>
                </div>
              </div>

              {/* Password */}
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

              {/* Account Digital Address (Optional) */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Account Digital Key Address <span className="font-normal text-stone-500">(Optional — auto-generated if blank)</span>
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="G... (Leave blank to generate a secure digital address)"
                  className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3 py-2 text-xs font-mono text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#1E4D2B]"
                />
              </div>

              {/* Primary Submission Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-md bg-[#1E4D2B] hover:bg-[#163820] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-none"
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
              </div>
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
