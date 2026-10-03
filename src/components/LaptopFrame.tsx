import React from 'react';

interface LaptopFrameProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const LaptopFrame: React.FC<LaptopFrameProps> = ({
  children,
  title = "HP 15 Laptop — Origin Continuum Workspace",
  className = "",
}) => {
  return (
    <div
      id="hp-15-laptop-hardware-frame"
      className={`w-full min-w-0 max-w-full h-full max-h-[min(660px,calc(100dvh-4.5rem))] mx-auto flex flex-col justify-center select-none overflow-hidden ${className}`}
    >
      {/* HP 15 Natural Silver Aluminum Display Lid & Chassis */}
      <div className="flex-1 min-h-0 rounded-2xl sm:rounded-[22px] bg-gradient-to-b from-[#2e323e] via-[#1c1e27] to-[#101217] p-2 sm:p-3 border border-[#64748b]/40 shadow-[0_20px_70px_rgba(0,0,0,0.95),_0_0_0_1px_rgba(255,255,255,0.12)] flex flex-col relative overflow-hidden">
        
        {/* HP 15 Micro-Edge Top Bezel: HP TrueVision HD Webcam + Dual Array Digital Mics */}
        <div className="w-full h-4 sm:h-5 flex items-center justify-center shrink-0 relative px-4">
          <div className="flex items-center gap-3">
            {/* Left Mic Hole */}
            <div className="w-1 h-1 rounded-full bg-[#0a0c10] ring-1 ring-white/10" title="Left Digital Mic"></div>
            
            {/* HP TrueVision Camera Lens & Housing */}
            <div className="flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded-full ring-1 ring-white/15">
              <div className="w-2.5 h-2.5 rounded-full bg-black ring-1 ring-neutral-800 flex items-center justify-center shadow-inner">
                <div className="w-1 h-1 rounded-full bg-blue-500/60 ring-1 ring-cyan-400/30"></div>
              </div>
              <div className="w-1 h-1 rounded-full bg-emerald-500/80 shadow-[0_0_4px_rgba(16,185,129,0.8)]" title="Camera Active LED"></div>
            </div>

            {/* Right Mic Hole */}
            <div className="w-1 h-1 rounded-full bg-[#0a0c10] ring-1 ring-white/10" title="Right Digital Mic"></div>
          </div>
        </div>

        {/* Physical 15.6" IPS Display Screen Surface */}
        <div className="w-full min-w-0 flex-1 min-h-0 rounded-lg sm:rounded-xl bg-[#0c0e14] overflow-hidden flex flex-col relative border border-white/10 shadow-inner">
          {children}
        </div>

        {/* HP 15 Lower Bezel: Iconic HP Chrome Circular Logo */}
        <div className="w-full h-5 sm:h-6 flex items-center justify-center shrink-0 pt-1">
          <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-[#94a3b8] via-[#e2e8f0] to-[#64748b] shadow-[0_1px_3px_rgba(0,0,0,0.8)] border border-white/30 p-0.5">
            {/* Authentic Stylized HP Logo */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#0f172a] fill-current">
              <circle cx="50" cy="50" r="48" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2"/>
              {/* Slanted HP letter bars */}
              <path d="M36 28 L42 28 L30 72 L24 72 Z" fill="#0f172a"/>
              <path d="M48 28 L54 28 L42 72 L36 72 Z" fill="#0f172a"/>
              <path d="M60 42 L66 42 L54 72 L48 72 Z" fill="#0f172a"/>
              <path d="M72 42 L78 42 L66 72 L60 72 Z" fill="#0f172a"/>
              <path d="M30 48 L72 48 L70 54 L28 54 Z" fill="#0f172a"/>
            </svg>
          </div>
        </div>
      </div>

      {/* HP 15 Signature Elevated Lift-Hinge Base & Keyboard Deck Lip */}
      <div className="w-full flex flex-col items-center shrink-0">
        {/* Drop Hinge Bar with Rubber Grip Feet */}
        <div className="w-[88%] sm:w-[82%] h-2.5 sm:h-3 bg-gradient-to-b from-[#1c1e27] via-[#2a2e3b] to-[#12141a] rounded-b-md border-t border-white/10 flex items-center justify-between px-6 shadow-md relative">
          <div className="w-6 h-1 rounded-full bg-neutral-900 ring-1 ring-white/10 shadow-inner" title="Rubber Foot Pad"></div>
          <div className="w-16 h-1 rounded-full bg-[#94a3b8]/40 shadow-inner"></div>
          <div className="w-6 h-1 rounded-full bg-neutral-900 ring-1 ring-white/10 shadow-inner" title="Rubber Foot Pad"></div>
        </div>

        {/* Natural Silver Chassis Base Deck Edge with Display Opening Notch */}
        <div className="w-[96%] sm:w-[92%] h-3 sm:h-3.5 bg-gradient-to-b from-[#474d5d] via-[#333742] to-[#1e2129] rounded-b-xl border border-[#64748b]/40 flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.85)] relative">
          {/* Thumb indent / Display opening lip */}
          <div className="w-20 sm:w-28 h-1 sm:h-1.5 rounded-full bg-[#161820] border border-white/15 shadow-inner"></div>
        </div>
      </div>
    </div>
  );
};
