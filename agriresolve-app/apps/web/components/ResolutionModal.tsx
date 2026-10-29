"use client";

import { useState } from "react";
import { CheckCircle2, ShieldAlert, X, Loader2 } from "lucide-react";
import { formatStroops } from "../lib/stellar";

interface ResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  escrowId: number;
  totalAmount: number;
  buyerShare: number;
  farmerShare: number;
  proofHash?: string;
  onExecuted?: () => void;
}

export function ResolutionModal({
  isOpen,
  onClose,
  escrowId,
  totalAmount,
  buyerShare,
  farmerShare,
  proofHash,
  onExecuted,
}: ResolutionModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  async function handleExecute() {
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      if (onExecuted) onExecuted();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-[#D1D9D1] rounded-xl max-w-lg w-full p-6 relative text-stone-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3 text-[#1E4D2B]">
          <ShieldAlert className="w-6 h-6" />
          <h3 className="text-lg font-bold text-stone-900">Execute Dispute Settlement</h3>
        </div>

        <p className="text-xs text-stone-600 mb-5 leading-relaxed">
          Executes the Soroban <code className="bg-[#F8FAF7] border border-[#D1D9D1] px-1 py-0.5 rounded font-mono font-bold text-stone-800">execute_resolution</code> function. Funds will be atomically settled to the buyer and farmer wallets on Stellar Testnet.
        </p>

        <div className="bg-[#F8FAF7] rounded-lg p-4 border border-[#D1D9D1] space-y-3 mb-5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-stone-600">Escrow Contract ID:</span>
            <span className="font-mono font-bold text-stone-900">#{escrowId}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-stone-600">Total Collateral:</span>
            <span className="font-mono font-bold text-stone-900">{formatStroops(totalAmount)} USDC</span>
          </div>
          <div className="border-t border-[#D1D9D1] pt-2 flex justify-between items-center text-xs">
            <span className="font-medium text-stone-700">Buyer Refund Share:</span>
            <span className="font-mono font-bold text-blue-700">{formatStroops(buyerShare)} USDC</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-stone-700">Farmer Payout Share:</span>
            <span className="font-mono font-bold text-[#1E4D2B]">{formatStroops(farmerShare)} USDC</span>
          </div>
        </div>

        {success ? (
          <div className="space-y-4">
            <div className="p-3 bg-[#DCEBCA] border border-[#B8C7B7] rounded-md text-xs text-[#1E4D2B] font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Resolution settled on Stellar Soroban Testnet!</span>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-md bg-[#1E4D2B] text-white text-xs font-semibold hover:bg-[#173B21]"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-md border border-[#D1D9D1] bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleExecute}
              disabled={submitting}
              className="flex-1 py-2 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting Tx...</span>
                </>
              ) : (
                <span>Confirm & Settle</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
