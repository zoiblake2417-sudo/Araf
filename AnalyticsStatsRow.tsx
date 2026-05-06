'use client';
import React from 'react';
import { TrendingUp, Award, Target, BarChart2 } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: string;
}

function StatCard({ icon, label, value, sub, color }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-card flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground leading-tight">{value}</p>
        <p className="text-2xs text-muted-foreground mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

export default function AnalyticsStatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<BarChart2 size={18} className="text-primary" />}
        label="Average Score"
        value="84.5%"
        sub="Across 6 exams"
        color="bg-primary/10"
      />
      <StatCard
        icon={<Award size={18} className="text-amber-500" />}
        label="Best Score"
        value="95%"
        sub="Computer Science"
        color="bg-amber-500/10"
      />
      <StatCard
        icon={<TrendingUp size={18} className="text-success" />}
        label="Biggest Gain"
        value="+18%"
        sub="Physics → Chemistry"
        color="bg-success-muted"
      />
      <StatCard
        icon={<Target size={18} className="text-info" />}
        label="Total Exams"
        value="6"
        sub="507 total points"
        color="bg-info-muted"
      />
    </div>
  );
}
