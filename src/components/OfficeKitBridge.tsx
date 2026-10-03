import React from 'react';
import { Laptop, Smartphone, Check, ArrowRight, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { ContinuumMoment } from '../types';

interface OfficeKitBridgeProps {
  moment: ContinuumMoment;
  onContinueToPC: () => void;
  onBack: () => void;
}

export const OfficeKitBridge: React.FC<OfficeKitBridgeProps> = ({
  moment,
  onContinueToPC,
  onBack,
}) => {
  return (
    <div id="origin-office-kit-bridge" className="flex-1 flex flex-col px-5 pt-4 pb-5 text-white bg-[#06070a] justify-between">
      {/* Top Bar with honest concept badge */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFE600]"></span>
            <span className="text-[12px] font-mono tracking-wider font-extrabold text-white uppercase">
              OFFICE KIT
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-[#FFE600] border border-[#FFE600]/30 text-[10px] font-mono font-bold">
            Concept Preview
          </span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400/50 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
          </div>
          <div>
            <h2 className="text-[18px] font-black tracking-tight text-white">
              Connected
            </h2>
            <p className="text-[12px] text-neutral-400">
              Continuum context ready
            </p>
          </div>
        </div>
      </div>

      {/* Main Bridge Graphic */}
      <div className="my-auto py-2 flex flex-col items-center">
        {/* Device Trio: Phone -> Continuum Context -> PC */}
        <div className="w-full max-w-[310px] rounded-2xl bg-gradient-to-b from-[#14161f] to-[#0c0d12] border border-white/10 p-5 shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-[#FFE600]/15 rounded-full blur-2xl pointer-events-none"></div>

          {/* Node 1: Phone */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-neutral-400 block">Phone</span>
              <span className="text-[13px] font-bold text-white">iQOO Phone</span>
            </div>
          </div>

          {/* Connection vector */}
          <div className="pl-5 my-1 flex items-center gap-3">
            <div className="w-0.5 h-8 bg-[#FFE600]/60 relative">
              <div className="w-2 h-2 rounded-full bg-[#FFE600] -left-[3px] top-1/2 -translate-y-1/2 absolute"></div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFE600]/15 border border-[#FFE600]/30 text-[#FFE600] text-[11px] font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Continuum Context</span>
            </div>
          </div>

          {/* Node 2: PC */}
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-neutral-400 block">PC</span>
              <span className="text-[13px] font-bold text-white">Office Kit Workstation</span>
            </div>
          </div>
        </div>

        {/* Central Quote statement */}
        <div className="mt-5 text-center px-4">
          <p className="text-[15px] font-bold text-white leading-snug">
            “Your context is ready to continue.”
          </p>
          <p className="text-[12px] text-neutral-400 mt-1">
            No file clutter. The task, deadline, and source remain connected.
          </p>
        </div>
      </div>

      {/* Technical Honesty Note & Buttons */}
      <div className="space-y-3">
        {/* Concept disclosure banner */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
          <p className="text-[11px] text-neutral-300 leading-tight">
            <strong className="text-white">Concept Preview:</strong> Prototype concept demonstrating how Continuum could extend the existing cross-device experience.
          </p>
        </div>

        <button
          id="btn-launch-pc-view"
          onClick={onContinueToPC}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#FFE600] hover:bg-[#fff04d] text-black font-extrabold text-[15px] flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(255,230,0,0.35)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Continue to PC Workspace</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
