'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Exam } from './ExamsMainContent';

interface AddExamModalProps {
  onClose: () => void;
  onAdd: (exam: Omit<Exam, 'id' | 'percentage' | 'points'>) => void;
}

export default function AddExamModal({ onClose, onAdd }: AddExamModalProps) {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [marksObtained, setMarksObtained] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

  const obtained = parseFloat(marksObtained);
  const total = parseFloat(totalMarks);
  const previewPercentage =
    !isNaN(obtained) && !isNaN(total) && total > 0
      ? Math.round((obtained / total) * 100)
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !date || !marksObtained || !totalMarks) return;
    if (obtained > total) return;
    onAdd({
      subject: subject.trim(),
      date,
      marksObtained: obtained,
      totalMarks: total,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">Add Exam</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Subject *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Mathematics"
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Exam Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Marks Obtained *</label>
              <input
                type="number"
                value={marksObtained}
                onChange={(e) => setMarksObtained(e.target.value)}
                placeholder="e.g. 85"
                min="0"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Total Marks *</label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                placeholder="e.g. 100"
                min="1"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
          </div>

          {previewPercentage !== null && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Calculated Result</p>
                <p className="text-lg font-extrabold text-primary">{previewPercentage}%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground font-medium">Points Earned</p>
                <p className="text-lg font-extrabold text-primary">+{previewPercentage} pts</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Add Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
