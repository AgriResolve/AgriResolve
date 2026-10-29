"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../lib/auth";
import { LeafLogo } from "./LeafLogo";
import { LogOut, User } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // On /dashboard, the page renders its own top header matching the reference mockup
  if (pathname === "/dashboard") {
    return null;
  }

  return (
    <header className="border-b border-[#D3CFC9] bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Leaf SVG + Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LeafLogo className="w-7 h-7 text-[#1E4D2B]" />
            <span className="font-black text-xl tracking-tight text-stone-900">
              AgriResolve
            </span>
          </Link>

          {/* Navigation Links: Strict rule: NO "Dashboard" or "Dispute Center" in navbar */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#how-it-works"
              className="text-sm font-semibold text-stone-700 hover:text-[#1E4D2B] transition-colors"
            >
              How It Works
            </Link>

            <Link
              href="/escrows"
              className={`text-sm font-semibold transition-colors ${
                pathname === "/escrows"
                  ? "text-[#1E4D2B] font-bold border-b-2 border-[#1E4D2B] pb-0.5"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              Deals Registry
            </Link>

            <Link
              href="/docs"
              className={`text-sm font-semibold transition-colors ${
                pathname === "/docs"
                  ? "text-[#1E4D2B] font-bold border-b-2 border-[#1E4D2B] pb-0.5"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              Guides &amp; FAQ
            </Link>
          </nav>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#FAF9F5] border border-[#D3CFC9] text-xs font-semibold text-stone-800 hover:bg-[#EBF3EA] transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#1E4D2B]" />
                <span className="capitalize">{user.role}:</span>
                <span className="font-bold text-stone-900 truncate max-w-[120px]">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-1.5 rounded-md border border-[#D3CFC9] hover:bg-stone-100 text-stone-600 hover:text-red-700 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-md border border-[#D3CFC9] bg-white text-stone-800 hover:bg-stone-50 text-xs font-bold transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-md bg-[#1E4D2B] hover:bg-[#163820] text-white text-xs font-bold transition-colors"
              >
                Start a Secure Deal
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
