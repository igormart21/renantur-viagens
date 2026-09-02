import { Reveal } from "./reveal";
import { TestimonialsWidget, type Testimonial } from "@/components/site/testimonials-widget";

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
      <Reveal>
        <TestimonialsWidget items={items} googleUrl={googleUrl} rating="5,0" count={78} />
      </Reveal>
    </section>
  );
};
