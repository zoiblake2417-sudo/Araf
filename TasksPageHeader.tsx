import React from 'react';
import { CalendarCheck, Flame, Star } from 'lucide-react';

export default function TasksPageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
          <CalendarCheck size={24} className="text-primary" />
          Daily Tasks
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">Tuesday, May 5, 2026 — Track your study sessions and earn points</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
          <Flame size={15} className="text-amber-500 streak-flame" />
          <span className="text-xs font-bold text-amber-700">12-day streak</span>
        </div>
        <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-xl px-3 py-2">
          <Star size={15} className="text-primary" />
          <span className="text-xs font-bold text-primary">+65 pts today</span>
        </div>
      </div>
    </div>
  );
}