import React from 'react';
import { Star, CheckCircle2, Clock } from 'lucide-react';

interface TaskProgressBarProps {
  total: number;
  completed: number;
  pointsEarned: number;
}

export default function TaskProgressBar({ total, completed, pointsEarned }: TaskProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const remaining = total - completed;

  return (
    <div className="card-base">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: progress */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Today&apos;s Progress</span>
            <span className="text-sm font-bold text-primary tabular-nums">{completed} / {total} tasks</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-muted-foreground">{pct}% complete</span>
            <span className="text-xs text-muted-foreground">{remaining} remaining</span>
          </div>
        </div>

        {/* Right: stats */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-center">
            <div className="flex items-center gap-1.5 justify-center">
              <Star size={14} className="text-primary" />
              <span className="text-xl font-extrabold text-primary tabular-nums">{pointsEarned}</span>
            </div>
            <p className="text-2xs text-muted-foreground font-medium mt-0.5">Pts earned</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1.5 justify-center">
              <CheckCircle2 size={14} className="text-success" />
              <span className="text-xl font-extrabold text-success tabular-nums">{completed}</span>
            </div>
            <p className="text-2xs text-muted-foreground font-medium mt-0.5">Done</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1.5 justify-center">
              <Clock size={14} className="text-amber-500" />
              <span className="text-xl font-extrabold text-amber-500 tabular-nums">{remaining}</span>
            </div>
            <p className="text-2xs text-muted-foreground font-medium mt-0.5">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}