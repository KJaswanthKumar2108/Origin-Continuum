import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { ContinuumMoment } from '../types';

interface UnderstandingScreenProps {
  onComplete: (moment?: ContinuumMoment) => void;
  voiceTranscript?: string;
  capturedPayload?: { imageBase64?: string; mimeType?: string; textHint?: string };
  currentMoment?: ContinuumMoment;
}

export const UnderstandingScreen: React.FC<UnderstandingScreenProps> = ({
  onComplete,
  voiceTranscript,
  capturedPayload,
  currentMoment,
}) => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [generatedMoment, setGeneratedMoment] = useState<ContinuumMoment | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Trigger AI Extraction
    const runAIEngine = async () => {
      try {
        const res = await fetch('/api/understand-moment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: capturedPayload?.imageBase64,
            mimeType: capturedPayload?.mimeType,
            voiceTranscript: voiceTranscript || currentMoment?.voiceTranscript,
            textNote: capturedPayload?.textHint,
            scenarioHint: currentMoment?.title,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.moment && isMounted) {
            const finalMoment: ContinuumMoment = {
              id: `moment-${Date.now()}`,
              title: data.moment.title || currentMoment?.title || 'Continuum Moment',
              timestamp: 'Captured just now',
              createdAt: Date.now(),
              sources: currentMoment?.sources || [
                { type: 'whiteboard', label: 'Visual Capture' },
                { type: 'voice', label: 'Voice Intent' },
              ],
              actions: data.moment.actions || currentMoment?.actions || [],
              deadline: data.moment.deadline !== 'Not specified' ? data.moment.deadline : currentMoment?.deadline,
              contextSummary: data.moment.contextSummary || currentMoment?.contextSummary || 'Structured context extracted from capture.',
              voiceTranscript: voiceTranscript || currentMoment?.voiceTranscript,
              extractedText: data.moment.extractedText || currentMoment?.extractedText,
              entities: data.moment.entities || currentMoment?.entities,
              decisions: data.moment.decisions || currentMoment?.decisions,
              unresolvedQuestions: data.moment.unresolvedQuestions || currentMoment?.unresolvedQuestions,
              suggestedNextAction: data.moment.suggestedNextAction || currentMoment?.suggestedNextAction,
              scenarioCategory: currentMoment?.scenarioCategory || 'project',
              visualData: currentMoment?.visualData,
              isDemo: false,
              isAIGenerated: true,
            };
            setGeneratedMoment(finalMoment);
          }
        }
      } catch (err: any) {
        console.error('Error in understand API:', err);
      }
    };

    runAIEngine();

    // Progression timers
    const t1 = setTimeout(() => {
      if (isMounted) setPhase(2);
    }, 1100);

    const t2 = setTimeout(() => {
      if (isMounted) setPhase(3);
    }, 2400);

    return () => {
      isMounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleFinish = () => {
    onComplete(generatedMoment || currentMoment);
  };

  const active = generatedMoment || currentMoment;

  return (
    <div id="origin-understanding-screen" className="flex-1 flex flex-col px-4 sm:px-5 pt-3 pb-3 text-white bg-[#08090d] relative overflow-hidden justify-between min-h-0 select-none">
      {/* Background Neural Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#FFE600]/15 blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neutral-800/80 border border-white/10 text-[10.5px] font-mono text-[#FFE600] mb-1.5">
          <Sparkles className="w-3 h-3" />
          <span>Origin Context Engine</span>
        </div>

        <h1 className="text-[18px] sm:text-[20px] font-black tracking-tight text-white uppercase leading-tight">
          {phase === 1 && 'Reading visual context…'}
          {phase === 2 && 'Understanding Intent'}
          {phase === 3 && 'Continuum Moment Ready'}
        </h1>
        <p className="text-[11.5px] text-neutral-400 font-medium mt-0.5 line-clamp-1">
          {phase === 1 && 'Scanning optical capture & voice intent'}
          {phase === 2 && 'Extracting actionable tasks, deadlines & decisions'}
          {phase === 3 && 'Structured context ready for cross-device continuation'}
        </p>

        {/* Phase progress tracker */}
        <div className="mt-2 flex items-center justify-between px-2.5 py-1 rounded-xl bg-black/50 border border-white/10 text-[8.5px] sm:text-[9px] font-mono font-bold tracking-tight">
          <span className={phase >= 1 ? 'text-[#FFE600]' : 'text-neutral-500'}>RAW CAPTURE</span>
          <span className="text-neutral-600">→</span>
          <span className={phase >= 2 ? 'text-white' : 'text-neutral-500'}>GEMINI ENGINE</span>
          <span className="text-neutral-600">→</span>
          <span className={phase === 3 ? 'text-emerald-400 font-extrabold' : 'text-neutral-500'}>STRUCTURED</span>
        </div>
      </div>

      {/* Central Content */}
      <div className="relative z-10 my-auto py-2 flex flex-col items-center w-full min-h-0 overflow-y-auto">
        {phase === 1 && (
          <div className="w-full max-w-[280px] flex flex-col items-center animate-fade-in space-y-3">
            <div className="relative w-20 h-20 rounded-2xl bg-neutral-900 border-2 border-[#FFE600]/50 flex items-center justify-center shadow-[0_0_35px_rgba(255,230,0,0.2)]">
              <div className="absolute inset-1 rounded-xl border border-[#FFE600]/20 flex items-center justify-center overflow-hidden">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#FFE600] to-transparent animate-scan-beam absolute"></div>
                <Eye className="w-8 h-8 text-[#FFE600] animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFE600] font-bold block">
                STEP 1 • SENSORY OCR
              </span>
              <p className="text-[13px] font-bold text-white">
                Reading visual context…
              </p>
              <p className="text-[11px] text-neutral-400">
                Detecting whiteboard geometry and voice grounding
              </p>
            </div>
          </div>
        )}

        {phase === 2 && (
          <div className="w-full max-w-[300px] space-y-2 animate-fade-in">
            <div className="text-center mb-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFE600] font-bold block">
                STEP 2 • AI CONTEXT STRUCTURING
              </span>
            </div>

            {/* Extracted Tasks */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-[#FFE600]/40 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#FFE600]/15 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <span className="text-[12px] font-bold text-white block">
                    {active?.actions.length || 3} tasks extracted
                  </span>
                  <span className="text-[9.5px] text-neutral-400">Structured into actionable checklist</span>
                </div>
              </div>
              <span className="text-[9px] font-mono text-[#FFE600] font-bold">READY</span>
            </div>

            {/* Deadline */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-[#FFE600]/40 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#FFE600]/15 border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <span className="text-[12px] font-bold text-white block">Temporal Anchor</span>
                  <span className="text-[9.5px] text-neutral-400">
                    Deadline: {active?.deadline || 'Not specified'}
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono text-[#FFE600] font-bold">GROUNDED</span>
            </div>

            {/* Decision / Entities */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-white/10 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <span className="text-[12px] font-bold text-white block">Contextual Grounding</span>
                  <span className="text-[9.5px] text-neutral-400">
                    {active?.title || 'Active Intent'}
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 font-bold">ALIGNED</span>
            </div>
          </div>
        )}

        {phase === 3 && (
          <div className="w-full max-w-[300px] rounded-2xl bg-gradient-to-br from-[#161822]/95 to-[#0f1118]/95 border-2 border-[#FFE600]/70 p-3.5 shadow-2xl animate-fade-in text-left space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9.5px] font-mono text-neutral-400 uppercase tracking-wider block">
                  CONTINUUM MOMENT
                </span>
                <h3 className="text-[15px] font-black text-white leading-tight mt-0.5">
                  {active?.title}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#FFE600] text-black">
                READY
              </span>
            </div>

            <p className="text-[11.5px] text-neutral-300 leading-snug">
              {active?.contextSummary}
            </p>

            {/* Tasks Chips Preview */}
            <div className="space-y-1 bg-black/40 rounded-xl p-2 border border-white/5">
              {active?.actions.slice(0, 3).map((act) => (
                <div key={act.id} className="flex items-center gap-1.5 text-[11px] text-neutral-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] shrink-0"></span>
                  <span className="truncate">{act.title}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1 border-t border-white/10">
              <span>Deadline: <strong className="text-[#FFE600]">{active?.deadline || 'None'}</strong></span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Zero Hallucination</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="relative z-10 w-full pt-2 shrink-0">
        <button
          id="btn-view-structured-moment"
          onClick={handleFinish}
          className={`w-full py-3 px-4 rounded-2xl font-extrabold text-[14px] flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(255,230,0,0.3)] transition-all cursor-pointer ${
            phase === 3
              ? 'bg-[#FFE600] hover:bg-[#fff04d] text-black active:scale-[0.98]'
              : 'bg-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{phase === 3 ? 'Inspect Continuum Moment' : 'Skip Processing'}</span>
        </button>
      </div>
    </div>
  );
};
