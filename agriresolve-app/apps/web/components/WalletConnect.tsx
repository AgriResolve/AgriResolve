"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { shortenAddress } from "../lib/stellar";

export function WalletConnect({ className }: { className?: string }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  async function connectWallet() {
    setIsConnecting(true);
    try {
      if (typeof window !== "undefined" && (window as any).freighterApi) {
        const freighter = (window as any).freighterApi;
        const res = await freighter.requestAccess();
        if (res && res.address) {
          setAddress(res.address);
          setIsConnecting(false);
          return;
        }
      }
      // Demo testnet fallback account
      setAddress("GAHYU5YGHEOI3MKA2MLW2O46YY74SHBLC4JTVGWN36LH7LL7FFF4O6SS");
    } catch (err) {
      console.error("Wallet connection error:", err);
    } finally {
      setIsConnecting(false);
    }
  }

  function disconnect() {
    setAddress(null);
  }

  if (address) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={disconnect}
          className={`flex items-center gap-2 px-4 py-2 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-white text-xs font-mono font-medium transition-colors border border-[#1E4D2B] ${className || ""}`}
          title="Click to disconnect"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-stone-200" />
          <span>{shortenAddress(address)}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className={`px-4 py-2 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-white text-sm font-medium transition-colors border border-[#1E4D2B] cursor-pointer ${className || ""}`}
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
