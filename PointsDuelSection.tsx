'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const PointsDuelChart = dynamic(() => import('./PointsDuelChart'), { ssr: false });

export default function PointsDuelSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
      {/* Points duel bar */}
      <div className="xl:col-span-2 card-base">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-foreground">Points Duel</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-lg font-medium">This Week</span>
        </div>

        {/* Alex */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">A</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Alex Rivera</p>
                  <p className="text-2xs text-muted-foreground">Lv. 8 Scholar</p>
                </div>
              </div>
              <span className="text-lg font-extrabold text-primary tabular-nums">2,840</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full" style={{ width: '52%' }} />
            </div>
          </div>

          {/* vs divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">VS</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Jordan */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-600">J</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Jordan Kim</p>
                  <p className="text-2xs text-muted-foreground">Lv. 7 Achiever</p>
                </div>
              </div>
              <span className="text-lg font-extrabold text-amber-500 tabular-nums">2,615</span>
            </div>
            <div className="h-3 bg-amber-50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full" style={{ width: '48%' }} />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-5 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { id: 'ds-tasks', label: 'Tasks Done', alex: 5, jordan: 4 },
              { id: 'ds-exams', label: 'Exam Pts', alex: 320, jordan: 290 },
              { id: 'ds-assign', label: 'Assign Pts', alex: 150, jordan: 100 },
            ]?.map((row) => (
              <div key={row?.id}>
                <p className="text-2xs text-muted-foreground font-medium mb-1">{row?.label}</p>
                <p className="text-sm font-bold text-primary tabular-nums">{row?.alex}</p>
                <p className="text-xs text-amber-500 tabular-nums">{row?.jordan}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 7-day area chart */}
      <div className="xl:col-span-3 card-base">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-foreground">7-Day Points Trend</h3>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />You</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />Jordan</span>
          </div>
        </div>
        <PointsDuelChart />
      </div>
    </div>
  );
}