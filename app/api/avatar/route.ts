import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Hosts permitidos para o proxy — evita virar um proxy aberto.
const ALLOWED_HOSTS = new Set(["lh3.googleusercontent.com"]);

/**
 * Proxy de avatar: as fotos de perfil do Google (lh3.googleusercontent.com/a/...)
 * bloqueiam requisições de terceiros quando o navegador envia o header
 * `Referer` (proteção de privacidade do Google — retorna 429). Como uma
 * requisição feita pelo nosso servidor não carrega o Referer do visitante,
 * buscamos a imagem aqui e a servimos a partir do nosso próprio domínio.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("u");
  if (!target) return new NextResponse("Missing url", { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }
  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return new NextResponse("Host not allowed", { status: 403 });
  }

  try {
    const upstream = await fetch(parsed.toString(), {
      headers: { "User-Agent": "Mozilla/5.0" },
      referrerPolicy: "no-referrer",
    });
    if (!upstream.ok) {
      return new NextResponse("Upstream error", { status: 502 });
    }
    const buffer = await upstream.arrayBuffer();
    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return new NextResponse("Fetch failed", { status: 502 });
  }
}
