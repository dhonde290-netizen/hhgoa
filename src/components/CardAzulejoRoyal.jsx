import React from 'react';
import { SKILL_TAG_OPTIONS, BADGE_STICKERS } from '../utils/titles';

export function CardAzulejoRoyal({ data, cardRef }) {
  const selectedSkills = SKILL_TAG_OPTIONS.filter((s) => data.skills?.includes(s.id));
  const selectedStickers = BADGE_STICKERS.filter((st) => data.stickers?.includes(st.id));

  return (
    <div
      ref={cardRef}
      id="hhgoa-card-azulejo"
      className="w-[440px] h-[690px] relative flex flex-col justify-between overflow-hidden select-none font-outfit filter shadow-[0_8px_32px_rgba(0,0,0,0.15)] bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl"
    >
      {/* GLOSSY CERAMIC TILE EFFECT & AZULEJO BORDER */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 440 690">
        <defs>
          <linearGradient id="ceramicGloss" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="20%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
          </linearGradient>
          {/* Tile Pattern for the border */}
          <pattern id="azulejoPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="white" />
            <path d="M20,0 Q40,20 20,40 Q0,20 20,0 Z" fill="#1e3a8a" opacity="0.1" />
            <path d="M20,5 Q35,20 20,35 Q5,20 20,5 Z" fill="#1e3a8a" />
            <circle cx="20" cy="20" r="5" fill="white" />
            <circle cx="20" cy="20" r="2" fill="#1e3a8a" />
            {/* Corner flourishes */}
            <path d="M0,0 Q10,0 10,10 Q0,10 0,0" fill="#1e40af" />
            <path d="M40,0 Q30,0 30,10 Q40,10 40,0" fill="#1e40af" />
            <path d="M0,40 Q10,40 10,30 Q0,30 0,40" fill="#1e40af" />
            <path d="M40,40 Q30,40 30,30 Q40,30 40,40" fill="#1e40af" />
          </pattern>
        </defs>
        
        {/* Border using pattern */}
        <rect x="0" y="0" width="440" height="690" fill="url(#azulejoPattern)" />
        {/* Inner white tile body */}
        <rect x="35" y="35" width="370" height="620" fill="white" />
        
        {/* Inner thin borders */}
        <rect x="40" y="40" width="360" height="610" fill="none" stroke="#1e3a8a" strokeWidth="3" />
        <rect x="46" y="46" width="348" height="598" fill="none" stroke="#1e3a8a" strokeWidth="1" />
        
        {/* Ceramic Gloss Overlay */}
        <rect x="0" y="0" width="440" height="690" fill="url(#ceramicGloss)" />
        
        {/* Corner Ornaments */}
        <g fill="#1e3a8a">
          <circle cx="56" cy="56" r="4" />
          <circle cx="384" cy="56" r="4" />
          <circle cx="56" cy="634" r="4" />
          <circle cx="384" cy="634" r="4" />
        </g>
      </svg>

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full h-full p-16 flex flex-col items-center">
        
        {/* HEADER: Font mimicking hand-painted tile text */}
        <div className="w-full text-center mb-6">
          <h1 className="text-4xl font-serif text-[#1e3a8a] uppercase tracking-widest font-bold" style={{ fontFamily: 'var(--font-cinzel)' }}>
            Hacker House
          </h1>
          <div className="text-2xl font-serif text-[#1e40af] uppercase tracking-widest italic font-light mt-1" style={{ fontFamily: 'var(--font-cinzel)' }}>
            ~ Goa 2026 ~
          </div>
        </div>

        {/* PHOTO FRAME: Classic Portuguese Arch */}
        <div className="relative w-48 h-56 mb-8 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 240">
            <path d="M10,120 A90,90 0 0,1 190,120 L190,230 L10,230 Z" fill="none" stroke="#1e3a8a" strokeWidth="3" />
            <path d="M16,120 A84,84 0 0,1 184,120 L184,224 L16,224 Z" fill="none" stroke="#1e3a8a" strokeWidth="1" />
          </svg>
          <div className="relative z-10 w-[164px] h-[208px] overflow-hidden mt-[10px]" style={{ borderTopLeftRadius: '82px', borderTopRightRadius: '82px' }}>
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Builder" className="w-full h-full object-cover filter contrast-125 saturate-50" />
            ) : (
              <div className="w-full h-full bg-[#f0f4f8] flex items-center justify-center text-[#1e3a8a] text-xs font-serif italic text-center p-4">
                Retrato do Construtor<br/>(Photo)
              </div>
            )}
            {/* Tile Blue Overlay for Photo */}
            <div className="absolute inset-0 bg-[#1e3a8a] opacity-20 mix-blend-color" />
          </div>
        </div>

        {/* BUILDER DETAILS */}
        <div className="w-full text-center flex flex-col gap-3">
          <div>
            <div className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#1e40af]">Nome do Construtor</div>
            <div className="text-3xl font-serif font-bold text-[#1e3a8a] uppercase tracking-wider" style={{ fontFamily: 'var(--font-cinzel)' }}>
              {data.name || "BUILDER"}
            </div>
          </div>
          
          <div className="w-16 h-[1px] bg-[#1e3a8a] mx-auto opacity-50" />
          
          <div>
            <div className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#1e40af]">Origem</div>
            <div className="text-lg font-serif text-[#1e3a8a] uppercase tracking-widest">
              {data.originCity || "PUNE"}
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="text-[9px] font-serif uppercase tracking-[0.2em] text-[#1e40af]">Especialidades</div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {selectedSkills.length > 0 ? (
                selectedSkills.map((s) => (
                  <span key={s.id} className="px-2 py-0.5 bg-white border border-[#1e3a8a] text-[#1e3a8a] text-[9px] font-serif uppercase tracking-wider">
                    {s.label}
                  </span>
                ))
              ) : (
                <span className="px-2 py-0.5 bg-white border border-[#1e3a8a] text-[#1e3a8a] text-[9px] font-serif uppercase tracking-wider">
                  REACT • PYTHON
                </span>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER BADGE */}
        <div className="absolute bottom-16 w-full text-center flex justify-center">
          <div className="px-6 py-2 border-t border-b border-[#1e3a8a] text-[#1e3a8a]">
            <div className="text-[10px] font-serif uppercase tracking-[0.3em]">Pass No.</div>
            <div className="text-sm font-serif font-bold tracking-widest mt-0.5">
              {data.builderId || "HH-GOA-2026-5300"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
