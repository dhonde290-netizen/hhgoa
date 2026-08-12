import React from 'react';

export function HackerHouseGoaLogo({ className = "h-10", variant = "default" }) {
  return (
    <div className={`inline-flex items-center select-none font-serif ${className}`}>
      <span className="font-extrabold uppercase tracking-tight text-amber-400 font-serif text-2xl sm:text-3xl leading-none">
        HACKER
      </span>
      <span className="inline-block mx-1 font-serif font-black text-pink-500 bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/40 text-xl sm:text-2xl transform -rotate-6 shadow-sm">
        गोवा
      </span>
      <span className="font-extrabold uppercase tracking-tight text-amber-400 font-serif text-2xl sm:text-3xl leading-none">
        HOUSE
      </span>
    </div>
  );
}

export function OfficialBannerLogo({ className = "w-full" }) {
  return (
    <div className={`bg-[#084c2e] text-[#f5be16] p-4 sm:p-6 rounded-2xl border-2 border-[#f5be16]/40 shadow-xl text-center space-y-2 select-none ${className}`}>
      <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
        <span className="font-serif font-black tracking-widest text-yellow-400 text-3xl sm:text-5xl md:text-6xl uppercase leading-none drop-shadow">
          HACKER
        </span>
        <span className="font-serif font-extrabold text-[#ff007f] bg-yellow-300 text-2xl sm:text-4xl md:text-5xl px-2 py-0.5 rounded-lg border-2 border-[#ff007f] transform -rotate-6 shadow-md mx-1">
          गोवा
        </span>
        <span className="font-serif font-black tracking-widest text-yellow-400 text-3xl sm:text-5xl md:text-6xl uppercase leading-none drop-shadow">
          HOUSE
        </span>
      </div>

      <div className="flex items-center justify-between text-[9px] sm:text-xs font-mono font-bold text-emerald-200 border-t border-emerald-700/60 pt-2 px-2">
        <span>GOA, INDIA • 28 – 31 OCT 2026</span>
        <span>HACKER HOUSE GOA 2026</span>
      </div>
    </div>
  );
}
