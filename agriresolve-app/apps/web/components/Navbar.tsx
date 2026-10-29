"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../lib/auth";
import { WalletConnect } from "./WalletConnect";
import { LeafLogo } from "./LeafLogo";
import { LogOut, User } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Only show Dashboard in navigation if user is logged in
  const navLinks = [
    ...(user ? [{ href: "/dashboard", label: "Dashboard" }] : []),
    { href: "/escrows", label: "Escrows" },
    { href: "/disputes", label: "AI Disputes" },
    { href: "/docs", label: "Protocol Docs" },
  ];

  return (
    <header className="border-b border-[#D1D9D1] bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Leaf SVG + Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LeafLogo className="w-7 h-7 text-[#1E4D2B]" />
            <span className="font-bold text-xl tracking-tight text-stone-900">
              AgriResolve
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#1E4D2B] font-bold border-b-2 border-[#1E4D2B] pb-0.5"
                      : "text-stone-700 hover:text-stone-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side: Auth & Connect Wallet */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F4F7F4] border border-[#D1D9D1] text-xs font-semibold text-stone-800 hover:bg-[#E8EFE6] transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#1E4D2B]" />
                <span className="capitalize">{user.role}:</span>
                <span className="font-normal text-stone-600 truncate max-w-[120px]">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={logout}
                className="p-1.5 rounded-md border border-[#D1D9D1] hover:bg-stone-100 text-stone-600 hover:text-red-700 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
              <WalletConnect />
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-md text-stone-800 hover:text-stone-950 text-xs font-semibold transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-3.5 py-1.5 rounded-md bg-[#1E4D2B] hover:bg-[#173B21] text-white text-xs font-semibold transition-colors"
              >
                Sign Up
              </Link>
              <WalletConnect />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
