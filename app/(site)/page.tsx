import { Hero } from "@/components/site/home/hero";
import { Categorias } from "@/components/site/home/categorias";
import { ProximasViagens } from "@/components/site/home/proximas-viagens";
import { Embarques } from "@/components/site/home/embarques";
import { Depoimentos } from "@/components/site/home/depoimentos";
import { InstagramRow } from "@/components/site/home/instagram";
import { CtaFinal } from "@/components/site/home/cta-final";
import { PageFade } from "@/components/site/page-fade";
import {
  getPackages,
  getTestimonials,
  getGallery,
  getSettings,
  getHeroSlides,
} from "@/lib/queries";
import { mergeSettings } from "@/lib/site-settings";

export default async function HomePage() {
  const [packageRows, testimonialRows, galleryRows, settingsRow, heroRows] = await Promise.all([
    getPackages(),
    getTestimonials(),
    getGallery(),
    getSettings(),
    getHeroSlides(),
  ]);
  const settings = mergeSettings(settingsRow);
  const heroSlides = (heroRows ?? [])
    .map((h) => String((h as Record<string, unknown>).img ?? ""))
    .filter(Boolean);

  const packages = (packageRows ?? []) as Record<string, unknown>[];
  const testimonials = (testimonialRows ?? []).map((t) => ({
    name: String((t as Record<string, unknown>).name ?? ""),
    city: String((t as Record<string, unknown>).city ?? ""),
    stars: Number((t as Record<string, unknown>).stars ?? 5),
    text: String((t as Record<string, unknown>).text ?? ""),
    photo: String((t as Record<string, unknown>).photo ?? ""),
  }));
  const photos = (galleryRows ?? []).map((g) => String((g as Record<string, unknown>).url ?? ""));

  return (
    <PageFade>
      <Hero settings={settings} slides={heroSlides} />
      <Categorias />
      {packages.length > 0 && <ProximasViagens items={packages} />}
      <Embarques />
      <Depoimentos items={testimonials} />
      <InstagramRow photos={photos} url={settings.instagram} />
      <CtaFinal settings={settings} />
    </PageFade>
  );
}
