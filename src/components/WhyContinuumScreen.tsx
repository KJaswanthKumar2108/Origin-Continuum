import React from 'react';
import { ArrowLeft, ArrowDown, Sparkles, Layers, Cpu, Smartphone, Laptop, Check } from 'lucide-react';

interface WhyContinuumScreenProps {
  onBack: () => void;
}

export const WhyContinuumScreen: React.FC<WhyContinuumScreenProps> = ({ onBack }) => {
  return (
    <div id="origin-why-screen" className="flex-1 flex flex-col px-5 pt-3 pb-5 text-white bg-[#07080a] overflow-y-auto scrollbar-none">
      {/* Top back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors mb-3"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Continuum</span>
      </button>

      {/* Hero Headline */}
      <div className="mb-4">
        <span className="text-[10px] font-mono tracking-widest text-[#FFE600] font-bold uppercase">
          WHY CONTINUUM?
        </span>
        <h1 className="text-[21px] font-black tracking-tight text-white mt-1 leading-tight uppercase">
          Your devices are connected.<br />Your context should be too.
        </h1>
        <div className="mt-2.5 p-3 rounded-2xl bg-[#FFE600]/10 border border-[#FFE600]/30">
          <p className="text-[12.5px] font-semibold text-[#FFE600] italic leading-snug">
            “iQOO already connects the devices. Origin Continuum proposes connecting the context.”
          </p>
        </div>
      </div>

      {/* The 4-Step Core Sequence: Capture → Understand → Remember → Continue */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1b1e15] to-[#11131a] border-2 border-[#FFE600] shadow-xl mb-4">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#FFE600] font-extrabold block mb-3">
          HOW CONTEXT FLOWS
        </span>

        <div className="space-y-2 text-[12.5px]">
          <div className="flex items-start gap-3 p-2 rounded-xl bg-black/40 border border-white/5">
            <span className="w-6 h-6 rounded-lg bg-[#FFE600] text-black font-black text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <span className="font-bold text-white block">CAPTURE</span>
              <span className="text-neutral-400 text-[11.5px]">Something meaningful happens.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2 rounded-xl bg-black/40 border border-white/5">
            <span className="w-6 h-6 rounded-lg bg-neutral-800 text-[#FFE600] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FFE600]/30">
              2
            </span>
            <div>
              <span className="font-bold text-white block">UNDERSTAND</span>
              <span className="text-neutral-400 text-[11.5px]">AI extracts useful meaning.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2 rounded-xl bg-black/40 border border-white/5">
            <span className="w-6 h-6 rounded-lg bg-neutral-800 text-[#FFE600] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FFE600]/30">
              3
            </span>
            <div>
              <span className="font-bold text-white block">REMEMBER</span>
              <span className="text-neutral-400 text-[11.5px]">A temporary structured moment is created.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2 rounded-xl bg-[#FFE600]/15 border border-[#FFE600]/40">
            <span className="w-6 h-6 rounded-lg bg-emerald-400 text-black font-black text-xs flex items-center justify-center shrink-0">
              4
            </span>
            <div>
              <span className="font-extrabold text-[#FFE600] block">CONTINUE</span>
              <span className="text-neutral-200 text-[11.5px]">The context becomes actionable on your next device.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Differentiation Grid: Section 12 Specification */}
      <div className="space-y-3 mb-4">
        {/* TODAY */}
        <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-white/10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2.5">
            TODAY
          </span>
          <div className="grid grid-cols-1 gap-2 text-[12px]">
            <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
              <span className="font-bold text-neutral-300">File Transfer</span>
              <span className="text-neutral-400 font-mono text-[11px]">Moves the file.</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
              <span className="font-bold text-neutral-300">Screen Mirroring</span>
              <span className="text-neutral-400 font-mono text-[11px]">Moves the screen.</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/5">
              <span className="font-bold text-neutral-300">Remote PC</span>
              <span className="text-neutral-400 font-mono text-[11px]">Extends device control.</span>
            </div>
          </div>
        </div>

        {/* ORIGIN CONTINUUM */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#171a12] to-[#101217] border border-[#FFE600]/50 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#FFE600] font-extrabold">
              ORIGIN CONTINUUM
            </span>
            <span className="text-[10px] font-mono text-neutral-400">Context Layer</span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/50 border border-[#FFE600]/30">
            <span className="font-extrabold text-white text-[13px] block">Context Continuity</span>
            <span className="text-[#FFE600] text-[12px] font-medium mt-0.5 block">
              Moves the context needed to continue.
            </span>
          </div>
        </div>
      </div>

      {/* Built for the Ecosystem */}
      <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 mb-2">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">
            Built for the Ecosystem
          </span>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-[#FFE600] border border-[#FFE600]/30 font-bold">
            Concept Preview
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-xl bg-black/40 border border-white/5">
            <span className="font-bold text-white block">iQOO Phone</span>
            <span className="text-neutral-400 text-[10px]">Real-world capture</span>
          </div>
          <div className="p-2 rounded-xl bg-black/40 border border-white/5">
            <span className="font-bold text-white block">OriginOS</span>
            <span className="text-neutral-400 text-[10px]">Contextual AI layer</span>
          </div>
          <div className="p-2 rounded-xl bg-black/40 border border-white/5">
            <span className="font-bold text-white block">Office Kit</span>
            <span className="text-neutral-400 text-[10px]">Continuity bridge</span>
          </div>
          <div className="p-2 rounded-xl bg-[#FFE600]/15 border border-[#FFE600]/30">
            <span className="font-extrabold text-[#FFE600] block">Continuum</span>
            <span className="text-yellow-200/80 text-[10px]">Work follows you</span>
          </div>
        </div>
      </div>
    </div>
  );
};
