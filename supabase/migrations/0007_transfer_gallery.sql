-- Galerias de fotos da página de Transfer ---------------------
-- transfer_gallery: seção "Transfer Executivo"
-- bus_gallery:      seção "Aluguel de Ônibus, Van e Micro-ônibus"

create table if not exists public.transfer_gallery (
  id         bigint generated always as identity primary key,
  url        text not null,
  caption    text default '',
  active     boolean default true,
  sort       int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.bus_gallery (
  id         bigint generated always as identity primary key,
  url        text not null,
  caption    text default '',
  active     boolean default true,
  sort       int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

do $$
declare t text;
begin
  foreach t in array array['transfer_gallery', 'bus_gallery'] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "public_read" on public.%I;', t);
    execute format('create policy "public_read" on public.%I for select using (true);', t);
    execute format('drop policy if exists "auth_write" on public.%I;', t);
    execute format('create policy "auth_write" on public.%I for all to authenticated using (true) with check (true);', t);
    execute format('drop trigger if exists set_updated_at on public.%I;', t);
    execute format('create trigger set_updated_at before update on public.%I
                    for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- Fotos iniciais (troque pelas suas no painel Admin)
insert into public.transfer_gallery (url, caption, sort) values
('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200', 'Frota executiva', 1),
('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200', 'Conforto a bordo', 2),
('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1200', 'Viagens executivas', 3);

insert into public.bus_gallery (url, caption, sort) values
('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200', 'Ônibus executivo', 1),
('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1200', 'Micro-ônibus', 2),
('https://images.unsplash.com/photo-1556122071-e404eaedb77f?auto=format&fit=crop&q=80&w=1200', 'Van executiva', 3);
