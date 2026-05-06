'use client';
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = [
  { day: 'Apr 29', alex: 2510, jordan: 2480 },
  { day: 'Apr 30', alex: 2580, jordan: 2510 },
  { day: 'May 1', alex: 2620, jordan: 2555 },
  { day: 'May 2', alex: 2660, jordan: 2590 },
  { day: 'May 3', alex: 2700, jordan: 2590 },
  { day: 'May 4', alex: 2760, jordan: 2600 },
  { day: 'May 5', alex: 2840, jordan: 2615 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl px-3 py-2.5 shadow-card text-xs">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={`tip-${p.dataKey}`} className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">{p.dataKey === 'alex' ? 'Alex' : 'Jordan'}</span>
          <span className="font-bold tabular-nums" style={{ color: p.color }}>{p.value.toLocaleString()} pts</span>
        </div>
      ))}
    </div>
  );
};

export default function PointsDuelChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={CHART_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradAlex" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradJordan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(1)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="alex" stroke="var(--primary)" strokeWidth={2.5} fill="url(#gradAlex)" dot={false} activeDot={{ r: 4, fill: 'var(--primary)' }} />
        <Area type="monotone" dataKey="jordan" stroke="#F59E0B" strokeWidth={2} fill="url(#gradJordan)" dot={false} activeDot={{ r: 4, fill: '#F59E0B' }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}