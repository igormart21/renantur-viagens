import { ShieldAlert } from "lucide-react";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FadeIn } from "@/components/admin/fade-in";
import { AddAgentForm } from "@/components/admin/add-agent-form";
import { AgentDeleteButton } from "@/components/admin/agent-delete-button";

export const dynamic = "force-dynamic";

function fmtDate(v: unknown) {
  if (!v) return "—";
  return new Date(String(v)).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function EquipePage() {
  const hasKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  // e-mail atual (para destacar "você" e impedir auto-remoção)
  let currentEmail = "";
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    currentEmail = data.user?.email ?? "";
  }

  let users: { id: string; email?: string; created_at: string; last_sign_in_at?: string | null; user_metadata?: Record<string, unknown> }[] = [];
  if (hasKey) {
    try {
      const svc = await createServiceClient();
      const { data } = await svc.auth.admin.listUsers();
      users = (data?.users ?? []) as typeof users;
    } catch {
      users = [];
    }
  }

  return (
    <FadeIn>
      <h1 className="font-display text-[34px] font-bold leading-none text-primary">Equipe</h1>
      <p className="mb-7 mt-2 text-sm text-muted-foreground">
        Agentes com acesso ao painel administrativo da Renantur.
      </p>

      {!hasKey ? (
        <Card className="border-amber-300/60 bg-amber-50">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <ShieldAlert className="size-5" />
            </div>
            <CardTitle className="text-base text-amber-900">Configuração necessária</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-amber-900/80">
            <p>
              Para adicionar e gerenciar agentes com segurança, é preciso configurar a chave secreta
              do Supabase (<strong>service role</strong>).
            </p>
            <ol className="ml-4 list-decimal space-y-1">
              <li>No Supabase: <strong>Project Settings → API → service_role (secret)</strong>.</li>
              <li>Adicione no arquivo <code>.env.local</code>: <code>SUPABASE_SERVICE_ROLE_KEY=sua-chave</code></li>
              <li>Reinicie o servidor. Esta página passa a permitir gerenciar a equipe.</li>
            </ol>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Adicionar novo agente</CardTitle>
              <p className="text-xs text-muted-foreground">
                O agente terá acesso completo ao painel e poderá fazer login com o e-mail e a senha definidos.
              </p>
            </CardHeader>
            <CardContent>
              <AddAgentForm />
            </CardContent>
          </Card>

          <Card className="overflow-hidden p-0">
            <div className="border-b bg-white px-5 py-4">
              <h2 className="font-display text-xl font-bold text-primary">Agentes</h2>
              <p className="text-xs text-muted-foreground">{users.length} com acesso</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs uppercase tracking-wide">Agente</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide">Criado em</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide">Último acesso</TableHead>
                  <TableHead className="w-16 text-right text-xs uppercase tracking-wide">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => {
                  const isMe = u.email === currentEmail;
                  const nome = String(u.user_metadata?.name ?? "");
                  return (
                    <TableRow key={u.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                            {(u.email ?? "?").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">
                              {u.email}{" "}
                              {isMe && <Badge variant="secondary" className="ml-1 align-middle">você</Badge>}
                            </p>
                            {nome && <p className="text-xs text-muted-foreground">{nome}</p>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{fmtDate(u.created_at)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {u.last_sign_in_at ? fmtDate(u.last_sign_in_at) : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {!isMe && <AgentDeleteButton userId={u.id} />}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}
    </FadeIn>
  );
}
