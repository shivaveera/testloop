alter table public.submissions enable row level security;
alter table public.submission_metrics enable row level security;
alter table public.submission_flags enable row level security;
alter table public.events enable row level security;

drop policy if exists "submissions_access_by_tester_founder_or_admin" on public.submissions;
create policy "submissions_access_by_tester_founder_or_admin"
on public.submissions
for select
to authenticated
using (
  tester_id = (select auth.uid())
  or public.is_admin()
  or exists (
    select 1
    from public.tests tests
    where tests.id = submissions.test_id
      and tests.founder_id = (select auth.uid())
  )
);

drop policy if exists "submissions_tester_insert" on public.submissions;
create policy "submissions_tester_insert"
on public.submissions
for insert
to authenticated
with check (
  tester_id = (select auth.uid())
  and exists (
    select 1
    from public.profiles profiles
    where profiles.id = (select auth.uid())
      and profiles.role = 'tester'
  )
);

drop policy if exists "submissions_admin_or_founder_update" on public.submissions;
create policy "submissions_admin_or_founder_update"
on public.submissions
for update
to authenticated
using (
  public.is_admin()
  or exists (
    select 1
    from public.tests tests
    where tests.id = submissions.test_id
      and tests.founder_id = (select auth.uid())
  )
)
with check (
  public.is_admin()
  or exists (
    select 1
    from public.tests tests
    where tests.id = submissions.test_id
      and tests.founder_id = (select auth.uid())
  )
);

drop policy if exists "submission_metrics_access_by_submission_visibility" on public.submission_metrics;
create policy "submission_metrics_access_by_submission_visibility"
on public.submission_metrics
for select
to authenticated
using (
  exists (
    select 1
    from public.submissions submissions
    where submissions.id = submission_metrics.submission_id
      and (
        submissions.tester_id = (select auth.uid())
        or public.is_admin()
        or exists (
          select 1
          from public.tests tests
          where tests.id = submissions.test_id
            and tests.founder_id = (select auth.uid())
        )
      )
  )
);

drop policy if exists "submission_flags_access_by_submission_visibility" on public.submission_flags;
create policy "submission_flags_access_by_submission_visibility"
on public.submission_flags
for select
to authenticated
using (
  exists (
    select 1
    from public.submissions submissions
    where submissions.id = submission_flags.submission_id
      and (
        submissions.tester_id = (select auth.uid())
        or public.is_admin()
        or exists (
          select 1
          from public.tests tests
          where tests.id = submissions.test_id
            and tests.founder_id = (select auth.uid())
        )
      )
  )
);

drop policy if exists "events_access_by_submission_visibility" on public.events;
create policy "events_access_by_submission_visibility"
on public.events
for select
to authenticated
using (
  exists (
    select 1
    from public.submissions submissions
    where submissions.id = events.submission_id
      and (
        submissions.tester_id = (select auth.uid())
        or public.is_admin()
        or exists (
          select 1
          from public.tests tests
          where tests.id = submissions.test_id
            and tests.founder_id = (select auth.uid())
        )
      )
  )
);
