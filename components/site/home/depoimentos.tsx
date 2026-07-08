import { Star } from "lucide-react";
import { Reveal } from "./reveal";

type Testimonial = { name: string; city: string; stars: number; text: string; photo: string };

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

const isPhoto = (url: string) => /^https?:\/\//.test(url.trim());

export const Depoimentos = ({ items }: { items: Testimonial[] }) => {
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
        {items.slice(0, 4).map((t, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                {isPhoto(t.photo) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.photo} alt={t.name} className="size-11 shrink-0 rounded-full object-cover" />
                ) : (
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-white"
                    aria-hidden
                  >
                    {initials(t.name)}
                  </span>
                )}
                <div>
                  <p className="font-display text-sm font-bold text-primary">{t.name}</p>
                  <p className="text-xs text-[#9aa3af]">{t.city}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: t.stars || 5 }).map((_, k) => (
                  <Star key={k} size={14} className="text-accent" fill="#F7941D" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">“{t.text}”</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
