"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import { DEMO_TRADES, EscrowState } from "../../lib/stellar";
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
  FileUp,
  FileCheck2,
  Scale,
  ExternalLink,
  Lock,
  ArrowRight,
  Loader2,
  Wallet,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, logout, switchRole } = useAuth();
  const [currentStep, setCurrentStep] = useState<EscrowState>(EscrowState.Disputed);
  const [copied, setCopied] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; size: string; hash: string; status: string; timestamp: string }>
  >([
    {
      name: "SGS_Moisture_Report_7842.pdf",
      size: "2.4 MB",
      hash: "84f9cfa549c318847d1cede87688c73c...5565",
      status: "Verified 14.8% Moisture",
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
          status: "Evidence Analyzed - 98.4% Confidence",
          timestamp: "Just now",
        },
        ...prev,
      ]);
      setIsAnalyzing(false);
      setDisputeMessage("Evidence uploaded and parsed by Meterless AI Arbitration Node.");
    }, 1200);
  };

  // If loading session
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-3">
        <Loader2 className="w-8 h-8 text-[#1E4D2B] animate-spin" />
        <p className="text-xs text-stone-600 font-medium">Verifying account credentials...</p>
      </div>
    );
  }

  // If unauthenticated: Access gate
  if (!user) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="bg-white border border-[#D1D9D1] rounded-xl p-8 text-center space-y-4">
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
              className="w-full py-2.5 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-white text-xs font-semibold transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="w-full py-2.5 rounded-md border border-[#D1D9D1] bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Logged in User Bar */}
      <div className="bg-white border border-[#D1D9D1] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-stone-700">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E4D2B]" />
          <span className="font-bold text-stone-900">Active Profile:</span>
          <span className="font-semibold text-stone-800">{user.name}</span>
          <span className="bg-[#DCEBCA] text-[#1E4D2B] font-bold text-[10px] px-2 py-0.5 rounded capitalize">
            {user.role}
          </span>
          <span className="hidden md:inline text-stone-400">•</span>
          <span className="hidden md:inline text-stone-600">{user.companyName}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-stone-600 bg-[#F8FAF7] px-2.5 py-1 rounded border border-[#D1D9D1]">
            <Wallet className="w-3.5 h-3.5 text-[#1E4D2B]" />
            <span>Balance: {user.balance.toLocaleString()} USDC</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-[11px] font-semibold text-stone-600 hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Matches the reference image layout precisely */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Sidebar (Flat Structural Navigation)         */}
        {/* ========================================================= */}
        <aside className="lg:col-span-2 w-full">
          <div className="bg-white border border-[#D1D9D1] rounded-xl p-3 flex flex-col gap-2">
            {/* Top Dropdown / Organization Selector */}
            <div className="bg-[#4E7A58] hover:bg-[#3E6547] text-white rounded-lg p-2.5 flex items-center justify-between transition-colors cursor-pointer">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded bg-[#2D6A4F] flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">
                  {user.companyName?.charAt(0) || user.name.charAt(0)}
                </div>
                <div className="truncate text-xs font-semibold">
                  {user.companyName || user.name}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-white/80 flex-shrink-0" />
            </div>

            {/* Active Navigation Item: Escrows / Dashboard */}
            <Link
              href="/dashboard"
              className="bg-[#1E4D2B] text-white rounded-lg p-2.5 flex items-center gap-3 font-semibold text-xs tracking-wide transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <span>Escrows</span>
            </Link>

            {/* Navigation Link: Parties */}
            <Link
              href="/escrows"
              className="p-2.5 rounded-lg text-stone-700 hover:bg-stone-100 flex items-center gap-3 text-xs font-medium transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center text-stone-600">
                <Users className="w-4 h-4" />
              </div>
              <span>Parties</span>
            </Link>

            {/* Divider */}
            <div className="border-t border-[#D1D9D1] my-1" />

            {/* Navigation Link: Saved / Watchlist */}
            <button
              onClick={() => {}}
              className="p-2.5 rounded-lg text-stone-700 hover:bg-stone-100 flex items-center gap-3 text-xs font-medium text-left transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center text-stone-600">
                <Bookmark className="w-4 h-4" />
              </div>
              <span>Watchlist</span>
            </button>

            {/* Navigation Link: Network */}
            <Link
              href="/docs"
              className="p-2.5 rounded-lg text-stone-700 hover:bg-stone-100 flex items-center gap-3 text-xs font-medium transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center text-stone-600">
                <Globe className="w-4 h-4" />
              </div>
              <span>Network</span>
            </Link>

            {/* Divider */}
            <div className="border-t border-[#D1D9D1] my-1" />

            {/* Navigation Link: Exit / Sign Out */}
            <button
              onClick={logout}
              className="p-2.5 rounded-lg text-stone-700 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 text-xs font-medium text-left transition-colors mt-auto cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* CENTER COLUMN: Escrow Status Tracker + Document Upload    */}
        {/* ========================================================= */}
        <section className="lg:col-span-6 w-full space-y-6">
          {/* Card 1: Escrow Status Tracker */}
          <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 space-y-6">
            {/* Header: Title + Options */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                Escrow Status Tracker
              </h2>
              <button
                className="text-stone-500 hover:text-stone-900 p-1 rounded hover:bg-stone-100"
                title="Options"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-bar tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#4E7A58] text-white text-xs px-3 py-1 rounded font-medium">
                Trade #1024 • Non-GMO Soybeans
              </span>
              <span className="bg-[#DCEBCA] text-[#1E4D2B] text-xs px-2.5 py-1 rounded font-bold">
                15,000 USDC Collateral
              </span>
            </div>

            {/* Horizontal Stepper */}
            <div className="pt-2 pb-4">
              <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute left-6 right-6 top-4 -translate-y-1/2 flex items-center z-0">
                  <div
                    className={`h-[2px] flex-1 ${
                      currentStep >= EscrowState.Delivered
                        ? "bg-[#1E4D2B]"
                        : "bg-[#D1D9D1]"
                    }`}
                  />
                  <div
                    className={`h-[2px] flex-1 ${
                      currentStep >= EscrowState.Disputed
                        ? "bg-[#1E4D2B]"
                        : "bg-[#D1D9D1]"
                    }`}
                  />
                  <div
                    className={`h-[2px] flex-1 ${
                      currentStep >= EscrowState.Resolved
                        ? "bg-[#1E4D2B]"
                        : "bg-[#D1D9D1]"
                    }`}
                  />
                  <div
                    className={`h-[2px] flex-1 ${
                      currentStep === EscrowState.Refunded
                        ? "bg-[#1E4D2B]"
                        : "bg-[#D1D9D1]"
                    }`}
                  />
                </div>

                {/* Step 1: Funded */}
                <div className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => setCurrentStep(EscrowState.Funded)}
                    className="w-8 h-8 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                    title="Set to Funded"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <span className="text-xs font-semibold text-stone-900 mt-2">
                    Funded
                  </span>
                </div>

                {/* Step 2: Delivered */}
                <div className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => setCurrentStep(EscrowState.Delivered)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                      currentStep >= EscrowState.Delivered
                        ? "bg-[#1E4D2B] text-white"
                        : "bg-[#E8EFE7] border border-[#D1D9D1] text-stone-400"
                    }`}
                    title="Set to Delivered"
                  >
                    {currentStep >= EscrowState.Delivered ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <span className="text-xs font-medium">2</span>
                    )}
                  </button>
                  <span className="text-xs font-semibold text-stone-900 mt-2">
                    Delivered
                  </span>
                </div>

                {/* Step 3: Disputed */}
                <div className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => setCurrentStep(EscrowState.Disputed)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                      currentStep === EscrowState.Disputed
                        ? "border-2 border-[#1E4D2B] bg-[#E9F2E8] text-[#1E4D2B] font-bold"
                        : currentStep > EscrowState.Disputed
                        ? "bg-[#1E4D2B] text-white"
                        : "bg-[#E8EFE7] border border-[#D1D9D1] text-stone-400"
                    }`}
                    title="Set to Disputed"
                  >
                    {currentStep === EscrowState.Disputed ? (
                      <span className="text-sm font-black">!</span>
                    ) : currentStep > EscrowState.Disputed ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <span className="text-xs font-medium">3</span>
                    )}
                  </button>
                  <span
                    className={`text-xs mt-2 ${
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
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                      currentStep === EscrowState.Resolved
                        ? "bg-[#1E4D2B] text-white"
                        : "bg-[#E8EFE7] border border-[#D1D9D1] text-stone-400"
                    }`}
                    title="Set to Resolved"
                  >
                    {currentStep === EscrowState.Resolved ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <span className="text-xs font-medium">4</span>
                    )}
                  </button>
                  <span className="text-xs font-medium text-stone-600 mt-2">
                    Resolved
                  </span>
                </div>

                {/* Step 5: Refunded */}
                <div className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => setCurrentStep(EscrowState.Refunded)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                      currentStep === EscrowState.Refunded
                        ? "bg-[#1E4D2B] text-white"
                        : "bg-[#E8EFE7] border border-[#D1D9D1] text-stone-400"
                    }`}
                    title="Set to Refunded"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-medium text-stone-600 mt-2">
                    Refunded
                  </span>
                </div>
              </div>
            </div>

            {/* Status Information Box */}
            <div className="bg-[#F8FAF7] border border-[#D1D9D1] rounded-lg p-3 text-xs space-y-1">
              <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1E4D2B]" />
                {currentStep === EscrowState.Funded && "State: Funds Locked in Soroban Contract"}
                {currentStep === EscrowState.Delivered && "State: Commodity Dispatched & Bill of Lading Recorded"}
                {currentStep === EscrowState.Disputed && "State: Dispute Active — Evidence Submitted for AI Evaluation"}
                {currentStep === EscrowState.Resolved && "State: Adjudicated — Payout Split Calculated & Released"}
                {currentStep === EscrowState.Refunded && "State: Escrow Timed Out or Cancelled — Buyer Full Refund"}
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Click any step above to toggle through contract states. Verification is executed autonomously on Stellar Soroban Testnet.
              </p>
            </div>
          </div>

          {/* Card 2: Document Upload */}
          <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 space-y-4">
            {/* Header: Title + Upload tray icon */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                Document Upload
              </h2>
              <button
                className="text-stone-500 hover:text-stone-900 p-1 rounded hover:bg-stone-100"
                title="View Evidence Guidelines"
              >
                <Upload className="w-5 h-5" />
              </button>
            </div>

            {/* Rectangular Dashed Dropzone */}
            <label className="border-2 border-dashed border-[#B8C7B7] bg-[#F7FAF7] hover:bg-[#F0F5F0] rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-colors block">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />

              {/* Flat dark green document icon with upward arrow */}
              <div className="w-12 h-12 bg-[#1E4D2B] text-white rounded-lg flex items-center justify-center">
                <FileUp className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-stone-800">
                  {isAnalyzing ? "Analyzing Document with AI Oracle..." : "Drag & drop evidence or browse files"}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Phytosanitary inspection, lab moisture assay, or bill of lading (PDF, JPG, PNG)
                </p>
              </div>

              {/* Solid Upload Button */}
              <div className="pt-1">
                <span className="inline-flex items-center gap-2 bg-[#1E4D2B] hover:bg-[#173B21] text-white px-5 py-2 rounded-md font-medium text-xs transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isAnalyzing ? "Processing..." : "Upload"}</span>
                </span>
              </div>
            </label>

            {/* Notification if upload message */}
            {disputeMessage && (
              <div className="p-3 bg-[#E4EDE2] border border-[#B8C7B7] rounded-md text-xs text-[#1E4D2B] font-medium flex items-center justify-between">
                <span>{disputeMessage}</span>
                <button
                  onClick={() => setDisputeMessage(null)}
                  className="text-stone-500 hover:text-stone-800 text-[11px] font-bold"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Trade Details + Activity / Evidence Audit   */}
        {/* ========================================================= */}
        <section className="lg:col-span-4 w-full space-y-6">
          {/* Card 1: Trade Details */}
          <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              Trade Details
            </h2>

            <div className="divide-y divide-[#E4EDE2] text-xs">
              {/* Trade ID */}
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-stone-700">Trade ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-stone-900">
                    AGRI-USDC-7842
                  </span>
                  <button
                    onClick={copyTradeId}
                    className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
                    title="Copy Trade ID"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E4D2B]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Buyer */}
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-stone-700">Buyer</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                  user.role === "buyer"
                    ? "bg-[#DCEBCA] text-[#1E4D2B] font-bold"
                    : "bg-stone-100 text-stone-900"
                }`}>
                  {user.role === "buyer" ? `${user.name} (You)` : "GAHY...O6SS"}
                </span>
              </div>

              {/* Farmer */}
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-stone-700">Farmer</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                  user.role === "farmer"
                    ? "bg-[#DCEBCA] text-[#1E4D2B] font-bold"
                    : "bg-stone-100 text-stone-900"
                }`}>
                  {user.role === "farmer" ? `${user.name} (You)` : "GBJ5...FARM"}
                </span>
              </div>

              {/* Commodity */}
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-stone-700">Commodity</span>
                <span className="font-medium text-stone-900">
                  500 MT Grade-1 Soybeans
                </span>
              </div>

              {/* Escrow Amount */}
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-stone-700">Escrow Amount</span>
                <span className="font-mono font-bold text-sm text-[#1E4D2B]">
                  15,000.00 USDC
                </span>
              </div>

              {/* Arbiter Oracle */}
              <div className="py-2.5 flex items-center justify-between">
                <span className="font-medium text-stone-700">Arbiter Node</span>
                <span className={`font-mono text-xs ${
                  user.role === "arbiter" ? "text-[#1E4D2B] font-bold" : "text-stone-600"
                }`}>
                  {user.role === "arbiter" ? `${user.name} (Active Arbiter)` : "SGS (GCS3...K8L)"}
                </span>
              </div>
            </div>

            {/* Quick action button */}
            <div className="pt-2">
              <Link
                href="/trade/1"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-[#2D6A4F] hover:bg-[#1E4D2B] text-white text-xs font-semibold transition-colors"
              >
                <span>View Full On-Chain Contract</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Activity & Evidence Audit (with Solid Dark Green Top Bar) */}
          <div className="rounded-xl overflow-hidden">
            {/* Top dark green bar */}
            <div className="bg-[#1E4D2B] text-white p-3.5 flex items-center justify-between">
              <div className="bg-[#386641] text-xs px-2.5 py-1 rounded font-medium text-white tracking-wide">
                Evidence Audit Trail
              </div>
              <button className="text-white/80 hover:text-white p-0.5">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* List Body */}
            <div className="bg-white border-x border-b border-[#D1D9D1] rounded-b-xl p-4 space-y-3">
              {uploadedFiles.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-md flex items-center justify-center text-white flex-shrink-0 ${
                        idx === 0
                          ? "bg-[#2D6A4F]"
                          : idx === 1
                          ? "bg-[#4E7A58]"
                          : "bg-[#608060]"
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

              {/* Seed activity items */}
              <div className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-md bg-[#4E7A58] flex items-center justify-center text-white flex-shrink-0">
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

              <div className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-md bg-[#608060] flex items-center justify-center text-white flex-shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-900 truncate">
                      Soroban Escrow Initialized
                    </div>
                    <div className="text-[11px] text-stone-500 truncate font-mono">
                      15,000 USDC Collateral
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="inline-block text-[10px] font-semibold bg-[#DCEBCA] text-[#1E4D2B] px-2 py-0.5 rounded">
                    Confirmed
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
    </div>
  );
}
