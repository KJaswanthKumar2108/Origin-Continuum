import React, { useState } from 'react';
import {
  ArrowRight,
  Trash2,
  Calendar,
  Sparkles,
  CheckSquare,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Check,
  Plus,
  Edit2,
  Eye,
  CheckCircle2,
  Users,
  Lightbulb,
} from 'lucide-react';
import { ContinuumMoment, TaskItem } from '../types';
import { SourceVerificationModal } from './SourceVerificationModal';
import { ContinueChoiceModal } from './ContinueChoiceModal';

interface ContinuumMomentScreenProps {
  moment: ContinuumMoment;
  onContinuePC: (moment: ContinuumMoment) => void;
  onContinueSideBySide?: (moment: ContinuumMoment) => void;
  onDelete: (momentId: string) => void;
  onBack: () => void;
  onUpdateTasks?: (tasks: TaskItem[]) => void;
  onUpdateDeadline?: (deadline: string) => void;
}

export const ContinuumMomentScreen: React.FC<ContinuumMomentScreenProps> = ({
  moment,
  onContinuePC,
  onContinueSideBySide,
  onDelete,
  onBack,
  onUpdateTasks,
  onUpdateDeadline,
}) => {
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>(moment.actions);
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Sync with prop changes
  React.useEffect(() => {
    setTasks(moment.actions);
  }, [moment.actions]);

  const toggleTask = (taskId: string) => {
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    if (onUpdateTasks) onUpdateTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `act-${Date.now()}`,
      title: newTaskTitle.trim(),
      completed: false,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    setNewTaskTitle('');
    setIsAddingTask(false);
    if (onUpdateTasks) onUpdateTasks(updated);
  };

  const handleSaveEdit = (taskId: string) => {
    if (!editingTitle.trim()) return;
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, title: editingTitle.trim() } : t));
    setTasks(updated);
    setEditingTaskId(null);
    if (onUpdateTasks) onUpdateTasks(updated);
  };

  const handleDeleteTask = (taskId: string) => {
    const updated = tasks.filter((t) => t.id !== taskId);
    setTasks(updated);
    if (onUpdateTasks) onUpdateTasks(updated);
  };

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'pending') return !t.completed;
    if (taskFilter === 'completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div id="origin-moment-screen" className="flex-1 flex flex-col px-4 sm:px-5 pt-2 sm:pt-3 pb-3 sm:pb-4 text-white bg-[#07080b] min-h-0">
      {/* Top Bar with back button */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSourceModal(true)}
            className="flex items-center gap-1 text-[10.5px] font-mono px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/15 text-neutral-300 transition-colors cursor-pointer"
            title="View original capture and text context"
          >
            <Eye className="w-3 h-3 text-sky-400" />
            <span>Verify Source</span>
          </button>

          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 font-bold">
            {moment.isDemo ? 'Demo Moment' : 'AI Moment'}
          </span>
        </div>
      </div>

      {/* Main Full-Screen Contextual Card */}
      <div className="flex-1 overflow-y-auto pr-0.5 space-y-2.5 scrollbar-none min-h-0">
        {/* Title & Timestamp */}
        <div className="pt-0.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.2 rounded text-[9.5px] font-mono font-bold bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 uppercase">
              {moment.sources.map((s) => s.label).join(' + ')}
            </span>
            <span className="text-[10.5px] font-mono text-neutral-400">
              {moment.timestamp}
            </span>
          </div>
          <h1 className="text-[20px] sm:text-[22px] font-black tracking-tight text-white leading-tight">
            {moment.title}
          </h1>
        </div>

        {/* SECTION: INTENT & CONTEXT */}
        <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-3 backdrop-blur-md">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#FFE600] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Context & Intent</span>
            </div>
            <span className="text-[9.5px] font-mono text-neutral-400">Ground truth</span>
          </div>
          <p className="text-[12.5px] text-neutral-200 leading-snug font-medium">
            {moment.contextSummary}
          </p>

          {(moment.textNote || (moment.isDemo && moment.voiceTranscript)) && (
            <div className="mt-2 pt-2 border-t border-white/5 flex items-start gap-2 text-[11px] text-neutral-300">
              <FileText className="w-3.5 h-3.5 text-[#FFE600] shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-[9.5px] font-mono uppercase text-neutral-400 block font-semibold">
                  {moment.isDemo ? 'Demo sample context' : 'Text annotation'}
                </span>
                <span className="text-neutral-200">{moment.textNote || moment.voiceTranscript}</span>
              </div>
            </div>
          )}
        </div>

        {/* SECTION: INTERACTIVE TASKS (Requirement 4) */}
        <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-[#FFE600]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-300 font-bold">
                Tasks ({completedCount}/{tasks.length})
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsAddingTask(!isAddingTask)}
                className="p-1 text-[#FFE600] hover:bg-white/10 rounded transition-colors"
                title="Add task"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5 text-[10px]">
            <button
              onClick={() => setTaskFilter('all')}
              className={`flex-1 py-0.5 text-center rounded font-semibold transition-colors ${taskFilter === 'all' ? 'bg-[#FFE600] text-black' : 'text-neutral-400'}`}
            >
              All ({tasks.length})
            </button>
            <button
              onClick={() => setTaskFilter('pending')}
              className={`flex-1 py-0.5 text-center rounded font-semibold transition-colors ${taskFilter === 'pending' ? 'bg-[#FFE600] text-black' : 'text-neutral-400'}`}
            >
              Pending ({tasks.filter((t) => !t.completed).length})
            </button>
            <button
              onClick={() => setTaskFilter('completed')}
              className={`flex-1 py-0.5 text-center rounded font-semibold transition-colors ${taskFilter === 'completed' ? 'bg-[#FFE600] text-black' : 'text-neutral-400'}`}
            >
              Done ({completedCount})
            </button>
          </div>

          {/* Inline Add Task Input */}
          {isAddingTask && (
            <form onSubmit={handleAddTask} className="flex items-center gap-1.5 p-1.5 rounded-lg bg-black/60 border border-[#FFE600]/50 animate-fade-in">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="New task..."
                autoFocus
                className="flex-1 bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none px-1"
              />
              <button type="submit" className="px-2 py-0.5 rounded bg-[#FFE600] text-black font-bold text-[10px]">
                Add
              </button>
              <button type="button" onClick={() => setIsAddingTask(false)} className="text-neutral-400 text-[10px] px-1">
                ✕
              </button>
            </form>
          )}

          {/* Tasks List */}
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-0.5">
            {filteredTasks.length === 0 ? (
              <div className="py-2 text-center text-[11px] text-neutral-500 font-mono">
                No tasks in this filter
              </div>
            ) : (
              filteredTasks.map((act) => {
                const isEditing = editingTaskId === act.id;
                return (
                  <div
                    key={act.id}
                    className={`flex items-center justify-between gap-2 p-2 rounded-xl border transition-all ${
                      act.completed
                        ? 'bg-black/20 border-neutral-800/80 text-neutral-500'
                        : 'bg-black/40 border-white/5 text-white'
                    }`}
                  >
                    <div
                      onClick={() => toggleTask(act.id)}
                      className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                          act.completed
                            ? 'bg-emerald-500 text-black'
                            : 'border border-neutral-500 hover:border-[#FFE600]'
                        }`}
                      >
                        {act.completed && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      {isEditing ? (
                        <input
                          type="text"
                          value={editingTitle}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          autoFocus
                          className="flex-1 bg-black text-xs text-white border border-[#FFE600] rounded px-1"
                        />
                      ) : (
                        <span
                          className={`text-[12px] font-medium truncate ${
                            act.completed ? 'line-through text-neutral-500' : 'text-neutral-100'
                          }`}
                        >
                          {act.title}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {act.assignee && (
                        <span className="text-[9px] font-mono px-1 rounded bg-sky-500/20 text-sky-300">
                          @{act.assignee}
                        </span>
                      )}

                      {isEditing ? (
                        <button
                          onClick={() => handleSaveEdit(act.id)}
                          className="p-0.5 text-emerald-400"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingTaskId(act.id);
                            setEditingTitle(act.title);
                          }}
                          className="p-0.5 text-neutral-400 hover:text-white"
                        >
                          <Edit2 className="w-2.5 h-2.5" />
                        </button>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(act.id);
                        }}
                        className="p-0.5 text-neutral-400 hover:text-red-400"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* SECTION: DEADLINE & CONTEXT SOURCE */}
        <div className="grid grid-cols-2 gap-2">
          {/* DEADLINE */}
          <div className="rounded-xl bg-neutral-900/90 border border-white/10 p-2.5 flex flex-col justify-between">
            <span className="text-[9.5px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              DEADLINE
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Calendar className="w-3.5 h-3.5 text-[#FFE600]" />
              <span className="text-[13px] font-black text-white">{moment.deadline || 'None'}</span>
            </div>
          </div>

          {/* CONTEXT SOURCE */}
          <div
            onClick={() => setShowSourceModal(true)}
            className="rounded-xl bg-neutral-900/90 border border-white/10 p-2.5 flex flex-col justify-between hover:border-sky-400/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                CONTEXT
              </span>
              <Eye className="w-3 h-3 text-sky-400" />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <ImageIcon className="w-3.5 h-3.5 text-[#FFE600]" />
              <span className="text-[12px] font-bold text-white truncate">
                {moment.sources[0]?.label || 'Visual'}
              </span>
            </div>
          </div>
        </div>

        {/* Suggested Next Action snippet */}
        {moment.suggestedNextAction && (
          <div className="rounded-xl bg-gradient-to-r from-[#171924] to-[#0f1118] border border-[#FFE600]/30 p-2.5 text-[11px]">
            <div className="flex items-center gap-1 text-[#FFE600] font-mono font-bold text-[9.5px] uppercase mb-0.5">
              <Lightbulb className="w-3 h-3" />
              <span>Suggested Next Step</span>
            </div>
            <p className="text-neutral-200 font-medium leading-tight">
              {moment.suggestedNextAction.action}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Block */}
      <div className="pt-2 border-t border-white/10 space-y-1.5 shrink-0">
        <button
          id="btn-moment-continue-pc"
          onClick={() => setIsChoiceModalOpen(true)}
          className="w-full py-3 px-4 rounded-xl bg-[#FFE600] hover:bg-[#fff04d] text-black font-extrabold text-[14px] flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(255,230,0,0.3)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Continue on PC</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>

        {showDeleteConfirm ? (
          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs">
            <span className="text-red-300 flex-1 text-[11px]">Delete this moment?</span>
            <button
              onClick={() => onDelete(moment.id)}
              className="px-2 py-0.5 rounded bg-red-500 text-white font-bold text-[10px]"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 text-[10px]"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            id="btn-delete-moment"
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full py-1.5 px-3 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>Delete Moment</span>
          </button>
        )}
      </div>

      {/* Continue Choice Modal (Only PC or Side-by-Side) */}
      <ContinueChoiceModal
        isOpen={isChoiceModalOpen}
        momentTitle={moment.title}
        onSelectOnlyPC={() => {
          setIsChoiceModalOpen(false);
          onContinuePC(moment);
        }}
        onSelectSideBySide={() => {
          setIsChoiceModalOpen(false);
          if (onContinueSideBySide) {
            onContinueSideBySide(moment);
          } else {
            onContinuePC(moment);
          }
        }}
        onClose={() => setIsChoiceModalOpen(false)}
      />

      {/* Source Verification Modal */}
      <SourceVerificationModal
        moment={moment}
        isOpen={showSourceModal}
        onClose={() => setShowSourceModal(false)}
      />
    </div>
  );
};
