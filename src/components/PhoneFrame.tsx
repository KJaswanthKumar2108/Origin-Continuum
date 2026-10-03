import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
  onHomeClick?: () => void;
  className?: string;
  showStatusBar?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  bottomNav,
  onHomeClick,
  className = '',
  showStatusBar = true,
}) => {
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${mins}`);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="iqoo-15-flagship-frame"
      className={`relative mx-auto h-full max-h-[min(780px,calc(100dvh-4.5rem))] aspect-[390/812] max-w-[390px] flex flex-col shrink-0 select-none ${className}`}
    >
      {/* Real iQOO 15 Aviation-Grade Aluminum Middle Frame with CNC Chamfering */}
      <div className="absolute inset-0 rounded-[44px] bg-gradient-to-br from-[#2f3240] via-[#1a1c25] to-[#0c0d12] p-[6px] shadow-[0_20px_60px_rgba(0,0,0,0.95),_0_0_0_1px_rgba(255,255,255,0.16)] flex flex-col overflow-hidden">
        
        {/* Antenna Bands (Left & Right) */}
        <div className="absolute left-[-2px] top-[100px] w-[2px] h-[6px] bg-[#4a4e61]"></div>
        <div className="absolute left-[-2px] bottom-[120px] w-[2px] h-[6px] bg-[#4a4e61]"></div>
        <div className="absolute right-[-2px] top-[100px] w-[2px] h-[6px] bg-[#4a4e61]"></div>
        <div className="absolute right-[-2px] bottom-[120px] w-[2px] h-[6px] bg-[#4a4e61]"></div>

        {/* Physical Hardware Buttons */}
        {/* iQOO 15 Signature Power Button on Right */}
        <div className="absolute right-[-3px] top-[190px] w-[3px] h-[46px] bg-gradient-to-b from-[#3a3d4d] via-[#ffe600]/80 to-[#3a3d4d] rounded-r-sm shadow-[0_1px_4px_rgba(0,0,0,0.8)]"></div>
        {/* Volume Rocker on Left */}
        <div className="absolute left-[-3px] top-[155px] w-[3px] h-[78px] bg-[#3a3d4d] rounded-l-sm shadow-[0_1px_4px_rgba(0,0,0,0.8)]"></div>

        {/* Top Edge Hardware: Earpiece Micro-Slit, IR Blaster, and Mic */}
        <div className="absolute top-[2px] left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0a0b10] ring-1 ring-neutral-800" title="IR Blaster"></div>
          <div className="w-12 h-[2px] rounded-full bg-[#11131a] ring-1 ring-neutral-800/80 shadow-inner" title="Earpiece Speaker"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0a0b10] ring-1 ring-neutral-800" title="Secondary Mic"></div>
        </div>

        {/* Inner Physical Display Surface */}
        <div className="w-full h-full rounded-[38px] bg-[#07080a] flex flex-col overflow-hidden relative border border-white/10 shadow-inner">
          
          {/* Subtle Diagonal Glass Sheen Reflection */}
          <div className="absolute top-0 right-0 w-48 h-40 bg-gradient-to-bl from-white/10 via-transparent to-transparent pointer-events-none z-30"></div>

          {/* OriginOS 5 Status Bar with Guaranteed Camera Clearance */}
          {showStatusBar && (
            <div
              id="origin-status-bar"
              className="w-full h-9 px-4 flex items-center justify-between z-40 select-none shrink-0 bg-transparent relative"
            >
              {/* Left Zone: Live Time */}
              <div className="w-20 flex items-center">
                <span className="font-mono text-[11.5px] text-white/95 font-bold tracking-tight">{time}</span>
              </div>

              {/* Center Zone: Isolated iQOO 15 Punch-Hole Camera */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-center pointer-events-none">
                <div className="w-3.5 h-3.5 rounded-full bg-black ring-2 ring-neutral-900/90 flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#070b14] ring-1 ring-cyan-500/40"></div>
                </div>
              </div>

              {/* Right Zone: System Status Indicators (Clear from center camera) */}
              <div className="flex items-center justify-end gap-1.5 text-white/90">
                <span className="text-[8.5px] font-mono tracking-wider font-extrabold text-[#FFE600] bg-[#FFE600]/15 px-1 py-0.2 rounded border border-[#FFE600]/30">5G</span>
                <Signal className="w-3 h-3 text-neutral-300" strokeWidth={2.4} />
                <Wifi className="w-3 h-3 text-neutral-300" strokeWidth={2.4} />
                <div className="flex items-center gap-0.5">
                  <span className="text-[9.5px] font-mono text-neutral-300 font-bold">98%</span>
                  <div className="w-3.5 h-2 rounded-[2px] border border-white/70 p-[1px] flex items-center">
                    <div className="w-[85%] h-full bg-[#FFE600] rounded-[1px]"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Screen Content Viewport (Scrollable container for screen content) */}
          <div className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden relative flex flex-col scrollbar-none">
            {children}
          </div>

          {/* Docked Bottom Navigation Bar (if provided) */}
          {bottomNav && (
            <div className="shrink-0 w-full z-30">
              {bottomNav}
            </div>
          )}

          {/* OriginOS Home Indicator Gesture Pill */}
          <div
            id="origin-gesture-bar"
            onClick={onHomeClick}
            className="w-full h-3.5 shrink-0 flex items-center justify-center cursor-pointer group bg-black/40 hover:bg-white/5 transition-colors z-30 pb-0.5"
            title="Tap to return Home"
          >
            <div className="w-24 h-1 rounded-full bg-neutral-500/80 group-hover:bg-[#FFE600] group-hover:w-28 transition-all duration-300 shadow-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
