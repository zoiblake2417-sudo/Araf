import React from 'react';
import { Flame, Star, Zap, BookOpen, Trophy, Clock, Target, Award } from 'lucide-react';

const BADGES = [
  { id: 'badge-consistency', icon: <Flame size={20} />, label: 'Consistency', desc: '7+ day streak', earned: true, color: 'bg-amber-100 text-amber-500 border-amber-200' },
  { id: 'badge-high-scorer', icon: <Star size={20} />, label: 'High Scorer', desc: '90%+ on an exam', earned: true, color: 'bg-violet-100 text-violet-500 border-violet-200' },
  { id: 'badge-early-bird', icon: <Zap size={20} />, label: 'Early Finisher', desc: '2+ days early', earned: true, color: 'bg-green-100 text-green-600 border-green-200' },
  { id: 'badge-bookworm', icon: <BookOpen size={20} />, label: 'Bookworm', desc: '50 tasks done', earned: true, color: 'bg-blue-100 text-blue-500 border-blue-200' },
  { id: 'badge-champion', icon: <Trophy size={20} />, label: 'Champion', desc: 'Win 3 weeks', earned: false, color: 'bg-muted text-muted-foreground border-border' },
  { id: 'badge-punctual', icon: <Clock size={20} />, label: 'Punctual', desc: 'On-time 10x', earned: false, color: 'bg-muted text-muted-foreground border-border' },
  { id: 'badge-centurion', icon: <Target size={20} />, label: 'Centurion', desc: '100 tasks done', earned: false, color: 'bg-muted text-muted-foreground border-border' },
  { id: 'badge-legend', icon: <Award size={20} />, label: 'Legend', desc: 'Reach Level 10', earned: false, color: 'bg-muted text-muted-foreground border-border' },
];

export default function BadgeShowcase() {
  return (
    <div className="card-base h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-foreground">Badges</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-lg font-medium">4 / 8 earned</span>
      </div>
      <div className="grid grid-cols-4 gap-2.5">
        {BADGES?.map((badge) => (
          <div
            key={badge?.id}
            className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all duration-150 ${
              badge?.earned
                ? `${badge?.color} hover:scale-105 cursor-pointer`
                : 'bg-muted/50 border-border opacity-50'
            }`}
            title={badge?.earned ? badge?.desc : `Locked — ${badge?.desc}`}
          >
            <div className={`${badge?.earned ? '' : 'grayscale'}`}>{badge?.icon}</div>
            <p className="text-2xs font-semibold text-center leading-tight">{badge?.label}</p>
          </div>
        ))}
      </div>
      {/* Streak calendar */}
      <div className="mt-5 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">This Month&apos;s Streak</p>
          <div className="flex items-center gap-1.5">
            <Flame size={14} className="text-amber-500 streak-flame" />
            <span className="text-sm font-bold text-amber-600">12 days</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 3; // offset so month starts on correct day
            const isActive = day >= 1 && day <= 5;
            const isStreak = day >= 0 && day <= 12;
            const isToday = day === 5;
            const isInMonth = day >= 1 && day <= 31;
            return (
              <div
                key={`cal-day-${i + 1}`}
                className={`
                  aspect-square rounded-md text-2xs font-semibold flex items-center justify-center transition-all
                  ${!isInMonth ? 'opacity-0' : ''}
                  ${isToday ? 'bg-primary text-white ring-2 ring-primary/30' : ''}
                  ${isStreak && !isToday ? 'bg-amber-100 text-amber-700' : ''}
                  ${!isStreak && !isToday && isInMonth ? 'bg-muted text-muted-foreground' : ''}
                `}
              >
                {isInMonth ? day : ''}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-2 text-2xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-amber-100 inline-block" /> Streak day</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Today</span>
        </div>
      </div>
    </div>
  );
}