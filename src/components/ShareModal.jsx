import React, { useState } from 'react';
import { X, Download, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';

function XIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ShareModal({ isOpen, onClose, imageUrl, badgeData, onDownload }) {
  const [copied, setCopied] = useState(false);
  const defaultCaption = `Just generated my official Hacker House Goa 2026 Builder Pass! 🌴🚀\n\nTitle: "${badgeData.builderTitle || 'Terminal Wizard'}"\nOrigin: ${badgeData.originCity || 'Pune'} ➔ GOA 🌊\n\nSee you in Goa! #FrameInGoa @hhgoa`;

  const [caption, setCaption] = useState(defaultCaption);

  if (!isOpen) return null;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTweet = () => {
    // Automatically trigger the download so they have the file ready to attach
    if (onDownload) {
      onDownload();
    }
    const tweetText = encodeURIComponent(caption + "\n\n(I'll attach my downloaded pass here!)");
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-slate-900 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-xl">
              <XIcon className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Share to X (Twitter)</h3>
              <p className="text-[11px] text-slate-500 font-medium">Post your #FrameInGoa Builder Pass!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Generated Image Thumbnail Preview */}
        {imageUrl ? (
          <div className="relative w-full max-h-56 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-50 flex items-center justify-center p-2 shadow-inner">
            <img src={imageUrl} alt="Generated Pass" className="max-h-52 object-contain rounded-xl shadow-md" />
            <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-md shadow">
              READY TO SHARE
            </div>
          </div>
        ) : (
          <div className="w-full h-40 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 text-xs font-semibold">
            Preparing badge image...
          </div>
        )}

        {/* Tweet Caption Editor */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs text-slate-700 font-extrabold">
            <span>Pre-filled Tweet Caption</span>
            <button
              onClick={handleCopyCaption}
              className="flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-900 font-bold transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
          <textarea
            rows={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-amber-500 transition resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleTweet}
            className="hover-lift w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
          >
            <XIcon className="w-4 h-4 fill-current" />
            <span>Open Pre-filled Tweet on X</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onDownload}
            className="hover-lift w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs border border-slate-300 flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Image to Attach on X</span>
          </button>
        </div>
      </div>
    </div>
  );
}
