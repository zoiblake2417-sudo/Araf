'use client';
import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';

interface AssignmentsPageHeaderProps {
  onAddClick?: () => void;
}

export default function AssignmentsPageHeader({ onAddClick }: AssignmentsPageHeaderProps) {
  return (
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
        onClick={onAddClick}
        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
      >
        <Plus size={16} />
        Add Assignment
      </button>
    </div>
  );
}
