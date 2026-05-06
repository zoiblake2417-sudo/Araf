'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  CalendarCheck,
  BookOpen,
  ClipboardList,
  BarChart2,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  Users,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const NAV_GROUPS = [
  {
    id: 'group-main',
    label: 'MAIN',
    items: [
      {
        id: 'nav-dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard size={18} />,
      },
      {
        id: 'nav-tasks',
        label: 'Daily Tasks',
        href: '/timetable-daily-tasks',
        icon: <CalendarCheck size={18} />,
        badge: 4,
      },
      {
        id: 'nav-exams',
        label: 'Exams',
        href: '/exams',
        icon: <BookOpen size={18} />,
      },
      {
        id: 'nav-assignments',
        label: 'Assignments',
        href: '/assignments',
        icon: <ClipboardList size={18} />,
        badge: 2,
      },
    ],
  },
  {
    id: 'group-insights',
    label: 'INSIGHTS',
    items: [
      {
        id: 'nav-analytics',
        label: 'Analytics',
        href: '/analytics',
        icon: <BarChart2 size={18} />,
      },
      {
        id: 'nav-leaderboard',
        label: 'Leaderboard',
        href: '/leaderboard',
        icon: <Trophy size={18} />,
      },
      {
        id: 'nav-partner',
        label: 'Partner',
        href: '/partner',
        icon: <Users size={18} />,
      },
    ],
  },
];

interface SidebarProps {
  activePath: string;
}

export default function Sidebar({ activePath }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        hidden lg:flex flex-col bg-card border-r border-border
        transition-all duration-300 ease-in-out shrink-0 relative
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center gap-2.5 px-4 py-5 border-b border-border min-h-[64px] ${collapsed ? 'justify-center px-0' : ''}`}>
        <AppLogo size={32} />
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-sm text-foreground tracking-tight">StudySync</span>
            <span className="font-semibold text-xs text-primary">Duo</span>
          </div>
        )}
      </div>

      {/* Streak pill */}
      {!collapsed && (
        <div className="mx-3 mt-4 mb-2 flex items-center gap-2 bg-warning-muted rounded-xl px-3 py-2">
          <Flame size={16} className="text-amber-500 streak-flame shrink-0" />
          <span className="text-xs font-semibold text-amber-700">12-day streak 🔥</span>
        </div>
      )}
      {collapsed && (
        <div className="flex justify-center mt-4 mb-2">
          <Flame size={18} className="text-amber-500 streak-flame" />
        </div>
      )}

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.id} className="mb-4">
            {!collapsed && (
              <p className="text-2xs font-semibold text-muted-foreground tracking-widest px-2 mb-1.5 uppercase">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activePath === item.href || (item.href === '/dashboard' && activePath === '/');
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`
                        flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium
                        transition-all duration-150 group relative
                        ${isActive
                          ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }
                        ${collapsed ? 'justify-center px-0' : ''}
                      `}
                    >
                      <span className={`shrink-0 ${isActive ? 'text-primary' : ''}`}>
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}
                      {!collapsed && item.badge && item.badge > 0 && (
                        <span className="ml-auto bg-primary text-primary-foreground text-2xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                          {item.badge}
                        </span>
                      )}
                      {collapsed && item.badge && item.badge > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-2xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom: Settings + collapse toggle */}
      <div className="border-t border-border px-2 py-3 space-y-1">
        <Link
          href="/settings"
          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150 ${collapsed ? 'justify-center px-0' : ''}`}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>

        {/* User mini profile */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-muted transition-all duration-150 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-primary">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Alex Rivera</p>
              <p className="text-2xs text-muted-foreground truncate">Lv. 8 Scholar</p>
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-all duration-150 z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}