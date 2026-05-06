'use client';
import React, { useState } from 'react';
import {
  Star,
  Users,
  Flame,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
} from 'lucide-react';

// Grid plan: 6 cards → grid-cols-4 → row 1: hero spans 2 cols + 2 regular, row 2: 2 regular cards filling 4 cols (each span 1, last spans 2)
// Actually: hero (col-span-2) + 2 cards = row1 (4 cols), then row2: 3 cards in 4 cols → first 2 normal, last spans 2
// Final: hero(2) + card(1) + card(1) | card(1) + card(1) + card(2-span)

const BENTO_CARDS = [
  {
    id: 'kpi-your-points',
    label: 'Your Total Points',
    value: '2,840',
    subtext: '+125 pts today',
    trend: 'up',
    icon: <Star size={18} />,
    color: 'bg-primary/10 text-primary',
    heroCard: true,
  },
  {
    id: 'kpi-partner-points',
    label: "Jordan\'s Points",
    value: '2,615',
    subtext: '+90 pts today',
    trend: 'neutral',
    icon: <Users size={18} />,
    color: 'bg-violet-100 text-violet-500',
    heroCard: false,
  },
  {
    id: 'kpi-streak',
    label: 'Daily Streak',
    value: '12',
    subtext: 'days consecutive',
    trend: 'up',
    icon: <Flame size={18} />,
    color: 'bg-amber-100 text-amber-500',
    heroCard: false,
  },
  {
    id: 'kpi-tasks-today',
    label: 'Tasks Done Today',
    value: '5 / 8',
    subtext: '3 tasks remaining',
    trend: 'warn',
    icon: <CheckCircle2 size={18} />,
    color: 'bg-green-100 text-green-600',
    heroCard: false,
  },
  {
    id: 'kpi-weekly-rank',
    label: 'Weekly Rank',
    value: '#1',
    subtext: 'This week so far',
    trend: 'up',
    icon: <TrendingUp size={18} />,
    color: 'bg-green-100 text-green-600',
    heroCard: false,
  },
  {
    id: 'kpi-point-gap',
    label: 'Point Gap vs Partner',
    value: '+225',
    subtext: 'You are leading 🎉',
    trend: 'up',
    icon: <Zap size={18} />,
    color: 'bg-primary/10 text-primary',
    heroCard: false,
  },
];

export default function DashboardBentoGrid() {
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {BENTO_CARDS?.map((card, idx) => {
        const isHero = card?.id === 'kpi-your-points';
        const isLastRow = idx >= 3;
        const isLastCard = idx === 5;

        return (
          <div
            key={card?.id}
            className={`
              card-base transition-all duration-200 hover:card-shadow-hover cursor-default
              ${isHero ? 'col-span-2 row-span-1 bg-gradient-to-br from-primary/5 to-secondary border-primary/20' : ''}
              ${isLastCard ? 'col-span-2 md:col-span-2' : ''}
              ${card?.trend === 'warn' ? 'border-amber-200 bg-amber-50/50' : ''}
              ${card?.trend === 'down' ? 'border-danger/20 bg-danger-muted/30' : ''}
              ${animatingCard === card?.id ? 'animate-point-pop' : ''}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card?.color}`}>
                {card?.icon}
              </div>
              {card?.trend === 'up' && <TrendingUp size={14} className="text-success" />}
              {card?.trend === 'down' && <TrendingDown size={14} className="text-danger" />}
              {card?.trend === 'warn' && <AlertTriangle size={14} className="text-amber-500" />}
            </div>
            <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase mb-1">{card?.label}</p>
            <p className={`font-extrabold text-foreground tabular-nums leading-none ${isHero ? 'text-4xl' : 'text-2xl'}`}>
              {card?.value}
            </p>
            <p className={`text-xs mt-1.5 font-medium ${
              card?.trend === 'up' ? 'text-success' :
              card?.trend === 'warn' ? 'text-amber-600' :
              card?.trend === 'down'? 'text-danger' : 'text-muted-foreground'
            }`}>
              {card?.subtext}
            </p>
            {isHero && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-medium">Level progress (Lv. 8)</span>
                  <span className="text-primary font-semibold">2840 / 3000 pts</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full transition-all duration-700"
                    style={{ width: '94.7%' }}
                  />
                </div>
                <p className="text-2xs text-muted-foreground mt-1">160 pts to Level 9 — Scholar Elite</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}