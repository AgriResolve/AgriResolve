"use client";

import Link from "next/link";
import { TradeDetails, formatStroops, shortenAddress, getStateBadge } from "../lib/stellar";
import { ArrowUpRight } from "lucide-react";

interface TradeCardProps {
  trade: TradeDetails;
}

export function TradeCard({ trade }: TradeCardProps) {
  const badge = getStateBadge(trade.state);

  return (
    <div className="bg-white border border-[#D1D9D1] rounded-xl p-5 hover:border-[#1E4D2B] transition-colors flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F8FAF7] border border-[#D1D9D1] text-stone-800">
              #{trade.id}
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded font-medium ${badge.color}`}
            >
              {badge.label}
            </span>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            {new Date(trade.createdAt * 1000).toLocaleDateString()}
          </span>
        </div>

        {trade.commodity && (
          <div className="text-xs font-semibold text-stone-700 mb-2">
            {trade.commodity}
          </div>
        )}

        <div className="mb-4">
          <div className="text-2xl font-bold text-stone-900 flex items-baseline gap-1.5">
            {formatStroops(trade.amount)}
            <span className="text-xs font-bold text-[#1E4D2B]">USDC</span>
          </div>
        </div>

        <div className="space-y-2 text-xs border-t border-[#D1D9D1] pt-3">
          <div className="flex justify-between items-center text-stone-600">
            <span className="font-medium">Buyer:</span>
            <span className="font-mono text-stone-900 font-semibold">{shortenAddress(trade.buyer)}</span>
          </div>
          <div className="flex justify-between items-center text-stone-600">
            <span className="font-medium">Farmer:</span>
            <span className="font-mono text-stone-900 font-semibold">{shortenAddress(trade.farmer)}</span>
          </div>
          <div className="flex justify-between items-center text-stone-600">
            <span className="font-medium">Arbiter:</span>
            <span className="font-mono text-stone-600">{shortenAddress(trade.arbiter)}</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#D1D9D1]">
        <Link
          href={`/trade/${trade.id}`}
          className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-xs font-semibold text-white transition-colors"
        >
          <span>Manage Trade</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
