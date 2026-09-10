-- Galeria de fotos da página de Transfer -----------------------
create table if not exists public.transfer_gallery (
  id         bigint generated always as identity primary key,
  url        text not null,
  caption    text default '',
  active     boolean default true,
  sort       int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.transfer_gallery enable row level security;
drop policy if exists "public_read" on public.transfer_gallery;
create policy "public_read" on public.transfer_gallery for select using (true);
drop policy if exists "auth_write" on public.transfer_gallery;
create policy "auth_write" on public.transfer_gallery for all to authenticated using (true) with check (true);

drop trigger if exists set_updated_at on public.transfer_gallery;
create trigger set_updated_at before update on public.transfer_gallery
  for each row execute function public.set_updated_at();

-- Fotos iniciais (troque pelas suas no painel: Admin -> Transfer - Galeria)
insert into public.transfer_gallery (url, caption, sort) values
('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200', 'Frota executiva', 1),
('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200', 'Conforto a bordo', 2),
('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1200', 'Viagens executivas', 3);
