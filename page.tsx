import React from 'react';
import AppLayout from '@/components/AppLayout';
import TasksPageHeader from './components/TasksPageHeader';
import TasksMainContent from './components/TasksMainContent';

export default function TimetableDailyTasksPage() {
  return (
    <AppLayout activePath="/timetable-daily-tasks">
      <div className="space-y-5">
        <TasksPageHeader />
        <TasksMainContent />
      </div>
    </AppLayout>
  );
}