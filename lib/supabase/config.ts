/**
 * Helpers de configuração do Supabase.
 * Permite que o site público funcione com dados estáticos (fallback)
 * enquanto as credenciais do Supabase ainda não foram configuradas.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  SUPABASE_URL.length > 0 &&
  SUPABASE_ANON_KEY.length > 0 &&
  !SUPABASE_URL.includes("SEU-PROJETO");
