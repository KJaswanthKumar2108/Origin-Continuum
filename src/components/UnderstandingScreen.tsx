import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, LoaderCircle, RotateCcw, Sparkles } from 'lucide-react';
import { ContinuumMoment } from '../types';

interface UnderstandingScreenProps {
  capturedPayload?: { imageBase64?: string; mimeType?: string; textHint?: string };
  textNote: string;
  onComplete: (moment: ContinuumMoment) => void;
  onCancel: () => void;
}

const processingStates = [
  'Reading visual context…',
  'Understanding user intent…',
  'Extracting tasks and deadlines…',
  'Structuring temporary context…',
  'Continuum Moment ready',
];

export const UnderstandingScreen: React.FC<UnderstandingScreenProps> = ({
  capturedPayload,
  textNote,
  onComplete,
  onCancel,
}) => {
  const [phase, setPhase] = useState(0);
  const [generatedMoment, setGeneratedMoment] = useState<ContinuumMoment | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const requestRef = useRef<{ attempt: number; promise: Promise<{ ok: boolean; data: any }> } | null>(null);

  useEffect(() => {
    let isMounted = true;
    let nextPhase = 0;
    setPhase(0);
    setGeneratedMoment(null);
    setErrorMessage(null);
    const phaseTimer = window.setInterval(() => {
      nextPhase = Math.min(nextPhase + 1, 3);
      if (isMounted) setPhase(nextPhase);
    }, 1100);

    const runUnderstanding = async () => {
      try {
        let request = requestRef.current;
        if (!request || request.attempt !== attempt) {
          const promise = fetch('/api/understand', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: capturedPayload?.imageBase64,
              mimeType: capturedPayload?.mimeType,
              textNote: textNote.trim(),
            }),
          }).then(async (response) => ({
            ok: response.ok,
            data: await response.json().catch(() => ({})),
          }));
          request = { attempt, promise };
          requestRef.current = request;
        }

        const { ok, data } = await request.promise;
        if (!ok || !data.success || !data.isAIGenerated || !data.moment) {
          throw new Error(data.error || 'OpenRouter did not return a valid Continuum Moment. Please retry.');
        }
        if (!isMounted) return;

        const result = data.moment;
        const sources: ContinuumMoment['sources'] = [];
        if (capturedPayload?.imageBase64) sources.push({ type: 'camera', label: 'Captured image' });
        if (textNote.trim()) sources.push({ type: 'text', label: 'Text annotation' });

        const moment: ContinuumMoment = {
          id: `moment-${Date.now()}`,
          title: result.title,
          timestamp: 'Captured just now',
          createdAt: Date.now(),
          sources,
          actions: result.actions.map((action: any, index: number) => ({
            id: action.id || `act-${Date.now()}-${index + 1}`,
            title: action.title,
            completed: Boolean(action.completed),
            assignee: action.assignee,
          })),
          deadline: result.deadline || 'Not specified',
          contextSummary: result.contextSummary,
          textNote: textNote.trim() || undefined,
          extractedText: result.extractedText,
          entities: result.entities,
          decisions: result.decisions,
          unresolvedQuestions: result.unresolvedQuestions,
          suggestedNextAction: result.suggestedNextAction,
          scenarioCategory: 'project',
          imageThumbnailUrl: capturedPayload?.imageBase64,
          isDemo: false,
          isAIGenerated: true,
        };
        setGeneratedMoment(moment);
        setPhase(4);
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : 'OpenRouter could not process this moment.');
        }
      } finally {
        window.clearInterval(phaseTimer);
      }
    };

    runUnderstanding();
    return () => {
      isMounted = false;
      window.clearInterval(phaseTimer);
    };
  }, [attempt, capturedPayload, textNote]);

  return (
    <div id="origin-understanding-screen" className="flex-1 flex flex-col px-4 sm:px-5 pt-3 pb-3 text-white bg-[#08090d] min-h-0">
      <div className="text-center shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 border border-white/10 text-[10px] font-mono text-[#FFE600] mb-3">
          <Sparkles className="w-3 h-3" />
          <span>CAPTURE → UNDERSTAND → STRUCTURE</span>
        </div>
        <h1 className="text-[18px] sm:text-[20px] font-black text-white leading-tight">
          {errorMessage ? 'AI processing failed.' : processingStates[phase]}
        </h1>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto py-4">
        {errorMessage ? (
          <div role="alert" className="max-w-[320px] mx-auto rounded-xl border border-red-400/30 bg-red-950/30 p-4 text-center">
            <AlertCircle className="w-6 h-6 text-red-300 mx-auto mb-2" />
            <p className="text-[12px] text-neutral-200">{errorMessage}</p>
            <button
              onClick={() => setAttempt((value) => value + 1)}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#FFE600] text-black text-sm font-bold flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Retry
            </button>
          </div>
        ) : generatedMoment ? (
          <div className="max-w-[320px] mx-auto space-y-3">
            {generatedMoment.imageThumbnailUrl && (
              <img src={generatedMoment.imageThumbnailUrl} alt="Captured source" className="w-full max-h-32 object-contain rounded-xl bg-black/30" />
            )}
            <div className="rounded-xl border border-[#FFE600]/50 bg-neutral-900 p-3">
              <div className="flex items-center gap-2 text-[9px] font-mono uppercase text-emerald-300 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> OpenRouter result
              </div>
              <h2 className="text-[16px] font-bold text-white">{generatedMoment.title}</h2>
              <p className="text-[11px] text-neutral-300 mt-1">{generatedMoment.contextSummary}</p>
              <div className="mt-3 space-y-1.5">
                {generatedMoment.actions.map((action) => (
                  <p key={action.id} className="text-[11px] text-neutral-200">□ {action.title}</p>
                ))}
              </div>
              <p className="mt-3 pt-2 border-t border-white/10 text-[10px] text-neutral-300">
                Deadline: <strong className="text-[#FFE600]">{generatedMoment.deadline}</strong>
              </p>
              <p className="mt-1 text-[9px] font-mono text-neutral-500">
                Source: {generatedMoment.sources.map((source) => source.label).join(' + ')}
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-40 flex flex-col items-center justify-center gap-4 text-neutral-300">
            <LoaderCircle className="w-9 h-9 text-[#FFE600] animate-spin" />
            <ol className="w-full max-w-70 space-y-2 text-[11px]">
              {processingStates.slice(0, 4).map((state, index) => (
                <li key={state} className={index <= phase ? 'text-white' : 'text-neutral-600'}>
                  {index < phase ? '✓' : index === phase ? '•' : '○'} {state}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div className="shrink-0 pt-2">
        {generatedMoment ? (
          <button
            onClick={() => onComplete(generatedMoment)}
            className="w-full py-3 px-4 rounded-xl bg-[#FFE600] text-black font-extrabold text-[14px] flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Review Continuum Moment
          </button>
        ) : errorMessage ? (
          <button onClick={onCancel} className="w-full py-2 text-[12px] text-neutral-300 flex items-center justify-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to context
          </button>
        ) : (
          <p className="text-center text-[10px] text-neutral-500">Waiting for the real Gemini response…</p>
        )}
      </div>
    </div>
  );
};
