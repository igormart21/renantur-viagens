import type { SupabaseClient } from "@supabase/supabase-js";
import { loadTrip } from "./trip";

/** Viagem + cabeçalho comum dos PDFs (logo, empresa). */
export async function loadTripForPdf(supabase: SupabaseClient, id: string, origin: string) {
  const [trip, { data: s }] = await Promise.all([
    loadTrip(supabase, id),
    supabase.from("site_settings").select("brand_name, brand_tagline, logo_url").eq("id", 1).single(),
  ]);
  if (!trip) return null;
  return {
    trip,
    header: {
      logoUrl: s?.logo_url || `${origin}/assets/renantur-logo.png`,
      company: `${s?.brand_name || "Renantur"} ${s?.brand_tagline || "Viagens e Turismo"}`,
      pkgName: String(trip.pkg.name),
      departure: trip.departure,
    },
  };
}
