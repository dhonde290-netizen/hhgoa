import React from 'react';
import { Plane, QrCode, Sparkles } from 'lucide-react';
import { SKILL_TAG_OPTIONS } from '../utils/titles';

export function CardStickerbomb({ data }) {
  // Use user data or fallbacks
  const name = data.name || "Satoshi Nakamoto";
  const role = data.builderTitle || "Full-Stack Developer";
  const origin = data.originCity || "PUNE";
  const originCode = origin.substring(0, 3).toUpperCase();
  const date = "28-31 OCT 2026";
  const flight = "HH26";
  const seat = "B-34";
  const gate = "G-08";
  const pnr = "HH26-U2AB1";
  const builderId = "HH26-43B8";
  const photoUrl = data.photoUrl;
  const selectedSkills = SKILL_TAG_OPTIONS.filter((s) => data.skills?.includes(s.id));

  return (
    <div className="w-[800px] h-[400px] bg-white rounded-[2rem] shadow-2xl relative overflow-hidden flex font-sans border-4 border-white" style={{ isolation: 'isolate' }}>
      
      {/* Background Graphic */}
      <div 
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: 'url(/assets/goa-poster.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          filter: 'grayscale(100%) contrast(120%)',
          maskImage: 'linear-gradient(to right, black 20%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 90%)'
        }}
      />
      
      {/* Abstract Shapes */}
      <div className="absolute top-[-50px] right-[180px] w-64 h-64 bg-amber-400/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-50px] left-[50px] w-64 h-64 bg-teal-400/20 rounded-full blur-3xl z-0 pointer-events-none"></div>

      {/* ------------------------------------------- */}
      {/* LEFT SECTION (MAIN TICKET)                  */}
      {/* ------------------------------------------- */}
      <div className="flex-1 relative flex z-10">
        
        {/* Sleek Dark Spine */}
        <div className="w-12 h-full bg-slate-900 flex flex-col items-center justify-between py-8 rounded-l-[1.75rem]">
          <Plane className="w-5 h-5 text-amber-400 rotate-180" />
          <div className="flex-1 flex items-center justify-center">
            <span className="tracking-[0.4em] font-bold text-[10px] text-white/50 transform -rotate-90 whitespace-nowrap uppercase">
              Hacker House • 2026
            </span>
          </div>
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 pr-10 flex flex-col justify-between">
          
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col z-30 max-w-[220px]">
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Passenger Name</span>
              <span className="text-2xl text-slate-900 font-black uppercase tracking-tight leading-[1.1] line-clamp-2">{name}</span>
              <span className="text-[10px] text-teal-700 font-bold uppercase tracking-widest mt-2">{role}</span>
              
              {/* Tech Stack */}
              {selectedSkills.length > 0 && (
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {selectedSkills.map(skill => (
                    <span key={skill.id} className="text-[8px] bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                      {skill.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* VIP Badge & QR */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-slate-400 font-black tracking-[0.2em] uppercase mb-1">Class</span>
                <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md text-[10px] font-black tracking-widest border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> VIP BUILDER
                </div>
              </div>
              <div className="w-14 h-14 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-800" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Flight Path (Centerpiece) */}
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Origin</span>
              <span className="text-5xl font-black text-slate-800 tracking-tighter leading-none">{originCode}</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2 truncate max-w-[100px]">{origin}</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
              <div className="w-full flex items-center">
                <div className="w-2 h-2 rounded-full border-2 border-slate-300 bg-white z-10"></div>
                <div className="flex-1 h-[2px] bg-slate-200 relative overflow-hidden">
                  {/* Dashed line effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_50%,#cbd5e1_50%,#cbd5e1_100%)] bg-[length:12px_2px]"></div>
                </div>
                <Plane className="w-6 h-6 text-teal-600 mx-2" />
                <div className="flex-1 h-[2px] bg-slate-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_50%,#cbd5e1_50%,#cbd5e1_100%)] bg-[length:12px_2px]"></div>
                </div>
                <div className="w-2 h-2 rounded-full border-2 border-teal-600 bg-white z-10"></div>
              </div>
              <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-3 bg-white px-2">Direct Flight</span>
            </div>

            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Destination</span>
              <span className="text-5xl font-black text-teal-600 tracking-tighter leading-none">GOA</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">Hacker House</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="flex items-center justify-between mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Flight</span>
              <span className="text-sm text-slate-800 font-bold">{flight}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Date</span>
              <span className="text-sm text-slate-800 font-bold">{date}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Gate</span>
              <span className="text-sm text-slate-800 font-bold">{gate}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Seat</span>
              <span className="text-sm text-slate-800 font-bold">{seat}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Builder ID</span>
              <span className="text-sm text-teal-700 font-black">{builderId}</span>
            </div>
          </div>

        </div>
      </div>

      {/* ------------------------------------------- */}
      {/* TICKET PERFORATION LINE                     */}
      {/* ------------------------------------------- */}
      <div className="w-[2px] h-full relative z-20 flex flex-col items-center justify-between py-2">
        {/* Top Notch */}
        <div className="w-6 h-6 bg-transparent border-t-4 border-r-4 border-white rounded-full absolute -top-4 shadow-[inset_0_-4px_4px_rgba(0,0,0,0.05)]"></div>
        
        {/* Dashed Line */}
        <div className="w-[2px] h-[360px] bg-[linear-gradient(180deg,transparent_0%,transparent_50%,#e2e8f0_50%,#e2e8f0_100%)] bg-[length:2px_12px] opacity-70"></div>
        
        {/* Bottom Notch */}
        <div className="w-6 h-6 bg-transparent border-b-4 border-r-4 border-white rounded-full absolute -bottom-4 shadow-[inset_0_4px_4px_rgba(0,0,0,0.05)]"></div>
      </div>

      {/* ------------------------------------------- */}
      {/* RIGHT SECTION (STUB)                        */}
      {/* ------------------------------------------- */}
      <div className="w-[220px] h-full bg-slate-50 relative z-10 flex flex-col rounded-r-[1.75rem]">
        
        <div className="flex-1 p-6 flex flex-col justify-between items-center relative">
          
          {/* Photo */}
          <div className="w-[140px] h-[160px] rounded-2xl overflow-hidden bg-slate-200 border-[6px] border-white shadow-lg shrink-0 relative z-20">
            {photoUrl ? (
              <img src={photoUrl} className="w-full h-full object-cover" alt="Passenger" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                <span className="text-[10px] font-black uppercase tracking-widest">Photo</span>
              </div>
            )}
            
            {/* Stamp Overlay on Photo */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 border-2 border-red-600/80 rounded-full flex items-center justify-center opacity-80 mix-blend-multiply rotate-[-15deg] bg-red-50/20">
               <span className="text-[7px] font-black text-red-600/90 text-center leading-tight uppercase tracking-widest px-2">
                 Approved<br/>Builder
               </span>
            </div>
          </div>

          <div className="w-full mt-4 flex flex-col text-center">
            <span className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Boarding Pass</span>
            <span className="text-sm font-black text-slate-900 leading-tight truncate px-2">{name}</span>
          </div>
          
          <div className="w-full h-[1px] bg-slate-200 my-4"></div>

          <div className="flex justify-between items-center w-full px-2">
            <span className="text-2xl font-black text-slate-800 tracking-tighter">{originCode}</span>
            <Plane className="w-3 h-3 text-slate-400" />
            <span className="text-2xl font-black text-teal-600 tracking-tighter">GOA</span>
          </div>

        </div>

        {/* Minimal Barcode on the far right edge */}
        <div className="absolute right-0 top-6 bottom-6 w-8 flex flex-col justify-between opacity-40">
          {[
            2,4,1,1,3,2,1,2,3,1,
            2,1,4,1,2,3,1,1,2,2,
            3,1,1,2,1,2,4,1,1,2,
            3,1,2,2,4,1,3,1,2
          ].map((h, i) => (
            <div key={i} className="w-full bg-slate-800" style={{ height: `${h}px` }}></div>
          ))}
        </div>

      </div>

    </div>
  );
}
