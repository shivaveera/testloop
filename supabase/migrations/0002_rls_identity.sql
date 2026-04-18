alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.tester_verifications enable row level security;

drop policy if exists "profiles_self_or_admin_select" on public.profiles;
create policy "profiles_self_or_admin_select"
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
  or public.is_admin()
);

drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_update"
on public.profiles
for update
to authenticated
using (id = (select auth.uid()) or public.is_admin())
with check (id = (select auth.uid()) or public.is_admin());

drop policy if exists "companies_member_select" on public.companies;
create policy "companies_member_select"
on public.companies
for select
to authenticated
using (
  owner_id = (select auth.uid())
  or exists (
    select 1
    from public.company_members company_members
    where company_members.company_id = companies.id
      and company_members.profile_id = (select auth.uid())
  )
  or public.is_admin()
);

drop policy if exists "companies_owner_update" on public.companies;
create policy "companies_owner_update"
on public.companies
for all
to authenticated
using (owner_id = (select auth.uid()) or public.is_admin())
with check (owner_id = (select auth.uid()) or public.is_admin());

drop policy if exists "company_members_member_select" on public.company_members;
create policy "company_members_member_select"
on public.company_members
for select
to authenticated
using (
  profile_id = (select auth.uid())
  or exists (
    select 1
    from public.companies companies
    where companies.id = company_members.company_id
      and companies.owner_id = (select auth.uid())
  )
  or public.is_admin()
);

drop policy if exists "company_members_owner_write" on public.company_members;
create policy "company_members_owner_write"
on public.company_members
for all
to authenticated
using (
  exists (
    select 1
    from public.companies companies
    where companies.id = company_members.company_id
      and companies.owner_id = (select auth.uid())
  )
  or public.is_admin()
)
with check (
  exists (
    select 1
    from public.companies companies
    where companies.id = company_members.company_id
      and companies.owner_id = (select auth.uid())
  )
  or public.is_admin()
);

drop policy if exists "tester_verifications_self_or_admin_select" on public.tester_verifications;
create policy "tester_verifications_self_or_admin_select"
on public.tester_verifications
for select
to authenticated
using (
  profile_id = (select auth.uid())
  or public.is_admin()
);

drop policy if exists "tester_verifications_self_insert" on public.tester_verifications;
create policy "tester_verifications_self_insert"
on public.tester_verifications
for insert
to authenticated
with check (
  profile_id = (select auth.uid())
  or public.is_admin()
);

drop policy if exists "tester_verifications_self_or_admin_update" on public.tester_verifications;
create policy "tester_verifications_self_or_admin_update"
on public.tester_verifications
for update
to authenticated
using (
  profile_id = (select auth.uid())
  or public.is_admin()
)
with check (
  profile_id = (select auth.uid())
  or public.is_admin()
);
