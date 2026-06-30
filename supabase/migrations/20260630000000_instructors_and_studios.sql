-- Core marketplace schema: profiles, instructors, studios.

create type public.user_role as enum ('instructor', 'studio_owner');

create type public.specialty as enum ('yoga', 'pilates', 'sound_bath', 'fitness');

-- One row per auth user, holding the fields shared by both sides of the
-- marketplace. Role-specific data lives in instructors/studios below.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null,
  full_name text not null,
  avatar_url text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.instructors (
  profile_id uuid primary key references public.profiles (id) on delete cascade,
  bio text,
  specialties public.specialty[] not null default '{}',
  certifications text[] not null default '{}',
  years_experience smallint,
  hourly_rate_cents integer,
  city text,
  zip text,
  accepts_subs boolean not null default true,
  accepts_long_term boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.studios (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  description text,
  address_line1 text,
  address_line2 text,
  city text,
  state text not null default 'CA',
  zip text,
  phone text,
  website_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index instructors_specialties_idx on public.instructors using gin (specialties);
create index instructors_city_idx on public.instructors (city);
create index studios_owner_id_idx on public.studios (owner_id);
create index studios_city_idx on public.studios (city);

-- Keep updated_at current on every row update.
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.instructors
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.studios
  for each row execute function public.set_updated_at();

-- Auto-create a profile row when a user signs up. Expects role and
-- full_name in the signup call's options.data (raw_user_meta_data).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    (new.raw_user_meta_data ->> 'role')::public.user_role,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS: profiles and instructor/studio listings are publicly readable
-- (it's a marketplace directory); writes are restricted to the owning user.
alter table public.profiles enable row level security;
alter table public.instructors enable row level security;
alter table public.studios enable row level security;

create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Instructor listings are publicly readable"
  on public.instructors for select
  using (true);

create policy "Instructors can insert their own listing"
  on public.instructors for insert
  with check (auth.uid() = profile_id);

create policy "Instructors can update their own listing"
  on public.instructors for update
  using (auth.uid() = profile_id);

create policy "Instructors can delete their own listing"
  on public.instructors for delete
  using (auth.uid() = profile_id);

create policy "Studio listings are publicly readable"
  on public.studios for select
  using (true);

create policy "Studio owners can insert their own studio"
  on public.studios for insert
  with check (auth.uid() = owner_id);

create policy "Studio owners can update their own studio"
  on public.studios for update
  using (auth.uid() = owner_id);

create policy "Studio owners can delete their own studio"
  on public.studios for delete
  using (auth.uid() = owner_id);
