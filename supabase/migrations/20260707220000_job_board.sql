-- Job board: studios post listings, instructors browse and apply.
-- Also tightens instructor profile visibility to a real privacy model:
-- instructor rows are no longer publicly readable — a studio can only
-- see an instructor's profile once that instructor has applied to (or
-- messaged about) one of the studio's listings.

create type public.job_discipline as enum (
  'yoga', 'pilates', 'sound_bath', 'barre', 'cycle', 'group_fitness'
);

create type public.job_listing_type as enum (
  'last_minute_sub', 'part_time', 'full_time'
);

create type public.job_listing_status as enum (
  'active', 'filled', 'closed'
);

create type public.job_interest_kind as enum (
  'application', 'inquiry'
);

create table public.job_listings (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references public.studios (id) on delete cascade,
  title text not null,
  discipline public.job_discipline not null,
  listing_type public.job_listing_type not null,
  needed_at timestamptz,
  location text,
  pay_rate_cents integer,
  description text,
  requirements text,
  status public.job_listing_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tracks instructor interest in a listing (either a one-click apply or
-- a direct inquiry message). This is also the sole grant of visibility
-- into the instructor's profile for the studio that owns the listing.
create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_listing_id uuid not null references public.job_listings (id) on delete cascade,
  instructor_id uuid not null references public.profiles (id) on delete cascade,
  conversation_id uuid references public.conversations (id) on delete set null,
  kind public.job_interest_kind not null default 'application',
  viewed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (job_listing_id, instructor_id)
);

alter table public.messages
  add column job_listing_id uuid references public.job_listings (id) on delete set null;

create index job_listings_studio_id_idx on public.job_listings (studio_id);
create index job_listings_status_idx on public.job_listings (status);
create index job_listings_discipline_idx on public.job_listings (discipline);
create index job_applications_job_listing_id_idx on public.job_applications (job_listing_id);
create index job_applications_instructor_id_idx on public.job_applications (instructor_id);

create trigger set_updated_at before update on public.job_listings
  for each row execute function public.set_updated_at();

-- RLS: job_listings

alter table public.job_listings enable row level security;

create policy "Active listings are readable by authenticated users"
  on public.job_listings for select
  to authenticated
  using (status = 'active');

create policy "Studio owners can view their own listings"
  on public.job_listings for select
  using (
    exists (
      select 1 from public.studios
      where studios.id = job_listings.studio_id
        and studios.owner_id = auth.uid()
    )
  );

create policy "Studio owners can insert their own listings"
  on public.job_listings for insert
  with check (
    exists (
      select 1 from public.studios
      where studios.id = job_listings.studio_id
        and studios.owner_id = auth.uid()
    )
  );

create policy "Studio owners can update their own listings"
  on public.job_listings for update
  using (
    exists (
      select 1 from public.studios
      where studios.id = job_listings.studio_id
        and studios.owner_id = auth.uid()
    )
  );

create policy "Studio owners can delete their own listings"
  on public.job_listings for delete
  using (
    exists (
      select 1 from public.studios
      where studios.id = job_listings.studio_id
        and studios.owner_id = auth.uid()
    )
  );

-- RLS: job_applications

alter table public.job_applications enable row level security;

create policy "Instructors can view their own applications"
  on public.job_applications for select
  using (instructor_id = auth.uid());

create policy "Studio owners can view applications to their listings"
  on public.job_applications for select
  using (
    exists (
      select 1 from public.job_listings
      join public.studios on studios.id = job_listings.studio_id
      where job_listings.id = job_applications.job_listing_id
        and studios.owner_id = auth.uid()
    )
  );

create policy "Instructors can apply to listings"
  on public.job_applications for insert
  with check (instructor_id = auth.uid());

create policy "Studio owners can mark applications as viewed"
  on public.job_applications for update
  using (
    exists (
      select 1 from public.job_listings
      join public.studios on studios.id = job_listings.studio_id
      where job_listings.id = job_applications.job_listing_id
        and studios.owner_id = auth.uid()
    )
  );

-- Privacy: instructor profiles are no longer publicly readable. A studio
-- only gains visibility once the instructor has applied to one of its
-- listings.

drop policy "Instructor listings are publicly readable" on public.instructors;

create policy "Instructors can view their own profile"
  on public.instructors for select
  using (profile_id = auth.uid());

create policy "Studios can view instructors who applied to their listings"
  on public.instructors for select
  using (
    exists (
      select 1 from public.job_applications
      join public.job_listings on job_listings.id = job_applications.job_listing_id
      join public.studios on studios.id = job_listings.studio_id
      where job_applications.instructor_id = instructors.profile_id
        and studios.owner_id = auth.uid()
    )
  );

-- The base profiles row (name, photo, phone) needs the same treatment,
-- since it's shared by both roles: studio_owner profiles stay public
-- (studios remain browsable by instructors), but instructor profiles
-- follow the same "only visible after they've applied" rule.

drop policy "Profiles are publicly readable" on public.profiles;

create policy "Studio owner profiles are publicly readable"
  on public.profiles for select
  using (role = 'studio_owner');

create policy "Users can view their own profile row"
  on public.profiles for select
  using (id = auth.uid());

create policy "Studios can view profiles of instructors who applied to their listings"
  on public.profiles for select
  using (
    role = 'instructor'
    and exists (
      select 1 from public.job_applications
      join public.job_listings on job_listings.id = job_applications.job_listing_id
      join public.studios on studios.id = job_listings.studio_id
      where job_applications.instructor_id = profiles.id
        and studios.owner_id = auth.uid()
    )
  );
