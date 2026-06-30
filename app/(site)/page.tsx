import type { ComponentProps } from "react";
import { Hero } from "@/components/site/Hero";
import { SearchSection } from "@/components/site/SearchSection";
import { CategorySection } from "@/components/site/CategorySection";
import { PackageSection } from "@/components/site/PackageSection";
import { RoadTripSection } from "@/components/site/RoadTripSection";
import { DestinationGrid } from "@/components/site/DestinationGrid";
import { WhyUsSection } from "@/components/site/WhyUsSection";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { PageFade } from "@/components/site/page-fade";
import {
  getCategories,
  getHeroSlides,
  getPackages,
  getTestimonials,
} from "@/lib/queries";

export default async function HomePage() {
  const [heroRows, packageRows, testimonialRows, categoryRows] = await Promise.all([
    getHeroSlides(),
    getPackages(),
    getTestimonials(),
    getCategories(),
  ]);

  const heroItems = (heroRows ?? undefined) as unknown as ComponentProps<typeof Hero>["items"];
  const packageItems = (packageRows ?? undefined) as unknown as ComponentProps<typeof PackageSection>["items"];
  const testimonialItems = (testimonialRows ?? undefined) as unknown as ComponentProps<typeof TestimonialsSection>["items"];
  // categorias: o componente usa `desc`, a tabela usa `description`
  const categoryItems = categoryRows
    ? (categoryRows.map((c) => ({ ...c, desc: c.description })) as unknown as ComponentProps<typeof CategorySection>["items"])
    : undefined;

  return (
    <PageFade>
      <Hero items={heroItems} />
      <SearchSection />
      <CategorySection items={categoryItems} />
      <PackageSection items={packageItems} />
      <RoadTripSection />
      <DestinationGrid />
      <WhyUsSection />
      <TestimonialsSection items={testimonialItems} />
    </PageFade>
  );
}
