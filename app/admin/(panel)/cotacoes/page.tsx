import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteRowActions } from "@/components/admin/quote-row-actions";
import { FadeIn } from "@/components/admin/fade-in";

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  novo: "default",
  contatado: "outline",
  fechado: "secondary",
  perdido: "destructive",
};

function fmtDate(v: unknown) {
  if (!v) return "—";
  return new Date(String(v)).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const dynamic = "force-dynamic";

export default async function CotacoesPage() {
  let rows: Record<string, unknown>[] = [];
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });
    rows = data ?? [];
  }

  const novas = rows.filter((r) => String(r.status) === "novo").length;

  return (
    <FadeIn>
      <div className="mb-6">
        <h1 className="font-display text-[34px] font-bold leading-none text-primary">Cotações</h1>
        <p className="text-sm text-muted-foreground">
          Solicitações de orçamento enviadas pelo site · {rows.length} no total
          {novas > 0 && <> · <span className="font-semibold text-primary">{novas} nova(s)</span></>}
        </p>
      </div>

      {!isSupabaseConfigured ? (
        <p className="text-sm text-muted-foreground">Configure o Supabase para ver as cotações.</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma cotação ainda. Quando um visitante preencher o formulário de um pacote, a
          solicitação aparece aqui.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Pacote</TableHead>
                <TableHead>Quando</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-40 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => {
                const status = String(row.status ?? "novo");
                return (
                  <TableRow key={String(row.id)}>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {fmtDate(row.created_at)}
                    </TableCell>
                    <TableCell className="font-medium">{String(row.name ?? "")}</TableCell>
                    <TableCell className="text-sm">
                      <div>{String(row.phone ?? "")}</div>
                      <div className="text-xs text-muted-foreground">{String(row.email ?? "")}</div>
                    </TableCell>
                    <TableCell className="text-sm">{String(row.package_name ?? "—")}</TableCell>
                    <TableCell className="text-sm">{String(row.travel_when ?? "—") || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[status] ?? "secondary"}>{status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button asChild variant="ghost" size="icon" className="size-8" title="Ver detalhes">
                          <Link href={`/admin/cotacoes/${row.id}`}>
                            <Eye className="size-4" />
                          </Link>
                        </Button>
                        <QuoteRowActions id={Number(row.id)} status={status} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </FadeIn>
  );
}
