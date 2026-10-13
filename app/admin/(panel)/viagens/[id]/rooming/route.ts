import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { loadTripForPdf } from "@/lib/admin/trip-pdf-data";
import { RoomingPdf } from "@/lib/pdf/trip-pdf";

export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await loadTripForPdf(await createClient(), id, new URL(req.url).origin);
  if (!data) return new NextResponse("Viagem não encontrada", { status: 404 });
  const buffer = await renderToBuffer(RoomingPdf({ ...data.header, rooms: data.trip.rooms, unassigned: data.trip.unassigned }));
  return new NextResponse(buffer as unknown as BodyInit, {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="rooming-list-${id}.pdf"` },
  });
}
