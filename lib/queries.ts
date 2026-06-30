import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Camada de leitura do site público.
 * Quando o Supabase não está configurado, retorna `null` e os componentes
 * usam seus dados estáticos padrão (mantendo o site idêntico ao original).
 * Quando configurado, retorna os registros ativos do banco.
 */
async function fetchActive(
  table: string,
  order = "sort",
): Promise<Record<string, unknown>[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = await createClient();
    let query = supabase.from(table).select("*");
    // Tabelas de conteúdo possuem a coluna "active"; cities/values não.
    if (!["cities", "company_values"].includes(table)) {
      query = query.eq("active", true);
    }
    const { data, error } = await query.order(order, { ascending: true });
    if (error || !data || data.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

export const getPackages = () => fetchActive("packages");
export const getCircuits = () => fetchActive("circuits");
export const getTestimonials = () => fetchActive("testimonials");
export const getGallery = () => fetchActive("gallery_photos");
export const getCategories = () => fetchActive("categories");
export const getTransferServices = () => fetchActive("transfer_services");
export const getHeroSlides = () => fetchActive("hero_slides");
export const getDestinations = () => fetchActive("destinations");
export const getCities = () => fetchActive("cities");
export const getCompanyValues = () => fetchActive("company_values");

export async function getDestinationBySlug(
  slug: string,
): Promise<Record<string, unknown> | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("destinations")
      .select("*")
      .eq("slug", slug)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getPackageBySlug(
  slug: string,
): Promise<Record<string, unknown> | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("packages")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    return data ?? null;
  } catch {
    return null;
  }
}

export async function getSettings(): Promise<Record<string, unknown> | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();
    return data ?? null;
  } catch {
    return null;
  }
}
