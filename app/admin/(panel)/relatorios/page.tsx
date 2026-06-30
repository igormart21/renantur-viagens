import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/admin/fade-in";
import {
  MonthlyContractsChart,
  StatusPieChart,
} from "@/components/admin/reports-charts";

function brl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function RelatoriosPage() {
  if (!isSupabaseConfigured) {
    return (
      <FadeIn>
        <h1 className="mb-2 font-display text-[34px] font-bold leading-none text-primary">Relatórios</h1>
        <p className="text-sm text-muted-foreground">Configure o Supabase para ver os relatórios.</p>
      </FadeIn>
    );
  }

  const supabase = await createClient();
  const [{ data: contracts }, { count: clientsCount }] = await Promise.all([
    supabase.from("contracts").select("status, total_value, created_at"),
    supabase.from("clients").select("*", { count: "exact", head: true }),
  ]);

  const list = contracts ?? [];

  // Receita (contratos pagos + emitidos)
  const revenue = list
    .filter((c) => ["pago", "emitido"].includes(String(c.status)))
    .reduce((sum, c) => sum + Number(c.total_value ?? 0), 0);
  const paidRevenue = list
    .filter((c) => String(c.status) === "pago")
    .reduce((sum, c) => sum + Number(c.total_value ?? 0), 0);

  // Por status
  const statusCounts = list.reduce<Record<string, number>>((acc, c) => {
    const s = String(c.status ?? "rascunho");
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  // Últimos 6 meses
  const now = new Date();
  const months: { key: string; month: string; contratos: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      month: d.toLocaleDateString("pt-BR", { month: "short" }),
      contratos: 0,
    });
  }
  for (const c of list) {
    if (!c.created_at) continue;
    const d = new Date(c.created_at as string);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const m = months.find((x) => x.key === key);
    if (m) m.contratos += 1;
  }

  const cards = [
    { label: "Receita (paga + emitida)", value: brl(revenue) },
    { label: "Receita confirmada (paga)", value: brl(paidRevenue) },
    { label: "Total de contratos", value: String(list.length) },
    { label: "Total de clientes", value: String(clientsCount ?? 0) },
  ];

  return (
    <FadeIn>
      <h1 className="font-display text-[34px] font-bold leading-none text-primary">Relatórios</h1>
      <p className="mb-7 mt-2 text-sm text-muted-foreground">Desempenho comercial da operação.</p>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Contratos por mês</CardTitle></CardHeader>
          <CardContent>
            <MonthlyContractsChart data={months.map(({ month, contratos }) => ({ month, contratos }))} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Contratos por status</CardTitle></CardHeader>
          <CardContent>
            {statusData.length ? (
              <StatusPieChart data={statusData} />
            ) : (
              <p className="text-sm text-muted-foreground">Sem dados ainda.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </FadeIn>
  );
}
