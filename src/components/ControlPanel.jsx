import React, { useState, useCallback } from 'react';
import { ArrowRight, Download, Share2, Image as ImageIcon, Sparkles, CheckCircle2, X, Upload } from 'lucide-react';
import heic2any from 'heic2any';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';

export function ControlPanel({
  data,
  onChange,
  activeTheme,
  onSelectTheme,
  onDownload,
  onShare,
  isGenerated,
  setIsGenerated
}) {
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  // Crop State
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [originalImageSrc, setOriginalImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Check compulsory requirements for Generation
  const isPhotoValid = Boolean(data.photoUrl);
  const isNameValid = Boolean(data.name && data.name.trim().length > 0);
  const isTitleValid = Boolean(data.builderTitle && data.builderTitle.trim().length > 0);
  
  const canGenerate = isPhotoValid && isNameValid && isTitleValid;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsProcessingPhoto(true);
    setPhotoError('');

    try {
      let imageBlob = file;
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.heic') || fileName.endsWith('.heif') || file.type.includes('heic')) {
        const converted = await heic2any({ blob: file, toType: 'image/jpeg' });
        imageBlob = Array.isArray(converted) ? converted[0] : converted;
      }
      
      const reader = new FileReader();
      reader.onload = (evt) => {
        setOriginalImageSrc(evt.target.result);
        setCropImageSrc(evt.target.result); // Open crop modal instead of setting immediately
        setIsProcessingPhoto(false);
      };
      reader.readAsDataURL(imageBlob);
    } catch (err) {
      console.error(err);
      setPhotoError('Failed to convert image. Please try PNG, JPG or WEBP.');
      setIsProcessingPhoto(false);
    }
    
    // Clear input so same file can be uploaded again if needed
    e.target.value = null;
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(cropImageSrc, croppedAreaPixels, 0);
      onChange({ photoUrl: croppedImage });
      setCropImageSrc(null); // Close modal
    } catch (e) {
      console.error(e);
      setPhotoError('Failed to crop image.');
    }
  };

  const handleGenerate = () => {
    if (canGenerate) {
      setIsGenerated(true);
    }
  };


  // ----------------------------------------------------
  // INPUT STATE (UNIQUE MINIMAL DESIGN)
  // ----------------------------------------------------
  return (
    <>
      <div className="w-full bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] text-slate-800 font-outfit border border-white relative overflow-hidden">
        
        {/* Decorative architectural accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-[100px] -z-10 opacity-50" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-50 rounded-tr-[100px] -z-10 opacity-50" />

        <div className="mb-8">
          <h2 className="text-2xl font-serif text-slate-900 tracking-tight">Builder Identity</h2>
          <p className="text-sm text-slate-500 mt-1">Complete your details to mint your official pass.</p>
        </div>
        
        <div className="flex flex-col gap-8">
          
          {/* UNIQUE PHOTO UPLOAD: Arched Window Style */}
          <div className="flex flex-col items-center">
            <div className={`relative w-36 h-48 rounded-t-full rounded-b-2xl border-[3px] transition-all overflow-hidden group flex items-center justify-center bg-slate-50
              ${isPhotoValid ? 'border-teal-600 shadow-lg shadow-teal-900/10' : 'border-dashed border-slate-300 hover:border-teal-400 hover:bg-teal-50/30 cursor-pointer'}`}
            >
              {!data.photoUrl && (
                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
              )}
              {data.photoUrl ? (
                <div className="w-full h-full relative group/edit">
                  <img src={data.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/edit:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm z-30">
                    <button 
                      onClick={(e) => { e.preventDefault(); if (originalImageSrc) setCropImageSrc(originalImageSrc); }}
                      className="px-4 py-2 bg-white/20 hover:bg-white/40 rounded-xl text-white text-[10px] font-bold tracking-widest flex items-center justify-center gap-2 transition-colors w-24"
                    >
                      <ImageIcon className="w-3 h-3" /> CROP
                    </button>
                    <div className="relative w-24">
                      <input
                        type="file"
                        accept="image/*,.heic,.heif"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-40"
                      />
                      <button className="px-4 py-2 bg-white/20 hover:bg-white/40 rounded-xl text-white text-[10px] font-bold tracking-widest flex items-center justify-center gap-2 transition-colors w-full pointer-events-none">
                        <Upload className="w-3 h-3" /> NEW
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-teal-600 transition-colors p-4 text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {isProcessingPhoto ? "Processing..." : "Upload Photo"}
                  </span>
                </div>
              )}
            </div>
            {photoError && <p className="text-xs text-rose-500 font-bold mt-3 bg-rose-50 px-3 py-1 rounded-full">{photoError}</p>}
          </div>

          {/* INPUT FIELDS: Floating Underline Style */}
          <div className="flex flex-col gap-6">
            {/* Full Name */}
            <div className="relative group">
              <label className={`absolute left-0 transition-all duration-200 font-mono text-xs font-bold uppercase tracking-widest pointer-events-none
                ${focusedInput === 'name' || data.name ? '-top-5 text-teal-600' : 'top-3 text-slate-400'}`}>
                Full Name
              </label>
              <input
                type="text"
                value={data.name}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => onChange({ name: e.target.value })}
                placeholder={focusedInput === 'name' && !data.name ? "e.g. Mario Miranda" : ""}
                className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            {/* Stack / Role */}
            <div className="relative group mt-2">
              <label className={`absolute left-0 transition-all duration-200 font-mono text-xs font-bold uppercase tracking-widest pointer-events-none
                ${focusedInput === 'role' || data.builderTitle ? '-top-5 text-teal-600' : 'top-3 text-slate-400'}`}>
                Stack / Role
              </label>
              <input
                type="text"
                value={data.builderTitle}
                onFocus={() => setFocusedInput('role')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => onChange({ builderTitle: e.target.value })}
                placeholder={focusedInput === 'role' && !data.builderTitle ? "e.g. Full-Stack / Rust / Software" : ""}
                className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            {/* Origin City */}
            <div className="relative group mt-2">
              <label className={`absolute left-0 transition-all duration-200 font-mono text-xs font-bold uppercase tracking-widest pointer-events-none
                ${focusedInput === 'origin' || data.originCity ? '-top-5 text-teal-600' : 'top-3 text-slate-400'}`}>
                Origin City
              </label>
              <input
                type="text"
                value={data.originCity}
                onFocus={() => setFocusedInput('origin')}
                onBlur={() => setFocusedInput(null)}
                onChange={(e) => onChange({ originCity: e.target.value })}
                placeholder={focusedInput === 'origin' && !data.originCity ? "e.g. MUMBAI" : ""}
                className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-lg font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

          {/* Generate Button: Glowing Gradient */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`w-full mt-4 py-5 rounded-2xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all duration-300
              ${canGenerate 
                ? 'bg-slate-900 text-amber-300 hover:shadow-[0_8px_30px_rgba(15,23,42,0.25)] hover:-translate-y-1' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
          >
            {canGenerate ? <Sparkles className="w-4 h-4 text-amber-300" /> : null}
            <span>Generate</span>
            {canGenerate ? <ArrowRight className="w-4 h-4" /> : null}
          </button>

        </div>
      </div>

      {/* CROP MODAL */}
      {cropImageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg font-serif">Crop Photo</h3>
              <button onClick={() => setCropImageSrc(null)} className="p-2 text-slate-400 hover:text-slate-900 bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative w-full h-80 bg-slate-900">
              <Cropper
                image={cropImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="rect" // Let them crop to square, the arched window will clip it later
              />
            </div>
            
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Zoom</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => {
                    setZoom(e.target.value)
                  }}
                  className="w-full accent-teal-600"
                />
              </div>
              <button 
                onClick={handleSaveCrop}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
