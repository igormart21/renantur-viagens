import Link from "next/link";
import { Plus, Pencil, FileDown } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContractDeleteButton } from "@/components/admin/contract-delete-button";
import { FadeIn } from "@/components/admin/fade-in";

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  rascunho: "secondary",
  emitido: "outline",
  pago: "default",
  cancelado: "destructive",
};

function brl(v: unknown) {
  const n = Number(v ?? 0);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ContratosPage() {
  let rows: Record<string, unknown>[] = [];
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("contracts")
      .select("*, clients(name), packages(name)")
      .order("created_at", { ascending: false });
    rows = data ?? [];
  }

  return (
    <FadeIn>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[34px] font-bold leading-none text-primary">Contratos</h1>
          <p className="text-sm text-muted-foreground">{rows.length} contrato(s)</p>
        </div>
        <Button asChild>
          <Link href="/admin/contratos/new">
            <Plus className="mr-2 size-4" />
            Novo contrato
          </Link>
        </Button>
      </div>

      {!isSupabaseConfigured ? (
        <p className="text-sm text-muted-foreground">Configure o Supabase para gerenciar contratos.</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum contrato ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Pacote</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-32 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => {
                const client = row.clients as { name?: string } | null;
                const pkg = row.packages as { name?: string } | null;
                const status = String(row.status ?? "rascunho");
                return (
                  <TableRow key={String(row.id)}>
                    <TableCell className="font-medium">{String(row.title ?? "")}</TableCell>
                    <TableCell>{client?.name ?? "—"}</TableCell>
                    <TableCell>{pkg?.name ?? "—"}</TableCell>
                    <TableCell>{brl(row.total_value)}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[status] ?? "secondary"}>{status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button asChild variant="ghost" size="icon" title="Gerar PDF">
                          <a href={`/admin/contratos/${row.id}/pdf`} target="_blank" rel="noopener noreferrer">
                            <FileDown className="size-4" />
                          </a>
                        </Button>
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/admin/contratos/${row.id}/edit`}>
                            <Pencil className="size-4" />
                          </Link>
                        </Button>
                        <ContractDeleteButton id={Number(row.id)} />
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
