import { ArrowRight } from "lucide-react";
import { Link } from "@/components/site/router-shim";
import { PackageCard } from "@/components/site/package-card";

type Pkg = Record<string, unknown>;

function s(v: unknown) {
  return v == null ? "" : String(v);
}

const INITIAL_COUNT = 6;

export function ProximasViagens({ items }: { items: Pkg[] }) {
  const visible = items.slice(0, INITIAL_COUNT);

  return (
    <section className="container mx-auto px-5 py-16 xl:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">Próximas viagens</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-primary md:text-4xl">
            Escolha <span className="text-[#00a88c]">o seu destino</span>
          </h2>
        </div>
        <Link
          to="/pacotes"
          className="hidden items-center gap-1.5 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary/40 sm:inline-flex"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ver todas as viagens <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((pkg) => (
          <PackageCard key={s(pkg.id) || s(pkg.name)} pkg={pkg} />
        ))}
      </div>

      {items.length > INITIAL_COUNT && (
        <div className="mt-10 text-center">
          <Link
            to="/pacotes"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ver mais excursões <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
