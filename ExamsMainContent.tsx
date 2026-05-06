'use client';
import React, { useState, useEffect } from 'react';
import ExamStatsRow from './ExamStatsRow';
import ExamTable from './ExamTable';
import AddExamModal from './AddExamModal';
import { BookOpen, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Exam {
  id: string;
  subject: string;
  date: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  points: number;
}

export default function ExamsMainContent() {
  const { user } = useAuth();
  const supabase = createClient();

  const [exams, setExams] = useState<Exam[]>([]);
  const [showModal, setShowModal] = useState(false);

  const mapRow = (row: any): Exam => ({
    id: row.id,
    subject: row.subject,
    date: row.date,
    marksObtained: row.marks_obtained,
    totalMarks: row.total_marks,
    percentage: row.percentage,
    points: row.points,
  });

  useEffect(() => {
    if (!user) return;

    const fetchExams = async () => {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (!error && data) setExams(data.map(mapRow));
    };
    fetchExams();

    const channel = supabase
      .channel('exams-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'exams', filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setExams((prev) => [mapRow(payload.new), ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setExams((prev) => prev.map((e) => (e.id === payload.new.id ? mapRow(payload.new) : e)));
          } else if (payload.eventType === 'DELETE') {
            setExams((prev) => prev.filter((e) => e.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const totalPoints = exams.reduce((sum, e) => sum + e.points, 0);
  const avgPercentage =
    exams.length > 0
      ? Math.round(exams.reduce((sum, e) => sum + e.percentage, 0) / exams.length)
      : 0;
  const highestScore = exams.length > 0 ? Math.max(...exams.map((e) => e.percentage)) : 0;
  const totalExams = exams.length;

  const handleAddExam = async (newExam: Omit<Exam, 'id' | 'percentage' | 'points'>) => {
    if (!user) return;
    const percentage = Math.round((newExam.marksObtained / newExam.totalMarks) * 100);
    const points = percentage;
    await supabase.from('exams').insert({
      user_id: user.id,
      subject: newExam.subject,
      date: newExam.date,
      marks_obtained: newExam.marksObtained,
      total_marks: newExam.totalMarks,
      percentage,
      points,
    });
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('exams').delete().eq('id', id);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Exams</h1>
            <p className="text-xs text-muted-foreground">Track your exam results and earn points based on percentage</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          Add Exam
        </button>
      </div>

      <ExamStatsRow
        totalPoints={totalPoints}
        avgPercentage={avgPercentage}
        highestScore={highestScore}
        totalExams={totalExams}
      />
      <ExamTable exams={exams} onDelete={handleDelete} />
      {showModal && (
        <AddExamModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddExam}
        />
      )}
    </div>
  );
}
