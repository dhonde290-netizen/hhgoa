import React from 'react';
import { SKILL_TAG_OPTIONS, BADGE_STICKERS } from '../utils/titles';
import { Compass } from 'lucide-react';

export function CardMarioMiranda({ data, cardRef }) {
  const selectedSkills = SKILL_TAG_OPTIONS.filter((s) => data.skills?.includes(s.id));
  const selectedStickers = BADGE_STICKERS.filter((st) => data.stickers?.includes(st.id));

  return (
    <div
      ref={cardRef}
      id="hhgoa-card-mariomiranda"
      className="w-[440px] h-[690px] relative flex flex-col justify-center items-center overflow-hidden select-none font-outfit filter shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-xl bg-white/10 rounded-[12px]"
    >
      {/* POSTAGE STAMP JAGGED BORDER SVG BACKGROUND */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 440 690"
      >
        <defs>
          {/* Create a pattern for the scalloped edge */}
          <pattern id="scallop" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="10" fill="transparent" />
            <path d="M0,0 h20 v20 h-20 Z" fill="#ffffff" mask="url(#hole)" />
          </pattern>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="10" cy="10" r="7" fill="black" />
          </mask>
        </defs>

        {/* Base white paper of the stamp */}
        <rect x="0" y="0" width="440" height="690" fill="rgba(255, 255, 255, 0.7)" mask="url(#stampMask)" />
        
        {/* Draw circles along the edges and cut them out using a mask */}
        <mask id="stampMask">
          <rect x="0" y="0" width="440" height="690" fill="white" />
          {/* Top edge holes */}
          {Array.from({ length: 23 }).map((_, i) => (
            <circle key={`t${i}`} cx={10 + i * 20} cy="0" r="7" fill="black" />
          ))}
          {/* Bottom edge holes */}
          {Array.from({ length: 23 }).map((_, i) => (
            <circle key={`b${i}`} cx={10 + i * 20} cy="690" r="7" fill="black" />
          ))}
          {/* Left edge holes */}
          {Array.from({ length: 36 }).map((_, i) => (
            <circle key={`l${i}`} cx="0" cy={10 + i * 20} r="7" fill="black" />
          ))}
          {/* Right edge holes */}
          {Array.from({ length: 36 }).map((_, i) => (
            <circle key={`r${i}`} cx="440" cy={10 + i * 20} r="7" fill="black" />
          ))}
        </mask>
        
        {/* Apply the mask to make the jagged stamp shape */}
        <rect x="0" y="0" width="440" height="690" fill="#fcfbf7" mask="url(#stampMask)" />

        {/* Vintage Beige Inner Background */}
        <rect x="25" y="25" width="390" height="640" fill="#eaddc5" mask="url(#stampMask)" />
        {/* Inner thin stroke */}
        <rect x="25" y="25" width="390" height="640" fill="none" stroke="#685a4a" strokeWidth="2" />
        <rect x="30" y="30" width="380" height="630" fill="none" stroke="#685a4a" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between" style={{ clipPath: 'inset(25px)' }}>
        
        {/* TOP: "Goa" Typography in Vintage Teal */}
        <div className="w-full text-center mt-2">
          <h1 className="text-8xl font-serif text-[#0c8a9e] tracking-tight" style={{ fontFamily: 'var(--font-rozha)' }}>
            Goa
          </h1>
          <div className="text-[#685a4a] text-xs font-mono font-bold tracking-[0.3em] uppercase -mt-2">
            Hacker House 2026
          </div>
        </div>

        {/* MIDDLE: Integrated Photo & Illustration */}
        <div className="relative w-full flex-grow my-6 flex flex-col items-center justify-end">
          
          {/* User Photo Frame (Vintage Polarid Style) */}
          <div className="relative z-20 w-44 h-48 bg-[#fdfcf8] p-2 pb-8 shadow-lg border border-[#d1c8b8] transform -rotate-3 mb-20 transition-transform">
            <div className="w-full h-full bg-[#1a1a1a] overflow-hidden">
              {data.photoUrl ? (
                <img src={data.photoUrl} alt="Builder" className="w-full h-full object-cover sepia-[0.3] contrast-125" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono text-xs">
                  NO PHOTO
                </div>
              )}
            </div>
            {/* Title written on the polaroid */}
            <div className="absolute bottom-2 left-0 w-full text-center text-[#685a4a] font-serif text-[10px] font-bold">
              {data.builderTitle || "Terminal Wizard"}
            </div>
            {/* Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-800 shadow-md border border-red-900 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 opacity-80 ml-0.5 mt-0.5" />
            </div>
          </div>

          {/* SVG Illustration: Beach, Stilt Houses, Palms */}
          <div className="absolute bottom-0 left-0 w-full h-56 pointer-events-none z-10">
            <svg viewBox="0 0 380 224" className="w-full h-full preserve-3d">
              {/* Ocean / Shoreline */}
              <path d="M-10,180 Q100,160 200,190 T400,170 L400,230 L-10,230 Z" fill="#f5bc1a" />
              <path d="M-10,195 Q80,210 180,195 T400,210 L400,230 L-10,230 Z" fill="#69b8c0" />
              <path d="M-10,210 Q90,225 190,210 T400,220 L400,230 L-10,230 Z" fill="#4298a2" />
              
              {/* Hill background */}
              <path d="M-10,180 Q80,120 160,170 Q190,190 220,180 L220,230 L-10,230 Z" fill="#4298a2" opacity="0.9" />
              <path d="M50,150 Q100,130 140,160 Q120,170 90,165 Z" fill="#2d6f77" opacity="0.6" />

              {/* Palm Trees */}
              <g stroke="#2d6f77" strokeWidth="1.5" fill="none">
                {/* Tree 1 */}
                <path d="M220,170 Q215,100 200,80" strokeWidth="2" />
                <path d="M200,80 Q180,90 190,110" />
                <path d="M200,80 Q190,70 170,80" />
                <path d="M200,80 Q210,60 220,70" />
                <path d="M200,80 Q220,85 230,100" />
                {/* Tree 2 */}
                <path d="M260,175 Q255,120 245,105" strokeWidth="2" />
                <path d="M245,105 Q230,110 235,125" />
                <path d="M245,105 Q235,95 220,100" />
                <path d="M245,105 Q255,90 265,100" />
                <path d="M245,105 Q260,115 270,125" />
                {/* Tree 3 */}
                <path d="M300,170 Q290,100 270,75" strokeWidth="2" />
                <path d="M270,75 Q250,85 255,105" />
                <path d="M270,75 Q260,60 240,70" />
                <path d="M270,75 Q285,55 300,65" />
                <path d="M270,75 Q290,85 305,105" />
              </g>

              {/* Stilt Houses */}
              <g>
                {/* House 1 */}
                <rect x="180" y="150" width="30" height="25" fill="#f5bc1a" stroke="#2d6f77" strokeWidth="1" />
                <polygon points="175,150 195,135 215,150" fill="#e89f10" stroke="#2d6f77" strokeWidth="1" />
                <rect x="190" y="160" width="10" height="15" fill="#2d6f77" />
                <line x1="185" y1="175" x2="185" y2="190" stroke="#2d6f77" strokeWidth="1.5" />
                <line x1="205" y1="175" x2="205" y2="190" stroke="#2d6f77" strokeWidth="1.5" />

                {/* House 2 */}
                <rect x="220" y="145" width="35" height="30" fill="#f5bc1a" stroke="#2d6f77" strokeWidth="1" />
                <polygon points="215,145 237,130 260,145" fill="#e89f10" stroke="#2d6f77" strokeWidth="1" />
                <rect x="232" y="155" width="12" height="20" fill="#2d6f77" />
                <line x1="225" y1="175" x2="225" y2="195" stroke="#2d6f77" strokeWidth="1.5" />
                <line x1="250" y1="175" x2="250" y2="195" stroke="#2d6f77" strokeWidth="1.5" />

                {/* House 3 */}
                <rect x="265" y="135" width="45" height="40" fill="#f5bc1a" stroke="#2d6f77" strokeWidth="1" />
                <polygon points="255,135 287,115 315,135" fill="#e89f10" stroke="#2d6f77" strokeWidth="1" />
                <rect x="282" y="150" width="15" height="25" fill="#2d6f77" />
                <line x1="275" y1="175" x2="275" y2="200" stroke="#2d6f77" strokeWidth="1.5" />
                <line x1="300" y1="175" x2="300" y2="200" stroke="#2d6f77" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>

        {/* BOTTOM: Pass Details */}
        <div className="w-full relative z-30 bg-[#fcfbf7]/90 backdrop-blur-sm p-4 border-2 border-[#685a4a] text-[#2d6f77] flex flex-col gap-2">
          {/* Name & Origin */}
          <div className="flex justify-between items-end border-b border-[#685a4a]/30 pb-2">
            <div>
              <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#685a4a]">Builder Identity</div>
              <div className="text-2xl font-serif font-bold uppercase tracking-wide">
                {data.name || "BUILDER"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[8px] font-mono font-bold uppercase text-[#685a4a]">From</div>
              <div className="text-sm font-bold font-mono tracking-widest">
                {data.originCity || "PUNE"}
              </div>
            </div>
          </div>

          {/* Skills & Stickers */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="text-[8px] font-mono font-bold uppercase text-[#685a4a]">Verified Skills</div>
            <div className="flex flex-wrap gap-1">
              {selectedSkills.length > 0 && (
                selectedSkills.map((s) => (
                  <span key={s.id} className="px-2 py-0.5 bg-[#eaddc5] border border-[#685a4a] text-[#2d6f77] text-[9px] font-mono font-bold uppercase tracking-wider">
                    {s.label}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Issue Details & Barcode */}
          <div className="flex justify-between items-end mt-2 pt-2 border-t border-[#685a4a]/30">
            <div className="text-[8px] font-mono font-bold tracking-widest uppercase text-[#685a4a] flex flex-col gap-0.5">
              <span>Pass No: {data.builderId || "HH-GOA-2026-5300"}</span>
              <span>Issued: OCT 2026</span>
            </div>
            
            {/* Stamp Cancellation Mark (Postmark) */}
            <div className="absolute right-6 -top-12 w-24 h-24 border-[3px] border-[#d84040]/60 rounded-full flex items-center justify-center transform rotate-12 pointer-events-none opacity-80">
              <div className="w-[86px] h-[86px] border border-[#d84040]/40 rounded-full flex flex-col items-center justify-center text-[#d84040]/80">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">POSTED</span>
                <span className="text-[14px] font-serif font-bold">GOA</span>
                <span className="text-[8px] font-mono font-bold">28 X 2026</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
