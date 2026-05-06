import React from 'react';
import { CheckCircle2, BookOpen, ClipboardList, Star, Flame, Zap, MessageCircle } from 'lucide-react';

const ACTIVITIES = [
  {
    id: 'act-001',
    user: 'You',
    userInitial: 'A',
    userColor: 'bg-primary/20 text-primary',
    action: 'completed task',
    entity: 'Linear Algebra Problem Set',
    meta: '+20 pts (Hard)',
    metaColor: 'text-danger',
    time: '2 min ago',
    icon: <CheckCircle2 size={14} />,
    iconBg: 'bg-success-muted text-success',
  },
  {
    id: 'act-002',
    user: 'Jordan',
    userInitial: 'J',
    userColor: 'bg-amber-100 text-amber-600',
    action: 'completed task',
    entity: 'Statistics Chapter 7 Notes',
    meta: '+10 pts (Medium)',
    metaColor: 'text-amber-600',
    time: '18 min ago',
    icon: <CheckCircle2 size={14} />,
    iconBg: 'bg-success-muted text-success',
  },
  {
    id: 'act-003',
    user: 'You',
    userInitial: 'A',
    userColor: 'bg-primary/20 text-primary',
    action: 'added exam result',
    entity: 'Organic Chemistry Mid-term — 88%',
    meta: '+88 pts',
    metaColor: 'text-success',
    time: '1h ago',
    icon: <BookOpen size={14} />,
    iconBg: 'bg-blue-100 text-blue-500',
  },
  {
    id: 'act-004',
    user: 'Jordan',
    userInitial: 'J',
    userColor: 'bg-amber-100 text-amber-600',
    action: 'submitted assignment early',
    entity: 'Research Paper Draft',
    meta: '+70 pts (2 days early)',
    metaColor: 'text-success',
    time: '3h ago',
    icon: <ClipboardList size={14} />,
    iconBg: 'bg-violet-100 text-violet-500',
  },
  {
    id: 'act-005',
    user: 'You',
    userInitial: 'A',
    userColor: 'bg-primary/20 text-primary',
    action: 'earned badge',
    entity: 'Consistency — 7-day streak',
    meta: 'New badge!',
    metaColor: 'text-amber-600',
    time: 'Yesterday',
    icon: <Star size={14} />,
    iconBg: 'bg-amber-100 text-amber-500',
  },
  {
    id: 'act-006',
    user: 'Jordan',
    userInitial: 'J',
    userColor: 'bg-amber-100 text-amber-600',
    action: 'sent you a message',
    entity: '"Keep it up! Almost at Level 9 🚀"',
    meta: '',
    metaColor: '',
    time: 'Yesterday',
    icon: <MessageCircle size={14} />,
    iconBg: 'bg-secondary text-primary',
  },
  {
    id: 'act-007',
    user: 'You',
    userInitial: 'A',
    userColor: 'bg-primary/20 text-primary',
    action: 'extended streak',
    entity: 'Day 11 completed',
    meta: '🔥 Streak milestone',
    metaColor: 'text-amber-600',
    time: '2 days ago',
    icon: <Flame size={14} />,
    iconBg: 'bg-amber-100 text-amber-500',
  },
  {
    id: 'act-008',
    user: 'You',
    userInitial: 'A',
    userColor: 'bg-primary/20 text-primary',
    action: 'completed task',
    entity: 'Thermodynamics Practice Problems',
    meta: '+20 pts (Hard)',
    metaColor: 'text-danger',
    time: '2 days ago',
    icon: <Zap size={14} />,
    iconBg: 'bg-success-muted text-success',
  },
];

export default function ActivityFeedSection() {
  return (
    <div className="card-base h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-foreground">Recent Activity</h3>
        <button className="text-xs text-primary font-semibold hover:underline">View all</button>
      </div>
      <div className="space-y-0">
        {ACTIVITIES?.map((act, idx) => (
          <div
            key={act?.id}
            className={`flex items-start gap-3 py-3 ${idx < ACTIVITIES?.length - 1 ? 'border-b border-border/60' : ''} hover:bg-muted/40 -mx-2 px-2 rounded-xl transition-colors`}
          >
            {/* User avatar */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${act?.userColor}`}>
              {act?.userInitial}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-tight">
                <span className="font-semibold">{act?.user}</span>
                <span className="text-muted-foreground"> {act?.action} </span>
                <span className="font-medium">{act?.entity}</span>
              </p>
              {act?.meta && (
                <p className={`text-xs font-semibold mt-0.5 ${act?.metaColor}`}>{act?.meta}</p>
              )}
            </div>

            {/* Time + icon */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="text-2xs text-muted-foreground">{act?.time}</span>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${act?.iconBg}`}>
                {act?.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}