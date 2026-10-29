"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import { LeafLogo } from "../../components/LeafLogo";
import { shortenAddress, EscrowState } from "../../lib/stellar";
import {
  FileText,
  Users,
  Bookmark,
  Globe,
  LogOut,
  ChevronDown,
  MoreHorizontal,
  MoreVertical,
  Check,
  RotateCcw,
  Upload,
  Copy,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  ArrowUp,
  Lock,
  ExternalLink,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, logout, switchRole } = useAuth();
  const [currentStep, setCurrentStep] = useState<EscrowState>(EscrowState.Disputed);
  const [copied, setCopied] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string>(
    "GAHYU5YGHEOI3MKA2MLW2O46YY74SHBLC4JTVGWN36LH7LL7FFF4O6SS"
  );
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; size: string; hash: string; status: string; timestamp: string }>
  >([
    {
      name: "SGS_Moisture_Report_7842.pdf",
      size: "2.4 MB",
      hash: "84f9cfa549c318847d1cede87688c73c...5565",
      status: "Verified 14.8%",
      timestamp: "2 hours ago",
    },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [disputeMessage, setDisputeMessage] = useState<string | null>(null);

  // Authentication guard: Only signed in / registered users can access the dashboard
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?redirect=/dashboard");
    }
  }, [user, isLoading, router]);

  // Sync user's wallet address if provided
  useEffect(() => {
    if (user?.walletAddress) {
      setWalletAddress(user.walletAddress);
    }
  }, [user]);

  const copyTradeId = () => {
    navigator.clipboard.writeText("AGRI-USDC-7842");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const mockHash = Array.from({ length: 32 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");

      setUploadedFiles((prev) => [
        {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          hash: `${mockHash.slice(0, 16)}...${mockHash.slice(-6)}`,
          status: "Verified Proof",
          timestamp: "Just now",
        },
        ...prev,
      ]);
      setIsAnalyzing(false);
      setDisputeMessage(`Receipt "${file.name}" uploaded and verified as delivery proof.`);
    }, 1100);
  };

  // If loading session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#DCEBCA] flex flex-col items-center justify-center p-6 space-y-3">
        <Loader2 className="w-8 h-8 text-[#1E4D2B] animate-spin" />
        <p className="text-xs text-stone-700 font-semibold">Verifying your secure credentials...</p>
      </div>
    );
  }

  // If unauthenticated: Access gate
  if (!user) {
    return (
      <div className="min-h-screen bg-[#DCEBCA] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-[#CAD8C8] rounded-2xl p-8 text-center space-y-4 shadow-none">
          <div className="w-12 h-12 rounded-full bg-[#E4EDE2] text-[#1E4D2B] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">
            Sign In Required
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            You must have an active AgriResolve account to access this agricultural escrow dashboard.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <Link
              href="/login"
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
    <div className="min-h-screen bg-[#DCEBCA] text-stone-900 flex flex-col font-sans">
      {/* ========================================================= */}
      {/* TOP HEADER: Leaf Logo + Brand (Left) & Connect Wallet (Right) */}
      {/* ========================================================= */}
      <header className="w-full px-6 lg:px-12 pt-6 pb-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Left: Leaf Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <LeafLogo className="w-8 h-8 text-[#1E4D2B]" />
            <span className="font-black text-2xl tracking-tight text-[#1E4D2B]">
              AgriResolve
            </span>
          </Link>

          {/* Right: Connect Wallet Button matching the mockup */}
          <div>
            {walletConnected ? (
              <button
                onClick={() => setWalletConnected(false)}
                className="bg-[#1E4D2B] hover:bg-[#163820] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-none"
                title="Click to disconnect"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-300" />
                <span className="font-mono">{shortenAddress(walletAddress)}</span>
              </button>
            ) : (
              <button
                onClick={() => setWalletConnected(true)}
                className="bg-[#1E4D2B] hover:bg-[#163820] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-none"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN 3-COLUMN GRID: Exactly mirrors the reference layout  */}
      {/* ========================================================= */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 lg:px-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ========================================================= */}
          {/* COLUMN 1: LEFT SIDEBAR (Structural Navigation)           */}
          {/* ========================================================= */}
          <aside className="lg:col-span-2 w-full">
            <div className="bg-white rounded-2xl p-3 border border-[#CAD8C8] flex flex-col gap-2 relative shadow-none">
              {/* Organization / User Profile Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-full bg-[#52795B] hover:bg-[#45694D] text-white rounded-xl p-2.5 flex items-center justify-between transition-colors cursor-pointer text-left select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#2D6A4F] flex items-center justify-center flex-shrink-0 text-white font-bold text-xs uppercase">
                      {user.companyName?.charAt(0) || user.name.charAt(0)}
                    </div>
                    <div className="truncate text-xs font-semibold">
                      {user.companyName || user.name}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/90 flex-shrink-0" />
                </button>

                {/* Dropdown Menu for Profile Details & Role Switching */}
                {profileDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white border border-[#CAD8C8] rounded-xl p-3 shadow-none text-xs space-y-2">
                    <div className="border-b border-[#E8EFE8] pb-2">
                      <div className="font-bold text-stone-900 truncate">{user.name}</div>
                      <div className="text-[11px] text-stone-500 truncate">{user.email}</div>
                      <div className="inline-block mt-1 bg-[#DCEBCA] text-[#1E4D2B] text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                        {user.role}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                        Switch View Role:
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {(["farmer", "buyer", "arbiter"] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              switchRole(r);
                              setProfileDropdownOpen(false);
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-semibold capitalize cursor-pointer transition-colors ${
                              user.role === r
                                ? "bg-[#1E4D2B] text-white"
                                : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1 border-t border-[#E8EFE8]">
                      <button
                        onClick={logout}
                        className="w-full py-1 text-left text-xs font-semibold text-stone-600 hover:text-red-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Active Navigation Item: Escrows */}
              <Link
                href="/dashboard"
                className="bg-[#1E4D2B] text-white rounded-xl p-2.5 flex items-center gap-3 font-semibold text-xs tracking-wide transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <span>Escrows</span>
              </Link>

              {/* Navigation Link: Parties */}
              <Link
                href="/escrows"
                className="p-2.5 rounded-xl text-stone-700 hover:bg-[#F2F7F1] flex items-center gap-3 text-xs font-medium transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center text-stone-500">
                  <Users className="w-4 h-4" />
                </div>
                <span>Parties</span>
              </Link>

              {/* Structural Divider */}
              <div className="border-t border-[#CAD8C8] my-1" />

              {/* Navigation Link: Watchlist */}
              <button
                onClick={() => {}}
                className="p-2.5 rounded-xl text-stone-700 hover:bg-[#F2F7F1] flex items-center gap-3 text-xs font-medium text-left transition-colors cursor-pointer w-full"
              >
                <div className="w-5 h-5 flex items-center justify-center text-stone-500">
                  <Bookmark className="w-4 h-4" />
                </div>
                <span>Watchlist</span>
              </button>

              {/* Navigation Link: Network / Docs */}
              <Link
                href="/docs"
                className="p-2.5 rounded-xl text-stone-700 hover:bg-[#F2F7F1] flex items-center gap-3 text-xs font-medium transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center text-stone-500">
                  <Globe className="w-4 h-4" />
                </div>
                <span>Network</span>
              </Link>

              {/* Structural Divider */}
              <div className="border-t border-[#CAD8C8] my-1" />

              {/* Sign Out Link */}
              <button
                onClick={logout}
                className="p-2.5 rounded-xl text-stone-700 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 text-xs font-medium text-left transition-colors cursor-pointer w-full mt-auto"
              >
                <div className="w-5 h-5 flex items-center justify-center text-stone-500">
                  <LogOut className="w-4 h-4" />
                </div>
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* COLUMN 2: CENTER (Tracker + Document Upload)              */}
          {/* ========================================================= */}
          <section className="lg:col-span-6 w-full space-y-6">
            {/* Card 2: Escrow Status Tracker */}
            <div className="bg-white rounded-2xl p-6 border border-[#CAD8C8] space-y-6 shadow-none">
              {/* Header: Title + Options Icon */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                  Escrow Status Tracker
                </h2>
                <button
                  className="text-stone-500 hover:text-stone-900 p-1 rounded hover:bg-stone-100 cursor-pointer transition-colors"
                  title="Tracker Options"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-bar tags matching mockup */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#4E7A58] text-white text-xs px-3.5 py-1 rounded-md font-semibold">
                  Trade #1024 • Non-GMO Soybeans
                </span>
                <span className="bg-[#A2C1A0] text-[#1E4D2B] text-xs px-3 py-1 rounded-md font-bold">
                  15,000 USDC in Holding
                </span>
              </div>

              {/* Horizontal Stepper matching the reference image */}
              <div className="pt-2 pb-4">
                <div className="relative flex items-center justify-between">
                  {/* Connecting Line behind the nodes */}
                  <div className="absolute left-6 right-6 top-5 -translate-y-1/2 flex items-center z-0">
                    <div
                      className={`h-[2px] flex-1 ${
                        currentStep >= EscrowState.Delivered
                          ? "bg-[#1E4D2B]"
                          : "bg-[#CCD8CB]"
                      }`}
                    />
                    <div
                      className={`h-[2px] flex-1 ${
                        currentStep >= EscrowState.Disputed
                          ? "bg-[#1E4D2B]"
                          : "bg-[#CCD8CB]"
                      }`}
                    />
                    <div
                      className={`h-[2px] flex-1 ${
                        currentStep >= EscrowState.Resolved
                          ? "bg-[#1E4D2B]"
                          : "bg-[#CCD8CB]"
                      }`}
                    />
                    <div
                      className={`h-[2px] flex-1 ${
                        currentStep === EscrowState.Refunded
                          ? "bg-[#1E4D2B]"
                          : "bg-[#CCD8CB]"
                      }`}
                    />
                  </div>

                  {/* Step 1: Funded */}
                  <div className="relative z-10 flex flex-col items-center">
                    <button
                      onClick={() => setCurrentStep(EscrowState.Funded)}
                      className="w-10 h-10 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                      title="Set to Funded"
                    >
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </button>
                    <span className="text-xs font-semibold text-stone-900 mt-2.5">
                      Funded
                    </span>
                  </div>

                  {/* Step 2: Delivered */}
                  <div className="relative z-10 flex flex-col items-center">
                    <button
                      onClick={() => setCurrentStep(EscrowState.Delivered)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                        currentStep >= EscrowState.Delivered
                          ? "bg-[#1E4D2B] text-white"
                          : "bg-[#E8EFE8] border border-[#CCD8CB] text-stone-400"
                      }`}
                      title="Set to Delivered"
                    >
                      {currentStep >= EscrowState.Delivered ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <span className="text-xs font-medium">2</span>
                      )}
                    </button>
                    <span className="text-xs font-semibold text-stone-900 mt-2.5">
                      Delivered
                    </span>
                  </div>

                  {/* Step 3: Disputed */}
                  <div className="relative z-10 flex flex-col items-center">
                    <button
                      onClick={() => setCurrentStep(EscrowState.Disputed)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                        currentStep === EscrowState.Disputed
                          ? "border-2 border-[#1E4D2B] bg-[#E9F2E8] text-[#1E4D2B] font-black"
                          : currentStep > EscrowState.Disputed
                          ? "bg-[#1E4D2B] text-white"
                          : "bg-[#E8EFE8] border border-[#CCD8CB] text-stone-400"
                      }`}
                      title="Set to Disputed"
                    >
                      {currentStep === EscrowState.Disputed ? (
                        <span className="text-base font-black">!</span>
                      ) : currentStep > EscrowState.Disputed ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <span className="text-xs font-medium">3</span>
                      )}
                    </button>
                    <span
                      className={`text-xs mt-2.5 ${
                        currentStep === EscrowState.Disputed
                          ? "font-bold text-stone-900"
                          : "font-semibold text-stone-700"
                      }`}
                    >
                      Disputed
                    </span>
                  </div>

                  {/* Step 4: Resolved */}
                  <div className="relative z-10 flex flex-col items-center">
                    <button
                      onClick={() => setCurrentStep(EscrowState.Resolved)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                        currentStep === EscrowState.Resolved
                          ? "bg-[#1E4D2B] text-white"
                          : "bg-[#E8EFE8] border border-[#CCD8CB] text-stone-400"
                      }`}
                      title="Set to Resolved"
                    >
                      {currentStep === EscrowState.Resolved ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <span className="text-xs font-medium">4</span>
                      )}
                    </button>
                    <span className="text-xs font-medium text-stone-600 mt-2.5">
                      Resolved
                    </span>
                  </div>

                  {/* Step 5: Refunded */}
                  <div className="relative z-10 flex flex-col items-center">
                    <button
                      onClick={() => setCurrentStep(EscrowState.Refunded)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                        currentStep === EscrowState.Refunded
                          ? "bg-[#1E4D2B] text-white"
                          : "bg-[#E8EFE8] border border-[#CCD8CB] text-stone-400"
                      }`}
                      title="Set to Refunded"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-medium text-stone-600 mt-2.5">
                      Refunded
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Information Box (Plain English, Non-Jargon) */}
              <div className="bg-[#F4F8F3] border border-[#CAD8C8] rounded-xl p-3.5 text-xs space-y-1">
                <div className="font-semibold text-stone-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1E4D2B]" />
                  {currentStep === EscrowState.Funded && "State: Funds Secured in Protected Holding"}
                  {currentStep === EscrowState.Delivered && "State: Produce Dispatched & Delivery Slip Recorded"}
                  {currentStep === EscrowState.Disputed && "State: Active Disagreement — Moisture Variance Evidence Submitted"}
                  {currentStep === EscrowState.Resolved && "State: Settlement Agreed — Payout Split Calculated & Released"}
                  {currentStep === EscrowState.Refunded && "State: Deal Timed Out or Cancelled — Buyer Full Refund"}
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Click any step above to simulate escrow states in the proof resolution workflow.
                </p>
              </div>
            </div>

            {/* Card 3: Document Upload */}
            <div className="bg-white rounded-2xl p-6 border border-[#CAD8C8] space-y-4 shadow-none">
              {/* Header: Title + Upload Tray Icon */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                  Document Upload
                </h2>
                <button
                  className="text-stone-500 hover:text-stone-900 p-1 rounded hover:bg-stone-100 cursor-pointer transition-colors"
                  title="Evidence Guidelines"
                >
                  <Upload className="w-5 h-5" />
                </button>
              </div>

              {/* Rectangular Dashed Dropzone */}
              <label className="border-2 border-dashed border-[#8EAE8B] bg-[#ECF8EC] hover:bg-[#E2F2E0] rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-colors block">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />

                {/* Dark forest green document icon with white upward arrow */}
                <div className="w-12 h-14 bg-[#1E4D2B] rounded-lg relative flex items-center justify-center text-white mx-auto shadow-none">
                  {/* Folded corner appearance */}
                  <div className="absolute top-0 right-0 w-3 h-3 bg-[#ECF8EC] rounded-bl" />
                  <ArrowUp className="w-6 h-6 stroke-[2.8]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {isAnalyzing ? "Analyzing Document Proof..." : "Drag & drop evidence or browse files"}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Weighbridge slips, lab moisture assays, or bill of lading (PDF, JPG, PNG)
                  </p>
                </div>

                {/* Solid Upload Button */}
                <div className="pt-1">
                  <span className="inline-flex items-center gap-2 bg-[#1E4D2B] hover:bg-[#163820] text-white px-6 py-2.5 rounded-lg font-medium text-xs transition-colors">
                    <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                    <span>{isAnalyzing ? "Processing..." : "Upload"}</span>
                  </span>
                </div>
              </label>

              {/* Notification when evidence is uploaded */}
              {disputeMessage && (
                <div className="p-3 bg-[#E4EDE2] border border-[#CAD8C8] rounded-xl text-xs text-[#1E4D2B] font-medium flex items-center justify-between">
                  <span>{disputeMessage}</span>
                  <button
                    onClick={() => setDisputeMessage(null)}
                    className="text-stone-500 hover:text-stone-800 text-[11px] font-bold cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================= */}
          {/* COLUMN 3: RIGHT (Trade Details + Evidence Records Table)  */}
          {/* ========================================================= */}
          <section className="lg:col-span-4 w-full space-y-6">
            {/* Card 4: Trade Details */}
            <div className="bg-white rounded-2xl p-6 border border-[#CAD8C8] space-y-4 shadow-none">
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                Trade Details
              </h2>

              <div className="divide-y divide-[#E4EDE2] text-xs">
                {/* Trade ID */}
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-medium text-stone-700">Trade ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-stone-900">
                      AGRI-USDC-7842
                    </span>
                    <button
                      onClick={copyTradeId}
                      className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                      title="Copy Trade ID"
                    >
                      {copied ? (
                        <CheckCircle2 className="w-4 h-4 text-[#1E4D2B]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Buyer */}
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-medium text-stone-700">Buyer</span>
                  <span className="bg-[#C6D8C4] text-[#1E4D2B] font-mono text-xs px-2.5 py-1 rounded font-semibold">
                    {user.role === "buyer" ? `${user.name} (You)` : "GAHY...O6SS"}
                  </span>
                </div>

                {/* Farmer */}
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-medium text-stone-700">Farmer</span>
                  <span className="bg-[#C6D8C4] text-[#1E4D2B] font-mono text-xs px-2.5 py-1 rounded font-semibold">
                    {user.role === "farmer" ? `${user.name} (You)` : "GBJ5...FARM"}
                  </span>
                </div>

                {/* Escrow Amount */}
                <div className="py-2.5 flex items-center justify-between">
                  <span className="font-medium text-stone-700">Escrow Amount</span>
                  <span className="font-mono font-bold text-sm text-[#1E4D2B]">
                    15,000.00 USDC
                  </span>
                </div>
              </div>

              {/* View Full Details Button */}
              <div className="pt-2">
                <Link
                  href="/trade/1"
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#2D6A4F] hover:bg-[#1E4D2B] text-white text-xs font-semibold transition-colors"
                >
                  <span>View Full Deal Details &amp; Terms</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 5: Evidence / Activity Audit (with Solid Forest Green Header) */}
            <div className="rounded-2xl overflow-hidden border border-[#CAD8C8] shadow-none">
              {/* Top Forest Green Header Bar */}
              <div className="bg-[#1E4D2B] text-white p-3.5 flex items-center justify-between">
                <div className="bg-[#4E7A58] text-xs px-3 py-1 rounded font-medium text-white tracking-wide">
                  Evidence Records
                </div>
                <button className="text-white/80 hover:text-white p-0.5 cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Table / List Body */}
              <div className="bg-white p-4 space-y-3">
                {uploadedFiles.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-[#F4F8F3] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${
                          idx === 0
                            ? "bg-[#2D6A4F]"
                            : idx === 1
                            ? "bg-[#4E7A58]"
                            : "bg-[#5E8C65]"
                        }`}
                      >
                        <FileCheck2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-stone-900 truncate">
                          {doc.name}
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono truncate">
                          {doc.hash}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="inline-block text-[10px] font-semibold bg-[#DCEBCA] text-[#1E4D2B] px-2 py-0.5 rounded">
                        {doc.status}
                      </span>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {doc.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Bill of Lading Row */}
                <div className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-[#F4F8F3] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#4E7A58] flex items-center justify-center text-white flex-shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-stone-900 truncate">
                        Bill of Lading #BOL-774
                      </div>
                      <div className="text-[11px] text-stone-500 truncate">
                        Port of Santos Dispatch
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="inline-block text-[10px] font-semibold bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                      Recorded
                    </span>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      1 day ago
                    </div>
                  </div>
                </div>

                {/* Escrow Initialized Row */}
                <div className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-[#F4F8F3] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#5E8C65] flex items-center justify-center text-white flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-stone-900 truncate">
                        Escrow Holding Initialized
                      </div>
                      <div className="text-[11px] text-stone-500 truncate font-mono">
                        15,000 USDC Collateral
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="inline-block text-[10px] font-semibold bg-[#DCEBCA] text-[#1E4D2B] px-2 py-0.5 rounded">
                      Secured
                    </span>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      4 days ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
