import React, { useMemo } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { HackerHouseGoaLogo } from './HackerHouseGoaLogo';

// Procedurally Generated Ultra-Realistic Palm Tree with Animated Sway
const RealisticPalmTree = ({ className, flipped = false }) => {
  const treeSvg = useMemo(() => {
    const cx0 = 250, cy0 = 160;

    // Define the main frond branches: [controlPointX, controlPointY, endX, endY, leafColorBase, numberOfLeaflets, animationClass]
    const fronds = [
      // Top right
      [310, 80, 390, 110, "#16a085", 40, "animate-sway-1"],
      // Right mid
      [360, 130, 450, 200, "#22c55e", 45, "animate-sway-2"],
      // Right bottom drooping
      [330, 220, 360, 340, "#15803d", 35, "animate-sway-3"],
      // Top left
      [190, 80, 110, 110, "#4ade80", 40, "animate-sway-4"],
      // Left mid
      [140, 130, 50, 200, "#10b981", 45, "animate-sway-1"],
      // Left bottom drooping
      [170, 220, 140, 340, "#059669", 35, "animate-sway-2"],
      // Top center right
      [280, 50, 310, 40, "#22c55e", 30, "animate-sway-3"],
      // Top center left
      [220, 50, 190, 40, "#10b981", 30, "animate-sway-4"],
      // Front drooping center right
      [270, 250, 280, 330, "#064e3b", 25, "animate-sway-1"],
      // Front drooping center left
      [230, 250, 220, 330, "#14532d", 25, "animate-sway-2"],
      // Extra fill left
      [120, 170, 70, 260, "#047857", 35, "animate-sway-3"],
      // Extra fill right
      [380, 170, 430, 260, "#166534", 35, "animate-sway-4"],
    ];

    const generatedFronds = fronds.map((frond, index) => {
      const [cpX, cpY, endX, endY, colorBase, leafCount, animClass] = frond;
      const paths = [];
      
      // The thick central stem (rachis) of the frond
      paths.push(<path key={`stem_${index}`} d={`M${cx0},${cy0} Q${cpX},${cpY} ${endX},${endY}`} fill="none" stroke="#064e3b" strokeWidth="5" strokeLinecap="round" />);
      
      // Generate individual realistic dropping leaflets (pinnae)
      for (let i = 1; i <= leafCount; i++) {
        const t = i / (leafCount + 1); // Parameter along the quadratic bezier curve
        
        // Calculate coordinate on the stem
        const px = Math.pow(1 - t, 2) * cx0 + 2 * (1 - t) * t * cpX + Math.pow(t, 2) * endX;
        const py = Math.pow(1 - t, 2) * cy0 + 2 * (1 - t) * t * cpY + Math.pow(t, 2) * endY;
        
        // Calculate tangent vector to find normal angle
        const dx = 2 * (1 - t) * (cpX - cx0) + 2 * t * (endX - cpX);
        const dy = 2 * (1 - t) * (cpY - cy0) + 2 * t * (endY - cpY);
        const angle = Math.atan2(dy, dx);
        
        // Leaflet length varies based on position on the stem (longer in middle)
        const length = Math.sin(t * Math.PI) * 55 + 20;
        
        // Simulate gravity pulling the tips of the leaves down
        const gravity = length * 0.8;
        const spread = 1.1; // Angle spread of the leaves
        
        // Calculate coordinates for the tip of the drooping leaflets
        const droopL_x = px + Math.cos(angle - spread) * length;
        const droopL_y = py + Math.sin(angle - spread) * length + gravity;
        
        const droopR_x = px + Math.cos(angle + spread) * length;
        const droopR_y = py + Math.sin(angle + spread) * length + gravity;
        
        // Draw the curved leaflets simulating realistic bending
        paths.push(<path key={`ll_${index}_${i}`} d={`M${px},${py} Q${px},${py + gravity*0.5} ${droopL_x},${droopL_y}`} fill="none" stroke={colorBase} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />);
        paths.push(<path key={`lr_${index}_${i}`} d={`M${px},${py} Q${px},${py + gravity*0.5} ${droopR_x},${droopR_y}`} fill="none" stroke={colorBase} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />);
      }
      return <g key={`frond_${index}`} className={animClass}>{paths}</g>;
    });

    // Generate dynamic textured trunk bark rings
    const trunkTexture = [];
    for(let i=0; i<16; i++) {
      const t = i / 15;
      const xStart = 80, yStart = 600, cpX = 160, cpY = 320;
      
      const px = Math.pow(1 - t, 2) * xStart + 2 * (1 - t) * t * cpX + Math.pow(t, 2) * cx0;
      const py = Math.pow(1 - t, 2) * yStart + 2 * (1 - t) * t * cpY + Math.pow(t, 2) * cy0;
      
      const dx = 2 * (1 - t) * (cpX - xStart) + 2 * t * (cx0 - cpX);
      const dy = 2 * (1 - t) * (cpY - yStart) + 2 * t * (cy0 - cpY);
      const normalAngle = Math.atan2(dy, dx) + Math.PI/2;
      
      const width = 16 + (1 - t) * 14; 
      
      const p1x = px + Math.cos(normalAngle) * width;
      const p1y = py + Math.sin(normalAngle) * width;
      const p2x = px - Math.cos(normalAngle) * width;
      const p2y = py - Math.sin(normalAngle) * width;
      
      trunkTexture.push(
        <path key={`bark_${i}`} d={`M${p1x},${p1y} Q${px},${py - 8} ${p2x},${p2y}`} stroke="#271003" strokeWidth="4" fill="none" opacity="0.5" />
      );
    }

    return (
      <svg className={`absolute bottom-0 w-[450px] md:w-[600px] h-[700px] pointer-events-none z-10 ${className} ${flipped ? 'transform -scale-x-100' : ''}`} viewBox="0 0 500 600" style={{ filter: 'drop-shadow(0 25px 30px rgb(0 0 0 / 0.4))' }}>
        <defs>
          {/* HD Trunk Shading */}
          <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="30%" stopColor="#78350f" />
            <stop offset="70%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          {/* HD Coconut Shading */}
          <radialGradient id="coconutGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ca8a04" />
            <stop offset="60%" stopColor="#713f12" />
            <stop offset="100%" stopColor="#361a04" />
          </radialGradient>
        </defs>

        {/* Tree Trunk */}
        <g>
          <path d={`M80,600 Q160,320 ${cx0},${cy0}`} stroke="url(#trunkGrad)" strokeWidth="36" strokeLinecap="round" fill="none" />
          {trunkTexture}
        </g>

        {/* Clustered Coconuts */}
        <g>
          <circle cx="230" cy="175" r="16" fill="url(#coconutGrad)" />
          <circle cx="255" cy="185" r="18" fill="url(#coconutGrad)" />
          <circle cx="275" cy="170" r="15" fill="url(#coconutGrad)" />
          <circle cx="270" cy="195" r="14" fill="url(#coconutGrad)" />
          <circle cx="235" cy="200" r="16" fill="url(#coconutGrad)" />
          <circle cx="250" cy="160" r="14" fill="url(#coconutGrad)" />
        </g>

        {/* HD Procedurally Generated Fronds with Sway Animations */}
        {generatedFronds}
      </svg>
    );
  }, [className, flipped]);

  return treeSvg;
};


