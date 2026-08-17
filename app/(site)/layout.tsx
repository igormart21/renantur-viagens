import { Suspense } from "react";
import { Navbar } from "@/components/site/home/navbar";
import { Footer } from "@/components/site/home/footer";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
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
      
      {/* Banner decorativo acima do rodapé */}
      <div className="w-full mt-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/3960e9a5-2ff7-4128-b37f-2aac9d66d53b.png"
          alt="Renantur Viagens Banner"
          className="w-full h-auto max-h-[140px] md:max-h-[240px] object-cover object-top block"
        />
      </div>

      <Footer settings={settings} />
    </div>
  );
}
