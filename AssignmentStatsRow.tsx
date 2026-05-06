'use client';
import React from 'react';
import { Trophy, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface AssignmentStatsRowProps {
  totalPoints: number;
  completed: number;
  pending: number;
  overdue: number;
}

export default function AssignmentStatsRow({
  totalPoints,
  completed,
  pending,
  overdue,
}: AssignmentStatsRowProps) {
  const stats = [
    {
      label: 'Assignment Points',
      value: totalPoints,
      icon: <Trophy size={18} />,
      color: 'bg-primary/10 text-primary',
      valueClass: 'text-primary',
    },
    {
      label: 'Completed',
      value: completed,
      icon: <CheckCircle2 size={18} />,
      color: 'bg-green-100 text-green-600',
      valueClass: 'text-green-600',
    },
    {
      label: 'Pending',
      value: pending,
      icon: <Clock size={18} />,
      color: 'bg-amber-100 text-amber-500',
      valueClass: 'text-amber-600',
    },
    {
      label: 'Overdue',
      value: overdue,
      icon: <AlertTriangle size={18} />,
      color: 'bg-red-100 text-red-500',
      valueClass: 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card-base flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            <p className={`text-2xl font-extrabold tabular-nums ${stat.valueClass}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
