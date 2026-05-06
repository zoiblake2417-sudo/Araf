'use client';
import React from 'react';
import { Trophy, TrendingUp, Star, BookOpen } from 'lucide-react';

interface ExamStatsRowProps {
  totalPoints: number;
  avgPercentage: number;
  highestScore: number;
  totalExams: number;
}

export default function ExamStatsRow({
  totalPoints,
  avgPercentage,
  highestScore,
  totalExams,
}: ExamStatsRowProps) {
  const stats = [
    {
      label: 'Exam Points',
      value: totalPoints,
      icon: <Trophy size={18} />,
      color: 'bg-primary/10 text-primary',
      valueClass: 'text-primary',
    },
    {
      label: 'Avg Percentage',
      value: `${avgPercentage}%`,
      icon: <TrendingUp size={18} />,
      color: 'bg-blue-100 text-blue-600',
      valueClass: 'text-blue-600',
    },
    {
      label: 'Highest Score',
      value: `${highestScore}%`,
      icon: <Star size={18} />,
      color: 'bg-amber-100 text-amber-500',
      valueClass: 'text-amber-600',
    },
    {
      label: 'Total Exams',
      value: totalExams,
      icon: <BookOpen size={18} />,
      color: 'bg-green-100 text-green-600',
      valueClass: 'text-green-600',
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
