-- Fotos reais das avaliações do Google em cada depoimento --------
alter table public.testimonials add column if not exists photos text[] default '{}';
