import React from 'react';
import { Sparkles, ArrowRight, RotateCcw, Smartphone, Laptop, CheckCircle2 } from 'lucide-react';

interface FinalScreenProps {
  onRestartDemo: () => void;
  onExplorePrototype: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({
  onRestartDemo,
  onExplorePrototype,
}) => {
  return (
    <div id="origin-final-screen" className="flex-1 flex flex-col px-5 pt-8 pb-6 text-white bg-[#06070a] justify-between text-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#FFE600]/10 blur-3xl"></div>
      </div>

      {/* Top Brand Block */}
      <div className="relative z-10">
        <h1 className="text-[28px] font-black tracking-tight text-white uppercase leading-tight">
          ORIGIN CONTINUUM
        </h1>
        <p className="text-[14.5px] font-bold text-[#FFE600] mt-1 tracking-tight">
          Context that follows your workflow.
        </p>

        {/* 4-Step Chain */}
        <div className="mt-3.5 w-full max-w-[310px] mx-auto flex items-center justify-between px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-white/10 text-[8.5px] sm:text-[9px] font-mono font-bold tracking-tight shadow-sm">
          <span className="text-white">CAPTURE</span>
          <span className="text-[#FFE600] text-[10px]">→</span>
          <span className="text-white">UNDERSTAND</span>
          <span className="text-[#FFE600] text-[10px]">→</span>
          <span className="text-white">REMEMBER</span>
          <span className="text-[#FFE600] text-[10px]">→</span>
          <span className="text-emerald-400 font-extrabold">CONTINUE</span>
        </div>
      </div>

      {/* Central Statement & Subtle Product Vision */}
      <div className="relative z-10 my-auto py-2 space-y-3.5">
        {/* The Golden Core Quotation */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1c1f15] to-[#12141a] border-2 border-[#FFE600]/60 shadow-xl">
          <p className="text-[16px] font-extrabold text-white leading-snug">
            “Don’t transfer what you were doing.<br />
            <span className="text-[#FFE600]">Transfer what you need to continue.</span>”
          </p>
        </div>

        {/* Subtle Product Vision (Section 26) */}
        <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/10 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              ECOSYSTEM TRAJECTORY
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/30 font-bold">
              Future direction
            </span>
          </div>

          <div className="space-y-1.5 text-[12px]">
            <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
              <span className="font-mono text-[11px] text-neutral-400">TODAY</span>
              <span className="font-bold text-white text-[12px]">Phone → PC</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
              <span className="font-mono text-[11px] text-neutral-400">FUTURE</span>
              <span className="font-semibold text-neutral-200 text-[11.5px]">Phone → PC → Tablet → Other Personal Devices</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons & Hackathon Footer */}
      <div className="relative z-10 space-y-2 pt-1">
        <button
          id="btn-restart-demo"
          onClick={onRestartDemo}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#FFE600] hover:bg-[#fff04d] text-black font-extrabold text-[14px] flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(255,230,0,0.35)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart Demo</span>
        </button>

        <button
          id="btn-explore-freely"
          onClick={onExplorePrototype}
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>Explore Freely</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Small Footer */}
        <div className="pt-2 border-t border-white/10">
          <span className="text-[11px] font-mono text-[#FFE600]/90 uppercase tracking-widest block font-bold">
            Concept Prototype
          </span>
          <span className="text-[10px] text-neutral-500 font-mono mt-0.5 block">
            iQOO Hackathon 2026 Idea Screening
          </span>
        </div>
      </div>
    </div>
  );
};
