-- Itens não inclusos no pacote. Os demais controles usam as colunas existentes.
alter table public.packages
  add column if not exists exclusions text[] not null default '{}';
