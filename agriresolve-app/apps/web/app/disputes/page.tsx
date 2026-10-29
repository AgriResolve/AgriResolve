"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Cpu } from "lucide-react";
import { EvidenceUploader } from "../../components/EvidenceUploader";

export default function DisputesPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#1E4D2B] font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-[#1E4D2B]">
          <FileText className="w-6 h-6" />
          <h1 className="text-xl font-bold text-stone-900">AI Dispute Evidence Evaluation</h1>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          The AgriResolve AI pipeline parses multi-party agricultural
          documentation, detects contract discrepancies (such as allowable moisture shrinkage vs weight loss),
          and compiles on-chain dispute resolution proofs for Soroban contract settlement.
        </p>

        <EvidenceUploader escrowId={2} />
      </div>

      <div className="p-6 rounded-xl bg-white border border-[#D1D9D1] text-xs space-y-4">
        <h3 className="font-bold text-stone-900 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#1E4D2B]" />
          Off-Chain AI Provenance Pipeline Architecture
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1]">
            <span className="font-bold text-[#1E4D2B] block mb-1">1. Claim Extraction</span>
            <span className="text-stone-600">
              Parses weighbridge tickets and moisture certificates into bounds and claims.
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1]">
            <span className="font-bold text-[#1E4D2B] block mb-1">2. Contradiction Audit</span>
            <span className="text-stone-600">
              AI oracle reconciles trade discrepancies against contract bylaws and standards.
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1]">
            <span className="font-bold text-[#1E4D2B] block mb-1">3. Soroban Settlement</span>
            <span className="text-stone-600">
              Emits signed split payout parameters to execute on-chain escrow resolution.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
