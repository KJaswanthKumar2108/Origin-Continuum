import React, { useState } from 'react';
import { Sliders, Clock, ShieldCheck, Pause, Trash2, Check, RefreshCw } from 'lucide-react';

interface SettingsScreenProps {
  onClearAll: () => void;
  onOpenPrivacy: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onClearAll,
  onOpenPrivacy,
}) => {
  const [contextCapture, setContextCapture] = useState(true);
  const [pcContinuation, setPcContinuation] = useState(true);
  const [memoryDuration, setMemoryDuration] = useState('24 hours');
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div id="origin-settings-screen" className="flex-1 flex flex-col px-5 pt-3 pb-4 text-white bg-[#07080a] justify-between">
      <div>
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-[#FFE600] rounded-full"></span>
            <h1 className="text-[19px] font-black tracking-tight text-white uppercase">
              Continuum Settings
            </h1>
          </div>
          <p className="text-[12px] text-neutral-400">
            Configure ephemeral context engine parameters
          </p>
        </div>

        {/* Toggles List */}
        <div className="space-y-2.5">
          {/* Context Capture */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[14px] font-bold text-white block">Context Capture</span>
              <span className="text-[11px] text-neutral-400">Multi-modal optical sensing</span>
            </div>
            <button
              onClick={() => setContextCapture(!contextCapture)}
              className={`w-12 h-6.5 rounded-full p-0.5 transition-colors flex items-center ${
                contextCapture ? 'bg-[#FFE600] justify-end' : 'bg-neutral-700 justify-start'
              }`}
            >
              <span
                className={`w-5.5 h-5.5 rounded-full bg-black shadow-md block transition-transform`}
              ></span>
            </button>
          </div>

          {/* Voice input is not implemented in this prototype. */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[14px] font-bold text-white block">Voice input — planned</span>
              <span className="text-[11px] text-neutral-400">Add context with a text annotation</span>
            </div>
            <span className="text-[9px] font-mono uppercase text-neutral-500">Planned</span>
          </div>

          {/* PC Continuation */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[14px] font-bold text-white block">PC Continuation</span>
              <span className="text-[11px] text-neutral-400">Office Kit continuity bridge</span>
            </div>
            <button
              onClick={() => setPcContinuation(!pcContinuation)}
              className={`w-12 h-6.5 rounded-full p-0.5 transition-colors flex items-center ${
                pcContinuation ? 'bg-[#FFE600] justify-end' : 'bg-neutral-700 justify-start'
              }`}
            >
              <span
                className={`w-5.5 h-5.5 rounded-full bg-black shadow-md block transition-transform`}
              ></span>
            </button>
          </div>

          {/* Temporary Memory Duration Selector */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[14px] font-bold text-white block">Temporary Memory</span>
                <span className="text-[11px] text-neutral-400">Auto-purge interval</span>
              </div>
              <span className="text-[12px] font-mono text-[#FFE600] font-bold bg-[#FFE600]/10 px-2 py-0.5 rounded-md border border-[#FFE600]/20">
                {memoryDuration}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {['6 hours', '12 hours', '24 hours', '48 hours'].map((dur) => (
                <button
                  key={dur}
                  onClick={() => setMemoryDuration(dur)}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                    memoryDuration === dur
                      ? 'bg-[#FFE600] text-black shadow-sm'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Pause & Clear */}
      <div className="pt-3 border-t border-white/10 space-y-2">
        <button
          id="btn-pause-continuum"
          onClick={() => setIsPaused(!isPaused)}
          className={`w-full py-2.5 px-4 rounded-xl border text-[13px] font-semibold flex items-center justify-center gap-2 transition-all ${
            isPaused
              ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
              : 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
          }`}
        >
          <Pause className="w-4 h-4" />
          <span>{isPaused ? 'Resume Continuum' : 'Pause Continuum'}</span>
        </button>

        <button
          id="btn-clear-all-context"
          onClick={onClearAll}
          className="w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear all context</span>
        </button>
      </div>
    </div>
  );
};
