"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, FileText, Cpu, Upload } from "lucide-react";

interface EvidenceUploaderProps {
  escrowId?: number;
  onAnalysisComplete?: (result: any) => void;
}

export function EvidenceUploader({ escrowId = 1, onAnalysisComplete }: EvidenceUploaderProps) {
  const [scenario, setScenario] = useState("DISP-MAIZE-002-DISPUTE");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze() {
    setAnalyzing(true);
    setError(null);
    try {
      const res = await fetch("/api/disputes/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dispute_id: scenario,
          escrow_id: escrowId,
          amount: 10_000_000,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Analysis failed");
      }
      setAnalysisResult(data);
      if (onAnalysisComplete) {
        onAnalysisComplete(data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to analyze evidence");
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 space-y-4 text-stone-900">
      <div className="flex items-center gap-2 text-[#1E4D2B]">
        <Upload className="w-5 h-5" />
        <h3 className="font-bold text-stone-900">AI Dispute Evidence Intake</h3>
      </div>
      <p className="text-xs text-stone-600 leading-relaxed">
        Upload harvest manifests, weighbridge tickets, or moisture certificates. The off-chain
        oracle investigation reconciles contradictions and formats cryptographic split resolution proofs for contract execution.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-stone-800 mb-1.5">
            Select Dispute Scenario / Evidence Package:
          </label>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="w-full bg-[#F8FAF7] border border-[#D1D9D1] rounded-md px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#1E4D2B]"
          >
            <option value="DISP-MAIZE-002-DISPUTE">
              DISP-002: Core MVP (Quantity shortfall, moisture shrinkage 14.8% vs 13.5%)
            </option>
            <option value="DISP-MAIZE-003-MISSING-INSPECTION">
              DISP-003: Actionable Evidence Request (Missing destination cert)
            </option>
            <option value="DISP-MAIZE-004-CONFLICTING-RECORDS">
              DISP-004: Conflicting Records (Weighbridge discrepancy)
            </option>
          </select>
        </div>

        <div className="border-2 border-dashed border-[#B8C7B7] hover:bg-[#F2F7F2] rounded-lg p-6 text-center cursor-pointer transition-colors bg-[#F7FAF7]">
          <div className="w-10 h-10 rounded-md bg-[#1E4D2B] text-white flex items-center justify-center mx-auto mb-2">
            <FileText className="w-5 h-5" />
          </div>
          <p className="text-xs text-stone-800 font-semibold">
            Drag and drop inspection PDF / weighbridge receipt, or click to browse
          </p>
          <p className="text-[11px] text-stone-500 mt-1">Accepts PDF, PNG, JPG up to 15MB</p>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="w-full py-2.5 px-4 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Cpu className="w-4 h-4" />
          <span>{analyzing ? "Investigating Off-Chain Evidence..." : "Run AI Evidence Audit"}</span>
        </button>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {analysisResult && (
          <div className="mt-4 p-4 rounded-lg bg-[#F8FAF7] border border-[#D1D9D1] text-xs space-y-3">
            <div className="flex items-center justify-between text-[#1E4D2B] font-bold border-b border-[#D1D9D1] pb-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Audit Complete
              </span>
              <span className="font-mono text-stone-700">Escrow #{escrowId}</span>
            </div>

            <div>
              <span className="text-stone-600 font-medium block mb-1">Reasoning Summary:</span>
              <p className="text-stone-800 bg-white p-2.5 rounded border border-[#D1D9D1] leading-relaxed">
                {analysisResult.proof.reasoning_summary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded bg-white border border-[#D1D9D1]">
                <span className="text-stone-600 block text-[11px]">Buyer Refund Share</span>
                <span className="text-sm font-bold text-stone-900">
                  {(analysisResult.proof.buyer_share / 10_000_000).toFixed(2)} USDC
                </span>
              </div>
              <div className="p-2.5 rounded bg-white border border-[#D1D9D1]">
                <span className="text-stone-600 block text-[11px]">Farmer Payout Share</span>
                <span className="text-sm font-bold text-[#1E4D2B]">
                  {(analysisResult.proof.farmer_share / 10_000_000).toFixed(2)} USDC
                </span>
              </div>
            </div>

            <div className="pt-1">
              <span className="text-stone-500 block text-[11px] mb-1">Auditor Cryptographic Hash:</span>
              <span className="font-mono text-[10px] text-stone-700 break-all block bg-white p-1.5 rounded border border-[#D1D9D1]">
                {analysisResult.proof.auditor_signature}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
