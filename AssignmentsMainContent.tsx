'use client';
import React, { useState, useEffect } from 'react';
import AssignmentStatsRow from './AssignmentStatsRow';
import AssignmentTable from './AssignmentTable';
import AddAssignmentModal from './AddAssignmentModal';
import { ClipboardList, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'Pending' | 'Completed' | 'Overdue';
  points: number;
  submittedDate?: string;
}

function calcAssignmentPoints(dueDate: string, submittedDate: string): number {
  const due = new Date(dueDate);
  const submitted = new Date(submittedDate);
  const diffDays = Math.floor((due.getTime() - submitted.getTime()) / (1000 * 60 * 60 * 24));
  let points = 50;
  if (diffDays >= 2) points += 20;
  else if (diffDays === 1) points += 10;
  return points;
}

export default function AssignmentsMainContent() {
  const { user } = useAuth();
  const supabase = createClient();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [showModal, setShowModal] = useState(false);

  const mapRow = (row: any): Assignment => ({
    id: row.id,
    title: row.title,
    subject: row.subject,
    dueDate: row.due_date,
    status: row.status as Assignment['status'],
    points: row.points,
    submittedDate: row.submitted_date ?? undefined,
  });

  useEffect(() => {
    if (!user) return;

    const fetchAssignments = async () => {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (!error && data) setAssignments(data.map(mapRow));
    };
    fetchAssignments();

    const channel = supabase
      .channel('assignments-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'assignments', filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setAssignments((prev) => [mapRow(payload.new), ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setAssignments((prev) =>
              prev.map((a) => (a.id === payload.new.id ? mapRow(payload.new) : a))
            );
          } else if (payload.eventType === 'DELETE') {
            setAssignments((prev) => prev.filter((a) => a.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const totalPoints = assignments.reduce((sum, a) => sum + a.points, 0);
  const completed = assignments.filter((a) => a.status === 'Completed').length;
  const pending = assignments.filter((a) => a.status === 'Pending').length;
  const overdue = assignments.filter((a) => a.status === 'Overdue').length;

  const handleAddAssignment = async (newAssignment: Omit<Assignment, 'id' | 'points'>) => {
    if (!user) return;
    let points = 0;
    if (newAssignment.status === 'Completed' && newAssignment.submittedDate) {
      points = calcAssignmentPoints(newAssignment.dueDate, newAssignment.submittedDate);
    }
    await supabase.from('assignments').insert({
      user_id: user.id,
      title: newAssignment.title,
      subject: newAssignment.subject,
      due_date: newAssignment.dueDate,
      status: newAssignment.status,
      points,
      submitted_date: newAssignment.submittedDate ?? null,
    });
    setShowModal(false);
  };

  const handleMarkComplete = async (id: string) => {
    const assignment = assignments.find((a) => a.id === id);
    if (!assignment) return;
    const today = new Date().toISOString().split('T')[0];
    const points = calcAssignmentPoints(assignment.dueDate, today);
    await supabase
      .from('assignments')
      .update({ status: 'Completed', submitted_date: today, points })
      .eq('id', id);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('assignments').delete().eq('id', id);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ClipboardList size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Assignments</h1>
            <p className="text-xs text-muted-foreground">Track deadlines and earn bonus points for early submissions</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          Add Assignment
        </button>
      </div>

      <AssignmentStatsRow
        totalPoints={totalPoints}
        completed={completed}
        pending={pending}
        overdue={overdue}
      />
      <AssignmentTable
        assignments={assignments}
        onMarkComplete={handleMarkComplete}
        onDelete={handleDelete}
      />
      {showModal && (
        <AddAssignmentModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddAssignment}
        />
      )}
    </div>
  );
}
