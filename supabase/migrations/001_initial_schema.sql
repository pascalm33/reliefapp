create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  first_name text,
  main_goal text,
  reminder_enabled boolean default true,
  reminder_time text default '21:30',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  created_at timestamptz default now(),
  sleep_awakenings integer default 0,
  sleep_awake_minutes integer default 0,
  sleep_quality integer default 5,
  sleep_main_cause text,
  digestion_had_bowel_movement boolean default false,
  digestion_abdominal_discomfort integer default 0,
  digestion_constipation_feeling integer default 0,
  digestion_hydration text default 'medium',
  digestion_health_alert text default 'none',
  procrastination_avoided_important_task boolean default false,
  procrastination_avoided_tasks_count integer default 0,
  procrastination_blockage_level integer default 0,
  procrastination_main_cause text,
  scroll_useless_minutes integer default 0,
  scroll_unintentional_opens integer default 0,
  scroll_loss_of_control integer default 0,
  scroll_main_moment text,
  aggression_irritability_level integer default 0,
  aggression_disproportionate_reaction boolean default false,
  aggression_incidents_count integer default 0,
  aggression_main_trigger text,
  global_stress_level integer default 0,
  global_relief_level integer default 0,
  global_energy_level integer default 5,
  global_note text,
  sleep_score integer default 0,
  digestion_score integer default 0,
  procrastination_score integer default 0,
  scroll_score integer default 0,
  aggression_score integer default 0,
  global_stress_signal_score integer default 0,
  unique(user_id, date)
);

create table if not exists public.action_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  checkin_id uuid references public.checkins(id) on delete cascade,
  date date not null,
  metric text not null,
  action_name text not null,
  completed boolean default false,
  stress_before integer,
  stress_after integer,
  relief_after integer,
  helped boolean,
  note text,
  created_at timestamptz default now()
);

create index if not exists checkins_user_date_idx on public.checkins(user_id, date desc);
create index if not exists action_sessions_user_date_idx on public.action_sessions(user_id, date desc);
create index if not exists action_sessions_checkin_idx on public.action_sessions(checkin_id);
