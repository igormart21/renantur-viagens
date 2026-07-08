import { Users, Bus, Globe, Star } from "lucide-react";
import { Reveal } from "./reveal";

const STATS = [
  { icon: Users, n: "+5.000", l: "Passageiros atendidos" },
  { icon: Bus, n: "+250", l: "Excursões realizadas" },
  { icon: Globe, n: "+30", l: "Destinos nacionais e internacionais" },
  { icon: Star, n: "98%", l: "de satisfação dos nossos clientes" },
];

export const Stats = () => {
  return (
    <section className="container mx-auto px-5 py-8 xl:px-10">
      <Reveal>
        <div className="grid grid-cols-2 gap-6 rounded-3xl bg-primary px-6 py-10 md:grid-cols-4 md:px-12">
          {STATS.map((s) => (
            <div key={s.l} className="flex items-center gap-3.5">
              <s.icon className="size-9 shrink-0 text-accent" strokeWidth={1.6} />
              <div>
                <p className="font-display text-2xl font-extrabold leading-none text-white md:text-3xl">{s.n}</p>
                <p className="mt-1 text-xs leading-snug text-white/60">{s.l}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};
