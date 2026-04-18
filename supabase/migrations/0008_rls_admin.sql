alter table public.audit_logs enable row level security;
alter table public.admin_settings enable row level security;

drop policy if exists "audit_logs_admin_read" on public.audit_logs;
create policy "audit_logs_admin_read"
on public.audit_logs
for select
to authenticated
using (public.is_admin());

drop policy if exists "audit_logs_admin_write" on public.audit_logs;
create policy "audit_logs_admin_write"
on public.audit_logs
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "admin_settings_admin_read" on public.admin_settings;
create policy "admin_settings_admin_read"
on public.admin_settings
for select
to authenticated
using (public.is_admin());

drop policy if exists "admin_settings_super_write" on public.admin_settings;
create policy "admin_settings_super_write"
on public.admin_settings
for update
to authenticated
using (public.is_admin('super'))
with check (public.is_admin('super'));
