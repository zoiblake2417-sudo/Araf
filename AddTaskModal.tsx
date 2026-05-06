'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2, Star } from 'lucide-react';
import type { Task, Difficulty, TaskStatus } from './TasksMainContent';

interface TaskFormData {
  title: string;
  subject: string;
  difficulty: Difficulty;
  time: string;
  status: TaskStatus;
  notes: string;
}

const POINTS_MAP: Record<Difficulty, number> = { Easy: 5, Medium: 10, Hard: 20 };

interface AddTaskModalProps {
  editingTask: Task | null;
  onClose: () => void;
  onSubmit: (data: Omit<Task, 'id' | 'createdAt'>) => void;
}

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'CS', 'Statistics', 'Economics', 'History', 'Languages', 'Other'];

export default function AddTaskModal({ editingTask, onClose, onSubmit }: AddTaskModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    defaultValues: editingTask
      ? {
          title: editingTask.title,
          subject: editingTask.subject,
          difficulty: editingTask.difficulty,
          time: editingTask.time,
          status: editingTask.status,
          notes: editingTask.notes,
        }
      : {
          difficulty: 'Medium',
          status: 'Pending',
        },
  });

  const difficulty = watch('difficulty') as Difficulty;
  const pointsPreview = POINTS_MAP[difficulty] ?? 10;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleFormSubmit = async (data: TaskFormData) => {
    await new Promise((r) => setTimeout(r, 500));
    onSubmit({
      ...data,
      points: POINTS_MAP[data.difficulty],
    });
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card rounded-2xl border border-border shadow-card-hover animate-scale-in max-h-[90vh] overflow-y-auto scrollbar-thin">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h2 className="text-lg font-bold text-foreground">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {editingTask ? 'Update your task details' : 'Create a study task and earn points on completion'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Points preview banner */}
        <div className="mx-6 mt-5 flex items-center gap-2.5 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
          <Star size={16} className="text-primary shrink-0" />
          <p className="text-sm text-foreground">
            Completing this task will earn you{' '}
            <span className="font-bold text-primary tabular-nums">+{pointsPreview} points</span>
            {' '}({difficulty} difficulty)
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Task title <span className="text-danger">*</span>
            </label>
            <p className="text-xs text-muted-foreground mb-1.5">Be specific — e.g. "Read Chapter 7 and summarize key concepts"</p>
            <input
              type="text"
              placeholder="e.g. Complete Linear Algebra Problem Set 4"
              className={`input-field ${errors.title ? 'border-danger focus:ring-danger' : ''}`}
              {...register('title', {
                required: 'Task title is required',
                minLength: { value: 3, message: 'At least 3 characters' },
                maxLength: { value: 100, message: 'Maximum 100 characters' },
              })}
            />
            {errors.title && <p className="text-danger text-xs mt-1.5 font-medium">{errors.title.message}</p>}
          </div>

          {/* Subject + Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Subject <span className="text-danger">*</span>
              </label>
              <select
                className={`input-field ${errors.subject ? 'border-danger focus:ring-danger' : ''}`}
                {...register('subject', { required: 'Subject is required' })}
              >
                <option value="">Select subject</option>
                {SUBJECTS.map((s) => (
                  <option key={`subj-${s}`} value={s}>{s}</option>
                ))}
              </select>
              {errors.subject && <p className="text-danger text-xs mt-1.5 font-medium">{errors.subject.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Time slot</label>
              <p className="text-xs text-muted-foreground mb-1.5">Optional</p>
              <input
                type="time"
                className="input-field"
                {...register('time')}
              />
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">
              Difficulty <span className="text-danger">*</span>
            </label>
            <p className="text-xs text-muted-foreground mb-2">Easy = +5 pts · Medium = +10 pts · Hard = +20 pts</p>
            <div className="grid grid-cols-3 gap-2">
              {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d) => (
                <label
                  key={`diff-radio-${d}`}
                  className={`
                    flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-all
                    ${difficulty === d
                      ? d === 'Easy' ? 'border-success bg-success-muted' :
                        d === 'Medium'? 'border-amber-400 bg-warning-muted' : 'border-danger bg-danger-muted' :'border-border hover:border-border/80 hover:bg-muted/50'
                    }
                  `}
                >
                  <input type="radio" value={d} className="sr-only" {...register('difficulty', { required: true })} />
                  <span className={`text-sm font-bold ${
                    difficulty === d
                      ? d === 'Easy' ? 'text-success' : d === 'Medium' ? 'text-amber-700' : 'text-danger' :'text-muted-foreground'
                  }`}>{d}</span>
                  <span className={`text-xs font-semibold ${
                    difficulty === d
                      ? d === 'Easy' ? 'text-success' : d === 'Medium' ? 'text-amber-600' : 'text-danger' :'text-muted-foreground'
                  }`}>+{POINTS_MAP[d]} pts</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Initial status</label>
            <select className="input-field" {...register('status')}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Notes</label>
            <p className="text-xs text-muted-foreground mb-1.5">Optional — reference materials, page numbers, reminders</p>
            <textarea
              rows={3}
              placeholder="e.g. Focus on pages 45–52, include all worked examples"
              className="input-field resize-none"
              {...register('notes', { maxLength: { value: 300, message: 'Maximum 300 characters' } })}
            />
            {errors.notes && <p className="text-danger text-xs mt-1.5 font-medium">{errors.notes.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {editingTask ? 'Saving...' : 'Adding...'}
                </>
              ) : (
                editingTask ? 'Save Changes' : 'Add Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}