import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Check,
  Sparkles,
  ExternalLink,
  Laptop,
  Smartphone,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Plus,
  RefreshCw,
  Eye,
  Sliders,
  Trash2,
  Edit2,
  Filter,
  CheckSquare,
  HelpCircle,
  Users,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Columns,
} from 'lucide-react';
import { ContinuumMoment, TaskItem, SuggestedNextAction } from '../types';
import { SourceVerificationModal } from './SourceVerificationModal';

interface PCWorkspaceProps {
  moment: ContinuumMoment;
  initialStage?: 'card' | 'workspace';
  onReturnToPhone: () => void;
  onToggleSideBySide?: () => void;
  isSideBySide?: boolean;
  onUpdateTasks?: (updatedTasks: TaskItem[]) => void;
  onUpdateDeadline?: (newDeadline: string) => void;
}

export const PCWorkspace: React.FC<PCWorkspaceProps> = ({
  moment,
  initialStage = 'card',
  onReturnToPhone,
  onToggleSideBySide,
  isSideBySide = false,
  onUpdateTasks,
  onUpdateDeadline,
}) => {
  const [activeView, setActiveView] = useState<'card' | 'workspace'>(initialStage);
  const [tasks, setTasks] = useState<TaskItem[]>(moment.actions);
  const [showOriginalModal, setShowOriginalModal] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all');
  
  // Interactive Task Add & Edit state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');

  // Editable Deadline
  const [isEditingDeadline, setIsEditingDeadline] = useState(false);
  const [deadlineVal, setDeadlineVal] = useState(moment.deadline || 'Friday');

  // Suggested Next Step state (Requirement 7)
  const [suggestedStep, setSuggestedStep] = useState<SuggestedNextAction>(
    moment.suggestedNextAction || {
      action: `Prioritize "${moment.actions[0]?.title || 'reviewing notes'}" before proceeding.`,
      reasoning: 'Supported by primary context and active delivery timeline.',
    }
  );
  const [isSuggestionAccepted, setIsSuggestionAccepted] = useState(false);
  const [isRefreshingSuggestion, setIsRefreshingSuggestion] = useState(false);

  // Notes state
  const [workspaceNotes, setWorkspaceNotes] = useState(
    'Key objectives:\n- Align pricing tier with competitor benchmarks\n- Prototype screen transition verified on device\n- Final deck export due Thursday 6 PM for Friday review'
  );
  const [isFinishedContext, setIsFinishedContext] = useState(false);

  // Sync tasks when moment prop changes
  useEffect(() => {
    setTasks(moment.actions);
    setDeadlineVal(moment.deadline || 'Friday');
    if (moment.suggestedNextAction) {
      setSuggestedStep(moment.suggestedNextAction);
    }
  }, [moment]);

  const toggleTask = (taskId: string) => {
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    if (onUpdateTasks) onUpdateTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      completed: false,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    setNewTaskTitle('');
    setIsAddingTask(false);
    if (onUpdateTasks) onUpdateTasks(updated);
  };

  const handleSaveEditTask = (taskId: string) => {
    if (!editingTaskTitle.trim()) return;
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, title: editingTaskTitle.trim() } : t));
    setTasks(updated);
    setEditingTaskId(null);
    if (onUpdateTasks) onUpdateTasks(updated);
  };

  const handleDeleteTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = tasks.filter((t) => t.id !== taskId);
    setTasks(updated);
    if (onUpdateTasks) onUpdateTasks(updated);
  };

  const handleSaveDeadline = () => {
    setIsEditingDeadline(false);
    if (onUpdateDeadline) onUpdateDeadline(deadlineVal);
  };

  const handleCopyContext = () => {
    const text = `${moment.title.toUpperCase()}\nDeadline: ${deadlineVal}\nContext: ${moment.contextSummary}\n\nActions:\n` +
      tasks.map((t, i) => `${i + 1}. [${t.completed ? 'X' : ' '}] ${t.title}${t.assignee ? ` (@${t.assignee})` : ''}`).join('\n');
    navigator.clipboard?.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleRefreshSuggestion = async () => {
    setIsRefreshingSuggestion(true);
    try {
      const res = await fetch('/api/suggest-next-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moment: { ...moment, actions: tasks, deadline: deadlineVal } }),
      });
      if (res.ok) {
        const data = await res.json();
        setSuggestedStep({
          action: data.suggestion,
          reasoning: data.reasoning,
          confidence: data.confidence,
        });
      }
    } catch (err) {
      console.error('Failed to refresh suggestion:', err);
    } finally {
      setIsRefreshingSuggestion(false);
    }
  };

  const handleAcceptSuggestion = () => {
    setIsSuggestionAccepted(true);
    // If not already in tasks, add it as a prioritized task
    if (!tasks.some((t) => t.title.toLowerCase().includes(suggestedStep.action.slice(0, 20).toLowerCase()))) {
      const newTask: TaskItem = {
        id: `task-sugg-${Date.now()}`,
        title: `[Suggested] ${suggestedStep.action}`,
        completed: false,
        priority: 'high',
      };
      const updated = [newTask, ...tasks];
      setTasks(updated);
      if (onUpdateTasks) onUpdateTasks(updated);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'pending') return !t.completed;
    if (taskFilter === 'completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const visual = moment.visualData || {
    title: moment.title,
    subtitle: 'OPTICAL SENSORY GROUNDING',
    badge: 'SCAN MATRIX',
    points: tasks.map((t) => `• ${t.title}`),
    footerNote: 'Captured via iQOO Optical Sensor',
    accentColor: '#FFE600',
  };

  return (
    <div
      id="origin-pc-continuation-view"
      className="w-full h-full min-h-0 flex-1 bg-[#0c0e14] text-white flex flex-col overflow-hidden relative font-sans select-none"
    >
      {/* PC Window Titlebar */}
      <div className="w-full h-9 sm:h-10 px-3 sm:px-4 bg-[#11131a] border-b border-white/10 flex items-center justify-between select-none z-20 shrink-0">
        <div className="flex items-center gap-2">
          {/* Mac / Windows style window controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
          </div>
          <span className="text-[11px] sm:text-[12px] font-mono text-neutral-300 ml-2 font-semibold truncate">
            Origin Continuum — HP 15 Workspace
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-neutral-800 text-[#FFE600] border border-[#FFE600]/30 text-[9px] font-mono font-bold">
            Live Bridge
          </span>
        </div>

        {/* Device Sync Status & Switch */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FFE600]/10 border border-[#FFE600]/30 text-[#FFE600] text-[10px] sm:text-[11px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-pulse"></span>
            <span>Paired with iQOO 15</span>
          </div>

          {onToggleSideBySide && (
            <button
              onClick={onToggleSideBySide}
              className={`flex items-center gap-1 text-[10.5px] sm:text-[11px] px-2 py-1 rounded-md transition-all cursor-pointer ${
                isSideBySide
                  ? 'bg-[#FFE600] text-black font-bold shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 text-white hover:text-[#FFE600]'
              }`}
              title="Toggle Side-by-Side view (Phone + PC)"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Side-by-Side</span>
            </button>
          )}

          <button
            onClick={onReturnToPhone}
            className="flex items-center gap-1 text-[10.5px] sm:text-[11px] text-neutral-300 hover:text-white px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            title="Return to Phone view"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#FFE600]" />
            <span className="hidden sm:inline">Back to Phone</span>
          </button>
        </div>
      </div>

      {/* Main Content: Either Floating Context Card OR Full Continued Workspace */}
      {activeView === 'card' ? (
        /* Floating Contextual Card in PC interface */
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#0c0e14] via-[#090a0f] to-[#07080b] relative overflow-y-auto">
          {/* Ambient Glow */}
          <div className="absolute w-[400px] h-[250px] rounded-full bg-[#FFE600]/5 blur-3xl pointer-events-none"></div>

          {/* Floating Contextual Card */}
          <div
            id="pc-floating-card"
            className="w-full max-w-[480px] rounded-2xl bg-gradient-to-br from-[#161822]/95 to-[#101218]/95 border border-white/15 p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative z-10 hover:border-[#FFE600]/40 transition-all duration-300"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFE600]"></span>
                <span className="text-[11px] font-mono tracking-widest text-[#FFE600] font-extrabold uppercase">
                  CONTINUUM CONTEXT READY
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                {moment.timestamp}
              </span>
            </div>

            {/* Title & Metadata */}
            <h2 className="text-[19px] sm:text-[22px] font-black tracking-tight text-white mb-0.5 leading-tight">
              {moment.title}
            </h2>
            <p className="text-[11.5px] text-neutral-300 mb-3 line-clamp-2">
              {moment.contextSummary}
            </p>

            {/* Actions / Tasks List Preview */}
            <div className="mb-3 bg-black/40 rounded-xl p-3 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                  ACTIONABLE TASKS ({tasks.length})
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {completedCount} of {totalCount} completed
                </span>
              </div>

              <ul className="space-y-1 text-[12.5px] text-neutral-200 font-medium max-h-36 overflow-y-auto pr-1">
                {tasks.map((act) => (
                  <li
                    key={act.id}
                    onClick={() => toggleTask(act.id)}
                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center text-black text-xs ${act.completed ? 'bg-emerald-400' : 'border border-neutral-500'}`}>
                      {act.completed && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={act.completed ? 'line-through text-neutral-500' : 'text-neutral-200'}>
                      {act.title}
                    </span>
                    {act.assignee && (
                      <span className="text-[9.5px] font-mono px-1 rounded bg-sky-500/20 text-sky-300 ml-auto">
                        @{act.assignee}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deadline & Original Context */}
            <div className="space-y-1.5 py-2 border-t border-b border-white/10 mb-3 text-[11.5px]">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-mono uppercase text-[10px]">
                  DEADLINE
                </span>
                <span className="font-extrabold text-[#FFE600]">
                  {deadlineVal}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 font-mono uppercase text-[10px]">
                  ORIGINAL CONTEXT
                </span>
                <span className="text-neutral-200 font-medium">
                  {visual.badge} + Voice Memo
                </span>
              </div>
            </div>

            {/* Continue Actions */}
            <div className="space-y-2">
              <button
                id="btn-pc-continue"
                onClick={() => setActiveView('workspace')}
                className="w-full py-3 px-4 rounded-xl bg-[#FFE600] hover:bg-[#fff04d] text-black font-extrabold text-[13.5px] flex items-center justify-center gap-2 shadow-lg shadow-[#FFE600]/25 transition-all cursor-pointer active:scale-98"
              >
                <span>Open Full Workspace</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  id="btn-dismiss-card"
                  onClick={onReturnToPhone}
                  className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[11px] font-medium transition-colors text-center cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  id="btn-view-original-moment"
                  onClick={() => setShowOriginalModal(true)}
                  className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white text-[11px] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  <span>Verify Source</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Continued Workspace */
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto scrollbar-none">
          {/* Workspace Subheader */}
          <div className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#13151f]/90 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
              <span className="text-[12px] sm:text-[13px] font-extrabold tracking-tight text-white uppercase font-mono truncate">
                CONTINUUM WORKSPACE
              </span>
              <span className="text-neutral-500 text-xs hidden sm:inline">|</span>
              <span className="text-[11.5px] text-neutral-300 font-medium truncate hidden md:inline">
                Context active from iQOO 15
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={() => setShowOriginalModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[11px] font-semibold transition-colors cursor-pointer"
                title="Verify original captured source"
              >
                <Eye className="w-3 h-3 text-sky-400" />
                <span className="hidden sm:inline">Verify Source</span>
              </button>

              <button
                onClick={handleCopyContext}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-200 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="hidden sm:inline">Copy Context</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveView('card')}
                className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-[11px] cursor-pointer"
              >
                Card View
              </button>
            </div>
          </div>

          {/* Split Workspace View */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-3 sm:p-5 overflow-y-auto">
            {/* Left: Original Visual Snapshot & Entities (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-3">
              {/* Visual Card Simulation */}
              <div className="rounded-2xl bg-[#f8fafc] text-neutral-900 p-4 shadow-xl border-2 border-neutral-300 flex flex-col justify-between relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-32 h-20 bg-gradient-to-bl from-white/60 to-transparent pointer-events-none"></div>

                <div>
                  <div className="border-b-2 border-blue-600 pb-1.5 mb-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-[8.5px] font-mono text-blue-700 font-bold uppercase">
                        {visual.subtitle}
                      </span>
                      <h3 className="text-[15px] font-extrabold text-neutral-900 mt-0.5 leading-tight">
                        {visual.title}
                      </h3>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[9.5px] font-mono font-bold">
                      {visual.badge}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-[11.5px] font-bold text-neutral-800">
                    {visual.points.map((pt, idx) => (
                      <li key={idx} className="p-1 rounded bg-yellow-100/70 border border-yellow-300/60 flex items-center justify-between">
                        <span className="truncate">{pt}</span>
                        <span className="text-[8.5px] font-mono text-neutral-500 ml-1 shrink-0">Tag #{idx + 1}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 text-[10px] text-neutral-500 font-mono flex items-center justify-between border-t border-neutral-200 mt-2">
                  <span>Grounding: iQOO Optical OCR</span>
                  <span>Confidence: 99.4%</span>
                </div>
              </div>

              {/* Spoken Voice Intent Quote */}
              <div className="rounded-xl bg-neutral-900/90 border border-white/10 p-3">
                <span className="text-[9.5px] font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                  Spoken Intent
                </span>
                <p className="text-[12px] text-neutral-200 italic leading-snug">
                  “{moment.voiceTranscript || moment.contextSummary}”
                </p>
              </div>

              {/* Entities & Decisions */}
              {(moment.entities?.length || moment.decisions?.length) ? (
                <div className="rounded-xl bg-neutral-900/90 border border-white/10 p-3 space-y-2">
                  {moment.entities && moment.entities.length > 0 && (
                    <div>
                      <span className="text-[9.5px] font-mono text-sky-400 uppercase font-bold block mb-0.5">
                        Identified Entities
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {moment.entities.map((e, idx) => (
                          <span key={idx} className="text-[10.5px] px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-200 border border-sky-500/30">
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {moment.decisions && moment.decisions.length > 0 && (
                    <div>
                      <span className="text-[9.5px] font-mono text-emerald-400 uppercase font-bold block mb-0.5">
                        Key Decisions
                      </span>
                      <ul className="text-[11px] text-neutral-300 space-y-0.5">
                        {moment.decisions.map((d, idx) => (
                          <li key={idx} className="truncate">• {d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Right: Interactive Task Manager & Suggested Next Action (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              {/* Header Title & Progress */}
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="text-[18px] sm:text-[20px] font-black tracking-tight text-white truncate">
                    {moment.title}
                  </h2>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                    <span className="text-[#FFE600]">{completedCount} of {totalCount} done</span>
                    <span>•</span>
                    <span>Progress: {progressPercent}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-24 sm:w-32 h-2 bg-neutral-800 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFE600] to-emerald-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Requirement 7: Context-Aware Suggested Next Step */}
              <div className="rounded-xl bg-gradient-to-r from-[#1c1d29] to-[#12141f] border border-[#FFE600]/40 p-3 shadow-md relative overflow-hidden">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-[#FFE600]" />
                    <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#FFE600] font-bold">
                      Suggested Next Step
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleRefreshSuggestion}
                      disabled={isRefreshingSuggestion}
                      className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="Refresh AI suggestion"
                    >
                      <RefreshCw className={`w-3 h-3 ${isRefreshingSuggestion ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                <p className="text-[12.5px] font-bold text-white leading-snug">
                  {suggestedStep.action}
                </p>
                <p className="text-[11px] text-neutral-300 mt-1">
                  <span className="font-semibold text-neutral-400">Why: </span>
                  {suggestedStep.reasoning}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  {!isSuggestionAccepted ? (
                    <button
                      onClick={handleAcceptSuggestion}
                      className="px-2.5 py-1 rounded-lg bg-[#FFE600] hover:bg-[#ffe81a] text-black font-extrabold text-[11px] flex items-center gap-1 shadow-sm transition-transform active:scale-95 cursor-pointer"
                    >
                      <Check className="w-3 h-3" />
                      <span>Accept as Top Task</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accepted into active tasks</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Interactive Task Manager (Requirement 4) */}
              <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-3.5 shadow-lg space-y-2.5">
                {/* Task Filter & Add Trigger */}
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  {/* Filter tabs */}
                  <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/10 text-[10.5px]">
                    <button
                      onClick={() => setTaskFilter('all')}
                      className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${taskFilter === 'all' ? 'bg-[#FFE600] text-black' : 'text-neutral-400 hover:text-white'}`}
                    >
                      All ({tasks.length})
                    </button>
                    <button
                      onClick={() => setTaskFilter('pending')}
                      className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${taskFilter === 'pending' ? 'bg-[#FFE600] text-black' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Pending ({tasks.filter((t) => !t.completed).length})
                    </button>
                    <button
                      onClick={() => setTaskFilter('completed')}
                      className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${taskFilter === 'completed' ? 'bg-[#FFE600] text-black' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Done ({completedCount})
                    </button>
                  </div>

                  <button
                    onClick={() => setIsAddingTask(!isAddingTask)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#FFE600] text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Task</span>
                  </button>
                </div>

                {/* Inline Add Task Input */}
                {isAddingTask && (
                  <form onSubmit={handleAddTask} className="flex items-center gap-2 p-2 rounded-xl bg-black/50 border border-[#FFE600]/40 animate-fade-in">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Type new task title and press Enter..."
                      autoFocus
                      className="flex-1 bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 rounded-lg bg-[#FFE600] text-black font-bold text-xs cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingTask(false)}
                      className="px-2 py-1 rounded-lg bg-white/10 text-neutral-400 text-xs hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </form>
                )}

                {/* Tasks List */}
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {filteredTasks.length === 0 ? (
                    <div className="py-4 text-center text-xs text-neutral-500 font-mono">
                      No tasks in this filter
                    </div>
                  ) : (
                    filteredTasks.map((task) => {
                      const isEditing = editingTaskId === task.id;
                      return (
                        <div
                          key={task.id}
                          className={`flex items-center justify-between gap-2 p-2.5 rounded-xl border transition-all ${
                            task.completed
                              ? 'bg-neutral-950/60 border-neutral-800 text-neutral-500'
                              : 'bg-black/40 border-white/10 text-white hover:border-[#FFE600]/40'
                          }`}
                        >
                          <div
                            onClick={() => toggleTask(task.id)}
                            className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                          >
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                                task.completed
                                  ? 'bg-emerald-500 text-black'
                                  : 'border-2 border-neutral-500 hover:border-[#FFE600]'
                              }`}
                            >
                              {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>

                            {isEditing ? (
                              <input
                                type="text"
                                value={editingTaskTitle}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setEditingTaskTitle(e.target.value)}
                                autoFocus
                                className="flex-1 bg-black text-xs text-white border border-[#FFE600] rounded px-1.5 py-0.5 focus:outline-none"
                              />
                            ) : (
                              <span
                                className={`text-[12.5px] font-medium truncate ${
                                  task.completed ? 'line-through text-neutral-500' : 'text-neutral-100'
                                }`}
                              >
                                {task.title}
                              </span>
                            )}
                          </div>

                          {/* Actions: Edit, Delete, Assignee */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            {task.assignee && (
                              <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                                @{task.assignee}
                              </span>
                            )}

                            {isEditing ? (
                              <>
                                <button
                                  onClick={() => handleSaveEditTask(task.id)}
                                  className="p-1 rounded bg-emerald-500 text-black hover:bg-emerald-400"
                                >
                                  <Check className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => setEditingTaskId(null)}
                                  className="p-1 rounded bg-white/10 text-neutral-400 hover:text-white"
                                >
                                  <ArrowLeft className="w-3 h-3" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingTaskId(task.id);
                                    setEditingTaskTitle(task.title);
                                  }}
                                  className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10"
                                  title="Edit task"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteTask(task.id, e)}
                                  className="p-1 rounded text-neutral-400 hover:text-red-400 hover:bg-red-500/10"
                                  title="Delete task"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Deadline & Context Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Editable Deadline */}
                <div className="rounded-xl bg-neutral-900/90 border border-white/10 p-2.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                      Deadline
                    </span>
                    <button
                      onClick={() => setIsEditingDeadline(!isEditingDeadline)}
                      className="text-[9.5px] font-mono text-[#FFE600] hover:underline"
                    >
                      {isEditingDeadline ? 'Done' : 'Change'}
                    </button>
                  </div>

                  {isEditingDeadline ? (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <input
                        type="text"
                        value={deadlineVal}
                        onChange={(e) => setDeadlineVal(e.target.value)}
                        placeholder="e.g. Friday, Tuesday 2 PM"
                        className="flex-1 bg-black border border-[#FFE600]/60 rounded px-1.5 py-0.5 text-xs text-white"
                      />
                      <button
                        onClick={handleSaveDeadline}
                        className="px-2 py-0.5 rounded bg-[#FFE600] text-black font-bold text-[10px]"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-1.5">
                      <Calendar className="w-4 h-4 text-[#FFE600]" />
                      <span className="text-[15px] font-black text-white">{deadlineVal}</span>
                    </div>
                  )}
                  <span className="text-[9.5px] text-neutral-400 mt-1">
                    Temporal grounding active
                  </span>
                </div>

                {/* Context Status */}
                <div className="rounded-xl bg-neutral-900/90 border border-white/10 p-2.5 flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                    Continuity Mode
                  </span>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-bold mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live Bi-Directional Sync</span>
                  </div>
                  <span className="text-[9.5px] text-neutral-400 mt-1 truncate">
                    Edits sync with phone automatically
                  </span>
                </div>
              </div>

              {/* Working Draft Space & Notes */}
              <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-3 shadow-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">
                    Working Draft & Notes
                  </span>
                  <span className="text-[9.5px] font-mono text-neutral-500">
                    Auto-saved
                  </span>
                </div>
                <textarea
                  value={workspaceNotes}
                  onChange={(e) => setWorkspaceNotes(e.target.value)}
                  placeholder="Continue typing project details, notes, or execution steps..."
                  className="w-full h-16 bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-[#FFE600]/60 resize-none font-mono leading-relaxed"
                />
              </div>

              {/* Finish Context Button & Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
                {isFinishedContext ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Continuum context completed</span>
                  </div>
                ) : (
                  <button
                    id="btn-finish-context"
                    onClick={() => setIsFinishedContext(true)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Finish Context</span>
                  </button>
                )}

                <button
                  onClick={onReturnToPhone}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#FFE600]" />
                  <span>Return to iQOO 15</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Source Verification Modal */}
      <SourceVerificationModal
        moment={moment}
        isOpen={showOriginalModal}
        onClose={() => setShowOriginalModal(false)}
      />
    </div>
  );
};
