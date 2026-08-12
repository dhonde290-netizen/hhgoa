import React from 'react';

export function CardCyberGoa({ data, cardRef }) {
  return (
    <div
      ref={cardRef}
      id="hhgoa-card-cyber"
      className="w-[700px] h-[390px] bg-gradient-to-br from-[#0c2a21] via-[#091e18] to-[#04110d] text-white p-6 rounded-[32px] shadow-2xl relative flex items-center justify-between overflow-hidden border-[4px] border-emerald-500/40 select-none font-outfit"
    >
      {/* Background Cyber Waves texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Glow Orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />

      {/* LEFT SECTION: Photo Frame with Glowing Rings */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Outer Circular Ring with Curved Text */}
        <div className="relative w-56 h-56 rounded-full p-2.5 bg-gradient-to-tr from-emerald-500 via-amber-400 to-pink-500 shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0c2a21] bg-slate-900 shadow-inner">
            <img src={data.photoUrl} alt={data.name} className="w-full h-full object-cover" />
          </div>

          {/* Overlaid Goa Hindi Badge */}
          <div className="absolute -bottom-2 bg-gradient-to-r from-pink-500 to-amber-500 text-white font-serif font-black text-xl px-4 py-0.5 rounded-full shadow-lg border-2 border-[#0c2a21]">
            गोवा
          </div>
        </div>

        <div className="mt-3 text-[10px] font-extrabold tracking-widest text-emerald-400 uppercase flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>OCT 28-31 • 2026</span>
        </div>
      </div>

      {/* RIGHT SECTION: Typography & Event Details */}
      <div className="relative z-10 flex-1 pl-8 flex flex-col justify-between h-full py-2">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 tracking-widest uppercase">
            <span>HACKER HOUSE GOA</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>GOA 2026</span>
          </div>
          <h2 className="text-4xl font-black font-serif text-white tracking-tight leading-none mt-1">
            HACKER HOUSE
          </h2>
          <p className="text-xs font-mono text-emerald-300/80 mt-1">
            GOA • OCT 28–31 2026
          </p>
        </div>

        {/* Builder Name & Generated Title */}
        <div className="my-auto py-4 border-y border-emerald-500/20">
          <div className="text-[10px] font-extrabold tracking-widest uppercase text-pink-400">
            A BUILDER
          </div>
          <h3 className="text-2xl font-black tracking-wide text-white uppercase mt-0.5">
            {data.name || "BUILDER NAME"}
          </h3>
          <div className="text-sm font-semibold text-emerald-300 flex items-center gap-2 mt-1 font-mono">
            <span className="text-pink-500 font-bold">»</span>
            <span>{data.builderTitle || "ASYNC CUSTODIAN"}</span>
          </div>
        </div>

        {/* Footer Details & QR */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-400 tracking-wider">
              LESS NOISE. MORE SIGNAL.
            </div>
            <div className="text-sm font-bold text-amber-400 tracking-widest">
              hhgoa.com
            </div>
          </div>

          {/* Micro Barcode & Tag */}
          <div className="flex items-center gap-3 bg-slate-950/60 p-2 rounded-xl border border-emerald-500/30">
            <div className="text-right">
              <div className="text-[9px] font-mono text-emerald-400 font-bold">
                {data.builderId || "#HH-GOA-5300"}
              </div>
              <div className="text-[7px] text-slate-400 uppercase font-semibold">
                #FRAMEINGOA
              </div>
            </div>
            <div className="w-8 h-8 bg-white p-0.5 rounded border border-emerald-400">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                <rect x="10" y="10" width="35" height="35" fill="currentColor"/>
                <rect x="55" y="10" width="35" height="35" fill="currentColor"/>
                <rect x="10" y="55" width="35" height="35" fill="currentColor"/>
                <rect x="55" y="55" width="35" height="35" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
