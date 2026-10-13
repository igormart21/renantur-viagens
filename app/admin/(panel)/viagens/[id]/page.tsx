import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, FileDown, FileSpreadsheet, TriangleAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { loadTrip, missingData } from "@/lib/admin/trip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/admin/fade-in";
import { RoomingBoard } from "@/components/admin/rooming-board";

export default async function ViagemPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ pendentes?: string }>;
}) {
  const { id } = await params;
  const withPending = (await searchParams).pendentes === "1";
  if (!isSupabaseConfigured) notFound();
  const trip = await loadTrip(await createClient(), id);
  if (!trip) notFound();
  const { pkg, departure, passengers, rooms, unassigned, freeBeds } = trip;
  const listed = passengers.filter((p) => withPending || !p.pending);
  const missing = missingData(listed);
  const pendingCount = passengers.filter((p) => p.pending).length;
  const byType = Object.entries(rooms.reduce<Record<string, number>>((a, r) => ({ ...a, [r.type]: (a[r.type] ?? 0) + 1 }), {}));
  const q = withPending ? "&pendentes=1" : "";

  const stats = [
    [`${passengers.length} passageiros`, `${passengers.length - unassigned.length} acomodados`],
    [`${unassigned.length} pendente${unassigned.length === 1 ? "" : "s"} de quarto`, `${freeBeds} vaga(s) em quarto`],
    [`${rooms.length} quartos`, byType.map(([t, n]) => `${n} ${t}`).join(" + ") || "—"],
  ];

  return (
    <FadeIn className="mx-auto max-w-5xl space-y-6">
      <Link href="/admin/viagens" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
        <ChevronLeft className="size-4" /> Viagens
      </Link>
      <div>
        <h1 className="font-display text-[34px] font-bold leading-none text-primary">{String(pkg.name)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Saída {departure ? new Date(departure + "T00:00:00").toLocaleDateString("pt-BR") : "—"}
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">Rooming list (hotel)</CardTitle>
          <Button asChild variant="outline" size="sm">
            <a href={`/admin/viagens/${id}/rooming`} target="_blank" rel="noopener noreferrer"><FileDown className="size-4" /> Rooming list (PDF)</a>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map(([a, b]) => (
              <div key={a} className="rounded-xl bg-muted/40 p-3">
                <p className="font-semibold">{a}</p>
                <p className="text-xs text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
          <RoomingBoard rooms={rooms} unassigned={unassigned} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Listas de passageiros e embarque</CardTitle>
          <p className="text-sm text-muted-foreground">
            {listed.length} passageiro(s) na lista
            {pendingCount > 0 && (
              <>
                {" "}· {pendingCount} em reservas pendentes (rascunho){" "}
                <Link className="font-medium text-primary underline" href={withPending ? `/admin/viagens/${id}` : `/admin/viagens/${id}?pendentes=1`}>
                  {withPending ? "Não incluir pendentes" : "Incluir pendentes"}
                </Link>
              </>
            )}
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {([
            ["transportadora", "Lista para a transportadora", "Nome, CPF, RG, órgão/UF, nascimento e poltrona.", missing.transport],
            ["guia", "Lista de embarque do guia", "Por ponto de embarque, com telefone, poltrona e quadrado de presença.", missing.guide],
          ] as const).map(([tipo, title, desc, warnings]) => (
            <div key={tipo} className="space-y-3 rounded-xl border p-4">
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <a href={`/admin/viagens/${id}/lista?tipo=${tipo}${q}`} target="_blank" rel="noopener noreferrer"><FileDown className="size-4" /> PDF / imprimir</a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={`/admin/viagens/${id}/lista?tipo=${tipo}&formato=csv${q}`}><FileSpreadsheet className="size-4" /> Excel</a>
                </Button>
              </div>
              {warnings.length > 0 && (
                <div className="rounded-lg bg-amber-50 p-3 text-xs dark:bg-amber-950/30">
                  <p className="mb-1 flex items-center gap-1 font-semibold"><TriangleAlert className="size-3.5" /> Dados faltantes</p>
                  <ul className="list-disc space-y-0.5 pl-4">{warnings.map((w) => <li key={w}>{w}</li>)}</ul>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </FadeIn>
  );
}
