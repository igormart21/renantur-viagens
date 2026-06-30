import { notFound } from "next/navigation";
import { getPackageBySlug, getTestimonials } from "@/lib/queries";
import { PackageDetail } from "@/components/site/PackageDetail";

export default async function PacoteDetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const testimonialRows = await getTestimonials();

  const testimonials = (testimonialRows ?? []).map((t) => ({
    name: String((t as Record<string, unknown>).name ?? ""),
    city: String((t as Record<string, unknown>).city ?? ""),
    stars: Number((t as Record<string, unknown>).stars ?? 5),
    text: String((t as Record<string, unknown>).text ?? ""),
    photo: String((t as Record<string, unknown>).photo ?? ""),
  }));

  return <PackageDetail pkg={pkg} testimonials={testimonials} />;
}
