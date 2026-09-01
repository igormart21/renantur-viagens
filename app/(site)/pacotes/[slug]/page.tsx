import { notFound } from "next/navigation";
import { getPackageBySlug, getSettings, getTestimonials } from "@/lib/queries";
import { mergeSettings } from "@/lib/site-settings";
import { PackageDetail } from "@/components/site/PackageDetail";

export default async function PacoteDetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const settings = mergeSettings(await getSettings());
  const testimonialRows = await getTestimonials();

  const testimonials = (testimonialRows ?? []).map((t) => ({
    name: String((t as Record<string, unknown>).name ?? ""),
    city: String((t as Record<string, unknown>).city ?? ""),
    stars: Number((t as Record<string, unknown>).stars ?? 5),
    text: String((t as Record<string, unknown>).text ?? ""),
    photo: String((t as Record<string, unknown>).photo ?? ""),
  }));

  return <PackageDetail pkg={pkg} testimonials={testimonials} whatsapp={settings.whatsapp} />;
}
