/**
 * Tipo e valores padrão das configurações do site.
 * Os defaults são exatamente os valores originais hardcoded — assim, sem
 * Supabase, o site renderiza idêntico; com Supabase, sobrescreve via admin.
 */
export type SiteSettings = {
  brand_name: string;
  brand_tagline: string;
  whatsapp: string;
  phone: string;
  email: string;
  location: string;
  instagram: string;
  facebook: string;
  google_reviews_url: string;
  about_title: string;
  about_text: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  brand_name: "Renantur",
  brand_tagline: "Viagens & Turismo",
  whatsapp: "https://wa.me/55",
  phone: "(24) 99999-9999",
  email: "contato@renantur.com.br",
  location: "Sul Fluminense, RJ",
  instagram: "#",
  facebook: "#",
  google_reviews_url: "https://share.google/JXGU2F8MGWyswp9ln",
  about_title: "Especialistas em curadoria de destinos.",
  about_text: "",
};

/** Mescla os dados do banco (parciais) com os defaults. */
export function mergeSettings(
  data: Record<string, unknown> | null,
): SiteSettings {
  if (!data) return DEFAULT_SETTINGS;
  const out = { ...DEFAULT_SETTINGS };
  for (const key of Object.keys(DEFAULT_SETTINGS) as (keyof SiteSettings)[]) {
    const v = data[key];
    if (v !== null && v !== undefined && v !== "") {
      out[key] = String(v);
    }
  }
  return out;
}

export const DEFAULT_CITIES = [
  "Volta Redonda", "Barra Mansa", "Quatis", "Floriano", "Porto Real",
  "Resende", "Piraí", "Barra do Piraí", "Rio de Janeiro", "Seropédica",
  "Queimados", "Nova Iguaçu", "São João de Meriti",
];
