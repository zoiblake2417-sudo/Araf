'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Star, TrendingUp, Users } from 'lucide-react';
import type { Task } from './TasksMainContent';

const DifficultyChart = dynamic(() => import('./DifficultyChart'), { ssr: false });

interface TaskSidePanelProps {
  tasks: Task[];
}

const PARTNER_TASKS = [
  { id: 'pt-001', title: 'Statistics Chapter 7 Notes', subject: 'Statistics', difficulty: 'Medium', status: 'Completed', points: 10 },
  { id: 'pt-002', title: 'Physics Mechanics Problems', subject: 'Physics', difficulty: 'Hard', status: 'Completed', points: 20 },
  { id: 'pt-003', title: 'English Essay Draft', subject: 'Languages', difficulty: 'Medium', status: 'In Progress', points: 10 },
  { id: 'pt-004', title: 'Biology Cell Diagrams', subject: 'Biology', difficulty: 'Easy', status: 'Pending', points: 5 },
];

export default function TaskSidePanel({ tasks }: TaskSidePanelProps) {
  const completed = tasks.filter((t) => t.status === 'Completed');
  const pending = tasks.filter((t) => t.status === 'Pending');
  const inProgress = tasks.filter((t) => t.status === 'In Progress');
  const totalPts = completed.reduce((s, t) => s + t.points, 0);

  const easyCount = tasks.filter((t) => t.difficulty === 'Easy').length;
  const medCount = tasks.filter((t) => t.difficulty === 'Medium').length;
  const hardCount = tasks.filter((t) => t.difficulty === 'Hard').length;

  const partnerCompleted = PARTNER_TASKS.filter((t) => t.status === 'Completed');
  const partnerPts = partnerCompleted.reduce((s, t) => s + t.points, 0);

  return (
    <div className="space-y-4">
      {/* Points summary */}
      <div className="card-base">
        <div className="flex items-center gap-2 mb-4">
          <Star size={16} className="text-primary" />
          <h3 className="text-sm font-bold text-foreground">Today&apos;s Points</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">You</span>
            <span className="text-lg font-extrabold text-primary tabular-nums">+{totalPts}</span>
          </div>
          <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (totalPts / 100) * 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Jordan</span>
            <span className="text-lg font-extrabold text-amber-500 tabular-nums">+{partnerPts}</span>
          </div>
          <div className="h-2.5 bg-amber-50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (partnerPts / 100) * 100)}%` }}
            />
          </div>
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Gap</span>
              <span className={`text-xs font-bold ${totalPts >= partnerPts ? 'text-success' : 'text-danger'}`}>
                {totalPts >= partnerPts ? '+' : ''}{totalPts - partnerPts} pts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Task breakdown */}
      <div className="card-base">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-primary" />
          <h3 className="text-sm font-bold text-foreground">Task Breakdown</h3>
        </div>
        <div className="space-y-2">
          {[
            { id: 'tb-completed', label: 'Completed', count: completed.length, color: 'bg-success', textColor: 'text-success' },
            { id: 'tb-inprogress', label: 'In Progress', count: inProgress.length, color: 'bg-blue-400', textColor: 'text-blue-500' },
            { id: 'tb-pending', label: 'Pending', count: pending.length, color: 'bg-muted-foreground/30', textColor: 'text-muted-foreground' },
          ].map((row) => (
            <div key={row.id} className="flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${row.color}`} />
              <span className="text-xs text-muted-foreground flex-1">{row.label}</span>
              <span className={`text-sm font-bold tabular-nums ${row.textColor}`}>{row.count}</span>
            </div>
          ))}
        </div>

        {/* Difficulty breakdown chart */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">By Difficulty</p>
          <DifficultyChart easy={easyCount} medium={medCount} hard={hardCount} />
        </div>
      </div>

      {/* Partner's tasks */}
      <div className="card-base">
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} className="text-amber-500" />
          <h3 className="text-sm font-bold text-foreground">Jordan&apos;s Tasks</h3>
          <span className="ml-auto text-2xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">
            {partnerCompleted.length}/{PARTNER_TASKS.length} done
          </span>
        </div>
        <div className="space-y-2.5">
          {PARTNER_TASKS.map((pt) => (
            <div key={pt.id} className="flex items-center gap-2.5">
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${pt.status === 'Completed' ? 'bg-success' : pt.status === 'In Progress' ? 'bg-blue-400' : 'bg-muted-foreground/40'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${pt.status === 'Completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {pt.title}
                </p>
                <p className="text-2xs text-muted-foreground">{pt.subject}</p>
              </div>
              <span className={`text-2xs font-bold shrink-0 ${
                pt.difficulty === 'Easy' ? 'text-success' :
                pt.difficulty === 'Medium' ? 'text-amber-600' : 'text-danger'
              }`}>+{pt.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}