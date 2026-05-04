create table if not exists public.daily_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  date date not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, date)
);

create table if not exists public.daily_signal_entries (
  id uuid primary key default gen_random_uuid(),
  checkin_id uuid references public.daily_checkins(id) on delete cascade not null,
  signal_key text not null,
  value jsonb not null default '{}'::jsonb,
  note text,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(checkin_id, signal_key)
);

create table if not exists public.meal_entries (
  id uuid primary key default gen_random_uuid(),
  checkin_id uuid references public.daily_checkins(id) on delete cascade not null,
  meal_time time not null,
  meal_type text,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists daily_checkins_user_date_idx on public.daily_checkins(user_id, date desc);
create index if not exists daily_signal_entries_checkin_idx on public.daily_signal_entries(checkin_id);
create index if not exists meal_entries_checkin_time_idx on public.meal_entries(checkin_id, meal_time);

alter table public.daily_checkins enable row level security;
alter table public.daily_signal_entries enable row level security;
alter table public.meal_entries enable row level security;

drop policy if exists "select own daily checkins" on public.daily_checkins;
drop policy if exists "insert own daily checkins" on public.daily_checkins;
drop policy if exists "update own daily checkins" on public.daily_checkins;
drop policy if exists "delete own daily checkins" on public.daily_checkins;

create policy "select own daily checkins"
on public.daily_checkins for select
using (auth.uid() = user_id);

create policy "insert own daily checkins"
on public.daily_checkins for insert
with check (auth.uid() = user_id);

create policy "update own daily checkins"
on public.daily_checkins for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "delete own daily checkins"
on public.daily_checkins for delete
using (auth.uid() = user_id);

drop policy if exists "select own signal entries" on public.daily_signal_entries;
drop policy if exists "insert own signal entries" on public.daily_signal_entries;
drop policy if exists "update own signal entries" on public.daily_signal_entries;
drop policy if exists "delete own signal entries" on public.daily_signal_entries;

create policy "select own signal entries"
on public.daily_signal_entries for select
using (
  exists (
    select 1
    from public.daily_checkins
    where daily_checkins.id = daily_signal_entries.checkin_id
      and daily_checkins.user_id = auth.uid()
  )
);

create policy "insert own signal entries"
on public.daily_signal_entries for insert
with check (
  exists (
    select 1
    from public.daily_checkins
    where daily_checkins.id = daily_signal_entries.checkin_id
      and daily_checkins.user_id = auth.uid()
  )
);

create policy "update own signal entries"
on public.daily_signal_entries for update
using (
  exists (
    select 1
    from public.daily_checkins
    where daily_checkins.id = daily_signal_entries.checkin_id
      and daily_checkins.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.daily_checkins
    where daily_checkins.id = daily_signal_entries.checkin_id
      and daily_checkins.user_id = auth.uid()
  )
);

create policy "delete own signal entries"
on public.daily_signal_entries for delete
using (
  exists (
    select 1
    from public.daily_checkins
    where daily_checkins.id = daily_signal_entries.checkin_id
      and daily_checkins.user_id = auth.uid()
  )
);

drop policy if exists "select own meal entries" on public.meal_entries;
drop policy if exists "insert own meal entries" on public.meal_entries;
drop policy if exists "update own meal entries" on public.meal_entries;
drop policy if exists "delete own meal entries" on public.meal_entries;

create policy "select own meal entries"
on public.meal_entries for select
using (
  exists (
    select 1
    from public.daily_checkins
    where daily_checkins.id = meal_entries.checkin_id
      and daily_checkins.user_id = auth.uid()
  )
);

create policy "insert own meal entries"
on public.meal_entries for insert
with check (
  exists (
    select 1
    from public.daily_checkins
    where daily_checkins.id = meal_entries.checkin_id
      and daily_checkins.user_id = auth.uid()
  )
);

create policy "update own meal entries"
on public.meal_entries for update
using (
  exists (
    select 1
    from public.daily_checkins
    where daily_checkins.id = meal_entries.checkin_id
      and daily_checkins.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.daily_checkins
    where daily_checkins.id = meal_entries.checkin_id
      and daily_checkins.user_id = auth.uid()
  )
);

create policy "delete own meal entries"
on public.meal_entries for delete
using (
  exists (
    select 1
    from public.daily_checkins
    where daily_checkins.id = meal_entries.checkin_id
      and daily_checkins.user_id = auth.uid()
  )
);
