create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.profiles(id) on delete cascade,
  action text not null,
  target_id text not null,
  target_type text not null,
  summary text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_settings (
  id uuid primary key default gen_random_uuid(),
  default_model text not null default 'gpt-4.1-mini',
  scoring_model text not null default 'gpt-4.1',
  allow_auto_approve boolean not null default true,
  flag_threshold integer not null default 70,
  review_threshold integer not null default 40,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default timezone('utc', now())
);

insert into public.admin_settings (id)
select gen_random_uuid()
where not exists (select 1 from public.admin_settings);
