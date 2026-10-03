import React, { useState } from 'react';
import { X, Eye, Sparkles, Check, Copy, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { ContinuumMoment } from '../types';

interface SourceVerificationModalProps {
  moment: ContinuumMoment;
  isOpen: boolean;
  onClose: () => void;
}

export const SourceVerificationModal: React.FC<SourceVerificationModalProps> = ({
  moment,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyRaw = () => {
    const raw = `ORIGINAL CONTEXT:\n${moment.extractedText || moment.contextSummary}\n\nTEXT ANNOTATION:\n"${moment.textNote || (moment.isDemo ? moment.voiceTranscript : '') || 'N/A'}"\n\nAI EXTRACTED TASKS:\n` +
      moment.actions.map((a, i) => `${i + 1}. [${a.completed ? 'X' : ' '}] ${a.title}`).join('\n');
    navigator.clipboard?.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const visual = moment.visualData || {
    title: moment.title,
    subtitle: 'RAW SENSORY GROUNDING',
    badge: 'OPTICAL SCAN',
    points: moment.actions.map((a) => `• ${a.title}`),
    footerNote: 'Deterministic demo source',
    accentColor: '#FFE600',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-[#0f1118] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-4 sm:p-6 text-white max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[16px] sm:text-[18px] font-black tracking-tight text-white flex items-center gap-2">
                <span>Source Review</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                  SOURCE
                </span>
              </h2>
              <p className="text-[11px] sm:text-[12px] text-neutral-400">
                Inspect the attached image, text annotation, and structured result.
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

        {/* Content Comparison Grid */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1 scrollbar-none">
          {/* Top Comparison: Left = Visual Source, Right = Audio & OCR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Visual Source Grounding */}
            <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                  1. Captured Image
                </span>
                <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  {visual.badge}
                </span>
              </div>

              {moment.imageThumbnailUrl ? (
                <img src={moment.imageThumbnailUrl} alt="Original captured image" className="w-full max-h-56 object-contain rounded-xl bg-black/30" />
              ) : moment.isDemo && moment.visualData ? (
              <div className="rounded-xl bg-[#f8fafc] text-neutral-900 p-3 shadow-inner border border-neutral-300 space-y-2">
                <div className="border-b border-neutral-300 pb-1.5 flex items-center justify-between">
                  <div>
                    <span className="text-[8.5px] font-mono text-neutral-500 font-bold uppercase block">
                      {visual.subtitle}
                    </span>
                    <h4 className="text-[14px] font-extrabold text-neutral-900 leading-tight">
                      {visual.title}
                    </h4>
                  </div>
                </div>

                <ul className="space-y-1 text-[11.5px] font-bold text-neutral-800">
                  {visual.points.map((pt, i) => (
                    <li key={i} className="p-1 rounded bg-neutral-100 border border-neutral-200">
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="pt-1 text-[9.5px] text-neutral-500 font-mono border-t border-neutral-200">
                  {visual.footerNote || 'Deterministic demo source'}
                </div>
              </div>
              ) : (
                <p className="rounded-xl bg-black/30 p-3 text-[11px] text-neutral-400">No image attached. This moment was created from text context.</p>
              )}
            </div>

            {/* Text Annotation & OCR */}
            <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-3.5 flex flex-col justify-between space-y-2.5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                    2. User Text & Extracted Image Text
                  </span>
                  <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30">
                    TEXT CONTEXT
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1 mb-2">
                  <span className="text-[9.5px] font-mono uppercase text-neutral-500 block">
                    User Annotation
                  </span>
                  <p className="text-[12.5px] text-neutral-100 italic font-medium">
                    {moment.textNote || (moment.isDemo ? moment.voiceTranscript : null) || 'No text annotation attached.'}
                  </p>
                </div>

                {moment.extractedText && (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[9.5px] font-mono uppercase text-neutral-500 block">
                      Raw OCR Output
                    </span>
                    <pre className="text-[11px] text-neutral-300 font-mono whitespace-pre-wrap leading-relaxed">
                      {moment.extractedText}
                    </pre>
                  </div>
                )}
              </div>

              <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Review the structured data against its attached sources.</span>
              </div>
            </div>
          </div>

          {/* AI Structured Extraction Breakdown */}
          <div className="rounded-2xl bg-gradient-to-br from-[#161822] to-[#10121a] border border-[#FFE600]/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFE600]" />
                <span className="text-[12.5px] font-bold text-white uppercase font-mono">
                  3. Transformed Continuum Model
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#FFE600]">
                {moment.actions.length} tasks extracted • {moment.deadline || 'No deadline'}
              </span>
            </div>

            {/* Entities, Decisions, Questions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11.5px]">
              {/* Entities */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block mb-1">
                  People & Entities
                </span>
                {moment.entities && moment.entities.length > 0 ? (
                  <ul className="space-y-0.5 text-neutral-200">
                    {moment.entities.map((e, idx) => (
                      <li key={idx} className="truncate">• {e}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-neutral-500 italic">None explicitly identified</span>
                )}
              </div>

              {/* Decisions */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                  Decisions Logged
                </span>
                {moment.decisions && moment.decisions.length > 0 ? (
                  <ul className="space-y-0.5 text-neutral-200">
                    {moment.decisions.map((d, idx) => (
                      <li key={idx} className="line-clamp-2">• {d}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-neutral-500 italic">No formal decisions</span>
                )}
              </div>

              {/* Unresolved Questions */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">
                  Open Questions
                </span>
                {moment.unresolvedQuestions && moment.unresolvedQuestions.length > 0 ? (
                  <ul className="space-y-0.5 text-neutral-200">
                    {moment.unresolvedQuestions.map((q, idx) => (
                      <li key={idx} className="line-clamp-2">• {q}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-neutral-500 italic">None pending</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between shrink-0">
          <button
            onClick={handleCopyRaw}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Full Log</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Raw Verification Log</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#FFE600] text-black font-extrabold text-xs shadow-md cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
