import {
  Plane,
  Bus,
  Ship,
  Globe,
} from "lucide-react";
import { Link } from "@/components/site/router-shim";
import { Reveal } from "./reveal";

const CATS = [
  { icon: Bus, label: "Excursões Rodoviário", href: "/pacotes?categoria=Rodoviários" },
  { icon: Globe, label: "Aéreo Internacional", href: "/pacotes?categoria=Internacional" },
  { icon: Plane, label: "Aéreo Nacional", href: "/pacotes?categoria=Aéreos" },
  { icon: Ship, label: "Cruzeiros", href: "/pacotes?categoria=Cruzeiros" },
];

export const Categorias = () => {
  return (
    <section className="container mx-auto px-5 py-14 xl:px-10">
      <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-4">
        {CATS.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.04}>
            <Link
              to={c.href}
              className="group flex flex-col items-center gap-2.5 rounded-2xl border border-black/5 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                <c.icon className="size-6" strokeWidth={1.6} />
              </span>
              <span className="text-xs font-semibold text-[#3d4a5d] transition-colors group-hover:text-accent" style={{ fontFamily: "var(--font-display)" }}>
                {c.label}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
