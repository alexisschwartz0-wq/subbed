-- Lets the public homepage show a teaser count of open positions
-- without granting anonymous visitors row-level access to job_listings
-- (that stays authenticated-only per the privacy model).

create function public.active_job_listings_count()
returns bigint
language sql
security definer
set search_path = ''
stable
as $$
  select count(*) from public.job_listings where status = 'active';
$$;

grant execute on function public.active_job_listings_count() to anon, authenticated;
