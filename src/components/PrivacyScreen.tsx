import React from 'react';
import { ArrowLeft, ShieldCheck, EyeOff, Lock, Clock, Trash2 } from 'lucide-react';

interface PrivacyScreenProps {
  onBack: () => void;
  onDeleteCurrent?: () => void;
  onClearAll: () => void;
}

export const PrivacyScreen: React.FC<PrivacyScreenProps> = ({
  onBack,
  onDeleteCurrent,
  onClearAll,
}) => {
  const [deletedNotice, setDeletedNotice] = React.useState(false);

  const handleDelete = () => {
    setDeletedNotice(true);
    setTimeout(() => {
      if (onDeleteCurrent) onDeleteCurrent();
      else onClearAll();
    }, 450);
  };

  return (
    <div id="origin-privacy-screen" className="flex-1 flex flex-col px-5 pt-3 pb-5 text-white bg-[#07080a] justify-between">
      <div>
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Continuum</span>
        </button>

        {/* Title */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFE600]"></span>
            <span className="text-[11px] font-mono tracking-widest text-[#FFE600] uppercase font-bold">
              TRUST & CONTROL
            </span>
          </div>
          <h1 className="text-[22px] font-black tracking-tight text-white mt-1 uppercase leading-tight">
            YOUR CONTEXT.<br />YOUR CONTROL.
          </h1>
          <p className="text-[12px] text-neutral-400 mt-1 leading-relaxed">
            Privacy is visual product design, not a legal disclaimer.
          </p>
        </div>

        {/* 4 Core Concepts from Section 11 */}
        <div className="space-y-2.5">
          {/* INTENTIONAL CAPTURE */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FFE600]/15 text-[#FFE600] flex items-center justify-center shrink-0 mt-0.5">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[13px] font-extrabold text-white tracking-wide uppercase">
                INTENTIONAL CAPTURE
              </h3>
              <p className="text-[11.5px] text-neutral-300 mt-0.5 leading-snug">
                Continuum activates when the user chooses to capture.
              </p>
            </div>
          </div>

          {/* TEMPORARY CONTEXT */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 text-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[13px] font-extrabold text-white tracking-wide uppercase">
                TEMPORARY CONTEXT
              </h3>
              <p className="text-[11.5px] text-neutral-300 mt-0.5 leading-snug">
                Moments are designed as temporary working context.
              </p>
            </div>
          </div>

          {/* USER CONTROL */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 text-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[13px] font-extrabold text-white tracking-wide uppercase">
                USER CONTROL
              </h3>
              <p className="text-[11.5px] text-neutral-300 mt-0.5 leading-snug">
                The user decides what gets created and removed.
              </p>
            </div>
          </div>

          {/* NO PASSIVE LISTENING */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[13px] font-extrabold text-white tracking-wide uppercase">
                NO PASSIVE LISTENING
              </h3>
              <p className="text-[11.5px] text-neutral-300 mt-0.5 leading-snug">
                No stealth recording or passive room monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons: [ Delete Moment ] */}
      <div className="pt-3 border-t border-white/10 space-y-2">
        {deletedNotice && (
          <div className="p-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-[11px] font-mono text-center animate-fade-in flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            <span>Context removed</span>
          </div>
        )}

        <button
          id="btn-delete-moment-privacy"
          onClick={handleDelete}
          className="w-full py-3 px-4 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 font-bold text-[13px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
          <span>Delete Moment</span>
        </button>

        <button
          onClick={onClearAll}
          className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white font-medium text-[12px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>Clear all temporary context</span>
        </button>
      </div>
    </div>
  );
};
