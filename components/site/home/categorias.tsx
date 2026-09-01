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
    <section className="container mx-auto px-5 py-8 xl:px-10">
      <div className="flex flex-wrap justify-center gap-3">
        {CATS.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.04}>
            <Link
              to={c.href}
              className="group inline-flex items-center gap-2.5 rounded-full border border-black/5 bg-white px-5 py-3 shadow-sm transition-all hover:border-accent/40 hover:shadow-md"
            >
              <c.icon className="size-5 text-primary transition-colors group-hover:text-accent" strokeWidth={1.7} />
              <span className="text-sm font-semibold text-[#3d4a5d] transition-colors group-hover:text-accent" style={{ fontFamily: "var(--font-display)" }}>
                {c.label}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
