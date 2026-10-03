import React from 'react';
import { Play, Pause, SkipForward, RotateCcw, Sparkles, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { OSView } from '../types';

export interface DemoStep {
  id: number;
  label: string;
  targetView: OSView;
  targetDisplayMode?: 'phone' | 'side-by-side' | 'pc';
  durationMs: number;
  annotation: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    label: '01 — REVIEW SAMPLE MOMENT',
    targetView: 'moment-detail',
    targetDisplayMode: 'phone',
    durationMs: 5000,
    annotation: 'Deterministic demo sample. Live capture remains separate.',
  },
  {
    id: 2,
    label: '02 — CONTINUE ON PC',
    targetView: 'pc-card',
    targetDisplayMode: 'side-by-side',
    durationMs: 5000,
    annotation: 'Preview the proposed PC / Office Kit concept handoff.',
  },
  {
    id: 3,
    label: '03 — PC / OFFICE KIT CONCEPT',
    targetView: 'pc-workspace',
    targetDisplayMode: 'side-by-side',
    durationMs: 6000,
    annotation: 'Inspect the structured sample context on the PC concept screen.',
  },
];

interface DemoControllerProps {
  isRunning: boolean;
  currentStepIndex: number;
  onStartDemo: () => void;
  onPauseToggle: () => void;
  onNextStep: () => void;
  onJumpToStep: (index: number) => void;
  onStopDemo: () => void;
}

export const DemoController: React.FC<DemoControllerProps> = ({
  isRunning,
  currentStepIndex,
  onStartDemo,
  onPauseToggle,
  onNextStep,
  onJumpToStep,
  onStopDemo,
}) => {
  if (!isRunning) return null;

  const currentStep = DEMO_STEPS[currentStepIndex] || DEMO_STEPS[0];

  return (
    <div
      id="demo-mode-active-bar"
      className="fixed top-1.5 sm:top-3 left-1/2 -translate-x-1/2 w-[94%] max-w-[700px] px-3 py-1.5 sm:py-2 bg-[#12141c]/95 border border-[#FFE600]/60 rounded-xl sm:rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl z-50 text-white flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 select-none animate-fade-in"
    >
      {/* Step Info */}
      <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-[#FFE600] text-black font-black text-[10px] sm:text-xs flex items-center justify-center shrink-0 shadow-sm">
          {currentStepIndex + 1}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] sm:text-[12px] font-bold text-white tracking-tight truncate">
              STEP {currentStepIndex + 1}/{DEMO_STEPS.length}: {currentStep.label}
            </span>
            <span className="text-[8.5px] font-mono text-[#FFE600] bg-[#FFE600]/15 px-1 py-0.2 rounded border border-[#FFE600]/40 font-bold">
              GUIDED TOUR
            </span>
          </div>
          <span className="text-[9.5px] sm:text-[10.5px] text-neutral-400 font-medium block truncate">
            {currentStep.annotation}
          </span>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
        <button
          onClick={onPauseToggle}
          className="p-1 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-200 hover:text-white transition-colors cursor-pointer"
          title="Pause / Resume"
        >
          <Pause className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onNextStep}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFE600] text-black font-bold text-[11px] hover:bg-[#ffe81a] transition-colors cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-3 h-3" />
        </button>

        <button
          onClick={onStopDemo}
          className="p-1 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          title="Exit Guided Demo"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
