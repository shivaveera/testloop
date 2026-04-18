do $$
begin
  if not exists (select 1 from pg_type where typname = 'test_status') then
    create type public.test_status as enum ('draft', 'published', 'live', 'completed', 'flagged');
  end if;
end $$;

create table if not exists public.tests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  founder_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null,
  status public.test_status not null default 'draft',
  url text not null,
  framable boolean not null default false,
  category text not null,
  reward_inr integer not null default 500,
  target_testers integer not null default 15,
  current_submissions integer not null default 0,
  eligible_badges public.tester_badge[] not null default '{probation,verified,top-rated}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  published_at timestamptz
);

create table if not exists public.test_tasks (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.tests(id) on delete cascade,
  position integer not null,
  title text not null,
  description text not null,
  success_selector text,
  success_url_pattern text
);

create table if not exists public.test_metrics_config (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.tests(id) on delete cascade,
  metric_key text not null,
  label text not null,
  operator text not null,
  target_value numeric not null,
  unit text not null default '',
  unique (test_id, metric_key)
);

drop trigger if exists tests_touch_updated_at on public.tests;
create trigger tests_touch_updated_at
before update on public.tests
for each row execute procedure public.touch_updated_at();
