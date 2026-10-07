import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { VoucherPdf } from "@/lib/pdf/voucher-pdf";
import type { Passenger } from "@/components/admin/contract-form";

export const runtime = "nodejs";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: sale } = await supabase
    .from("contracts")
    .select("travel_date, passengers, clients(name), packages(name, location, highlights, includes, departure)")
    .eq("id", id)
    .single();
  if (!sale) return new NextResponse("Venda não encontrada", { status: 404 });
  const { data: s } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  const client = sale.clients as unknown as { name: string } | null;
  const pkg = sale.packages as unknown as Record<string, unknown> | null;
  const highlights = Array.isArray(pkg?.highlights) ? (pkg.highlights as string[]) : [];
  const whatsapp = String(s?.whatsapp ?? "").replace(/^https?:\/\/wa\.me\/(55)?/, "").replace(/\?.*$/, "");

  const buffer = await renderToBuffer(
    VoucherPdf({
      logoUrl: `${new URL(req.url).origin}/assets/renantur-logo.png`,
      company: {
        name: `${s?.brand_name || "Renantur"} ${s?.brand_tagline || "Viagens e Turismo"}`,
        address: String(s?.address || s?.location || ""),
        phone: String(s?.phone ?? ""),
        whatsapp,
        website: String(s?.website ?? ""),
        cnpj: String(s?.cnpj ?? ""),
      },
      responsible: client?.name ?? "—",
      destination: String(pkg?.name ?? "—"),
      departure: (sale.travel_date as string | null) ?? (pkg?.departure as string | null) ?? null,
      passengers: (Array.isArray(sale.passengers) ? sale.passengers : []) as Passenger[],
      includes: highlights.length ? highlights.join(", ") : String(pkg?.includes ?? ""),
    }),
  );

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="voucher-${id}.pdf"`,
    },
  });
}
