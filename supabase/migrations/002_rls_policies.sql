alter table public.profiles enable row level security;
alter table public.checkins enable row level security;
alter table public.action_sessions enable row level security;

drop policy if exists "select own profile" on public.profiles;
drop policy if exists "insert own profile" on public.profiles;
drop policy if exists "update own profile" on public.profiles;
drop policy if exists "delete own profile" on public.profiles;

create policy "select own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "delete own profile"
on public.profiles for delete
using (auth.uid() = id);

drop policy if exists "select own checkins" on public.checkins;
drop policy if exists "insert own checkins" on public.checkins;
drop policy if exists "update own checkins" on public.checkins;
drop policy if exists "delete own checkins" on public.checkins;

create policy "select own checkins"
on public.checkins for select
using (auth.uid() = user_id);

create policy "insert own checkins"
on public.checkins for insert
with check (auth.uid() = user_id);

create policy "update own checkins"
on public.checkins for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "delete own checkins"
on public.checkins for delete
using (auth.uid() = user_id);

drop policy if exists "select own action_sessions" on public.action_sessions;
drop policy if exists "insert own action_sessions" on public.action_sessions;
drop policy if exists "update own action_sessions" on public.action_sessions;
drop policy if exists "delete own action_sessions" on public.action_sessions;

create policy "select own action_sessions"
on public.action_sessions for select
using (auth.uid() = user_id);

create policy "insert own action_sessions"
on public.action_sessions for insert
with check (
  auth.uid() = user_id
  and (
    checkin_id is null
    or exists (
      select 1
      from public.checkins
      where checkins.id = action_sessions.checkin_id
        and checkins.user_id = auth.uid()
    )
  )
);

create policy "update own action_sessions"
on public.action_sessions for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "delete own action_sessions"
on public.action_sessions for delete
using (auth.uid() = user_id);
