import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "@/components/admin/lucide-icon";
import { FadeIn } from "@/components/admin/fade-in";

export const dynamic = "force-dynamic";

async function count(table: string): Promise<number> {
  try {
    const supabase = await createClient();
    const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

function brl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function fmtDate(v: unknown) {
  if (!v) return "";
  return new Date(String(v)).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  novo: "default",
  contatado: "outline",
  fechado: "secondary",
  perdido: "destructive",
  rascunho: "secondary",
  emitido: "outline",
  pago: "default",
  cancelado: "destructive",
};

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    return (
      <FadeIn className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Configure o Supabase</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Defina as credenciais em <code>.env.local</code> e rode as migrações para ativar o painel.
          </CardContent>
        </Card>
      </FadeIn>
    );
  }

  const supabase = await createClient();
  const [pacotes, destinos, depoimentos, clientes, contratos, cotacoes] = await Promise.all([
    count("packages"),
    count("destinations"),
    count("testimonials"),
    count("clients"),
    count("contracts"),
    count("quotes"),
  ]);

  const [{ data: recentQuotes }, { data: recentContracts }, { count: novas }] =
    await Promise.all([
      supabase.from("quotes").select("*").order("created_at", { ascending: false }).limit(5),
      supabase
        .from("contracts")
        .select("*, clients(name)")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase.from("quotes").select("*", { count: "exact", head: true }).eq("status", "novo"),
    ]);

  const novasCount = novas ?? 0;

  const cards = [
    { label: "Cotações", value: cotacoes, icon: "Inbox", href: "/admin/cotacoes", color: "bg-[#ff6b57]/15 text-[#ff6b57]" },
    { label: "Pacotes", value: pacotes, icon: "Luggage", href: "/admin/pacotes", color: "bg-primary/10 text-primary" },
    { label: "Destinos", value: destinos, icon: "MapPin", href: "/admin/destinos", color: "bg-primary/10 text-primary" },
    { label: "Depoimentos", value: depoimentos, icon: "MessageSquareQuote", href: "/admin/depoimentos", color: "bg-primary/10 text-primary" },
    { label: "Clientes", value: clientes, icon: "Users", href: "/admin/clientes", color: "bg-primary/10 text-primary" },
    { label: "Contratos", value: contratos, icon: "FileText", href: "/admin/contratos", color: "bg-primary/10 text-primary" },
  ];

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-[34px] font-bold leading-none text-primary">
              Olá, Renantur
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Visão geral da sua operação.</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/pacotes/new">
              <Plus className="mr-1.5 size-4" /> Novo pacote
            </Link>
          </Button>
        </div>
      </FadeIn>

      {/* Indicadores */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c, i) => (
          <FadeIn key={c.label} delay={i * 0.05}>
            <Link href={c.href}>
              <Card className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
                <CardContent className="p-4">
                  <div className={`mb-3 flex size-10 items-center justify-center rounded-xl ${c.color}`}>
                    <LucideIcon name={c.icon} className="size-5" />
                  </div>
                  <p className="text-3xl font-bold leading-none">{c.value}</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{c.label}</p>
                  {c.label === "Cotações" && novasCount > 0 && (
                    <span className="absolute right-3 top-3 flex h-5 items-center rounded-full bg-[#ff6b57] px-2 text-[10px] font-bold text-white">
                      {novasCount} nova(s)
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* Atividade recente */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.1}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Cotações recentes</CardTitle>
              <Link href="/admin/cotacoes" className="text-xs font-medium text-primary hover:underline">
                Ver todas
              </Link>
            </CardHeader>
            <CardContent className="space-y-1">
              {(recentQuotes ?? []).length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">Nenhuma cotação ainda.</p>
              ) : (
                (recentQuotes ?? []).map((q) => (
                  <div
                    key={String(q.id)}
                    className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{String(q.name)}</p>
                      <p className="truncate text-xs text-muted-foreground">{String(q.package_name)}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge variant={STATUS_VARIANT[String(q.status)] ?? "secondary"}>{String(q.status)}</Badge>
                      <span className="text-xs text-muted-foreground">{fmtDate(q.created_at)}</span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Contratos recentes</CardTitle>
              <Link href="/admin/contratos" className="text-xs font-medium text-primary hover:underline">
                Ver todos
              </Link>
            </CardHeader>
            <CardContent className="space-y-1">
              {(recentContracts ?? []).length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">Nenhum contrato ainda.</p>
              ) : (
                (recentContracts ?? []).map((c) => {
                  const client = c.clients as { name?: string } | null;
                  return (
                    <div
                      key={String(c.id)}
                      className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-muted/60"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{String(c.title)}</p>
                        <p className="truncate text-xs text-muted-foreground">{client?.name ?? "—"}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-sm font-semibold">{brl(Number(c.total_value ?? 0))}</span>
                        <Badge variant={STATUS_VARIANT[String(c.status)] ?? "secondary"}>{String(c.status)}</Badge>
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
