-- ============================================================
-- Vendas de pacotes: vagas, embarques, dependentes e passageiros.
-- ============================================================

-- Pacotes: vagas, saída e locais de embarque ----------------
alter table public.packages add column if not exists seats int not null default 64;
alter table public.packages add column if not exists seats_used int not null default 0; -- mantido pelo painel ao salvar vendas
alter table public.packages add column if not exists departure date;
alter table public.packages add column if not exists boarding_points jsonb not null default '[]'::jsonb; -- [{place, time}]
alter table public.packages drop constraint if exists packages_seats_check;
alter table public.packages add constraint packages_seats_check check (seats between 1 and 64);

-- Clientes: documento, endereço estruturado e dependentes ---
alter table public.clients add column if not exists rg text default '';
alter table public.clients add column if not exists rg_issuer text default '';
alter table public.clients add column if not exists cep text default '';
alter table public.clients add column if not exists street text default '';
alter table public.clients add column if not exists number text default '';
alter table public.clients add column if not exists complement text default '';
alter table public.clients add column if not exists district text default '';
alter table public.clients add column if not exists city text default '';
alter table public.clients add column if not exists uf text default '';
-- [{name, birthdate, rg, rg_issuer, doc, same_address, cep, street, number, complement, district, city, uf}]
alter table public.clients add column if not exists dependents jsonb not null default '[]'::jsonb;

-- Vendas (tabela contracts) ----------------------------------
alter table public.contracts add column if not exists how_heard text default '';
alter table public.contracts add column if not exists payment_method text default '';
-- [{name, doc, birthdate, seat, lap, boarding, price}]
alter table public.contracts add column if not exists passengers jsonb not null default '[]'::jsonb;

-- Empresa (voucher) -------------------------------------------
alter table public.site_settings add column if not exists cnpj text default '';
alter table public.site_settings add column if not exists address text default '';
alter table public.site_settings add column if not exists website text default '';
