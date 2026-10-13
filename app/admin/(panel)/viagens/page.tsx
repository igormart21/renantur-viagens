import Link from "next/link";
import { BedDouble, Bus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FadeIn } from "@/components/admin/fade-in";

const date = (d: unknown) => (d ? new Date(String(d) + "T00:00:00").toLocaleDateString("pt-BR") : "—");

export default async function ViagensPage() {
  let rows: Record<string, unknown>[] = [];
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("packages")
      .select("id, name, departure, seats, seats_used")
      .gt("seats_used", 0)
      .order("departure", { ascending: true, nullsFirst: false });
    rows = data ?? [];
  }

  return (
    <FadeIn>
      <div className="mb-6">
        <h1 className="font-display text-[34px] font-bold leading-none text-primary">Viagens</h1>
        <p className="text-sm text-muted-foreground">Rooming list para o hotel, lista para a transportadora e lista de embarque do guia.</p>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma viagem com passageiros vendidos ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pacote</TableHead>
                <TableHead>Saída</TableHead>
                <TableHead>Passageiros</TableHead>
                <TableHead className="text-right">Listas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={String(r.id)}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/viagens/${r.id}`} className="hover:underline">{String(r.name)}</Link>
                  </TableCell>
                  <TableCell>{date(r.departure)}</TableCell>
                  <TableCell>{String(r.seats_used)}/{String(r.seats)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/viagens/${r.id}`}><BedDouble className="size-4" /> Rooming list</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <a href={`/admin/viagens/${r.id}/lista?tipo=transportadora`} target="_blank" rel="noopener noreferrer"><Bus className="size-4" /> Lista transportadora</a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </FadeIn>
  );
}
