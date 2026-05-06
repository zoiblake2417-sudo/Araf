-- ============================================================
-- StudySync Duo — Supabase Schema
-- Run this once in your Supabase SQL Editor
-- ============================================================

-- ── TASKS ────────────────────────────────────────────────────
create table if not exists public.tasks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  title       text not null,
  subject     text not null,
  difficulty  text check (difficulty in ('Easy', 'Medium', 'Hard')) not null,
  time        text,
  points      int not null default 0,
  status      text check (status in ('Pending', 'In Progress', 'Completed')) not null default 'Pending',
  completed   boolean not null default false,
  notes       text,
  created_at  timestamptz default now()
);

alter table public.tasks enable row level security;

create policy "Users can manage their own tasks"
  on public.tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── EXAMS ────────────────────────────────────────────────────
create table if not exists public.exams (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete cascade not null,
  subject         text not null,
  date            date not null,
  marks_obtained  numeric not null,
  total_marks     numeric not null,
  percentage      numeric not null,
  points          numeric not null,
  created_at      timestamptz default now()
);

alter table public.exams enable row level security;

create policy "Users can manage their own exams"
  on public.exams for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── ASSIGNMENTS ───────────────────────────────────────────────
create table if not exists public.assignments (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete cascade not null,
  title           text not null,
  subject         text not null,
  due_date        date not null,
  status          text check (status in ('Pending', 'Completed', 'Overdue')) not null default 'Pending',
  points          int not null default 0,
  submitted_date  date,
  created_at      timestamptz default now()
);

alter table public.assignments enable row level security;

create policy "Users can manage their own assignments"
  on public.assignments for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── USER PROFILES (for partner system) ───────────────────────
create table if not exists public.user_profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  full_name       text,
  partner_id      uuid references auth.users(id),
  partner_code    text unique,
  created_at      timestamptz default now()
);

alter table public.user_profiles enable row level security;

create policy "Users can read own and partner profile"
  on public.user_profiles for select
  using (
    auth.uid() = id
    or auth.uid() = (
      select partner_id from public.user_profiles where id = auth.uid()
    )
  );

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

-- ── ENABLE REAL-TIME ──────────────────────────────────────────
-- In Supabase Dashboard → Database → Replication, enable these tables:
-- tasks, exams, assignments
-- OR run:
alter publication supabase_realtime add table public.tasks;
alter publication supabase_realtime add table public.exams;
alter publication supabase_realtime add table public.assignments;
