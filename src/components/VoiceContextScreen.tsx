import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';

interface VoiceContextScreenProps {
  textNote: string;
  onTextNoteChange: (textNote: string) => void;
  onUnderstand: () => void;
  onCancel: () => void;
  hasCapturedImage: boolean;
}

export const VoiceContextScreen: React.FC<VoiceContextScreenProps> = ({
  textNote,
  onTextNoteChange,
  onUnderstand,
  onCancel,
  hasCapturedImage,
}) => {
  const canUnderstand = hasCapturedImage || Boolean(textNote.trim());

  return (
    <div id="origin-voice-screen" className="flex-1 flex flex-col px-4 sm:px-5 pt-3 pb-4 text-white bg-[#0a0b0e] min-h-0">
      <div className="flex items-center justify-between mb-5">
        <button onClick={onCancel} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80" aria-label="Back to capture">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-mono tracking-wider text-[#FFE600] uppercase font-semibold">Understand</span>
        <span className="w-8" />
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-4 h-4 text-[#FFE600]" />
          <h2 className="text-[19px] font-black text-white">Add context</h2>
        </div>
        <p className="text-[12px] text-neutral-400">Add a note to guide what matters in this capture.</p>
      </div>

      <label htmlFor="continuum-text-context" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
        Text annotation (optional)
      </label>
      <textarea
        id="continuum-text-context"
        value={textNote}
        onChange={(event) => onTextNoteChange(event.target.value)}
        placeholder="Q3 planning session. Need to finish this by Friday."
        className="w-full min-h-32 resize-y rounded-xl bg-neutral-900 border border-white/15 p-3 text-[13px] text-white placeholder:text-neutral-500 focus:border-[#FFE600]/60 focus:outline-none"
      />
      <p className="mt-2 text-[10px] text-neutral-500">Voice input — planned</p>
      {hasCapturedImage && <p className="mt-4 text-[11px] text-emerald-300">Photo attached and ready to understand.</p>}

      <div className="mt-auto pt-6 space-y-2">
        <button
          id="btn-understand-moment"
          disabled={!canUnderstand}
          onClick={onUnderstand}
          className="w-full py-3 px-4 rounded-xl bg-[#FFE600] text-black font-extrabold text-[14px] flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Understand</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        {!canUnderstand && <p className="text-center text-[10px] text-neutral-500">Add a photo or text annotation to continue.</p>}
      </div>
    </div>
  );
};
