-- =====================================================================
-- ShimaCharles.ca — database schema for Supabase
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- Safe to re-run: it uses "if not exists" / "or replace" where possible.
-- =====================================================================

-- ---------- Admins: who may use /admin --------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- Site settings (one row, key = 'main') ---------------------
create table if not exists public.site_settings (
  key text primary key default 'main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- ---------- Content collections ---------------------------------------
create table if not exists public.contributions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  body text,
  image_url text,
  sort_order int default 0,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.speaking (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  role text,
  event_date date,
  location text,
  summary text,
  image_url text,
  link_url text,
  sort_order int default 0,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.ventures (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  tagline text,
  description text,
  image_url text,
  link_url text,
  sort_order int default 0,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.press (
  id uuid primary key default gen_random_uuid(),
  outlet text not null,
  title text not null,
  link_url text,
  image_url text,
  published_on date,
  sort_order int default 0,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,               -- Markdown
  cover_url text,
  seo_title text,
  seo_description text,
  published boolean default false,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists public.booking_types (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  duration text,
  description text,
  sort_order int default 0,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text check (phone is null or char_length(phone) <= 40),
  organisation text check (organisation is null or char_length(organisation) <= 160),
  booking_type text check (booking_type is null or char_length(booking_type) <= 120),
  preferred_date date,
  preferred_time text check (preferred_time is null or char_length(preferred_time) <= 40),
  message text check (message is null or char_length(message) <= 4000),
  status text not null default 'new' check (status in ('new','confirmed','declined','done')),
  admin_notes text,
  created_at timestamptz default now()
);

-- ---------- Row-level security ----------------------------------------
alter table public.admins        enable row level security;
alter table public.site_settings enable row level security;
alter table public.contributions enable row level security;
alter table public.speaking      enable row level security;
alter table public.ventures      enable row level security;
alter table public.press         enable row level security;
alter table public.posts         enable row level security;
alter table public.booking_types enable row level security;
alter table public.bookings      enable row level security;

do $$
declare t text;
begin
  -- Public can read published rows; admins can do everything.
  foreach t in array array['contributions','speaking','ventures','press','posts'] loop
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (published = true or public.is_admin())', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "admin write" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

drop policy if exists "public read" on public.booking_types;
create policy "public read" on public.booking_types for select using (active = true or public.is_admin());
drop policy if exists "admin write" on public.booking_types;
create policy "admin write" on public.booking_types for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read" on public.site_settings;
create policy "public read" on public.site_settings for select using (true);
drop policy if exists "admin write" on public.site_settings;
create policy "admin write" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

-- Visitors may only CREATE a booking request (never read others'), and only with status 'new'.
drop policy if exists "anyone can request" on public.bookings;
create policy "anyone can request" on public.bookings for insert with check (status = 'new' and admin_notes is null);
drop policy if exists "admin manage" on public.bookings;
create policy "admin manage" on public.bookings for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins see admins" on public.admins;
create policy "admins see admins" on public.admins for select using (public.is_admin());

-- ---------- Image storage bucket "media" ------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());

-- ---------- Starter content (edit everything later in /admin) ---------
insert into public.site_settings (key, data) values ('main', '{}'::jsonb)
on conflict (key) do nothing;

-- Starter content lives in seed.sql (run it once, after this file).

-- =====================================================================
-- LAST STEP (run separately, after you create your login in
-- Supabase → Authentication → Users → "Add user"):
--
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'YOUR-EMAIL@example.com';
--
-- =====================================================================
