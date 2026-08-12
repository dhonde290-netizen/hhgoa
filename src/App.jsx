import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import { Download, Share2, CheckCircle2 } from 'lucide-react';
import { Backdrop } from './components/Backdrop';
import { ControlPanel } from './components/ControlPanel';
import { CardStickerbomb } from './components/CardStickerbomb';
import { ShareModal } from './components/ShareModal';
import { getRandomTitle, generateBuilderId } from './utils/titles';

export default function App() {
  const [badgeData, setBadgeData] = useState({
    name: '',
    builderTitle: '',
    originCity: '',
    photoUrl: null,
    skills: [],
    stickers: [],
    builderId: 'HH-GOA-2026-5300'
  });

  const [activeTheme, setActiveTheme] = useState('STICKERBOMB');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  // 3D Card Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -8,
      y: (x / rect.width) * 8
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleDataChange = (fields) => {
    setBadgeData((prev) => ({ ...prev, ...fields }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#084c2e', '#f5be16', '#ff007f', '#38bdf8']
    });
  };

  const captureCardImage = async () => {
    if (!cardRef.current) return null;
    try {
      setIsExporting(true);
      setTilt({ x: 0, y: 0 });
      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });
      const dataUrl = canvas.toDataURL('image/png', 1.0);

      setGeneratedImageUrl(dataUrl);
      setIsExporting(false);
      return dataUrl;
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to generate image: ' + (err.message || err.toString()));
      setIsExporting(false);
      return null;
    }
  };

  const handleDownload = async () => {
    triggerConfetti();
    const dataUrl = await captureCardImage();
    if (dataUrl) {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [800, 400]
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, 800, 400);
      pdf.save(`HHGoa2026_BuilderPass_${badgeData.name.replace(/\s+/g, '_')}.pdf`);
    }
  };

  const handleShareModalOpen = async () => {
    const dataUrl = await captureCardImage();
    if (dataUrl) {
      setIsShareOpen(true);
    }
  };

  return (
    <Backdrop>
      {/* Rephrased Top Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 mt-4">
        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-serif uppercase leading-tight">
          BUILD IN GOA <span className="text-[#084c2e] font-serif underline decoration-[#f5be16] decoration-4 underline-offset-8 block sm:inline mt-2 sm:mt-0">SHIP TO THE WORLD</span>
        </h2>
        <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
          Create your official Hacker House Goa 2026 Builder Pass. Upload your photo, claim your title, and share on X with <span className="px-2 py-0.5 bg-[#084c2e] text-[#f5be16] rounded font-mono font-bold text-xs shadow-sm ml-1 whitespace-nowrap">#FrameInGoa</span>
        </p>
      </div>

      {/* Main Container */}
      <div className="flex flex-col items-center max-w-3xl mx-auto w-full transition-all duration-500">
        {!isGenerated ? (
          <div className="w-full max-w-2xl">
            <ControlPanel
              data={badgeData}
              onChange={handleDataChange}
              activeTheme={activeTheme}
              onSelectTheme={(theme) => setActiveTheme(theme)}
              onDownload={handleDownload}
              onShare={handleShareModalOpen}
              isGenerated={isGenerated}
              setIsGenerated={setIsGenerated}
            />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center fade-in-up bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 sm:p-10 shadow-2xl border border-white/50 relative overflow-hidden">
            
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-300/20 rounded-full blur-3xl -z-10" />

            {/* Success Header */}
            <div className="text-center space-y-2 mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-2 shadow-sm border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-serif text-emerald-900 tracking-tight">Pass Minted</h2>
            </div>

            {/* Canvas Preview Container */}
            <div
              className="w-full flex items-center justify-center h-[260px] relative mb-6"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: '1200px' }}
            >
              <div className="relative pointer-events-none origin-center" style={{ 
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(0.65)`,
                transition: isExporting ? 'none' : 'transform 0.1s ease-out' 
              }}>
                <div ref={cardRef}>
                  <CardStickerbomb data={badgeData} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-md flex flex-col gap-3">
              <button
                onClick={handleDownload}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-teal-900/20 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>Download High-Res Pass</span>
              </button>
              
              <button
                onClick={handleShareModalOpen}
                className="w-full py-4 px-6 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Share to X (#FrameInGoa)</span>
              </button>
              
              <button onClick={() => setIsGenerated(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors text-center mt-4">
                ← Edit Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        imageUrl={generatedImageUrl}
        badgeData={badgeData}
        onDownload={handleDownload}
      />
    </Backdrop>
  );
}
