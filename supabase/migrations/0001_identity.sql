do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('tester', 'founder', 'admin');
  end if;

  if not exists (select 1 from pg_type where typname = 'admin_level') then
    create type public.admin_level as enum ('super', 'assistant');
  end if;

  if not exists (select 1 from pg_type where typname = 'tester_badge') then
    create type public.tester_badge as enum ('probation', 'verified', 'top-rated');
  end if;

  if not exists (select 1 from pg_type where typname = 'verification_status') then
    create type public.verification_status as enum ('not_started', 'pending', 'approved', 'rejected');
  end if;
end $$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.is_admin(required_level public.admin_level default null)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'admin'
      and (
        required_level is null
        or profiles.admin_level = 'super'
        or profiles.admin_level = required_level
      )
  );
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.user_role not null,
  admin_level public.admin_level,
  badge public.tester_badge,
  verification_status public.verification_status not null default 'not_started',
  college text,
  github_url text,
  linkedin_url text,
  company_id uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  slug text not null unique,
  website text,
  plan_tier text not null default 'beta',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default timezone('utc', now()),
  unique (company_id, profile_id)
);

create table if not exists public.tester_verifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  status public.verification_status not null default 'pending',
  screener_score integer,
  college_id_url text,
  skills text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute procedure public.touch_updated_at();

drop trigger if exists companies_touch_updated_at on public.companies;
create trigger companies_touch_updated_at
before update on public.companies
for each row execute procedure public.touch_updated_at();

drop trigger if exists tester_verifications_touch_updated_at on public.tester_verifications;
create trigger tester_verifications_touch_updated_at
before update on public.tester_verifications
for each row execute procedure public.touch_updated_at();
