import Link from "next/link";
import { Plus, Pencil, FileDown, Ticket, MessageCircle, Mail } from "lucide-react";
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

function shareText(name: string, pkg: string, date: unknown) {
  const when = date ? ` com saída em ${new Date(String(date) + "T00:00:00").toLocaleDateString("pt-BR")}` : "";
  return `Olá, ${name}! Segue em anexo o voucher da sua viagem para ${pkg}${when}. Qualquer dúvida, estamos à disposição. Renantur Viagens`;
}

function whatsappHref(phone: string, text: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

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
      .select("*, clients(name, phone, email), packages(name)")
      .order("created_at", { ascending: false });
    rows = data ?? [];
  }

  return (
    <FadeIn>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[34px] font-bold leading-none text-primary">Vendas de pacotes</h1>
          <p className="text-sm text-muted-foreground">{rows.length} venda(s)</p>
        </div>
        <Button asChild>
          <Link href="/admin/contratos/new">
            <Plus className="mr-2 size-4" />
            Nova venda
          </Link>
        </Button>
      </div>

      {!isSupabaseConfigured ? (
        <p className="text-sm text-muted-foreground">Configure o Supabase para gerenciar vendas.</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma venda ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Pacote</TableHead>
                <TableHead>Passageiros</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-56 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => {
                const client = row.clients as { name?: string; phone?: string; email?: string } | null;
                const pkg = row.packages as { name?: string } | null;
                const status = String(row.status ?? "rascunho");
                const text = shareText(client?.name ?? "", pkg?.name ?? "", row.travel_date);
                return (
                  <TableRow key={String(row.id)}>
                    <TableCell className="font-medium">{String(row.id)}</TableCell>
                    <TableCell>{client?.name ?? "—"}</TableCell>
                    <TableCell>{pkg?.name ?? "—"}</TableCell>
                    <TableCell>{Array.isArray(row.passengers) ? row.passengers.length : 0}</TableCell>
                    <TableCell>{brl(row.total_value)}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[status] ?? "secondary"}>{status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button asChild variant="ghost" size="icon" title="Voucher (PDF)">
                          <a href={`/admin/contratos/${row.id}/voucher`} target="_blank" rel="noopener noreferrer">
                            <Ticket className="size-4" />
                          </a>
                        </Button>
                        {client?.phone && (
                          <Button asChild variant="ghost" size="icon" title="Enviar pelo WhatsApp">
                            <a href={whatsappHref(client.phone, text)} target="_blank" rel="noopener noreferrer">
                              <MessageCircle className="size-4" />
                            </a>
                          </Button>
                        )}
                        {client?.email && (
                          <Button asChild variant="ghost" size="icon" title="Enviar por e-mail">
                            <a href={`mailto:${client.email}?subject=${encodeURIComponent(`Voucher da viagem - ${pkg?.name ?? ""}`)}&body=${encodeURIComponent(text)}`}>
                              <Mail className="size-4" />
                            </a>
                          </Button>
                        )}
                        <Button asChild variant="ghost" size="icon" title="Contrato (PDF)">
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