export function Backdrop({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-[#fffef0] text-slate-900 overflow-x-hidden font-outfit selection:bg-amber-200 selection:text-slate-900">
      
      {/* VIBRANT GOAN BEACH LANDSCAPE BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Tropical Sky Gradient */}
        <div className="absolute top-0 inset-x-0 h-[480px] bg-gradient-to-b from-[#e0f2fe] via-[#fef08a]/30 to-transparent opacity-90" />

        {/* Tropical Sun */}
        <div className="absolute top-12 right-1/4 w-36 h-36 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full blur-2xl opacity-60 animate-pulse duration-[10s]" />
        
        {/* Dynamic Birds in Flight */}
        <div className="absolute top-10 left-0 right-0 h-40 pointer-events-none overflow-hidden z-0">
          <svg className="absolute top-4 bird-flock w-24 h-10 text-slate-400/50" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path className="bird-wing" d="M0,15 Q15,0 30,15 Q45,0 60,15" />
            <path className="bird-wing" d="M40,22 Q50,10 60,22 Q70,10 80,22" />
          </svg>
          <svg className="absolute top-16 bird-flock-delayed w-16 h-8 text-slate-400/40" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path className="bird-wing-fast" d="M0,15 Q15,0 30,15 Q45,0 60,15" />
            <path className="bird-wing-fast" d="M20,5 Q30,-5 40,5 Q50,-5 60,5" />
          </svg>
          <svg className="absolute top-2 bird-flock-3 w-32 h-12 text-slate-500/30 scale-75" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path className="bird-wing" d="M0,15 Q15,0 30,15 Q45,0 60,15" />
            <path className="bird-wing" d="M30,5 Q40,-5 50,5 Q60,-5 70,5" />
            <path className="bird-wing" d="M10,25 Q20,15 30,25 Q40,15 50,25" />
          </svg>
          <svg className="absolute top-24 bird-flock-4 w-20 h-8 text-slate-400/45 scale-90" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path className="bird-wing-fast" d="M0,15 Q15,0 30,15 Q45,0 60,15" />
            <path className="bird-wing-fast" d="M25,20 Q35,10 45,20 Q55,10 65,20" />
          </svg>
        </div>

        {/* PROCEDURALLY GENERATED ULTRA-REALISTIC PALM TREES WITH ANIMATED SWAY */}
        <RealisticPalmTree className="-left-20 md:-left-32" flipped={false} />
        <RealisticPalmTree className="-right-20 md:-right-32" flipped={true} />

        {/* GOLDEN SAND BEACH SHORELINE */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#fde047] via-[#fef08a] to-transparent pointer-events-none z-10">
          <svg className="w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="none" fill="#fde047">
            <path d="M0,80 C300,140 600,40 1200,90 L1200,160 L0,160 Z" opacity="0.95" />
          </svg>
        </div>

        {/* Dynamic Ocean Waves and Aquatic Life */}
        <div className="absolute bottom-0 inset-x-0 h-32 overflow-hidden pointer-events-none z-20">

          <svg className="absolute w-[200%] h-full animate-ocean-wave-1 opacity-90" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,50 Q250,70 500,50 T1000,50 L1000,100 L0,100 Z" fill="#0284c7" />
          </svg>
          <svg className="absolute w-[200%] h-full top-8 left-0 animate-ocean-wave-2 opacity-80" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path d="M0,50 Q250,30 500,50 T1000,50 L1000,100 L0,100 Z" fill="#38bdf8" />
          </svg>
        </div>
      </div>

      {/* FLOATING HEADER BANNER WITH OFFICIAL LOGO */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-amber-300/80 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-[#084c2e] p-2 rounded-xl border border-yellow-400/50 shadow-md">
              <HackerHouseGoaLogo className="scale-90" />
            </div>
          </div>

          {/* Hashtag Badge */}
          <div className="flex items-center px-4 py-1.5 rounded-full bg-[#084c2e] text-[#f5be16] text-xs font-mono font-bold tracking-widest shadow-sm ring-1 ring-inset ring-[#f5be16]/30">
            #FrameInGoa
          </div>
        </div>
      </header>

      {/* Main App Container */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 pt-24 md:pt-28">
        {children}
      </main>

      {/* Subtle Beach Footer */}
      <footer className="relative z-20 border-t border-amber-300 bg-white/95 backdrop-blur-md py-6 mt-16 text-center text-xs text-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>HACKER HOUSE GOA 2026 • OFFICIAL LOGO EDITION</span>
          </div>
          <p className="text-slate-600 font-medium">
            Official Task • <a href="https://hhgoa.com" target="_blank" rel="noreferrer" className="underline hover:text-sky-700 font-bold">hhgoa.com</a>
          </p>
          <div className="font-mono font-bold text-sky-700">
            #FrameInGoa
          </div>
        </div>
      </footer>
    </div>
  );
}
