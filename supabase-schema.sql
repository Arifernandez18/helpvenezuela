-- Venezuela Ayuda Supabase schema
-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.requests (
  id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text,
  category text not null,
  support_type text not null default 'money' check (support_type in ('money', 'supplies', 'both')),
  city text,
  state text,
  story text not null,
  requested numeric not null default 0,
  method text,
  details text,
  files text,
  status text not null default 'published' check (status in ('published', 'rejected')),
  raised numeric not null default 0,
  receipt text,
  tracking_notes text,
  updates jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.requests
add column if not exists support_type text not null default 'money';

alter table public.profiles enable row level security;
alter table public.requests enable row level security;

drop policy if exists "profiles can read own profile" on public.profiles;
drop policy if exists "profiles can insert own profile" on public.profiles;
drop policy if exists "profiles can update own profile" on public.profiles;
drop policy if exists "anyone can read public requests" on public.requests;
drop policy if exists "signed in users can publish requests" on public.requests;
drop policy if exists "owners can edit their requests" on public.requests;
drop policy if exists "admins can edit all requests" on public.requests;

create policy "profiles can read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "profiles can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "anyone can read public requests"
on public.requests for select
using (status = 'published');

create policy "signed in users can publish requests"
on public.requests for insert
to authenticated
with check (auth.uid() = user_id and status = 'published');

create policy "owners can edit their requests"
on public.requests for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id and status = 'published');

create policy "admins can edit all requests"
on public.requests for update
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- After creating/signing in with this admin account, run this:
update public.profiles
set role = 'admin'
where email = 'ariannafernandez2007@gmail.com';
