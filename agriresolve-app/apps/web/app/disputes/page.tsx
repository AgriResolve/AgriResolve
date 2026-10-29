"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import { ArrowLeft, FileText, Cpu, Lock, Loader2 } from "lucide-react";
import { EvidenceUploader } from "../../components/EvidenceUploader";

export default function DisputesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Authentication guard: Anything relating to disputes can only be seen when signed in
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?redirect=/disputes");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-3">
        <Loader2 className="w-8 h-8 text-[#1E4D2B] animate-spin" />
        <p className="text-xs text-stone-600 font-medium">Checking authorization...</p>
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
            Dispute records and evidence arbitration can only be accessed by authenticated participants.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            <Link
              href="/login?redirect=/disputes"
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
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#1E4D2B] font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>

      <div className="bg-white border border-[#D1D9D1] rounded-2xl p-6 sm:p-8 space-y-6 shadow-none">
        <div className="flex items-center gap-2.5 text-[#1E4D2B]">
          <FileText className="w-6 h-6" />
          <h1 className="text-xl font-bold text-stone-900">Dispute Evidence &amp; Resolution Center</h1>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          The AgriResolve proof pipeline evaluates trade documentation, resolves discrepancies
          (such as allowable moisture shrinkage vs weight loss), and calculates fair settlement splits
          without stress or litigation.
        </p>

        <EvidenceUploader escrowId={2} />
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#D1D9D1] text-xs space-y-4 shadow-none">
        <h3 className="font-bold text-stone-900 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#1E4D2B]" />
          <span>Proof Resolution Workflow</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#D1D9D1]">
            <span className="font-bold text-[#1E4D2B] block mb-1">1. Proof Intake</span>
            <span className="text-stone-600">
              Parses weighbridge tickets, moisture certificates, and quality inspection sheets.
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#D1D9D1]">
            <span className="font-bold text-[#1E4D2B] block mb-1">2. Discrepancy Audit</span>
            <span className="text-stone-600">
              Reconciles trade discrepancies against agreed agricultural standards and moisture tolerances.
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#D1D9D1]">
            <span className="font-bold text-[#1E4D2B] block mb-1">3. Fair Settlement</span>
            <span className="text-stone-600">
              Releases verified payout split to the farmer and buyer according to actual proof.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
