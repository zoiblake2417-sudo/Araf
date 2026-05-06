'use client';
import React, { useState } from 'react';
import { CheckCircle2, Trash2, Clock, AlertTriangle, CheckCheck, Zap } from 'lucide-react';
import { Assignment } from './AssignmentsMainContent';

interface AssignmentTableProps {
  assignments: Assignment[];
  onMarkComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const STATUS_CONFIG = {
  Completed: {
    label: 'Completed',
    icon: <CheckCircle2 size={13} />,
    className: 'bg-green-100 text-green-700',
  },
  Pending: {
    label: 'Pending',
    icon: <Clock size={13} />,
    className: 'bg-amber-100 text-amber-700',
  },
  Overdue: {
    label: 'Overdue',
    icon: <AlertTriangle size={13} />,
    className: 'bg-red-100 text-red-600',
  },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getEarlyBonus(dueDate: string, submittedDate?: string): string | null {
  if (!submittedDate) return null;
  const due = new Date(dueDate);
  const submitted = new Date(submittedDate);
  const diffDays = Math.floor((due.getTime() - submitted.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays >= 2) return '+20 early bonus';
  if (diffDays === 1) return '+10 early bonus';
  return null;
}

export default function AssignmentTable({ assignments, onMarkComplete, onDelete }: AssignmentTableProps) {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed' | 'Overdue'>('All');

  const filtered = filter === 'All' ? assignments : assignments.filter((a) => a.status === filter);

  return (
    <div className="card-base">
      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {(['All', 'Pending', 'Completed', 'Overdue'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === tab
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
            <span className="ml-1.5 opacity-70">
              {tab === 'All' ? assignments.length : assignments.filter((a) => a.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Title</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Subject</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Due Date</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Status</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Points</th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-muted-foreground text-sm">
                  No assignments found.
                </td>
              </tr>
            )}
            {filtered.map((assignment) => {
              const statusCfg = STATUS_CONFIG[assignment.status];
              const earlyBonus = getEarlyBonus(assignment.dueDate, assignment.submittedDate);
              return (
                <tr key={assignment.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-foreground">{assignment.title}</p>
                    {earlyBonus && (
                      <span className="inline-flex items-center gap-1 text-2xs text-primary font-semibold mt-0.5">
                        <Zap size={10} /> {earlyBonus}
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{assignment.subject}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{formatDate(assignment.dueDate)}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${statusCfg.className}`}>
                      {statusCfg.icon}
                      {statusCfg.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {assignment.points > 0 ? (
                      <span className="font-bold text-primary">+{assignment.points} pts</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {assignment.status !== 'Completed' && (
                        <button
                          onClick={() => onMarkComplete(assignment.id)}
                          title="Mark as complete"
                          className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                        >
                          <CheckCheck size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(assignment.id)}
                        title="Delete"
                        className="p-1.5 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
