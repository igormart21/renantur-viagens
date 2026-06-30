-- ============================================================
-- Páginas dedicadas por pacote — campos ricos de detalhe.
-- ============================================================

alter table public.packages add column if not exists slug text;
alter table public.packages add column if not exists description_long text default '';
alter table public.packages add column if not exists highlights text[] default '{}';
alter table public.packages add column if not exists gallery text[] default '{}';
alter table public.packages add column if not exists itinerary jsonb default '[]'::jsonb;
alter table public.packages add column if not exists faq jsonb default '[]'::jsonb;

-- Gera slug a partir do nome (sem acentos, minúsculo, hífens) para linhas sem slug.
update public.packages
set slug = trim(both '-' from regexp_replace(
  lower(translate(
    name,
    'áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ',
    'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC'
  )),
  '[^a-z0-9]+', '-', 'g'))
where slug is null or slug = '';

-- Desambigua slugs duplicados anexando o id.
update public.packages p
set slug = p.slug || '-' || p.id
where exists (
  select 1 from public.packages q
  where q.slug = p.slug and q.id < p.id
);

create unique index if not exists packages_slug_key on public.packages(slug);
