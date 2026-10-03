import React, { useState } from 'react';
import {
  Clock,
  ArrowRight,
  Trash2,
  Calendar,
  Search,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Users,
  GraduationCap,
  Building,
  Bell,
  Camera,
  Filter,
} from 'lucide-react';
import { ContinuumMoment } from '../types';

interface MomentsScreenProps {
  moments: ContinuumMoment[];
  onSelectMoment: (moment: ContinuumMoment) => void;
  onDeleteMoment: (id: string) => void;
  onClearAll: () => void;
  onCaptureNew: () => void;
}

export const MomentsScreen: React.FC<MomentsScreenProps> = ({
  moments,
  onSelectMoment,
  onDeleteMoment,
  onClearAll,
  onCaptureNew,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter moments by search and category
  const filteredMoments = moments.filter((m) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      m.scenarioCategory === selectedCategory ||
      m.sources.some((s) => s.type === selectedCategory);

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesTitle = m.title.toLowerCase().includes(query);
    const matchesSummary = m.contextSummary.toLowerCase().includes(query);
    const matchesTask = m.actions.some((a) => a.title.toLowerCase().includes(query));
    const matchesDeadline = m.deadline?.toLowerCase().includes(query);

    return matchesCategory && (matchesTitle || matchesSummary || matchesTask || matchesDeadline);
  });

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'project':
        return <Briefcase className="w-3.5 h-3.5 text-[#FFE600]" />;
      case 'meeting':
        return <Users className="w-3.5 h-3.5 text-sky-400" />;
      case 'lecture':
        return <GraduationCap className="w-3.5 h-3.5 text-purple-400" />;
      case 'client':
        return <Building className="w-3.5 h-3.5 text-emerald-400" />;
      case 'reminder':
        return <Bell className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />;
    }
  };

  return (
    <div id="origin-moments-screen" className="flex-1 flex flex-col px-4 sm:px-5 pt-2 sm:pt-3 pb-3 sm:pb-4 text-white bg-[#07080a] min-h-0 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-[#FFE600] rounded-full"></span>
            <h1 className="text-[17px] sm:text-[18px] font-black tracking-tight text-white uppercase">
              Moments Timeline
            </h1>
          </div>
          <p className="text-[11px] text-neutral-400">
            {moments.length} active continuum contexts
          </p>
        </div>

        {moments.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-[10.5px] font-mono text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search Input (Requirement 5) */}
      <div className="mb-2 shrink-0 relative">
        <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, task, deadline, source..."
          className="w-full bg-neutral-900/90 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFE600]/60 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1.5 mb-1.5 shrink-0 scrollbar-none text-[10px] font-medium">
        {[
          { id: 'all', label: 'All' },
          { id: 'project', label: 'Project' },
          { id: 'meeting', label: 'Meeting' },
          { id: 'lecture', label: 'Lecture' },
          { id: 'client', label: 'Client' },
          { id: 'reminder', label: 'Reminder' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#FFE600] text-black font-extrabold shadow-sm'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Clear All Confirmation */}
      {showClearConfirm && (
        <div className="mb-2 p-2 rounded-xl bg-red-500/15 border border-red-500/40 text-xs flex items-center justify-between gap-2 shrink-0">
          <span className="text-red-200 text-[11px]">Clear all stored moments?</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                onClearAll();
                setShowClearConfirm(false);
              }}
              className="px-2 py-0.5 rounded bg-red-500 text-white font-bold text-[10px]"
            >
              Clear
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 text-[10px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Timeline List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 scrollbar-none pr-0.5 min-h-0">
        {filteredMoments.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-neutral-900/50 border border-white/5">
            <Clock className="w-8 h-8 text-neutral-600 mb-2" />
            <h3 className="text-sm font-bold text-white mb-0.5">No Moments Found</h3>
            <p className="text-[11px] text-neutral-400 max-w-xs mb-3">
              {searchQuery ? 'Try adjusting your search query or filters.' : 'Capture a moment or try another scenario to populate the timeline.'}
            </p>
            <button
              onClick={onCaptureNew}
              className="px-3 py-1.5 rounded-xl bg-[#FFE600] text-black font-extrabold text-xs"
            >
              Capture New Moment
            </button>
          </div>
        ) : (
          filteredMoments.map((m) => {
            const completed = m.actions.filter((a) => a.completed).length;
            const total = m.actions.length;
            const isAllDone = total > 0 && completed === total;

            return (
              <div
                key={m.id}
                onClick={() => onSelectMoment(m)}
                className="group relative rounded-2xl bg-gradient-to-br from-[#151722]/95 to-[#0e1017]/95 border border-white/10 p-3 shadow-md hover:border-[#FFE600]/50 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Header: Title & Timestamp */}
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-start gap-2 min-w-0">
                    <div className="mt-0.5 shrink-0">
                      {getCategoryIcon(m.scenarioCategory)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-bold text-white group-hover:text-[#FFE600] transition-colors leading-snug truncate">
                        {m.title}
                      </h3>
                      <span className="text-[10.5px] font-mono text-neutral-400 block truncate">
                        {m.timestamp}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold shrink-0 ${
                    isAllDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30'
                  }`}>
                    {completed}/{total} done
                  </span>
                </div>

                {/* Source and Deadline */}
                <div className="flex items-center gap-1.5 my-1.5 flex-wrap">
                  {m.sources.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[9.5px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300 border border-neutral-700 font-medium"
                    >
                      {s.label}
                    </span>
                  ))}
                  {m.deadline && (
                    <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-black/40 text-[#FFE600] font-mono flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {m.deadline}
                    </span>
                  )}
                </div>

                {/* Action Items preview */}
                <div className="text-[11.5px] text-neutral-300 space-y-0.5 mb-2 bg-black/30 p-2 rounded-lg">
                  {m.actions.slice(0, 2).map((a) => (
                    <div key={a.id} className="flex items-center gap-2 truncate">
                      <span className={`w-1.5 h-1.5 rounded-full ${a.completed ? 'bg-emerald-400' : 'bg-[#FFE600]'}`}></span>
                      <span className={`truncate ${a.completed ? 'line-through text-neutral-500' : ''}`}>{a.title}</span>
                    </div>
                  ))}
                  {m.actions.length > 2 && (
                    <div className="text-[9.5px] font-mono text-neutral-500 pl-3">
                      +{m.actions.length - 2} more tasks
                    </div>
                  )}
                </div>

                {/* Bottom Actions: Open & Delete */}
                <div className="flex items-center justify-between pt-1.5 border-t border-white/5 text-[10.5px]">
                  <span className="text-[#FFE600] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Open Context</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteMoment(m.id);
                    }}
                    className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                    title="Delete Moment"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Capture shortcut */}
      <div className="pt-2 shrink-0">
        <button
          onClick={onCaptureNew}
          className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5 text-[#FFE600]" />
          <span>Capture New Moment</span>
        </button>
      </div>
    </div>
  );
};
