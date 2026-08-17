import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ItineraryPdf, type ItineraryPdfData, type ItineraryPdfDay } from "@/lib/pdf/itinerary-pdf";
import { DEFAULT_SETTINGS } from "@/lib/site-settings";

export const runtime = "nodejs";

function slugify(s: string) {
  return s
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!isSupabaseConfigured) {
    return new NextResponse("Pacote não encontrado", { status: 404 });
  }

  const supabase = await createClient();

  let { data: pkg } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!pkg) {
    const { data: candidates } = await supabase.from("packages").select("*").eq("active", true);
    pkg = (candidates ?? []).find((p) => slugify(String(p.name ?? "")) === slug) ?? null;
  }

  if (!pkg) {
    return new NextResponse("Pacote não encontrado", { status: 404 });
  }

  const { data: settingsRow } = await supabase
    .from("site_settings")
    .select("brand_name, brand_tagline, email, phone, whatsapp, location")
    .eq("id", 1)
    .maybeSingle();

  const settings = {
    brand_name: settingsRow?.brand_name || DEFAULT_SETTINGS.brand_name,
    brand_tagline: settingsRow?.brand_tagline || DEFAULT_SETTINGS.brand_tagline,
    email: settingsRow?.email || DEFAULT_SETTINGS.email,
    phone: settingsRow?.phone || DEFAULT_SETTINGS.phone,
    whatsapp: settingsRow?.whatsapp || DEFAULT_SETTINGS.whatsapp,
    location: settingsRow?.location || DEFAULT_SETTINGS.location,
  };

  const rawItinerary = Array.isArray(pkg.itinerary) ? (pkg.itinerary as ItineraryPdfDay[]) : [];
  const local = String(pkg.location ?? pkg.name ?? "");
  const includesPreview = String(pkg.includes ?? "")
    .split(/\s*\+\s*/)
    .map((x) => x.trim())
    .filter(Boolean);

  const itinerary: ItineraryPdfDay[] =
    rawItinerary.length > 0
      ? rawItinerary
      : [
          { day: "1º DIA", title: "Embarque e chegada", place: local, description: "Recepção, transfer e acomodação. Tempo para se ambientar e começar a viver o destino com tranquilidade." },
          { day: "DURANTE A VIAGEM", title: "Passeios e experiências", place: local, description: `Roteiro completo com ${includesPreview.slice(0, 3).join(", ").toLowerCase() || "os passeios inclusos"} e acompanhamento de guia, aproveitando o melhor de cada lugar.` },
          { day: "ÚLTIMO DIA", title: "Despedida e retorno", place: local, description: "Tempo livre para os últimos momentos e transfer de retorno, levando na bagagem memórias inesquecíveis." },
        ];

  const data: ItineraryPdfData = {
    pkg: {
      name: String(pkg.name ?? ""),
      location: String(pkg.location ?? ""),
      duration: String(pkg.duration ?? ""),
      includes: String(pkg.includes ?? ""),
      entry: String(pkg.entry ?? ""),
      installments: String(pkg.installments ?? ""),
      monthly: String(pkg.monthly ?? ""),
      total: String(pkg.total ?? ""),
    },
    itinerary,
    settings,
  };

  const buffer = await renderToBuffer(ItineraryPdf(data));

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="roteiro-${slug}.pdf"`,
    },
  });
}
