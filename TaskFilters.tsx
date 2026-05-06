import React from 'react';
import { Search, Plus } from 'lucide-react';
import type { FilterStatus, FilterDifficulty } from './TasksMainContent';

const STATUS_TABS: FilterStatus[] = ['All', 'Pending', 'In Progress', 'Completed'];
const DIFF_TABS: FilterDifficulty[] = ['All', 'Easy', 'Medium', 'Hard'];

interface TaskFiltersProps {
  filterStatus: FilterStatus;
  filterDifficulty: FilterDifficulty;
  searchQuery: string;
  onFilterStatus: (v: FilterStatus) => void;
  onFilterDifficulty: (v: FilterDifficulty) => void;
  onSearch: (v: string) => void;
  onAddTask: () => void;
}

export default function TaskFilters({
  filterStatus, filterDifficulty, searchQuery,
  onFilterStatus, onFilterDifficulty, onSearch, onAddTask,
}: TaskFiltersProps) {
  return (
    <div className="card-base space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search tasks or subjects..."
            className="input-field pl-9"
          />
        </div>

        {/* Add task button — desktop */}
        <button
          onClick={onAddTask}
          className="btn-primary hidden xl:inline-flex shrink-0"
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Status filter */}
        <div className="flex items-center gap-1.5 bg-muted rounded-xl p-1 flex-wrap">
          {STATUS_TABS.map((tab) => (
            <button
              key={`status-${tab}`}
              onClick={() => onFilterStatus(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                filterStatus === tab
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-1.5 bg-muted rounded-xl p-1">
          {DIFF_TABS.map((tab) => (
            <button
              key={`diff-${tab}`}
              onClick={() => onFilterDifficulty(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                filterDifficulty === tab
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}