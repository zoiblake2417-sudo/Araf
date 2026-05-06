'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  Bell,
  Search,
  Menu,
  X,
  Flame,
  LayoutDashboard,
  CalendarCheck,
  BookOpen,
  ClipboardList,
  BarChart2,
  Trophy,
  Users,
  Settings,
} from 'lucide-react';

const MOBILE_NAV = [
  { id: 'mnav-dashboard', label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'mnav-tasks', label: 'Daily Tasks', href: '/timetable-daily-tasks', icon: <CalendarCheck size={18} /> },
  { id: 'mnav-exams', label: 'Exams', href: '/exams', icon: <BookOpen size={18} /> },
  { id: 'mnav-assignments', label: 'Assignments', href: '/assignments', icon: <ClipboardList size={18} /> },
  { id: 'mnav-analytics', label: 'Analytics', href: '/analytics', icon: <BarChart2 size={18} /> },
  { id: 'mnav-leaderboard', label: 'Leaderboard', href: '/leaderboard', icon: <Trophy size={18} /> },
  { id: 'mnav-partner', label: 'Partner', href: '/partner', icon: <Users size={18} /> },
  { id: 'mnav-settings', label: 'Settings', href: '/settings', icon: <Settings size={18} /> },
];

export default function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center px-4 lg:px-6 gap-4 shrink-0 z-20">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={20} className="text-muted-foreground" />
        </button>

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2">
          <AppLogo size={28} />
          <span className="font-bold text-sm text-foreground">StudySync <span className="text-primary">Duo</span></span>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-sm relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks, exams..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-muted border border-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card transition-all"
          />
        </div>

        <div className="flex-1 lg:flex-none" />

        {/* Streak badge */}
        <div className="hidden sm:flex items-center gap-1.5 bg-warning-muted px-3 py-1.5 rounded-xl">
          <Flame size={15} className="text-amber-500 streak-flame" />
          <span className="text-xs font-semibold text-amber-700">12</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-muted transition-colors" aria-label="Notifications">
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">A</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-foreground leading-tight">Alex Rivera</p>
            <p className="text-2xs text-muted-foreground">Lv. 8 Scholar</p>
          </div>
        </div>
      </header>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border flex flex-col animate-slide-up shadow-2xl">
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <AppLogo size={28} />
                <span className="font-bold text-sm text-foreground">StudySync <span className="text-primary">Duo</span></span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-muted">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {MOBILE_NAV?.map((item) => (
                <Link
                  key={item?.id}
                  href={item?.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >
                  {item?.icon}
                  {item?.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}