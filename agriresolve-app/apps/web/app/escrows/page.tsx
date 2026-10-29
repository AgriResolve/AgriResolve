"use client";

import { useState } from "react";
import Link from "next/link";
import { TradeCard } from "../../components/TradeCard";
import { EscrowState, DEMO_TRADES } from "../../lib/stellar";
import { ShieldCheck, PlusCircle } from "lucide-react";

export default function EscrowsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredTrades = DEMO_TRADES.filter((trade) => {
    if (filter === "disputed") return trade.state === EscrowState.Disputed;
    if (filter === "active")
      return trade.state === EscrowState.Funded || trade.state === EscrowState.Delivered;
    if (filter === "resolved") return trade.state === EscrowState.Resolved;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#D1D9D1] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#DCEBCA] text-[#1E4D2B] text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Public Escrow Registry</span>
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Agricultural Escrow Trades
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Soroban smart contracts securing commodity shipments with automated oracle arbitration
          </p>
        </div>

        <Link
          href="/trade/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-white text-xs font-semibold transition-colors self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Initiate New Trade</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D1D9D1] pb-2">
        {[
          { id: "all", label: "All Contracts" },
          { id: "active", label: "Active & Funded" },
          { id: "disputed", label: "In Dispute" },
          { id: "resolved", label: "Resolved" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              filter === tab.id
                ? "bg-[#1E4D2B] text-white"
                : "bg-white text-stone-700 border border-[#D1D9D1] hover:bg-stone-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Trades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrades.map((trade) => (
          <TradeCard key={trade.id} trade={trade} />
        ))}
      </div>
    </div>
  );
}
