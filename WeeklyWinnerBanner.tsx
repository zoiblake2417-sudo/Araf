import React from 'react';
import { Trophy, Flame } from 'lucide-react';

export default function WeeklyWinnerBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 rounded-2xl px-5 py-4 flex items-center justify-between shadow-card">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Trophy size={20} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">🏆 Weekly Winner — Week 17</p>
          <p className="text-white/80 text-xs mt-0.5">Alex Rivera led with 1,240 pts — 185 pts ahead of Jordan</p>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 bg-white/20 rounded-xl px-3 py-1.5">
        <Flame size={14} className="text-white" />
        <span className="text-white text-xs font-bold">12-day streak</span>
      </div>
    </div>
  );
}