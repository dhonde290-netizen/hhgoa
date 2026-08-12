import React, { useState, useRef } from 'react';
import { Upload, ZoomIn, ZoomOut, RotateCw, Sparkles, Check, X, Image as ImageIcon, Sliders } from 'lucide-react';
import heic2any from 'heic2any';
import { SAMPLE_AVATARS } from '../utils/sampleImages';
import { playClickSound } from '../utils/audio';

export function PhotoCropperModal({ isOpen, onClose, currentPhoto, onSavePhoto }) {
  const [photoSrc, setPhotoSrc] = useState(currentPhoto || SAMPLE_AVATARS[0].url);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('normal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = async (file) => {
    setIsProcessing(true);
    setErrorMsg('');
    try {
      let imageBlob = file;
      // Check if file is HEIC
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.heic') || fileName.endsWith('.heif') || file.type.includes('heic')) {
        const converted = await heic2any({ blob: file, toType: 'image/jpeg' });
        imageBlob = Array.isArray(converted) ? converted[0] : converted;
      }
      
      const reader = new FileReader();
      reader.onload = (evt) => {
        setPhotoSrc(evt.target.result);
        setZoom(1);
        setRotation(0);
        setPan({ x: 0, y: 0 });
        setIsProcessing(false);
        playClickSound();
      };
      reader.readAsDataURL(imageBlob);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to process image format. Please try PNG, JPG or WEBP.');
      setIsProcessing(false);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getFilterStyle = () => {
    switch (activeFilter) {
      case 'vibrant':
        return 'brightness(1.1) contrast(1.15) saturate(1.35)';
      case 'warm':
        return 'sepia(0.3) contrast(1.1) saturate(1.25) hue-rotate(-10deg)';
      case 'cyber':
        return 'contrast(1.25) saturate(1.5) hue-rotate(330deg)';
      case 'bw':
        return 'grayscale(1) contrast(1.3)';
      default:
        return 'none';
    }
  };

  const handleSave = () => {
    // Generate framed canvas result
    const canvas = document.createElement('canvas');
    const size = 600;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, size, size);

      ctx.save();
      ctx.translate(size / 2 + pan.x, size / 2 + pan.y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      ctx.filter = getFilterStyle();

      // Draw centered
      const aspect = img.width / img.height;
      let drawW = size;
      let drawH = size;
      if (aspect > 1) {
        drawW = size * aspect;
      } else {
        drawH = size / aspect;
      }

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      const croppedUrl = canvas.toDataURL('image/png');
      onSavePhoto(croppedUrl);
      playClickSound();
      onClose();
    };
    img.src = photoSrc;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold tracking-wide text-white">Adjust Your Photo</h3>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Cropper Box */}
          <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden border-2 border-dashed border-emerald-400/50 bg-slate-950 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-inner group">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2 text-emerald-400">
                <Sparkles className="w-8 h-8 animate-spin" />
                <span className="text-sm font-medium">Processing Image...</span>
              </div>
            ) : (
              <div
                className="w-full h-full relative flex items-center justify-center overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={photoSrc}
                  alt="Crop preview"
                  className="max-w-none pointer-events-none select-none transition-filter duration-200"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                    filter: getFilterStyle()
                  }}
                />
                <div className="absolute inset-0 pointer-events-none border border-emerald-400/30 rounded-2xl group-hover:border-emerald-400/70 transition" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-[11px] text-emerald-300 pointer-events-none">
                  Drag to pan • Scroll/Slider to scale
                </div>
              </div>
            )}
          </div>

          {errorMsg && (
            <p className="text-center text-xs text-rose-400 bg-rose-950/50 py-2 px-3 rounded-lg border border-rose-800">
              {errorMsg}
            </p>
          )}

          {/* Quick Presets & Upload Button */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
              Upload Custom Photo or Choose Starter
            </label>
            <div className="flex items-center gap-3">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 rounded-xl text-emerald-300 font-medium text-sm cursor-pointer transition shadow-sm hover:border-emerald-400">
                <Upload className="w-4 h-4" />
                <span>Upload JPG/PNG/HEIC</span>
                <input type="file" accept="image/*,.heic,.heif" onChange={handleFileUpload} className="hidden" />
              </label>

              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                {SAMPLE_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => {
                      setPhotoSrc(av.url);
                      setZoom(1);
                      setRotation(0);
                      setPan({ x: 0, y: 0 });
                      playClickSound();
                    }}
                    title={av.name}
                    className="w-8 h-8 rounded-lg overflow-hidden border border-slate-700 hover:border-emerald-400 hover:scale-105 transition"
                  >
                    <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls: Zoom & Rotate */}
          <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1"><ZoomIn className="w-3.5 h-3.5 text-emerald-400" /> Zoom</span>
                <span>{zoom.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1"><RotateCw className="w-3.5 h-3.5 text-emerald-400" /> Rotate</span>
                <span>{rotation}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Color Filters */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
              Photo Color Presets
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: 'normal', name: 'Original' },
                { id: 'vibrant', name: 'Vibrant' },
                { id: 'warm', name: 'Goa Sun' },
                { id: 'cyber', name: 'Cyber' },
                { id: 'bw', name: 'B & W' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => { setActiveFilter(filter.id); playClickSound(); }}
                  className={`py-1.5 text-xs font-semibold rounded-xl border transition ${
                    activeFilter === filter.id
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end gap-3">
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            Apply & Crop
          </button>
        </div>
      </div>
    </div>
  );
}
