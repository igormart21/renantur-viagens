import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { ContractPdf, type ContractPdfData } from "@/lib/pdf/contract-pdf";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: contract } = await supabase
    .from("contracts")
    .select("*")
    .eq("id", id)
    .single();

  if (!contract) {
    return new NextResponse("Contrato não encontrado", { status: 404 });
  }

  const [{ data: client }, { data: pkg }, { data: settings }] = await Promise.all([
    contract.client_id
      ? supabase.from("clients").select("name, email, phone, doc, address").eq("id", contract.client_id).single()
      : Promise.resolve({ data: null }),
    contract.package_id
      ? supabase.from("packages").select("name, location, duration, includes").eq("id", contract.package_id).single()
      : Promise.resolve({ data: null }),
    supabase.from("site_settings").select("brand_name, brand_tagline, email, phone, location").eq("id", 1).single(),
  ]);

  const data: ContractPdfData = {
    contract: {
      id: contract.id,
      title: contract.title ?? "",
      total_value: Number(contract.total_value ?? 0),
      entry_value: Number(contract.entry_value ?? 0),
      installments: Number(contract.installments ?? 1),
      status: contract.status ?? "rascunho",
      travel_date: contract.travel_date ?? null,
      signed_at: contract.signed_at ?? null,
      notes: contract.notes ?? "",
    },
    client: client as ContractPdfData["client"],
    pkg: pkg as ContractPdfData["pkg"],
    settings: (settings as ContractPdfData["settings"]) ?? {
      brand_name: "Renantur",
      brand_tagline: "Viagens & Turismo",
      email: "",
      phone: "",
      location: "",
    },
  };

  const buffer = await renderToBuffer(ContractPdf(data));

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="contrato-${contract.id}.pdf"`,
    },
  });
}
