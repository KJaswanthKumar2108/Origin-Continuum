import React, { useState, useRef } from 'react';
import { X, Camera, Image as ImageIcon, SlidersHorizontal, Sparkles, CheckCircle2, Upload } from 'lucide-react';
import { ContinuumMoment } from '../types';

interface CaptureScreenProps {
  onCapture: (capturedData?: { imageBase64?: string; mimeType?: string; textHint?: string }) => void;
  onUseDemo: () => void;
  onCancel: () => void;
  currentMoment?: ContinuumMoment;
}

export const CaptureScreen: React.FC<CaptureScreenProps> = ({
  onCapture,
  onUseDemo,
  onCancel,
  currentMoment,
}) => {
  const [selectedMode, setSelectedMode] = useState<'whiteboard' | 'document' | 'general'>('whiteboard');
  const [isCapturingFlash, setIsCapturingFlash] = useState(false);
  const [isCapturedComplete, setIsCapturedComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const visual = currentMoment?.visualData || {
    title: 'Q3 PRODUCT PLAN',
    subtitle: 'MEETING ROOM 3B • LIVE STRATEGY',
    badge: 'WHITEBOARD',
    points: ['• Finish prototype', '• Review pricing', '• Prepare investor deck', '• Deadline: Friday'],
    footerNote: 'iQOO Optical Sensor Active',
  };

  const handleShutter = () => {
    setIsCapturingFlash(true);
    setIsCapturedComplete(true);
    setTimeout(() => setIsCapturingFlash(false), 220);
    setTimeout(() => {
      onCapture({ textHint: visual.points.join('\n') });
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setIsCapturedComplete(true);
      setTimeout(() => {
        onCapture({
          imageBase64: base64,
          mimeType: file.type || 'image/jpeg',
          textHint: file.name,
        });
      }, 400);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div id="origin-capture-screen" className="flex-1 flex flex-col bg-black text-white relative select-none min-h-0">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Flash overlay animation */}
      {isCapturingFlash && (
        <div className="absolute inset-0 bg-white z-50 animate-fade-out pointer-events-none"></div>
      )}

      {/* Top Controls */}
      <div className="px-4 pt-2.5 pb-1.5 flex items-center justify-between z-20 shrink-0">
        <button
          onClick={onCancel}
          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Back"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <h2 className="text-[13.5px] font-bold tracking-tight text-white">Capture a Moment</h2>
          <div className="text-[10px] font-mono mt-0.5">
            {isCapturedComplete ? (
              <span className="text-emerald-400 font-bold flex items-center justify-center gap-1 animate-fade-in">
                <CheckCircle2 className="w-3 h-3" />
                <span>Captured</span>
              </span>
            ) : (
              <span className="text-[#FFE600] font-bold flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-pulse"></span>
                <span>Optical Frame Active</span>
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Upload real image from device"
        >
          <Upload className="w-3.5 h-3.5 text-[#FFE600]" />
        </button>
      </div>

      {/* Camera Viewfinder Area */}
      <div className="flex-1 relative mx-2.5 my-1 rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 flex flex-col items-center justify-center shadow-inner min-h-0">
        {/* Whiteboard / Document Viewfinder Simulation */}
        <div className="absolute inset-0 p-3 flex flex-col items-center justify-center bg-gradient-to-b from-[#181a20] to-[#0f1115]">
          {/* Viewfinder Reticles & Corners */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#FFE600]"></div>
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FFE600]"></div>
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#FFE600]"></div>
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#FFE600]"></div>

          {/* Rule of Thirds Grid */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-10">
            <div className="border-r border-b border-white"></div>
            <div className="border-r border-b border-white"></div>
            <div className="border-b border-white"></div>
            <div className="border-r border-b border-white"></div>
            <div className="border-r border-b border-white"></div>
            <div className="border-b border-white"></div>
            <div className="border-r border-white"></div>
            <div className="border-r border-white"></div>
            <div></div>
          </div>

          {/* Visual Target Container */}
          <div
            id="demo-whiteboard-canvas"
            className="relative w-full max-w-[280px] bg-[#f8fafc] text-neutral-900 rounded-xl p-3.5 shadow-2xl border-2 border-neutral-300 transform rotate-[-0.5deg] select-none"
          >
            {/* Gloss reflection */}
            <div className="absolute top-0 right-0 w-28 h-16 bg-gradient-to-bl from-white/40 to-transparent pointer-events-none rounded-tr-lg"></div>

            {/* Header */}
            <div className="border-b-2 border-blue-600/80 pb-1.5 mb-2 flex items-center justify-between">
              <div>
                <span className="text-[8.5px] font-mono tracking-widest text-blue-700 font-bold uppercase block">
                  {visual.subtitle}
                </span>
                <h3 className="text-[15px] font-extrabold tracking-tight text-neutral-900 mt-0.5 leading-tight">
                  {visual.title}
                </h3>
              </div>
              <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[9px] font-mono font-bold">
                {visual.badge}
              </span>
            </div>

            {/* Bullet items */}
            <ul className="space-y-1 text-[11.5px] font-semibold text-neutral-800">
              {visual.points.map((pt, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-800"></span>
                  <span className="truncate">{pt}</span>
                </li>
              ))}
            </ul>

            {/* AI Vision live bounding detection tags */}
            <div className="absolute -bottom-2 right-2.5 px-2 py-0.5 rounded-full bg-neutral-900/90 text-[#FFE600] border border-[#FFE600]/40 text-[8.5px] font-mono flex items-center gap-1 shadow-md">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Optical Grounding</span>
            </div>
          </div>
        </div>

        {/* Quick Upload / Demo action button */}
        <div className="absolute bottom-2 left-2 right-2 z-20 flex justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-[10.5px] font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-3 h-3 text-[#FFE600]" />
            <span>Upload custom photo</span>
          </button>
        </div>
      </div>

      {/* Shutter Button & Controls */}
      <div className="px-5 py-3 flex items-center justify-around z-20 shrink-0">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/15 transition-colors cursor-pointer"
          title="Upload image"
        >
          <ImageIcon className="w-4 h-4 text-neutral-300" />
        </button>

        {/* Main Camera Shutter Button */}
        <button
          id="btn-shutter"
          onClick={handleShutter}
          className="w-16 h-16 rounded-full border-4 border-white/40 p-1 flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(255,230,0,0.3)] hover:border-[#FFE600]"
        >
          <div className="w-full h-full rounded-full bg-[#FFE600] hover:bg-[#ffe81a] flex items-center justify-center transition-colors">
            <Camera className="w-6 h-6 text-black" />
          </div>
        </button>

        <button
          onClick={onUseDemo}
          className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-[10.5px] font-mono text-neutral-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          title="Skip straight to demo voice intent"
        >
          <Sparkles className="w-3 h-3 text-[#FFE600]" />
          <span>Demo</span>
        </button>
      </div>
    </div>
  );
};
