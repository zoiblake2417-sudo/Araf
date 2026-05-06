'use client';
import React, { useState } from 'react';
import { Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Exam } from './ExamsMainContent';

interface ExamTableProps {
  exams: Exam[];
  onDelete: (id: string) => void;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getGradeConfig(percentage: number) {
  if (percentage >= 90) return { label: 'A+', className: 'bg-green-100 text-green-700' };
  if (percentage >= 80) return { label: 'A', className: 'bg-green-100 text-green-600' };
  if (percentage >= 70) return { label: 'B', className: 'bg-blue-100 text-blue-600' };
  if (percentage >= 60) return { label: 'C', className: 'bg-amber-100 text-amber-600' };
  if (percentage >= 50) return { label: 'D', className: 'bg-orange-100 text-orange-600' };
  return { label: 'F', className: 'bg-red-100 text-red-600' };
}

function getTrendIcon(percentage: number) {
  if (percentage >= 75) return <TrendingUp size={14} className="text-green-500" />;
  if (percentage >= 50) return <Minus size={14} className="text-amber-500" />;
  return <TrendingDown size={14} className="text-red-500" />;
}

export default function ExamTable({ exams, onDelete }: ExamTableProps) {
  const [filter, setFilter] = useState<'All' | 'Pass' | 'Fail'>('All');

  const filtered =
    filter === 'All'
      ? exams
      : filter === 'Pass'
      ? exams.filter((e) => e.percentage >= 50)
      : exams.filter((e) => e.percentage < 50);

  return (
    <div className="card-base">
      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {(['All', 'Pass', 'Fail'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === tab
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
            <span className="ml-1.5 opacity-70">
              {tab === 'All'
                ? exams.length
                : tab === 'Pass'
                ? exams.filter((e) => e.percentage >= 50).length
                : exams.filter((e) => e.percentage < 50).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Subject</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Date</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Marks</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Percentage</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Grade</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3 pr-4">Points</th>
              <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-muted-foreground text-sm">
                  No exams found.
                </td>
              </tr>
            )}
            {filtered.map((exam) => {
              const grade = getGradeConfig(exam.percentage);
              return (
                <tr key={exam.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 pr-4">
                    <p className="font-semibold text-foreground">{exam.subject}</p>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{formatDate(exam.date)}</td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {exam.marksObtained} / {exam.totalMarks}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1.5">
                      {getTrendIcon(exam.percentage)}
                      <span className="font-bold text-foreground">{exam.percentage}%</span>
                    </div>
                    <div className="w-24 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          exam.percentage >= 75
                            ? 'bg-green-500'
                            : exam.percentage >= 50
                            ? 'bg-amber-500' :'bg-red-500'
                        }`}
                        style={{ width: `${exam.percentage}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${grade.className}`}>
                      {grade.label}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="font-bold text-primary">+{exam.points} pts</span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onDelete(exam.id)}
                      title="Delete"
                      className="p-1.5 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
