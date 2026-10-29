import React from "react";

export function LeafLogo({ className = "w-7 h-7 text-[#1E4D2B]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Right taller leaf */}
      <path
        d="M17 28C17 28 26 21 26 11C26 5.5 21.5 4 21.5 4C21.5 4 20 8 15.5 13.5C11 19 17 28 17 28Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 26L21.5 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Left angled leaf */}
      <path
        d="M16 21C16 21 8.5 19 6 13C4 8 8.5 7 8.5 7C8.5 7 11 9.5 14 14"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 20L8.5 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
