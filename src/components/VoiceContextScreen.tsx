import React, { useState, useEffect } from 'react';
import { Mic, ArrowRight, Play, Pause, Volume2, Sparkles, X, Edit3 } from 'lucide-react';
import { ContinuumMoment } from '../types';

interface VoiceContextScreenProps {
  onUnderstand: (voiceText: string) => void;
  onCancel: () => void;
  currentMoment?: ContinuumMoment;
}

export const VoiceContextScreen: React.FC<VoiceContextScreenProps> = ({
  onUnderstand,
  onCancel,
  currentMoment,
}) => {
  const defaultTranscript = currentMoment?.voiceTranscript || 'Q3 product plan. I need to finish this by Friday.';
  const [transcript, setTranscript] = useState(defaultTranscript);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);

  // Sync if currentMoment changes
  useEffect(() => {
    if (currentMoment?.voiceTranscript) {
      setTranscript(currentMoment.voiceTranscript);
    }
  }, [currentMoment]);

  const bars = [
    25, 45, 70, 95, 60, 30, 85, 100, 75, 40, 20, 60, 90, 80, 50, 35, 70, 85,
    65, 45, 25, 55, 90, 100, 60, 30, 45, 80, 65, 40, 20, 15,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsPlaying((prev) => !prev);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="origin-voice-screen" className="flex-1 flex flex-col px-4 sm:px-5 pt-2.5 sm:pt-3 pb-3 sm:pb-4 text-white bg-[#0a0b0e] min-h-0 select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <button
          onClick={onCancel}
          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <span className="text-[10.5px] font-mono tracking-wider text-[#FFE600] uppercase font-semibold">
          Voice Intent Context
        </span>
        <div className="w-7"></div>
      </div>

      {/* Screen Title */}
      <div className="mb-2 shrink-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-pulse"></span>
          <h2 className="text-[18px] sm:text-[19px] font-black tracking-tight text-white">
            Voice Grounding
          </h2>
        </div>
        <p className="text-[12px] text-neutral-400">
          Pair visual capture with voice intent to guide what matters.
        </p>
      </div>

      {/* Voice Input Card with Waveform */}
      <div className="w-full rounded-2xl bg-gradient-to-br from-[#161822] to-[#0f1117] border border-white/12 p-3.5 shadow-xl mb-2.5 relative overflow-hidden shrink-0">
        {/* Top meta */}
        <div className="flex items-center justify-between text-[10.5px] font-mono text-neutral-400 mb-2">
          <span className="flex items-center gap-1.5 text-[#FFE600] font-bold">
            <Mic className="w-3.5 h-3.5" />
            Voice note captured (0:04)
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Intentional audio
          </span>
        </div>

        {/* Waveform Bars */}
        <div className="w-full h-14 bg-black/40 rounded-xl px-2.5 py-1.5 flex items-center justify-between gap-1 border border-white/5 mb-2.5 overflow-hidden">
          {bars.map((height, idx) => {
            const dynamicScale = isPlaying ? Math.sin(idx * 0.4) * 0.2 + 0.8 : 0.6;
            const finalHeight = Math.max(12, Math.min(100, height * dynamicScale));
            return (
              <div
                key={idx}
                className="w-1.5 rounded-full transition-all duration-300"
                style={{
                  height: `${finalHeight}%`,
                  backgroundColor: idx % 2 === 0 ? '#FFE600' : 'rgba(255, 230, 0, 0.5)',
                }}
              />
            );
          })}
        </div>

        {/* Voice Transcript Quote & Inline Edit */}
        <div className="bg-black/30 rounded-xl p-2.5 border border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9.5px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              Transcribed Intent
            </span>
            <button
              onClick={() => setIsEditingTranscript(!isEditingTranscript)}
              className="text-[9.5px] font-mono text-[#FFE600] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Edit3 className="w-2.5 h-2.5" />
              <span>{isEditingTranscript ? 'Done' : 'Edit text'}</span>
            </button>
          </div>

          {isEditingTranscript ? (
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full h-16 bg-black border border-[#FFE600]/60 rounded p-1.5 text-xs text-white focus:outline-none resize-none font-sans"
            />
          ) : (
            <p className="text-[13px] font-medium text-neutral-100 italic leading-snug">
              “{transcript}”
            </p>
          )}
        </div>
      </div>

      {/* Snapshot Preview */}
      <div className="w-full rounded-xl bg-white/5 border border-white/10 p-2.5 flex items-center justify-between mb-auto shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-7 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[8.5px] font-bold text-neutral-300">
            {currentMoment?.visualData?.badge || 'BOARD'}
          </div>
          <div>
            <span className="text-[12px] font-bold text-white block leading-tight truncate">
              {currentMoment?.title || 'Visual Capture Grounding'}
            </span>
            <span className="text-[10px] text-neutral-400">Paired with voice memo</span>
          </div>
        </div>
        <span className="text-[9.5px] font-mono text-emerald-400 font-semibold shrink-0">Paired</span>
      </div>

      {/* Bottom Actions */}
      <div className="w-full pt-2 space-y-2 shrink-0">
        <button
          id="btn-understand-moment"
          onClick={() => onUnderstand(transcript)}
          className="w-full py-3 px-4 rounded-2xl bg-[#FFE600] hover:bg-[#fff04d] text-black font-extrabold text-[14.5px] flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(255,230,0,0.3)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Understand Moment with AI</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
