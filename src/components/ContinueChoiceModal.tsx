import React from 'react';
import { Laptop, Columns, X, ArrowRight, Sparkles, Smartphone } from 'lucide-react';

interface ContinueChoiceModalProps {
  isOpen: boolean;
  momentTitle?: string;
  onSelectOnlyPC: () => void;
  onSelectSideBySide: () => void;
  onClose: () => void;
}

export const ContinueChoiceModal: React.FC<ContinueChoiceModalProps> = ({
  isOpen,
  momentTitle = 'Continuum Moment',
  onSelectOnlyPC,
  onSelectSideBySide,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex items-end sm:items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[340px] rounded-3xl bg-[#0e1017] border border-white/15 p-4 sm:p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.95)] flex flex-col space-y-3.5 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFE600]/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#FFE600]/15 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-[15px] font-black tracking-tight text-white leading-tight">
                Continue on PC
              </h3>
              <span className="text-[10px] font-mono text-neutral-400 block truncate max-w-[200px]">
                {momentTitle}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[11.5px] text-neutral-300 leading-snug">
          Choose how you would like to view your continued workstation context:
        </p>

        {/* Choice Option 1: Only PC */}
        <div
          id="btn-choice-only-pc"
          onClick={onSelectOnlyPC}
          className="group p-3.5 rounded-2xl bg-gradient-to-br from-[#161822] to-[#10121a] border border-white/12 hover:border-[#FFE600]/70 hover:bg-[#1a1d2b] transition-all cursor-pointer shadow-md flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 group-hover:border-[#FFE600]/60 flex items-center justify-center text-[#FFE600] shrink-0 transition-colors">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-bold text-white group-hover:text-[#FFE600] transition-colors">
                  Only PC Workspace
                </span>
                <span className="text-[8.5px] font-mono px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                  Full
                </span>
              </div>
              <span className="text-[10.5px] text-neutral-400 block mt-0.5 leading-tight">
                Switch to full HP 15 laptop hardware frame
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#FFE600] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
        </div>

        {/* Choice Option 2: Side-by-Side */}
        <div
          id="btn-choice-side-by-side"
          onClick={onSelectSideBySide}
          className="group p-3.5 rounded-2xl bg-gradient-to-br from-[#1a1d22] to-[#11131a] border border-white/12 hover:border-[#FFE600]/70 hover:bg-[#1e222c] transition-all cursor-pointer shadow-md flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 group-hover:border-[#FFE600]/60 flex items-center justify-center text-[#FFE600] shrink-0 transition-colors">
              <Columns className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-bold text-white group-hover:text-[#FFE600] transition-colors">
                  Side-by-Side View
                </span>
                <span className="text-[8.5px] font-mono px-1.5 py-0.2 rounded bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 font-bold">
                  Dual
                </span>
              </div>
              <span className="text-[10.5px] text-neutral-400 block mt-0.5 leading-tight">
                Display iQOO 15 & HP 15 together
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#FFE600] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
        </div>

        {/* Cancel button */}
        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl text-neutral-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
