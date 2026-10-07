-- Logo e termos do contrato editáveis em Configurações.
alter table public.site_settings add column if not exists logo_url text default '';
alter table public.site_settings add column if not exists contract_terms text default '';
notify pgrst, 'reload schema';
