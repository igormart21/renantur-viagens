import { Star } from "lucide-react";
import { Reveal } from "./reveal";
import { TestimonialCard, type Testimonial } from "@/components/site/testimonial-card";

export const Depoimentos = ({
  items,
  googleUrl,
}: {
  items: Testimonial[];
  googleUrl?: string;
}) => {
  if (!items.length) return null;
  return (
    <section className="container mx-auto px-5 py-16 xl:px-10">
      <div className="mb-8 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">Depoimentos</p>
        <h2 className="mt-1 font-display text-3xl font-bold text-primary md:text-4xl">
          Histórias reais de quem <span className="text-accent">viaja com a gente!</span>
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.slice(0, 8).map((t, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <TestimonialCard t={t} />
          </Reveal>
        ))}
      </div>
      {googleUrl && (
        <div className="mt-10 text-center">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <Star size={16} className="text-accent" fill="#F7941D" />
            Ver todas as avaliações no Google
          </a>
        </div>
      )}
    </section>
  );
};
