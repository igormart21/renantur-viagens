"use client";

import { usePathname } from "next/navigation";

/** Rotas onde o banner "Pronto para viver momentos inesquecíveis?" fica escondido
 *  (elas já têm um CTA próprio antes do rodapé). */
const HIDDEN_ON = ["/transfer"];
/** Prefixos de rota onde o banner fica escondido (ex.: páginas de detalhe do pacote). */
const HIDDEN_PREFIXES = ["/pacotes/"];

/** Banner decorativo acima do rodapé — clica e vai para o WhatsApp
 *  (o botão "Quero viajar!" faz parte da própria imagem). */
export function PreFooterBanner({ whatsapp }: { whatsapp: string }) {
  const pathname = usePathname();
  const hidden =
    HIDDEN_ON.includes(pathname) || HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));
  if (hidden) return null;

  return (
    <a
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="mt-12 block w-full transition-opacity hover:opacity-90"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/3960e9a5-2ff7-4128-b37f-2aac9d66d53b.png"
        alt="Renantur Viagens Banner"
        className="block h-auto max-h-[140px] w-full object-cover object-top md:max-h-[240px]"
      />
    </a>
  );
}
