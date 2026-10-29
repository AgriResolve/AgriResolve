import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { AuthProvider } from "../lib/auth";

export const metadata: Metadata = {
  title: "AgriResolve | B2B Agricultural Escrow & Dispute Resolution",
  description:
    "Utilitarian Soroban-powered escrow protocol integrating autonomous AI evidence arbitration with immutable on-chain financial settlement on Stellar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#E4EDE2] text-stone-900 flex flex-col font-sans">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <footer className="border-t border-[#D1D9D1] bg-white py-6 text-center text-xs text-stone-600">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="font-medium text-stone-700">
                AgriResolve Protocol • B2B Agricultural Escrow on Stellar Soroban
              </p>
              <p className="text-stone-500 font-mono text-[11px]">
                Contract: CAPZ2NHR5OYR45...OGITQ4 (Testnet)
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
