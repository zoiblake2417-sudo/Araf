'use client';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,  } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ExamDataPoint {
  date: string;
  subject: string;
  percentage: number;
  marksObtained: number;
  totalMarks: number;
}

const EXAM_DATA: ExamDataPoint[] = [
  { date: 'Apr 10', subject: 'Mathematics', percentage: 88, marksObtained: 88, totalMarks: 100 },
  { date: 'Apr 15', subject: 'Physics', percentage: 74, marksObtained: 74, totalMarks: 100 },
  { date: 'Apr 20', subject: 'Chemistry', percentage: 92, marksObtained: 92, totalMarks: 100 },
  { date: 'Apr 25', subject: 'English Lit', percentage: 81, marksObtained: 65, totalMarks: 80 },
  { date: 'Apr 28', subject: 'Comp. Science', percentage: 95, marksObtained: 95, totalMarks: 100 },
  { date: 'May 2', subject: 'History', percentage: 77, marksObtained: 58, totalMarks: 75 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as ExamDataPoint;
  const idx = EXAM_DATA.findIndex((e) => e.date === d.date);
  const prev = idx > 0 ? EXAM_DATA[idx - 1] : null;
  const diff = prev ? d.percentage - prev.percentage : null;

  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-card text-xs min-w-[160px]">
      <p className="font-bold text-foreground text-sm mb-1">{d.subject}</p>
      <p className="text-muted-foreground mb-2">{d.date}</p>
      <div className="flex items-center justify-between gap-4 mb-1">
        <span className="text-muted-foreground">Score</span>
        <span className="font-bold text-foreground tabular-nums">{d.marksObtained}/{d.totalMarks}</span>
      </div>
      <div className="flex items-center justify-between gap-4 mb-2">
        <span className="text-muted-foreground">Percentage</span>
        <span className="font-bold tabular-nums" style={{ color: 'var(--primary)' }}>{d.percentage}%</span>
      </div>
      {diff !== null && (
        <div className={`flex items-center gap-1 text-2xs font-semibold px-2 py-1 rounded-lg w-fit ${diff > 0 ? 'bg-success-muted text-success' : diff < 0 ? 'bg-danger-muted text-danger' : 'bg-muted text-muted-foreground'}`}>
          {diff > 0 ? <TrendingUp size={10} /> : diff < 0 ? <TrendingDown size={10} /> : <Minus size={10} />}
          {diff > 0 ? `+${diff}%` : diff < 0 ? `${diff}%` : 'No change'} vs prev
        </div>
      )}
    </div>
  );
};

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  const idx = EXAM_DATA.findIndex((e) => e.date === payload.date);
  const prev = idx > 0 ? EXAM_DATA[idx - 1] : null;
  const diff = prev ? payload.percentage - prev.percentage : null;

  let color = 'var(--primary)';
  if (diff !== null) {
    if (diff > 0) color = 'var(--success)';
    else if (diff < 0) color = 'var(--danger)';
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill={color}
      stroke="var(--card)"
      strokeWidth={2}
    />
  );
};

export default function ExamPerformanceChart() {
  const avgScore = Math.round(EXAM_DATA.reduce((s, e) => s + e.percentage, 0) / EXAM_DATA.length);
  const latest = EXAM_DATA[EXAM_DATA.length - 1];
  const first = EXAM_DATA[0];
  const overallTrend = latest.percentage - first.percentage;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-foreground">Exam Performance Trend</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Percentage scores across all exams over time</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${overallTrend >= 0 ? 'bg-success-muted text-success' : 'bg-danger-muted text-danger'}`}>
          {overallTrend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {overallTrend >= 0 ? `+${overallTrend}%` : `${overallTrend}%`} overall
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-2xs font-medium text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-success inline-block" />
          Improvement
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-danger inline-block" />
          Decline
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
          First exam
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="w-4 border-t border-dashed border-muted-foreground inline-block" />
          Avg: {avgScore}%
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={EXAM_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[50, 100]}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={avgScore}
            stroke="var(--muted-foreground)"
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="url(#lineGrad)"
            strokeWidth={2.5}
            dot={<CustomDot />}
            activeDot={{ r: 7, fill: 'var(--primary)', stroke: 'var(--card)', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Subject labels */}
      <div className="flex justify-between mt-2 px-1">
        {EXAM_DATA.map((e, i) => {
          const prev = i > 0 ? EXAM_DATA[i - 1] : null;
          const diff = prev ? e.percentage - prev.percentage : null;
          return (
            <div key={e.date} className="flex flex-col items-center gap-0.5 text-center">
              <span className="text-2xs text-muted-foreground truncate max-w-[52px]">{e.subject.split(' ')[0]}</span>
              {diff !== null && (
                <span className={`text-2xs font-bold ${diff > 0 ? 'text-success' : diff < 0 ? 'text-danger' : 'text-muted-foreground'}`}>
                  {diff > 0 ? `▲${diff}` : diff < 0 ? `▼${Math.abs(diff)}` : '—'}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
