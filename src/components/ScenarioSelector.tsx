import React from 'react';
import { X, Sparkles, CheckCircle2, ChevronRight, Layers, Briefcase, Users, GraduationCap, Building, Bell } from 'lucide-react';
import { SCENARIOS, ScenarioDefinition } from '../data/sampleMoments';
import { ContinuumMoment } from '../types';

interface ScenarioSelectorProps {
  isOpen: boolean;
  activeMomentId: string;
  onSelectScenario: (moment: ContinuumMoment) => void;
  onClose: () => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  isOpen,
  activeMomentId,
  onSelectScenario,
  onClose,
}) => {
  if (!isOpen) return null;

  const getCategoryIcon = (category: ScenarioDefinition['category']) => {
    switch (category) {
      case 'project':
        return <Briefcase className="w-4 h-4 text-[#FFE600]" />;
      case 'meeting':
        return <Users className="w-4 h-4 text-sky-400" />;
      case 'lecture':
        return <GraduationCap className="w-4 h-4 text-purple-400" />;
      case 'client':
        return <Building className="w-4 h-4 text-emerald-400" />;
      case 'reminder':
        return <Bell className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#FFE600]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-xl rounded-2xl sm:rounded-3xl bg-[#0f1118] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-4 sm:p-6 text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FFE600]/15 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[16px] sm:text-[18px] font-black tracking-tight text-white flex items-center gap-2">
                <span>Demo Moments</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 font-bold uppercase">
                  5 Samples
                </span>
              </h2>
              <p className="text-[11px] sm:text-[12px] text-neutral-400">
                Choose a deterministic sample; samples do not call Gemini.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Scenarios */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1 scrollbar-none">
          {SCENARIOS.map((sc) => {
            const isSelected = activeMomentId === sc.moment.id;
            return (
              <div
                key={sc.id}
                onClick={() => {
                  onSelectScenario(sc.moment);
                  onClose();
                }}
                className={`group p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#1c1f2e] to-[#141622] border-[#FFE600]/70 shadow-lg shadow-[#FFE600]/10'
                    : 'bg-white/5 hover:bg-white/10 border-white/10'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                    {getCategoryIcon(sc.category)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[14px] font-bold text-white group-hover:text-[#FFE600] transition-colors truncate">
                        {sc.name}
                      </h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-neutral-300 border border-white/10">
                        {sc.tag}
                      </span>
                      {sc.id === 'scenario-q3-plan' && (
                        <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-[#FFE600]/20 text-[#FFE600] font-bold border border-[#FFE600]/30">
                          DEFAULT SAMPLE
                        </span>
                      )}
                    </div>

                    <p className="text-[12px] text-neutral-300 mt-1 line-clamp-1">
                      {sc.description}
                    </p>

                    <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-neutral-400">
                      <span>{sc.moment.actions.length} actionable tasks</span>
                      <span>•</span>
                      <span className="text-[#FFE600] font-bold">Due: {sc.moment.deadline || 'None'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {isSelected ? (
                    <span className="px-2.5 py-1 rounded-lg bg-[#FFE600] text-black font-extrabold text-[11px] flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <button className="px-3 py-1.5 rounded-lg bg-white/10 group-hover:bg-[#FFE600] group-hover:text-black text-neutral-300 font-semibold text-[11px] flex items-center gap-1 transition-all">
                      <span>Switch</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono shrink-0">
          <span>Switching updates Phone & PC in real-time</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
