import { Suspense } from "react";
import { Navbar } from "@/components/site/home/navbar";
import { Footer } from "@/components/site/home/footer";
import { PreFooterBanner } from "@/components/site/pre-footer-banner";
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

      <Suspense fallback={null}>
        <PreFooterBanner whatsapp={settings.whatsapp} />
      </Suspense>

      <Footer settings={settings} />
    </div>
  );
}
