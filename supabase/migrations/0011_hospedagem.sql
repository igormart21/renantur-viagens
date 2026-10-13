-- Quartos da venda (rooming list). Passageiros apontam para o quarto pelo id.
alter table public.contracts add column if not exists rooms jsonb not null default '[]'::jsonb; -- [{id, type}]
notify pgrst, 'reload schema';
