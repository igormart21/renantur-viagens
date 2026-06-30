-- ============================================================
-- Cotações (solicitações de orçamento enviadas pelo site).
-- ============================================================
create table if not exists public.quotes (
  id           bigint generated always as identity primary key,
  name         text not null,
  email        text default '',
  phone        text default '',
  travel_when  text default '',
  package_id   bigint references public.packages(id) on delete set null,
  package_name text default '',
  message      text default '',
  status       text default 'novo',   -- novo | contatado | fechado | perdido
  created_at   timestamptz default now()
);

alter table public.quotes enable row level security;

-- Público (site) pode CRIAR cotações.
drop policy if exists "quotes_public_insert" on public.quotes;
create policy "quotes_public_insert" on public.quotes
  for insert to anon, authenticated with check (true);

-- Apenas autenticado (admin) lê / gerencia.
drop policy if exists "quotes_auth_select" on public.quotes;
create policy "quotes_auth_select" on public.quotes
  for select to authenticated using (true);

drop policy if exists "quotes_auth_update" on public.quotes;
create policy "quotes_auth_update" on public.quotes
  for update to authenticated using (true);

drop policy if exists "quotes_auth_delete" on public.quotes;
create policy "quotes_auth_delete" on public.quotes
  for delete to authenticated using (true);
