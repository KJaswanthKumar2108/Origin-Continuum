import React, { useState } from 'react';
import { Camera, Plus, Laptop, Sparkles, ArrowRight, ShieldCheck, HelpCircle, Layers, CheckCircle2, Calendar } from 'lucide-react';
import { ContinuumMoment } from '../types';
import { ContinueChoiceModal } from './ContinueChoiceModal';

interface HomeScreenProps {
  recentMoment: ContinuumMoment;
  onCaptureClick: () => void;
  onContinuePC: (moment: ContinuumMoment) => void;
  onContinueSideBySide: (moment: ContinuumMoment) => void;
  onInspectMoment: (moment: ContinuumMoment) => void;
  onOpenPrivacy: () => void;
  onOpenWhy: () => void;
  onOpenScenarios: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  recentMoment,
  onCaptureClick,
  onContinuePC,
  onContinueSideBySide,
  onInspectMoment,
  onOpenPrivacy,
  onOpenWhy,
  onOpenScenarios,
}) => {
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const completedCount = recentMoment.actions.filter((a) => a.completed).length;
  const totalCount = recentMoment.actions.length;

  return (
    <div id="origin-home-screen" className="flex-1 flex flex-col px-4 sm:px-5 pt-2.5 sm:pt-3 pb-3 sm:pb-4 text-white justify-between overflow-y-auto scrollbar-none min-h-0 select-none relative">
      <div>
        {/* Brand Header & Utility Icons */}
        <div className="flex items-start justify-between mb-2.5">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 bg-[#FFE600] rounded-full inline-block"></span>
              <h1 className="text-[16px] sm:text-[17px] font-black tracking-tight text-white uppercase">
                ORIGIN CONTINUUM
              </h1>
            </div>
            <p className="text-[11.5px] sm:text-[12px] font-medium text-neutral-300 mt-0.5">
              Your Context. Your Control.
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onOpenScenarios}
              className="px-2 py-1 rounded-lg bg-[#FFE600]/15 hover:bg-[#FFE600]/25 text-[#FFE600] border border-[#FFE600]/30 text-[10px] font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="Try another real-world scenario"
            >
              <Layers className="w-3 h-3" />
              <span>Scenarios</span>
            </button>
            <button
              onClick={onOpenPrivacy}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Privacy & Local Storage Control"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Miniature Flow Card: Capture → Understand → Structure → Continue */}
        <div
          id="miniature-flow-card"
          className="relative w-full rounded-2xl bg-gradient-to-b from-[#14161f]/90 via-[#0e1017]/90 to-[#0a0b10]/90 border border-white/10 p-3 mb-3 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center justify-between px-1.5 text-center text-[8.5px] sm:text-[9.5px] font-mono font-bold tracking-tight">
            <span className="text-white uppercase">Capture</span>
            <ArrowRight className="w-2.5 h-2.5 text-[#FFE600] shrink-0" />
            <span className="text-white uppercase">Understand</span>
            <ArrowRight className="w-2.5 h-2.5 text-[#FFE600] shrink-0" />
            <span className="text-white uppercase">Structure</span>
            <ArrowRight className="w-2.5 h-2.5 text-[#FFE600] shrink-0" />
            <span className="text-emerald-400 uppercase font-extrabold">Continue</span>
          </div>
          <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-neutral-300 leading-snug text-center font-medium">
            Don’t transfer what you were doing. Transfer what you need to continue.
          </div>
        </div>

        {/* Active Continuum Moment Card */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10.5px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
            {recentMoment.isDemo ? 'Deterministic Demo Sample' : 'Active Continuum Moment'}
          </span>
          <button
            onClick={onOpenScenarios}
            className="text-[10px] font-mono text-[#FFE600] hover:underline cursor-pointer"
          >
            Try Another Moment →
          </button>
        </div>

        <div
          id="card-recent-moment"
          onClick={() => onInspectMoment(recentMoment)}
          className="group relative rounded-2xl bg-gradient-to-br from-[#161822]/95 to-[#0f1118]/95 border border-white/12 p-3 shadow-xl hover:border-[#FFE600]/40 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md mb-2.5"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <div className="min-w-0">
              <h3 className="text-[14px] sm:text-[15px] font-bold text-white tracking-tight group-hover:text-[#FFE600] transition-colors leading-snug truncate">
                {recentMoment.title}
              </h3>
              <span className="text-[10.5px] text-neutral-400 font-mono block truncate">
                {recentMoment.timestamp} • {recentMoment.sources.map((s) => s.label).join(' + ')}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-semibold bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 font-mono shrink-0">
              {completedCount}/{totalCount} tasks
            </span>
          </div>

          {/* Action Tasks preview */}
          <div className="space-y-1 my-1.5 bg-black/30 rounded-xl p-2 border border-white/5">
            {recentMoment.actions.slice(0, 3).map((act) => (
              <div key={act.id} className="flex items-center gap-2 text-[11.5px] text-neutral-200">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${act.completed ? 'bg-emerald-400' : 'bg-[#FFE600]'}`}></span>
                <span className={`truncate ${act.completed ? 'line-through text-neutral-500' : ''}`}>{act.title}</span>
              </div>
            ))}
          </div>

          {/* Deadline & Quick Continue */}
          <div className="flex items-center justify-between pt-1.5 border-t border-white/5 text-[11px]">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#FFE600]" />
              <span className="text-neutral-400 font-mono text-[10px]">Due:</span>
              <span className="font-bold text-[#FFE600] text-[11px]">{recentMoment.deadline || 'None'}</span>
            </div>

            <button
              id="btn-continue-pc"
              onClick={(e) => {
                e.stopPropagation();
                setIsChoiceModalOpen(true);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FFE600] text-black font-bold text-[11px] hover:bg-[#ffe81a] shadow-md shadow-[#FFE600]/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Continue on PC</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="w-full pt-1 space-y-1.5 shrink-0">
        <button
          id="btn-capture-moment"
          onClick={onCaptureClick}
          className="w-full py-3 px-4 rounded-2xl bg-[#FFE600] hover:bg-[#fff04d] text-black font-extrabold text-[14px] flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(255,230,0,0.3)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          <span>Capture a Moment</span>
        </button>

        <button
          id="btn-view-continuum"
          onClick={() => onInspectMoment(recentMoment)}
          className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-[11.5px] flex items-center justify-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
          <span>Inspect Continuum Details</span>
        </button>
      </div>

      {/* Continue On PC Choice Modal (Option for Only PC or Side-by-Side) */}
      <ContinueChoiceModal
        isOpen={isChoiceModalOpen}
        momentTitle={recentMoment.title}
        onSelectOnlyPC={() => {
          setIsChoiceModalOpen(false);
          onContinuePC(recentMoment);
        }}
        onSelectSideBySide={() => {
          setIsChoiceModalOpen(false);
          onContinueSideBySide(recentMoment);
        }}
        onClose={() => setIsChoiceModalOpen(false)}
      />
    </div>
  );
};
