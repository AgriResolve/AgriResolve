"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // On the dashboard page, hide footer to match the clean full-screen mockup
  if (pathname === "/dashboard") {
    return null;
  }

  return (
    <footer className="border-t border-[#D3CFC9] bg-white py-6 text-center text-xs text-stone-600">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-semibold text-stone-700">
          AgriResolve &bull; Simple, Safe Farm Deals &amp; Fair Dispute Settlement
        </p>
        <p className="text-stone-500 text-[11px]">
          Protected Holding &bull; Verified Produce Delivery &bull; Proof-Based Pay
        </p>
      </div>
    </footer>
  );
}
