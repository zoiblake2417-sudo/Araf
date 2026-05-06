'use client';
import React, { useState, useEffect } from 'react';
import TaskProgressBar from './TaskProgressBar';
import TaskFilters from './TaskFilters';
import TaskTable from './TaskTable';
import AddTaskModal from './AddTaskModal';
import TaskSidePanel from './TaskSidePanel';
import { Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  subject: string;
  difficulty: Difficulty;
  time: string;
  points: number;
  status: TaskStatus;
  notes: string;
  createdAt: string;
}

export type FilterStatus = 'All' | 'Pending' | 'In Progress' | 'Completed';
export type FilterDifficulty = 'All' | 'Easy' | 'Medium' | 'Hard';

export default function TasksMainContent() {
  const { user } = useAuth();
  const supabase = createClient();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');
  const [filterDifficulty, setFilterDifficulty] = useState<FilterDifficulty>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);

  const mapRow = (row: any): Task => ({
    id: row.id,
    title: row.title,
    subject: row.subject,
    difficulty: row.difficulty as Difficulty,
    time: row.time ?? '',
    points: row.points,
    status: row.status as TaskStatus,
    notes: row.notes ?? '',
    createdAt: row.created_at?.split('T')[0] ?? '',
  });

  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (!error && data) setTasks(data.map(mapRow));
    };
    fetchTasks();

    const channel = supabase
      .channel('tasks-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks', filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks((prev) => [mapRow(payload.new), ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks((prev) => prev.map((t) => (t.id === payload.new.id ? mapRow(payload.new) : t)));
          } else if (payload.eventType === 'DELETE') {
            setTasks((prev) => prev.filter((t) => t.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const completedTasks = tasks.filter((t) => t.status === 'Completed');
  const totalPoints = completedTasks.reduce((sum, t) => sum + t.points, 0);

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
    const matchesDiff = filterDifficulty === 'All' || t.difficulty === filterDifficulty;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesDiff && matchesSearch;
  });

  const handleAddTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    if (!user) return;
    await supabase.from('tasks').insert({
      user_id: user.id,
      title: task.title,
      subject: task.subject,
      difficulty: task.difficulty,
      time: task.time,
      points: task.points,
      status: task.status,
      notes: task.notes,
      completed: task.status === 'Completed',
    });
    setShowAddModal(false);
  };

  const handleUpdateTask = async (updated: Task) => {
    await supabase
      .from('tasks')
      .update({
        title: updated.title,
        subject: updated.subject,
        difficulty: updated.difficulty,
        time: updated.time,
        points: updated.points,
        status: updated.status,
        notes: updated.notes,
        completed: updated.status === 'Completed',
      })
      .eq('id', updated.id);
    setEditingTask(null);
  };

  const handleCompleteTask = async (taskId: string) => {
    setCompletingId(taskId);
    await supabase
      .from('tasks')
      .update({ status: 'Completed', completed: true })
      .eq('id', taskId);
    setCompletingId(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    setDeletingId(taskId);
    await supabase.from('tasks').delete().eq('id', taskId);
    setDeletingId(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
        <div className="xl:col-span-3 space-y-4">
          <TaskProgressBar
            total={tasks.length}
            completed={completedTasks.length}
            pointsEarned={totalPoints}
          />
          <TaskFilters
            filterStatus={filterStatus}
            filterDifficulty={filterDifficulty}
            searchQuery={searchQuery}
            onFilterStatus={setFilterStatus}
            onFilterDifficulty={setFilterDifficulty}
            onSearch={setSearchQuery}
            onAddTask={() => setShowAddModal(true)}
          />
          <TaskTable
            tasks={filteredTasks}
            onComplete={handleCompleteTask}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            deletingId={deletingId}
            completingId={completingId}
          />
        </div>
        <div className="xl:col-span-1">
          <TaskSidePanel tasks={tasks} />
        </div>
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 xl:hidden btn-primary w-14 h-14 rounded-2xl shadow-glow p-0 flex items-center justify-center"
        aria-label="Add new task"
      >
        <Plus size={22} />
      </button>

      {(showAddModal || editingTask) && (
        <AddTaskModal
          editingTask={editingTask}
          onClose={() => { setShowAddModal(false); setEditingTask(null); }}
          onSubmit={editingTask
            ? (data) => handleUpdateTask({ ...editingTask, ...data })
            : handleAddTask
          }
        />
      )}
    </>
  );
}
