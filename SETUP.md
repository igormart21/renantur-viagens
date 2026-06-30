# Renantur Viagens — Plataforma (Site + Painel Admin)

Site institucional em **Next.js (App Router)** + painel administrativo com **Supabase**
(banco, autenticação e storage). O site público lê o conteúdo do banco; quando o Supabase
ainda não está configurado, usa os dados estáticos originais (o site nunca quebra).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind v4 + shadcn/ui (tema do painel)
- Supabase: Postgres + Auth (e-mail/senha) + Storage (bucket `images`)
- `@react-pdf/renderer` (PDF de contratos), `recharts` (relatórios), `framer-motion`

## Estrutura

```
app/(site)/        Site público (tema próprio em .theme-site, idêntico ao original)
app/admin/         Painel: /admin/login e /admin/(panel)/*
lib/supabase/      Clients (browser, server, middleware) + config
lib/admin/         Config das entidades + server actions (CRUD, auth, contratos)
lib/queries.ts     Leitura do site público (Supabase com fallback estático)
lib/pdf/           Documento PDF do contrato
supabase/migrations/  0001_init.sql (schema + RLS + storage), 0002_seed.sql (conteúdo)
```

## Passo a passo

### 1. Criar projeto no Supabase
1. Acesse https://supabase.com e crie um projeto (guarde a senha do banco).
2. Em **Project Settings → API**, copie: `Project URL`, `anon public` e `service_role`.

### 2. Configurar variáveis de ambiente
```bash
cp .env.local.example .env.local
```
Preencha em `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 3. Criar o schema e popular o conteúdo
No painel do Supabase → **SQL Editor**, rode na ordem:
1. Conteúdo de `supabase/migrations/0001_init.sql` (tabelas, RLS, bucket de imagens).
2. Conteúdo de `supabase/migrations/0002_seed.sql` (pacotes, destinos, depoimentos etc.).

### 4. Criar o usuário administrador
No Supabase → **Authentication → Users → Add user**: informe e-mail e senha.
(É com esse login que você acessa `/admin`.)

### 5. Rodar localmente
```bash
npm install
npm run dev
```
- Site: http://localhost:3000
- Painel: http://localhost:3000/admin (faça login)

### 6. Deploy (Vercel recomendado)
1. Suba o repositório para o GitHub.
2. Em https://vercel.com → New Project → importe o repo.
3. Em **Environment Variables**, configure as 3 variáveis do passo 2.
4. Deploy. (O Supabase já está na nuvem; nada a fazer além das migrações já rodadas.)

## O que o painel gerencia

- **Conteúdo do site:** pacotes, destinos, circuitos, depoimentos, galeria, categorias,
  transfer, slides do hero, cidades atendidas, valores da empresa — com **upload de imagem**.
- **Clientes:** cadastro completo.
- **Contratos:** vínculo cliente + pacote, status, valores, datas e **geração de PDF**.
- **Configurações do site:** WhatsApp, telefone, e-mail, redes sociais, textos institucionais.
- **Relatórios:** receita, contratos por mês/status, totais.

Edições no painel refletem no site público (revalidação automática).

## Backup do site original

O site Vite original está preservado em git: tag `vite-original` e branch
`vite-original-backup`.
