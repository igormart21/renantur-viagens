import {
  Plane,
  Bus,
  Ship,
  Palmtree,
  Snowflake,
  FerrisWheel,
  Heart,
  Users,
} from "lucide-react";
import { Link } from "@/components/site/router-shim";
import { Reveal } from "./reveal";

const CATS = [
  { icon: Plane, label: "Internacionais", href: "/pacotes" },
  { icon: Bus, label: "Excursões", href: "/circuitos" },
  { icon: Ship, label: "Cruzeiros", href: "/pacotes" },
  { icon: Palmtree, label: "Praia", href: "/pacotes" },
  { icon: Snowflake, label: "Neve", href: "/pacotes" },
  { icon: FerrisWheel, label: "Parques", href: "/pacotes" },
  { icon: Heart, label: "Lua de Mel", href: "/pacotes" },
  { icon: Users, label: "Família", href: "/pacotes" },
];

export const Categorias = () => {
  return (
    <section className="container mx-auto px-5 py-14 xl:px-10">
      <div className="grid grid-cols-4 gap-3 md:gap-4 lg:grid-cols-8">
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
