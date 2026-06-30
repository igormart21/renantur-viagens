-- ============================================================
-- Renantur Viagens — Schema inicial (Postgres / Supabase)
-- Conteúdo do site + clientes + contratos + configurações.
-- ============================================================

-- Trigger genérico de updated_at -----------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- CONTEÚDO DO SITE
-- ============================================================

-- Pacotes ----------------------------------------------------
create table if not exists public.packages (
  id            bigint generated always as identity primary key,
  name          text not null,
  flag          text default '',
  location      text default '',
  subtitle      text default '',
  includes      text default '',
  duration      text default '',
  type          text default '',
  img           text default '',
  category      text default 'Aéreos',     -- Aéreos | Rodoviários | Cruzeiros | Internacional
  tag           text default '',
  entry         text default '',
  installments  int  default 0,
  monthly       text default '',
  total         text default '',
  active        boolean default true,
  sort          int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Destinos ---------------------------------------------------
create table if not exists public.destinations (
  id          bigint generated always as identity primary key,
  slug        text unique not null,
  name        text not null,
  tagline     text default '',
  description text default '',
  hero        text default '',
  rating      numeric(2,1) default 5.0,
  highlights  text[] default '{}',
  temp        text default '',
  people      text default '',
  airport     text default '',
  region      text default '',           -- agrupamento no grid (ex.: Argentina)
  grid_img    text default '',
  grid_size   text default 'sm',         -- lg | sm
  active      boolean default true,
  sort        int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Circuitos --------------------------------------------------
create table if not exists public.circuits (
  id          bigint generated always as identity primary key,
  region      text default '',
  title       text not null,
  subtitle    text default '',
  description text default '',
  img         text default '',
  stops       text[] default '{}',
  days        text default '',
  price_from  text default '',
  accent      text default '#0F6D7A',
  active      boolean default true,
  sort        int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Depoimentos ------------------------------------------------
create table if not exists public.testimonials (
  id         bigint generated always as identity primary key,
  name       text not null,
  city       text default '',
  stars      int default 5,
  text       text default '',
  photo      text default '',
  active     boolean default true,
  sort       int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Galeria ----------------------------------------------------
create table if not exists public.gallery_photos (
  id         bigint generated always as identity primary key,
  url        text not null,
  size       text default 'medium',      -- large | medium | small
  active     boolean default true,
  sort       int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Categorias / serviços --------------------------------------
create table if not exists public.categories (
  id          bigint generated always as identity primary key,
  label       text default '',
  name        text not null,
  description text default '',
  img         text default '',
  href        text default '',
  accent      text default '#0F6D7A',
  active      boolean default true,
  sort        int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Serviços de transfer ---------------------------------------
create table if not exists public.transfer_services (
  id          bigint generated always as identity primary key,
  title       text not null,
  icon        text default 'Car',         -- nome do ícone lucide
  description text default '',
  active      boolean default true,
  sort        int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Slides do hero ---------------------------------------------
create table if not exists public.hero_slides (
  id         bigint generated always as identity primary key,
  img        text not null,
  headline   text default '',
  sub        text default '',
  place      text default '',
  active     boolean default true,
  sort       int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Cidades atendidas ------------------------------------------
create table if not exists public.cities (
  id         bigint generated always as identity primary key,
  name       text not null,
  sort       int default 0,
  created_at timestamptz default now()
);

-- Valores da empresa -----------------------------------------
create table if not exists public.company_values (
  id          bigint generated always as identity primary key,
  title       text not null,
  icon        text default 'Heart',
  description text default '',
  sort        int default 0,
  created_at  timestamptz default now()
);

-- Configurações do site (linha única) -----------------------
create table if not exists public.site_settings (
  id                 int primary key default 1,
  brand_name         text default 'Renantur',
  brand_tagline      text default 'Viagens & Turismo',
  whatsapp           text default '',
  phone              text default '',
  email              text default '',
  location           text default '',
  instagram          text default '',
  facebook           text default '',
  google_reviews_url text default '',
  about_title        text default '',
  about_text         text default '',
  updated_at         timestamptz default now(),
  constraint site_settings_singleton check (id = 1)
);

-- ============================================================
-- OPERAÇÃO (clientes / contratos)
-- ============================================================

create table if not exists public.clients (
  id         bigint generated always as identity primary key,
  name       text not null,
  email      text default '',
  phone      text default '',
  doc        text default '',            -- CPF/CNPJ
  birthdate  date,
  address    text default '',
  notes      text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.contracts (
  id           bigint generated always as identity primary key,
  client_id    bigint references public.clients(id) on delete set null,
  package_id   bigint references public.packages(id) on delete set null,
  title        text not null,
  total_value  numeric(12,2) default 0,
  entry_value  numeric(12,2) default 0,
  installments int default 1,
  status       text default 'rascunho',  -- rascunho | emitido | pago | cancelado
  travel_date  date,
  signed_at    date,
  notes        text default '',
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Triggers updated_at ----------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'packages','destinations','circuits','testimonials','gallery_photos',
    'categories','transfer_services','hero_slides','site_settings',
    'clients','contracts'
  ] loop
    execute format('drop trigger if exists set_updated_at on public.%I;', t);
    execute format('create trigger set_updated_at before update on public.%I
                    for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- ============================================================
-- RLS — leitura pública no conteúdo; escrita só autenticado.
-- clientes/contratos: somente autenticado (sem leitura pública).
-- ============================================================
do $$
declare t text;
begin
  -- Tabelas de conteúdo: leitura pública + escrita autenticada
  foreach t in array array[
    'packages','destinations','circuits','testimonials','gallery_photos',
    'categories','transfer_services','hero_slides','cities','company_values',
    'site_settings'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "public_read" on public.%I;', t);
    execute format('create policy "public_read" on public.%I for select using (true);', t);
    execute format('drop policy if exists "auth_write" on public.%I;', t);
    execute format('create policy "auth_write" on public.%I for all to authenticated using (true) with check (true);', t);
  end loop;

  -- Tabelas sensíveis: somente autenticado (todas as operações)
  foreach t in array array['clients','contracts'] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "auth_all" on public.%I;', t);
    execute format('create policy "auth_all" on public.%I for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- ============================================================
-- STORAGE — bucket público "images" (leitura pública, upload autenticado)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

drop policy if exists "images_public_read" on storage.objects;
create policy "images_public_read" on storage.objects
  for select using (bucket_id = 'images');

drop policy if exists "images_auth_write" on storage.objects;
create policy "images_auth_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'images');

drop policy if exists "images_auth_update" on storage.objects;
create policy "images_auth_update" on storage.objects
  for update to authenticated using (bucket_id = 'images');

drop policy if exists "images_auth_delete" on storage.objects;
create policy "images_auth_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'images');
