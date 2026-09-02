import { Suspense } from "react";
import { Navbar } from "@/components/site/home/navbar";
import { Footer } from "@/components/site/home/footer";
import { getSettings } from "@/lib/queries";
import { mergeSettings } from "@/lib/site-settings";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = mergeSettings(await getSettings());

  return (
    <div className="theme-site relative overflow-x-hidden">
      <Suspense fallback={null}>
        <Navbar settings={settings} />
      </Suspense>
      {children}
      
      {/* Banner decorativo acima do rodapé — leva para o WhatsApp (tem o botão "Quero viajar!" desenhado na imagem) */}
      <a
        href={settings.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="mt-12 block w-full transition-opacity hover:opacity-90"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/3960e9a5-2ff7-4128-b37f-2aac9d66d53b.png"
          alt="Renantur Viagens Banner"
          className="w-full h-auto max-h-[140px] md:max-h-[240px] object-cover object-top block"
        />
      </a>

      <Footer settings={settings} />
    </div>
  );
}
