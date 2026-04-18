do $$
begin
  if not exists (select 1 from pg_type where typname = 'submission_status') then
    create type public.submission_status as enum ('pending', 'approved', 'flagged', 'rejected');
  end if;
end $$;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.tests(id) on delete cascade,
  tester_id uuid not null references public.profiles(id) on delete cascade,
  status public.submission_status not null default 'pending',
  quality_score integer not null default 0,
  fraud_score integer not null default 0,
  duration_seconds integer not null default 0,
  summary text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  completed_at timestamptz
);

create table if not exists public.submission_metrics (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  metric_key text not null,
  label text not null,
  value numeric not null,
  unit text not null default '',
  passed boolean not null default false,
  threshold_display text not null,
  unique (submission_id, metric_key)
);

create table if not exists public.submission_flags (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  key text not null,
  label text not null,
  severity integer not null,
  status text not null default 'open',
  reason text not null
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  event_name text not null,
  event_origin text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);
