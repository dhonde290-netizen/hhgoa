import React from 'react';
import { Plane } from 'lucide-react';
import { SKILL_TAG_OPTIONS } from '../utils/titles';

export function CardStickerbomb({ data }) {
  // Use user data or fallbacks
  const name = data.name || "Satoshi Nakamoto";
  const role = data.builderTitle || "Full-Stack Developer";
  const origin = data.originCity || "PUNE";
  const originCode = origin.substring(0, 3).toUpperCase();
  const date = "28-31 OCT 2026";
  const flight = "HH26";
  const seat = "BUILD-34";
  const gate = "B-26";
  const pnr = "HH26-U2AB1";
  const builderId = "HH26-43B8";
  const photoUrl = data.photoUrl;
  const selectedSkills = SKILL_TAG_OPTIONS.filter((s) => data.skills?.includes(s.id));

  return (
    <div className="w-[800px] h-[400px] bg-[#fdfaf4]/90 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] relative overflow-hidden flex font-sans border-2 border-white/50 rounded-3xl" style={{ isolation: 'isolate' }}>
      
      {/* ------------------------------------------- */}
      {/* LEFT SECTION (MAIN TICKET)                  */}
      {/* ------------------------------------------- */}
      <div className="flex-1 relative flex">
        
        {/* Left Edge Dark Blue Bar */}
        <div className="w-16 h-full bg-[#2b3a4a] text-white flex flex-col items-center justify-between py-6 rounded-l-3xl z-20">
          <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border border-white/50 grid grid-cols-2 grid-rows-2">
              <div className="border-r border-b border-white/50"></div>
              <div className="border-b border-white/50"></div>
              <div className="border-r border-white/50"></div>
              <div></div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="tracking-[0.3em] font-medium text-sm transform -rotate-90 whitespace-nowrap">
              HACKERHOUSE PASS
            </span>
          </div>
          <Plane className="w-6 h-6 rotate-180 opacity-80" />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative p-6 pr-12 flex flex-col justify-between z-20">
          
          {/* Top Row: Passenger & Destination Header */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col z-30">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Passenger</span>
              <span className="text-xl text-slate-800 font-bold uppercase tracking-wide leading-tight">{name}</span>
              <span className="text-[10px] text-red-800/90 font-bold uppercase tracking-widest mt-1">{role}</span>
              {/* Tech Stack */}
              {selectedSkills.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap max-w-[200px]">
                  {selectedSkills.map(skill => (
                    <span key={skill.id} className="text-[8px] bg-slate-800 text-white px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                      {skill.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-4">
              <h1 className="text-5xl font-serif text-[#1e293b] tracking-widest uppercase">GOA</h1>
              <span className="text-xs font-bold text-red-800/70 tracking-[0.4em] uppercase mt-1">INDIA</span>
            </div>
          </div>

          {/* Middle Row: Flight Route */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">From (Origin)</span>
              <span className="text-4xl font-bold text-[#2b3a4a] tracking-tighter">{originCode}</span>
              <span className="text-[10px] font-bold text-red-800/80 uppercase mt-1">{origin}</span>
            </div>

            <div className="flex-1 flex items-center justify-center relative px-6">
              <div className="w-full h-[2px] bg-slate-300"></div>
              <div className="w-4 h-4 rounded-full bg-[#2b3a4a] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">To (Destination)</span>
              <span className="text-4xl font-bold text-[#2b3a4a] tracking-tighter">GOA</span>
              <span className="text-[10px] font-bold text-red-800/80 uppercase mt-1">HACKER HOUSE</span>
            </div>
          </div>

          {/* Bottom Row: Details Grid */}
          <div className="grid grid-cols-4 gap-4 mt-3">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Flight</span>
              <span className="text-xs text-slate-800 font-bold uppercase">{flight}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Date</span>
              <span className="text-xs text-slate-800 font-bold uppercase">{date}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Gate / Seat</span>
              <span className="text-xs text-slate-800 font-bold uppercase">{gate} / {seat}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Builder ID</span>
              <span className="text-xs text-slate-800 font-bold uppercase">{builderId}</span>
            </div>
          </div>

          {/* Footer Message */}
          <div className="mt-3 flex items-center justify-between z-30">
            <div className="flex items-center gap-2 text-red-800/80">
              <span className="text-[10px] font-bold uppercase tracking-widest">BUILD &rarr; COLLAB &rarr; SHIP</span>
            </div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">LESS NOISE. MORE SIGNAL.</div>
          </div>

        </div>

        {/* Center Aesthetic Background Image of Goa (Blended) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden rounded-l-3xl mix-blend-multiply">
          <div 
            className="w-[120%] h-[120%] opacity-35"
            style={{
              backgroundImage: 'url(/assets/goa-poster.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 60%',
              maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
            }}
          />
        </div>

        {/* Vintage Stamp Overlay */}
        <div className="absolute bottom-8 right-12 z-20 opacity-60 mix-blend-multiply rotate-[-15deg]">
          <div className="w-24 h-24 rounded-full border-2 border-red-800 flex flex-col items-center justify-center relative">
            <svg className="absolute w-full h-full" viewBox="0 0 100 100">
              <path id="curve" d="M 10 50 A 40 40 0 1 1 90 50 A 40 40 0 1 1 10 50" fill="transparent" />
              <text className="text-[12px] font-bold fill-red-800 uppercase tracking-widest">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">GOA INDIA HACKER HOUSE</textPath>
              </text>
            </svg>
            <Plane className="w-8 h-8 text-red-800 rotate-45" fill="currentColor" />
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-[2px] bg-red-800" style={{ transform: `rotate(${i * 2 - 3}deg)` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------- */}
      {/* RIGHT SECTION (STUB)                        */}
      {/* ------------------------------------------- */}
      <div className="w-[220px] h-full bg-transparent relative z-20 flex flex-col rounded-r-3xl">
        
        {/* Stub Header */}
        <div className="h-16 bg-[#2b3a4a] text-white flex items-center justify-between px-4 rounded-tr-3xl">
          <span className="text-[10px] font-medium tracking-widest">HACKERHOUSE PASS</span>
          <Plane className="w-4 h-4 rotate-45 opacity-80" fill="currentColor" />
        </div>

        {/* Stub Content */}
        <div className="p-4 pr-12 flex-1 flex flex-col items-center">
          
          {/* Prominent Photo */}
          <div className="w-full h-44 rounded-xl border-4 border-white overflow-hidden bg-slate-200 shadow-md relative z-30 shrink-0">
            {photoUrl ? (
              <img src={photoUrl} className="w-full h-full object-cover" alt="Passenger" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                <span className="text-xs font-bold tracking-widest uppercase">Photo</span>
              </div>
            )}
          </div>

          <div className="w-full mt-4 flex flex-col gap-2 flex-1 justify-between pb-2">
            <div>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Passenger</span>
              <span className="text-sm font-bold text-[#2b3a4a] leading-tight block truncate">{name}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Flight</span>
                <span className="text-[10px] font-bold text-[#2b3a4a]">{flight}</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block">Seat</span>
                <span className="text-[10px] font-bold text-[#2b3a4a]">{seat}</span>
              </div>
            </div>

            <div className="w-full h-[2px] bg-slate-200 my-1"></div>

            <div className="flex justify-between items-center px-1">
              <span className="text-lg font-bold text-[#2b3a4a]">{originCode}</span>
              <Plane className="w-4 h-4 text-slate-400" />
              <span className="text-lg font-bold text-[#2b3a4a]">GOA</span>
            </div>
          </div>
        </div>

        {/* Barcode (Crisp & Deterministic) */}
        <div className="absolute right-4 top-20 bottom-12 w-8 flex flex-col justify-between z-30 opacity-90 mix-blend-multiply">
          {[
            3,1,2,1,4,1,1,2,3,1,2,2,1,3,1,1,4,2,1,2,3,1,1,2,
            2,1,3,1,2,2,1,4,1,1,2,3,1,2,2,1,3,1,1,4,2,1,2,3,
            1,1,2,2,1,3,1,2,2,1,4,1,1,2,3,1,2,2,1,3,1,1,4,2,
            1,2,3,1,1,2,2,1,3,1,2,2,1,4,1,1,2,3,1,2
          ].map((h, i) => (
            <div key={i} className="w-full bg-[#2b3a4a]" style={{ height: `${h}px` }}></div>
          ))}
        </div>

      </div>

    </div>
  );
}
