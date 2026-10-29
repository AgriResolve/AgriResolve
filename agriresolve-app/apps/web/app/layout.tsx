import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { AuthProvider } from "../lib/auth";

export const metadata: Metadata = {
  title: "AgriResolve | Simple & Secure Farm Trade",
  description:
    "Fair trade, zero disputes. Secure your farm deals and resolve disagreements without the stress using proof-based holding.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
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
        </AuthProvider>
      </body>
    </html>
  );
}
