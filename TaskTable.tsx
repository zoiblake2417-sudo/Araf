'use client';
import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Edit2, Trash2, ChevronUp, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import type { Task, TaskStatus } from './TasksMainContent';

const DIFFICULTY_POINTS: Record<string, number> = { Easy: 5, Medium: 10, Hard: 20 };

type SortKey = 'title' | 'subject' | 'difficulty' | 'time' | 'points' | 'status';
type SortDir = 'asc' | 'desc';

interface TaskTableProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  deletingId: string | null;
  completingId: string | null;
}

const STATUS_DROPDOWN_OPTIONS: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];

export default function TaskTable({ tasks, onComplete, onEdit, onDelete, deletingId, completingId }: TaskTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('time');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [openStatusDropdown, setOpenStatusDropdown] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...tasks].sort((a, b) => {
    let av: string | number = a[sortKey as keyof Task] as string | number;
    let bv: string | number = b[sortKey as keyof Task] as string | number;
    if (sortKey === 'points') { av = Number(av); bv = Number(bv); }
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="text-muted-foreground/40" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-primary" />
      : <ChevronDown size={12} className="text-primary" />;
  };

  if (tasks.length === 0) {
    return (
      <div className="card-base flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <AlertCircle size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-1">No tasks match your filters</h3>
        <p className="text-sm text-muted-foreground max-w-xs">Try adjusting your search or filter criteria to find what you&apos;re looking for.</p>
      </div>
    );
  }

  return (
    <div className="card-base overflow-hidden p-0">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 w-8">
                <span className="sr-only">Complete</span>
              </th>
              {[
                { key: 'title' as SortKey, label: 'Task' },
                { key: 'subject' as SortKey, label: 'Subject' },
                { key: 'difficulty' as SortKey, label: 'Difficulty' },
                { key: 'time' as SortKey, label: 'Time' },
                { key: 'points' as SortKey, label: 'Points' },
                { key: 'status' as SortKey, label: 'Status' },
              ].map((col) => (
                <th
                  key={`th-${col.key}`}
                  className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide cursor-pointer hover:text-foreground transition-colors select-none"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
              <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((task, idx) => {
              const isDeleting = deletingId === task.id;
              const isCompleting = completingId === task.id;
              const isCompleted = task.status === 'Completed';

              return (
                <tr
                  key={task.id}
                  className={`
                    border-b border-border/60 last:border-0 transition-all duration-300
                    ${idx % 2 === 0 ? '' : 'bg-muted/20'}
                    hover:bg-muted/50
                    ${isDeleting ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100'}
                    ${isCompleted ? 'opacity-80' : ''}
                  `}
                >
                  {/* Complete toggle */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => !isCompleted && onComplete(task.id)}
                      disabled={isCompleted || isCompleting !== null}
                      className={`transition-all duration-150 ${isCompleted ? 'text-success cursor-default' : 'text-muted-foreground hover:text-primary active:scale-90'}`}
                      aria-label={isCompleted ? 'Task completed' : 'Mark as complete'}
                    >
                      {isCompleting ? (
                        <Loader2 size={18} className="animate-spin text-primary" />
                      ) : isCompleted ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <Circle size={18} />
                      )}
                    </button>
                  </td>

                  {/* Title */}
                  <td className="px-4 py-3">
                    <p className={`font-semibold text-foreground leading-tight max-w-[220px] truncate ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </p>
                    {task.notes && (
                      <p className="text-2xs text-muted-foreground mt-0.5 truncate max-w-[220px]">{task.notes}</p>
                    )}
                  </td>

                  {/* Subject */}
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground font-medium">{task.subject}</span>
                  </td>

                  {/* Difficulty */}
                  <td className="px-4 py-3">
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                      ${task.difficulty === 'Easy' ? 'bg-success-muted text-success' : ''}
                      ${task.difficulty === 'Medium' ? 'bg-warning-muted text-amber-700' : ''}
                      ${task.difficulty === 'Hard' ? 'bg-danger-muted text-danger' : ''}
                    `}>
                      {task.difficulty}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock size={13} />
                      <span className="text-sm tabular-nums">{task.time || '—'}</span>
                    </div>
                  </td>

                  {/* Points */}
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold tabular-nums ${isCompleted ? 'text-success' : 'text-primary'}`}>
                      +{task.points}
                    </span>
                  </td>

                  {/* Status — inline dropdown */}
                  <td className="px-4 py-3 relative">
                    <button
                      onClick={() => setOpenStatusDropdown(openStatusDropdown === task.id ? null : task.id)}
                      className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-all
                        hover:ring-2 hover:ring-ring/30
                        ${task.status === 'Completed' ? 'bg-success-muted text-success' : ''}
                        ${task.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : ''}
                        ${task.status === 'Pending' ? 'bg-muted text-muted-foreground' : ''}
                      `}
                    >
                      {task.status}
                    </button>

                    {openStatusDropdown === task.id && (
                      <div className="absolute top-full left-0 mt-1 z-20 bg-card border border-border rounded-xl shadow-card-hover py-1 min-w-[140px] animate-scale-in">
                        {STATUS_DROPDOWN_OPTIONS.map((opt) => (
                          <button
                            key={`status-opt-${task.id}-${opt}`}
                            onClick={() => {
                              if (opt === 'Completed') onComplete(task.id);
                              setOpenStatusDropdown(null);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-muted transition-colors ${task.status === opt ? 'text-primary' : 'text-foreground'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onEdit(task)}
                          className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-primary transition-all active:scale-90"
                          title="Edit task"
                          aria-label="Edit task"
                        >
                          <Edit2 size={14} /></button>
                        <button
                          onClick={() => onDelete(task.id)}
                          className="p-1.5 rounded-lg hover:bg-danger-muted text-muted-foreground hover:text-danger transition-all active:scale-90"
                          title="Delete task — this cannot be undone"
                          aria-label="Delete task"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border bg-muted/20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Show</span>
          <select
            value={perPage}
            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
            className="input-field py-1 px-2 w-16 text-xs"
          >
            {[5, 8, 10, 15].map((n) => (
              <option key={`pp-${n}`} value={n}>{n}</option>
            ))}
          </select>
          <span>of <span className="font-semibold text-foreground">{tasks.length}</span> tasks</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${page === p ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}