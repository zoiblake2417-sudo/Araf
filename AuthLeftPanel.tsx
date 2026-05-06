import React from 'react';
import { Flame, Trophy, Star, Zap, BookOpen, Target } from 'lucide-react';

const LEADERBOARD_MOCK = [
  { id: 'lb-1', rank: 1, name: 'Alex Rivera', points: 2840, avatar: 'A', isYou: true },
  { id: 'lb-2', rank: 2, name: 'Jordan Kim', points: 2615, avatar: 'J', isPartner: true },
];

const BADGES_MOCK = [
  { id: 'badge-consistency', icon: <Flame size={16} />, label: 'Consistency', color: 'bg-amber-100 text-amber-600' },
  { id: 'badge-scorer', icon: <Star size={16} />, label: 'High Scorer', color: 'bg-violet-100 text-violet-600' },
  { id: 'badge-early', icon: <Zap size={16} />, label: 'Early Finisher', color: 'bg-green-100 text-green-600' },
];

export default function AuthLeftPanel() {
  return (
    <div className="w-full bg-gradient-to-br from-primary via-[#6D28D9] to-[#4C1D95] flex flex-col items-center justify-center p-10 xl:p-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
      </div>
      <div className="relative z-10 max-w-sm w-full space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <BookOpen size={24} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xl leading-tight">StudySync Duo</p>
            <p className="text-white/60 text-sm">Study together, win together</p>
          </div>
        </div>

        {/* Hero text */}
        <div>
          <h1 className="text-white font-extrabold text-3xl xl:text-4xl leading-tight mb-3">
            Turn studying into a<br />
            <span className="text-amber-300">couple&apos;s competition</span>
          </h1>
          <p className="text-white/70 text-sm leading-relaxed">
            Complete tasks, earn points, and race your partner to the top of the leaderboard. Every study session counts.
          </p>
        </div>

        {/* Leaderboard card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-amber-300" />
            <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">Today&apos;s Leaderboard</span>
          </div>
          {LEADERBOARD_MOCK?.map((entry) => (
            <div
              key={entry?.id}
              className={`flex items-center gap-3 py-2.5 px-3 rounded-xl mb-1.5 last:mb-0 ${
                entry?.isYou ? 'bg-white/20' : 'bg-white/5'
              }`}
            >
              <span className="text-white/60 text-xs font-bold w-4 text-center">#{entry?.rank}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${entry?.isYou ? 'bg-amber-400 text-amber-900' : 'bg-white/20 text-white'}`}>
                {entry?.avatar}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold leading-tight">
                  {entry?.name} {entry?.isYou && <span className="text-amber-300 text-2xs">(You)</span>}
                  {entry?.isPartner && <span className="text-white/50 text-2xs"> (Partner)</span>}
                </p>
              </div>
              <span className="text-white font-bold text-sm tabular-nums">{entry?.points?.toLocaleString()} pts</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-white/50 text-xs">Point gap</span>
            <span className="text-amber-300 text-xs font-bold">+225 pts ahead 🎉</span>
          </div>
        </div>

        {/* Badges */}
        <div>
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Your Badges</p>
          <div className="flex gap-2 flex-wrap">
            {BADGES_MOCK?.map((badge) => (
              <div key={badge?.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${badge?.color} bg-white/15 backdrop-blur-sm border border-white/20`}>
                <span className="text-white">{badge?.icon}</span>
                <span className="text-white text-xs font-semibold">{badge?.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'stat-streak', label: 'Day Streak', value: '12', icon: <Flame size={14} className="text-amber-300" /> },
            { id: 'stat-tasks', label: 'Tasks Done', value: '148', icon: <Target size={14} className="text-green-300" /> },
            { id: 'stat-level', label: 'Level', value: '8', icon: <Star size={14} className="text-violet-300" /> },
          ]?.map((stat) => (
            <div key={stat?.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/15">
              <div className="flex justify-center mb-1">{stat?.icon}</div>
              <p className="text-white font-bold text-lg leading-tight tabular-nums">{stat?.value}</p>
              <p className="text-white/50 text-2xs">{stat?.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}