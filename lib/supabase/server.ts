import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Client Supabase para Server Components / Server Actions / Route Handlers.
 * Usa os cookies da requisição para manter a sessão autenticada.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Chamado de um Server Component: ignorável quando há middleware
          // de refresh de sessão configurado.
        }
      },
    },
  });
}

/**
 * Client com a service role key — ignora RLS. Use SOMENTE no servidor
 * para operações administrativas confiáveis (nunca exponha ao browser).
 */
export async function createServiceClient() {
  const cookieStore = await cookies();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  return createServerClient(SUPABASE_URL, serviceKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {},
    },
  });
}
