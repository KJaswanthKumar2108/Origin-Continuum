import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Sparkles, Check, ArrowRight, ShieldAlert } from 'lucide-react';
import { ContinuumMoment } from '../types';

interface ConnectionTransitionProps {
  moment: ContinuumMoment;
  onProceedToOfficeKit: () => void;
  onSkipDirectlyToPC: () => void;
}

export const ConnectionTransition: React.FC<ConnectionTransitionProps> = ({
  moment,
  onProceedToOfficeKit,
  onSkipDirectlyToPC,
}) => {
  const [stage, setStage] = useState<'connecting' | 'ready'>('connecting');
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const pTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(pTimer);
          setStage('ready');
          return 100;
        }
        return prev + 18;
      });
    }, 280);

    return () => clearInterval(pTimer);
  }, []);

  return (
    <div id="origin-connection-transition" className="flex-1 flex flex-col px-5 pt-5 pb-5 text-white bg-[#06070a] relative overflow-hidden justify-between">
      {/* Background Spatial Radiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#FFE600]/10 blur-3xl"></div>
      </div>

      {/* Top Header */}
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-800/80 border border-white/10 text-[10px] font-mono text-[#FFE600] mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-pulse"></span>
          <span>CROSS-DEVICE CONTINUITY</span>
        </div>
        <h2 className="text-[20px] font-extrabold tracking-tight text-white uppercase">
          {stage === 'connecting' ? 'Preparing context for your PC…' : 'Context handoff prepared'}
        </h2>
        <p className="text-[12px] text-neutral-400 font-medium mt-0.5">
          Continuum context ready for your workstation
        </p>
      </div>

      {/* Central Interactive Animation: iQOO PHONE -> OFFICE KIT -> PC */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center">
        {/* Node 1: iQOO PHONE */}
        <div className="w-full max-w-[280px] p-3 rounded-2xl bg-neutral-900/90 border border-white/15 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-[#FFE600]/50 flex items-center justify-center text-[#FFE600] shadow-sm">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                Source Device
              </span>
              <span className="text-[14px] font-bold text-white">iQOO PHONE</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">READY</span>
        </div>

        {/* Animated Inter-Device Conduit 1 */}
        <div className="h-10 flex flex-col items-center justify-center relative my-1">
          <div className="w-0.5 h-full bg-gradient-to-b from-white/30 via-[#FFE600] to-white/30 relative overflow-hidden">
            <div className="w-full h-4 bg-[#FFE600] animate-flow-dash absolute"></div>
          </div>
          <div className="absolute w-5 h-5 rounded-full bg-neutral-950 border border-[#FFE600] flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-[#FFE600] animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Node 2: OFFICE KIT (Bridge Layer) */}
        <div className="w-full max-w-[300px] p-3.5 rounded-2xl bg-gradient-to-r from-[#1b1e15] to-[#12141a] border-2 border-[#FFE600] flex items-center justify-between shadow-[0_0_25px_rgba(255,230,0,0.25)]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFE600] text-black font-extrabold flex items-center justify-center shadow-md">
              <span className="text-[11px] tracking-tighter">OFFICE</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-extrabold text-white">OFFICE KIT</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-800 text-[#FFE600] border border-[#FFE600]/30 font-bold">
                  Concept Preview
                </span>
              </div>
              <span className="text-[11px] text-neutral-300 font-medium">
                3 actions & Friday deadline prepared
              </span>
            </div>
          </div>
          {stage === 'ready' ? (
            <div className="w-6 h-6 rounded-full bg-emerald-400 text-black flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          ) : (
            <div className="w-5 h-5 border-2 border-[#FFE600] border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>

        {/* Animated Inter-Device Conduit 2 */}
        <div className="h-10 flex flex-col items-center justify-center relative my-1">
          <div className="w-0.5 h-full bg-gradient-to-b from-[#FFE600] to-white/30 relative overflow-hidden">
            <div className="w-full h-4 bg-[#FFE600] animate-flow-dash absolute"></div>
          </div>
          <div className="absolute w-5 h-5 rounded-full bg-neutral-950 border border-neutral-600 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600]"></span>
          </div>
        </div>

        {/* Node 3: TARGET PC */}
        <div className="w-full max-w-[280px] p-3 rounded-2xl bg-neutral-900/90 border border-white/15 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center text-neutral-200">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                Target Workspace
              </span>
              <span className="text-[14px] font-bold text-white">PC WORKSPACE</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#FFE600]">
            {stage === 'ready' ? 'SYNCHRONIZED' : `${progress}%`}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 pt-2 space-y-2">
        <button
          id="btn-enter-office-kit"
          onClick={onProceedToOfficeKit}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#FFE600] hover:bg-[#fff04d] text-black font-extrabold text-[15px] flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(255,230,0,0.35)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Open Office Kit Bridge</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <button
          id="btn-skip-direct-pc"
          onClick={onSkipDirectlyToPC}
          className="w-full py-2 px-3 text-neutral-400 hover:text-white text-[12px] font-medium transition-colors"
        >
          Launch PC Workspace directly →
        </button>
      </div>
    </div>
  );
};
