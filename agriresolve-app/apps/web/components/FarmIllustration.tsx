import React from "react";

export function FarmIllustration({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <div className={`relative bg-[#F4F7F2] border border-[#D3CFC9] rounded-xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between ${className}`}>
      {/* Decorative Warm Farm Landscape SVG */}
      <svg
        viewBox="0 0 500 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto rounded-lg"
      >
        {/* Soft Sky & Warm Morning Sun */}
        <rect width="500" height="320" rx="8" fill="#F4F8F2" />
        <circle cx="410" cy="70" r="45" fill="#FDECC8" />
        <circle cx="410" cy="70" r="32" fill="#FAD994" />

        {/* Distant Hills */}
        <path
          d="M0 190C60 160 140 170 220 185C300 200 400 170 500 180V320H0V190Z"
          fill="#D9E7D2"
        />
        <path
          d="M0 215C90 195 190 220 300 205C390 190 450 210 500 215V320H0V215Z"
          fill="#BFD7B5"
        />

        {/* Traditional Red Barn & Silo (Distant Left) */}
        {/* Silo */}
        <rect x="75" y="115" width="28" height="75" rx="14" fill="#DCE3D9" stroke="#879585" strokeWidth="1.5" />
        <ellipse cx="89" cy="118" rx="14" ry="7" fill="#879585" />
        {/* Barn Base */}
        <rect x="105" y="125" width="85" height="65" fill="#B34A3C" stroke="#7A2D22" strokeWidth="1.5" />
        {/* Barn Roof */}
        <polygon points="98,125 147.5,90 197,125" fill="#8A2E22" stroke="#5C1B12" strokeWidth="1.5" />
        {/* Barn Door with X brace */}
        <rect x="133" y="152" width="28" height="38" fill="#FFFFFF" stroke="#7A2D22" strokeWidth="1.2" />
        <line x1="133" y1="152" x2="161" y2="190" stroke="#7A2D22" strokeWidth="1.2" />
        <line x1="161" y1="152" x2="133" y2="190" stroke="#7A2D22" strokeWidth="1.2" />
        {/* Small loft window */}
        <polygon points="147.5,108 141,118 154,118" fill="#FFFFFF" />

        {/* Green Crop Rows & Furrows */}
        <path d="M0 250Q150 240 500 255" stroke="#9EBA93" strokeWidth="2.5" strokeDasharray="6 4" />
        <path d="M0 275Q200 265 500 280" stroke="#9EBA93" strokeWidth="2.5" strokeDasharray="6 4" />
        <path d="M0 300Q250 290 500 305" stroke="#7E9E73" strokeWidth="3" />

        {/* Green Farm Tractor (Center-Right) */}
        <g transform="translate(230, 150)">
          {/* Tractor Engine Hood & Body */}
          <rect x="35" y="45" width="65" height="32" rx="4" fill="#2D6A4F" stroke="#1B4332" strokeWidth="2" />
          {/* Engine Grille */}
          <line x1="94" y1="50" x2="94" y2="72" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="50" x2="90" y2="72" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" />
          <circle cx="97" cy="53" r="3.5" fill="#FAD994" stroke="#1B4332" strokeWidth="1" />
          {/* Exhaust Pipe */}
          <path d="M82 45V30H85" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Cabin & Frame */}
          <path d="M0 35H38V77H0V35Z" fill="#EBF3EA" stroke="#1B4332" strokeWidth="2" />
          <path d="M-5 35H43" stroke="#1B4332" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="18" y1="35" x2="18" y2="75" stroke="#1B4332" strokeWidth="1.5" />
          <circle cx="26" cy="55" r="7" fill="#40534C" />
          {/* Front Small Wheel */}
          <circle cx="90" cy="85" r="14" fill="#292524" stroke="#1C1917" strokeWidth="2" />
          <circle cx="90" cy="85" r="7" fill="#E8B931" stroke="#1C1917" strokeWidth="1.5" />
          {/* Large Rear Wheel */}
          <circle cx="15" cy="82" r="24" fill="#292524" stroke="#1C1917" strokeWidth="2.5" />
          <circle cx="15" cy="82" r="13" fill="#E8B931" stroke="#1C1917" strokeWidth="2" />
          {/* Wheel Hub */}
          <circle cx="15" cy="82" r="4" fill="#1C1917" />
        </g>

        {/* Produce Crates & Grain Sacks in Foreground */}
        <g transform="translate(50, 220)">
          {/* Jute Grain Sack 1 */}
          <path
            d="M25 65C15 65 10 40 18 20C22 10 32 10 36 20C44 40 40 65 25 65Z"
            fill="#D4B483"
            stroke="#9A7B4F"
            strokeWidth="1.5"
          />
          <path d="M22 18Q27 22 32 18" stroke="#5E4322" strokeWidth="1.5" />
          {/* Leaf mark on sack */}
          <path d="M24 35C24 35 30 32 30 26C30 23 28 23 28 23C28 23 26 27 24 35Z" fill="#2D6A4F" />

          {/* Jute Grain Sack 2 */}
          <path
            d="M48 68C38 68 35 45 42 25C45 15 55 15 58 25C65 45 62 68 48 68Z"
            fill="#C8A572"
            stroke="#9A7B4F"
            strokeWidth="1.5"
          />
          <path d="M46 22Q50 26 54 22" stroke="#5E4322" strokeWidth="1.5" />

          {/* Wooden Harvest Crate */}
          <rect x="75" y="28" width="55" height="40" rx="3" fill="#B3804D" stroke="#7A4E23" strokeWidth="1.5" />
          <line x1="75" y1="41" x2="130" y2="41" stroke="#7A4E23" strokeWidth="1.5" />
          <line x1="75" y1="54" x2="130" y2="54" stroke="#7A4E23" strokeWidth="1.5" />
          {/* Fresh Produce in Crate */}
          <circle cx="87" cy="24" r="7" fill="#E76F51" />
          <circle cx="98" cy="22" r="8" fill="#F4A261" />
          <circle cx="110" cy="23" r="7.5" fill="#E76F51" />
          <circle cx="120" cy="25" r="6" fill="#F4A261" />
          <path d="M96 16Q100 10 102 16" stroke="#2D6A4F" strokeWidth="1.5" fill="none" />
          <path d="M108 17Q112 11 114 17" stroke="#2D6A4F" strokeWidth="1.5" fill="none" />

          {/* Second Crate (Golden Grain / Wheat) */}
          <rect x="135" y="34" width="50" height="34" rx="3" fill="#A47242" stroke="#7A4E23" strokeWidth="1.5" />
          <line x1="135" y1="46" x2="185" y2="46" stroke="#7A4E23" strokeWidth="1.5" />
          <line x1="135" y1="57" x2="185" y2="57" stroke="#7A4E23" strokeWidth="1.5" />
          {/* Wheat Stalks */}
          <path d="M145 28C145 20 152 14 152 14C152 14 158 20 158 28" fill="#F2CC8F" stroke="#C99E55" strokeWidth="1" />
          <path d="M160 26C160 18 167 12 167 12C167 12 173 18 173 26" fill="#F2CC8F" stroke="#C99E55" strokeWidth="1" />
        </g>
      </svg>

      {/* Grounded Farmer-Friendly Trust Badge Overlay */}
      <div className="mt-3 bg-white border border-[#D3CFC9] rounded-lg p-3 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E4D2B]" />
          <span className="font-bold text-stone-900">Protected Agricultural Trade:</span>
          <span className="text-stone-600">Money safely held &bull; Produce verified &bull; Fair pay</span>
        </div>
        <span className="bg-[#E4EDE2] text-[#1E4D2B] font-bold text-[10px] px-2 py-0.5 rounded">
          Guaranteed Safe
        </span>
      </div>
    </div>
  );
}
