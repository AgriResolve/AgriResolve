"use client";

import Link from "next/link";
import { useAuth } from "../lib/auth";
import { FarmIllustration } from "../components/FarmIllustration";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
  Receipt,
  Scale,
  FileCheck,
  Check,
  HelpCircle,
  Wheat,
  Building2,
  Lock,
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* ========================================================= */}
      {/* 1. GROUNDED FARMER-FIRST HERO SECTION                     */}
      {/* ========================================================= */}
      <section className="bg-white border border-[#D3CFC9] rounded-xl p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Message (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#E4EDE2] border border-[#C5D7C2] text-[#1E4D2B] text-xs font-bold px-3 py-1.5 rounded-md">
              <ShieldCheck className="w-4 h-4 text-[#1E4D2B]" />
              <span>Simple, Protected Farm Trade</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Fair Trade, Zero Disputes. Secure your farm deals and resolve disagreements without the stress.
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              AgriResolve keeps your money safe in secure holding until the produce is delivered.
              If something goes wrong, our system helps you settle it quickly using actual proof.
            </p>

            {/* Main Action Call: Start a Secure Deal */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {!user ? (
                <>
                  <Link
                    href="/signup"
                    className="bg-[#2D6A4F] hover:bg-[#1E4D2B] text-white font-bold text-base px-7 py-3.5 rounded-md transition-colors flex items-center gap-2.5 cursor-pointer"
                  >
                    <span>Start a Secure Deal</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/login"
                    className="bg-white hover:bg-stone-50 border border-[#D3CFC9] text-stone-800 font-bold text-base px-6 py-3.5 rounded-md transition-colors cursor-pointer"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className="bg-[#2D6A4F] hover:bg-[#1E4D2B] text-white font-bold text-base px-7 py-3.5 rounded-md transition-colors flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Go to Your Deals ({user.name})</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}

              <a
                href="#how-it-works"
                className="text-stone-700 hover:text-[#1E4D2B] font-semibold text-sm px-2 py-3 transition-colors flex items-center gap-1.5"
              >
                <span>How it works</span>
                <span>&darr;</span>
              </a>
            </div>

            {/* Earthy Reassurance Points */}
            <div className="pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1E4D2B] flex-shrink-0" />
                <span>Money held safely</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1E4D2B] flex-shrink-0" />
                <span>Simple proof settles claims</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1E4D2B] flex-shrink-0" />
                <span>Fast payout on delivery</span>
              </div>
            </div>
          </div>

          {/* Visual Illustration (Right 5 cols): Hand-drawn/Flat Farm Landscape */}
          <div className="lg:col-span-5 w-full">
            <FarmIllustration />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. "HOW IT WORKS" 3-STEP WALKTHROUGH                      */}
      {/* ========================================================= */}
      <section id="how-it-works" className="bg-white border border-[#D3CFC9] rounded-xl p-6 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-[#1E4D2B] uppercase tracking-wider">
            Clear &amp; Honest Process
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            A simple 3-step system designed for straightforward farm commerce without middlemen or hidden fees.
          </p>
        </div>

        {/* 3 Horizontal Steps Connected by Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-[#FAF9F5] border border-[#D3CFC9] rounded-lg p-6 space-y-3.5 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#E4EDE2] border border-[#C5D7C2] flex items-center justify-center text-[#1E4D2B]">
                <Lock className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#1E4D2B] uppercase tracking-wider block mb-0.5">
                  Step 1
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Create &amp; Fund
                </h3>
              </div>
              <p className="text-sm font-semibold text-stone-800">
                The buyer puts money into secure holding.
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                Before trucks are loaded or dispatched, the purchase funds are deposited safely.
                The farmer knows the money is guaranteed, and the buyer knows their money remains
                locked until produce is received.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E5E0D8] text-[11px] font-medium text-stone-500">
              Guaranteed payment before dispatch
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FAF9F5] border border-[#D3CFC9] rounded-lg p-6 space-y-3.5 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#E4EDE2] border border-[#C5D7C2] flex items-center justify-center text-[#1E4D2B]">
                <Truck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#1E4D2B] uppercase tracking-wider block mb-0.5">
                  Step 2
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Deliver &amp; Confirm
                </h3>
              </div>
              <p className="text-sm font-semibold text-stone-800">
                The farmer sends the produce.
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                The crop is loaded and transported to the destination elevator or warehouse.
                The delivery slip is recorded, weight is checked, and arrival is confirmed.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E5E0D8] text-[11px] font-medium text-stone-500">
              Physical receipt &amp; weigh-bridge verification
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FAF9F5] border border-[#D3CFC9] rounded-lg p-6 space-y-3.5 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#E4EDE2] border border-[#C5D7C2] flex items-center justify-center text-[#1E4D2B]">
                <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#1E4D2B] uppercase tracking-wider block mb-0.5">
                  Step 3
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Smooth Payday
                </h3>
              </div>
              <p className="text-sm font-semibold text-stone-800">
                Once confirmed, the money is released instantly.
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                If there is a dispute, simply upload your delivery records and invoices,
                and AgriResolve will help split the funds fairly based on actual evidence.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E5E0D8] text-[11px] font-medium text-stone-500">
              Zero payment delay &bull; Fair evidence resolution
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. GROUNDED PROOF & FAIR DEAL PROMISES                    */}
      {/* ========================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* For the Farmer */}
        <div className="bg-white border border-[#D3CFC9] rounded-xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#2D6A4F] text-white flex items-center justify-center">
              <Wheat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">For Farmers &amp; Producers</h3>
              <p className="text-xs text-stone-500">Guaranteed payment for every truckload</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Never dispatch your harvest on empty promises or post-dated checks.
            With AgriResolve, the buyer’s money is verified and safely secured before the grain leaves your barn.
            The moment arrival is verified, your payment arrives without bank delays.
          </p>

          <ul className="space-y-2 text-xs text-stone-700">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#1E4D2B] mt-0.5 flex-shrink-0" />
              <span>Know the funds are locked before you load the truck</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#1E4D2B] mt-0.5 flex-shrink-0" />
              <span>Protection against unjustified discounts or cancelled payments</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#1E4D2B] mt-0.5 flex-shrink-0" />
              <span>Upload your departure lab sheet to verify quality</span>
            </li>
          </ul>
        </div>

        {/* For the Buyer */}
        <div className="bg-white border border-[#D3CFC9] rounded-xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#1E4D2B] text-white flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">For Buyers &amp; Millers</h3>
              <p className="text-xs text-stone-500">Inspect before final payment is released</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Eliminate advance payment risk. Your money remains safe in secure holding while produce is in transit.
            You only pay for what actually arrives at your weighbridge, with standard moisture and weight adjustments.
          </p>

          <ul className="space-y-2 text-xs text-stone-700">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#1E4D2B] mt-0.5 flex-shrink-0" />
              <span>Full control to inspect moisture, grade, and weight</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#1E4D2B] mt-0.5 flex-shrink-0" />
              <span>Automatic standard drying and dockage calculations</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#1E4D2B] mt-0.5 flex-shrink-0" />
              <span>Fair refund on any shortfall without lengthy legal battles</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DISAGREEMENTS SETTLED WITH ACTUAL PROOF                */}
      {/* ========================================================= */}
      <section className="bg-white border border-[#D3CFC9] rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5 text-[#1E4D2B]">
          <Scale className="w-5 h-5" />
          <h3 className="text-base font-bold text-stone-900">
            How Disagreements Are Settled With Actual Proof
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl">
          In farming, weather and moisture happen. When a shipment differs from the agreed specs (e.g., 14.8% moisture instead of 13.5%),
          neither party needs to panic or fight:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#D3CFC9] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
              <Receipt className="w-4 h-4 text-[#1E4D2B]" />
              <span>1. Upload Real Proof</span>
            </div>
            <p className="text-xs text-stone-600">
              Take a photo or upload your weighbridge slip, moisture test sheet, or delivery note.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#D3CFC9] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
              <FileCheck className="w-4 h-4 text-[#1E4D2B]" />
              <span>2. Fair Calculation</span>
            </div>
            <p className="text-xs text-stone-600">
              Standard agricultural drying and weight shrinkage tables are applied automatically.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#D3CFC9] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
              <CheckCircle2 className="w-4 h-4 text-[#1E4D2B]" />
              <span>3. Money Split Fairly</span>
            </div>
            <p className="text-xs text-stone-600">
              The farmer gets paid for the delivered value, and the buyer receives a fair adjustment.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CALL TO ACTION                                         */}
      {/* ========================================================= */}
      <section className="bg-[#FAF9F5] border border-[#D3CFC9] rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-stone-900">
            Ready to secure your next harvest deal?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600">
            Join thousands of producers and buyers trading with absolute peace of mind.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-5 py-3 rounded-md border border-[#D3CFC9] bg-white text-stone-800 text-sm font-bold hover:bg-stone-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 rounded-md bg-[#2D6A4F] hover:bg-[#1E4D2B] text-white text-sm font-bold transition-colors flex items-center gap-2"
              >
                <span>Start a Secure Deal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-md bg-[#2D6A4F] hover:bg-[#1E4D2B] text-white text-sm font-bold transition-colors flex items-center gap-2"
            >
              <span>Go to Your Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
