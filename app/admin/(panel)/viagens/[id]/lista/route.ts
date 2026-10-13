import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { boardingGroups } from "@/lib/admin/trip";
import { loadTripForPdf } from "@/lib/admin/trip-pdf-data";
import { GuidePdf, TransportPdf } from "@/lib/pdf/trip-pdf";
import { age } from "@/lib/age";

export const runtime = "nodejs";

const br = (d: string) => (d ? new Date(d + "T00:00:00").toLocaleDateString("pt-BR") : "");
/** CSV com ";" e BOM — abre com acentos e colunas separadas no Excel em português. */
const csv = (rows: unknown[][]) =>
  "﻿" + rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(";")).join("\r\n");

/** ?tipo=transportadora|guia &formato=pdf|csv &pendentes=1 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = new URL(req.url);
  const tipo = url.searchParams.get("tipo") === "guia" ? "guia" : "transportadora";
  const data = await loadTripForPdf(await createClient(), id, url.origin);
  if (!data) return new NextResponse("Viagem não encontrada", { status: 404 });
  const passengers = data.trip.passengers.filter((p) => url.searchParams.get("pendentes") === "1" || !p.pending);
  const groups = boardingGroups(passengers, data.trip.boardingOrder);
  const name = `${tipo === "guia" ? "lista-embarque" : "lista-passageiros"}-${id}`;

  if (url.searchParams.get("formato") === "csv") {
    const rows =
      tipo === "guia"
        ? [
            ["Ponto de embarque", "Passageiro", "Poltrona", "Telefone", "Contato", "Presença"],
            ...groups.flatMap(([place, list]) =>
              list.map((p) => [place, p.name, p.lap ? "Colo" : (p.seat ?? ""), p.phone, p.contact ? `Responsável: ${p.contact}` : "Próprio", ""]),
            ),
          ]
        : [
            ["Nº", "Nome completo", "CPF", "RG", "Órgão/UF", "Nascimento", "Idade", "Poltrona"],
            ...[...passengers]
              .sort((a, b) => (a.seat ?? 999) - (b.seat ?? 999))
              .map((p, i) => [i + 1, p.name, p.doc, p.rg, p.rg_issuer, br(p.birthdate), age(p.birthdate), p.lap ? "Colo" : (p.seat ?? "")]),
          ];
    return new NextResponse(csv(rows), {
      headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${name}.csv"` },
    });
  }

  const buffer = await renderToBuffer(
    tipo === "guia" ? GuidePdf({ ...data.header, groups }) : TransportPdf({ ...data.header, passengers }),
  );
  return new NextResponse(buffer as unknown as BodyInit, {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="${name}.pdf"` },
  });
}
