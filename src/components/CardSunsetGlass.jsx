import React from 'react';
import { SKILL_TAG_OPTIONS, BADGE_STICKERS } from '../utils/titles';

export function CardSunsetGlass({ data, cardRef }) {
  const selectedSkills = SKILL_TAG_OPTIONS.filter((s) => data.skills?.includes(s.id));
  const selectedStickers = BADGE_STICKERS.filter((st) => data.stickers?.includes(st.id));

  return (
    <div
      ref={cardRef}
      id="hhgoa-card-sunset"
      className="w-[450px] h-[700px] bg-gradient-to-b from-[#1a0c2e] via-[#0f172a] to-[#041a18] text-white p-6 rounded-[36px] shadow-2xl relative flex flex-col justify-between overflow-hidden border-[4px] border-amber-400/40 select-none font-outfit"
    >
      {/* Top Lanyard Slot Cutout */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full border-2 border-amber-400/60 z-20 flex items-center justify-center">
        <div className="w-10 h-1 bg-amber-400/40 rounded-full" />
      </div>

      {/* Glow Orbs */}
      <div className="absolute top-10 -left-10 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-10 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl" />

      {/* TOP EVENT HEADER */}
      <div className="relative z-10 text-center pt-5 space-y-1">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
          <span>HACKER HOUSE GOA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>OCT 28-31 2026</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white uppercase font-serif">
          BUILDER VIP PASS
        </h2>
        <div className="text-[10px] font-mono font-semibold text-teal-300">
          LOCATION: GOA, INDIA • #FRAMEINGOA
        </div>
      </div>

      {/* CENTER PHOTO FRAME WITH GLASS BACKDROP */}
      <div className="relative z-10 my-3 flex flex-col items-center justify-center">
        {/* Photo Box */}
        <div className="relative w-44 h-48 rounded-3xl p-2 bg-gradient-to-tr from-amber-400 via-rose-500 to-teal-400 shadow-2xl border-2 border-white/40">
          <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-950 border border-white/20">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt={data.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                No Photo
              </div>
            )}
          </div>

          {/* Level 99 Overlay Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border border-white/50 uppercase tracking-wider flex items-center gap-1">
            <span>⚡</span> LEVEL 99 HACKER
          </div>
        </div>
      </div>

      {/* USER NAME & ROLE */}
      <div className="relative z-10 text-center space-y-1.5 pt-2">
        <h3 className="text-2xl font-black tracking-widest text-white uppercase truncate px-2">
          {data.name || "BUILDER NAME"}
        </h3>
        
        <div className="text-xs font-mono font-bold text-amber-300 bg-amber-400/10 py-1 px-4 rounded-xl border border-amber-400/30 inline-block uppercase">
          » {data.builderTitle || "Terminal Wizard"}
        </div>
      </div>

      {/* SKILL TAGS */}
      <div className="relative z-10 my-2 flex flex-wrap items-center justify-center gap-1.5">
        {selectedSkills.length > 0 ? (
          selectedSkills.map((s) => (
            <span key={s.id} className="px-3 py-1 bg-slate-900/80 border border-teal-400/40 text-teal-300 text-xs font-bold rounded-xl flex items-center gap-1">
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </span>
          ))
        ) : (
          <span className="px-3 py-1 bg-slate-900/80 border border-teal-400/40 text-teal-300 text-xs font-bold rounded-xl">
            ⚛️ React / Vite • 🐍 Python
          </span>
        )}
      </div>

      {/* STICKERS */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5">
        {selectedStickers.map((st) => (
          <span key={st.id} className={`px-2.5 py-0.5 text-[10px] font-black rounded-lg shadow flex items-center gap-1 uppercase tracking-wider ${st.color}`}>
            <span>{st.icon}</span>
            <span>{st.label}</span>
          </span>
        ))}
      </div>

      {/* FOOTER DETAILS & QR */}
      <div className="relative z-10 bg-slate-950/80 p-3.5 rounded-2xl border border-white/20 flex items-center justify-between">
        <div className="text-left space-y-0.5">
          <div className="text-[9px] font-mono text-slate-400 uppercase">
            ORIGIN: <span className="text-amber-400 font-bold">{data.originCity || "PUNE"}</span>
          </div>
          <div className="text-[11px] font-mono font-bold text-teal-300">
            {data.builderId || "HH-GOA-2026-5300"}
          </div>
        </div>

        {/* QR Code graphic */}
        <div className="w-10 h-10 bg-white p-1 rounded-xl border border-teal-400 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
            <rect x="10" y="10" width="30" height="30" fill="currentColor"/>
            <rect x="60" y="10" width="30" height="30" fill="currentColor"/>
            <rect x="10" y="60" width="30" height="30" fill="currentColor"/>
            <rect x="50" y="50" width="40" height="40" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
