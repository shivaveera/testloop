alter table public.tests enable row level security;
alter table public.test_tasks enable row level security;
alter table public.test_metrics_config enable row level security;

drop policy if exists "tests_founder_or_admin_manage" on public.tests;
create policy "tests_founder_or_admin_manage"
on public.tests
for all
to authenticated
using (
  founder_id = (select auth.uid())
  or public.is_admin()
  or (
    status in ('published', 'live', 'completed')
    and exists (
      select 1
      from public.profiles profiles
      where profiles.id = (select auth.uid())
        and profiles.role = 'tester'
    )
  )
)
with check (
  founder_id = (select auth.uid())
  or public.is_admin()
);

drop policy if exists "test_tasks_access_through_test" on public.test_tasks;
create policy "test_tasks_access_through_test"
on public.test_tasks
for select
to authenticated
using (
  exists (
    select 1
    from public.tests tests
    where tests.id = test_tasks.test_id
      and (
        tests.founder_id = (select auth.uid())
        or public.is_admin()
        or tests.status in ('published', 'live', 'completed')
      )
  )
);

drop policy if exists "test_tasks_founder_or_admin_write" on public.test_tasks;
create policy "test_tasks_founder_or_admin_write"
on public.test_tasks
for all
to authenticated
using (
  exists (
    select 1
    from public.tests tests
    where tests.id = test_tasks.test_id
      and (tests.founder_id = (select auth.uid()) or public.is_admin())
  )
)
with check (
  exists (
    select 1
    from public.tests tests
    where tests.id = test_tasks.test_id
      and (tests.founder_id = (select auth.uid()) or public.is_admin())
  )
);

drop policy if exists "test_metrics_access_through_test" on public.test_metrics_config;
create policy "test_metrics_access_through_test"
on public.test_metrics_config
for select
to authenticated
using (
  exists (
    select 1
    from public.tests tests
    where tests.id = test_metrics_config.test_id
      and (
        tests.founder_id = (select auth.uid())
        or public.is_admin()
        or tests.status in ('published', 'live', 'completed')
      )
  )
);

drop policy if exists "test_metrics_founder_or_admin_write" on public.test_metrics_config;
create policy "test_metrics_founder_or_admin_write"
on public.test_metrics_config
for all
to authenticated
using (
  exists (
    select 1
    from public.tests tests
    where tests.id = test_metrics_config.test_id
      and (tests.founder_id = (select auth.uid()) or public.is_admin())
  )
)
with check (
  exists (
    select 1
    from public.tests tests
    where tests.id = test_metrics_config.test_id
      and (tests.founder_id = (select auth.uid()) or public.is_admin())
  )
);
