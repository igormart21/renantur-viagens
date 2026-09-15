# Cadastro de pacotes

Requisitos extraídos de `VIDEO-2026-09-11-09-15-51.mp4`:

- Destino, introdução, serviços inclusos e não inclusos.
- Quantidade de dias e noites; seleção de cada dia para editar título, local e descrição.
- Seleção de várias fotos (incluindo 10 a 15 fotos), com otimização antes do upload.
- Valor à vista e parcelamento com ou sem entrada; quantidade e valor das parcelas.

Disponível em `/admin/pacotes/new` e na edição de pacotes. Os novos dados são exibidos na página pública e no PDF. Os cartões mostram os valores conforme a forma de pagamento cadastrada.

## Atualização do banco

Execute `supabase/migrations/0008_package_exclusions.sql` no SQL Editor do **mesmo projeto Supabase configurado em `.env.local`**, antes de utilizar o novo cadastro. A migração adiciona apenas `packages.exclusions`, com lista vazia como padrão, e pode ser executada novamente.

A migração foi executada pelo responsável pelo projeto. A disponibilidade de `packages.exclusions` foi confirmada pela API REST do Supabase, com resposta HTTP 200.

Os outros controles usam as colunas existentes: `duration`, `itinerary`, `gallery`, `entry`, `installments`, `monthly` e `total`. Durações antigas são preservadas até serem alteradas no formulário. URLs em branco são geradas a partir do nome. Erros de salvamento preservam o conteúdo preenchido.

## Verificação

- `npm run typecheck`
- `node --test tests/package-validation.test.mjs`
- `npm run build`

Também foram exercitados no navegador, com salvamento e armazenamento simulados: 8 dias/7 noites, alternância entre dias, 15 uploads, valores com/sem entrada, pagamento somente à vista, edição de pacote legado, erro sem perda dos campos e largura de celular. O PDF foi renderizado com os novos campos. A coluna necessária já está disponível no Supabase. O salvamento real com uma sessão administrativa ainda não foi verificado.
