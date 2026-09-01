"use client";

import { useRef } from "react";
import { Clock, Bus, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "@/components/site/router-shim";

type Pkg = Record<string, unknown>;

function s(v: unknown) {
  return v == null ? "" : String(v);
}

const CAT_LABEL: Record<string, string> = {
  Aéreos: "Aéreo",
  Rodoviários: "Excursão",
  Cruzeiros: "Cruzeiro",
  Internacional: "Internacional",
};

// cor do selo promocional conforme a tag
function tagStyle(tag: string): string {
  const t = tag.toLowerCase();
  if (/(última|ultima|vaga)/.test(t)) return "bg-red-500";
  if (/(lançamento|lancamento|novo)/.test(t)) return "bg-[#00a88c]";
  if (/(procurado|vendido|destaque)/.test(t)) return "bg-accent";
  return "bg-accent";
}

function slugify(pkg: Pkg) {
  if (pkg.slug) return s(pkg.slug);
  return s(pkg.name).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <Link
      to={`/pacotes/${slugify(pkg)}`}
      className="group w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      {/* imagem */}
      <div className="relative h-40 overflow-hidden">
        {s(pkg.img) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s(pkg.img)} alt={s(pkg.name)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        )}
        <span className="absolute left-2 top-2 rounded-md bg-primary/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          {CAT_LABEL[s(pkg.category)] ?? "Pacote"}
        </span>
        {s(pkg.tag) && (
          <span className={`absolute right-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${tagStyle(s(pkg.tag))}`}>
            {s(pkg.tag)}
          </span>
        )}
      </div>

      {/* conteúdo */}
      <div className="p-3.5">
        <h3 className="font-display text-[15px] font-bold text-primary">{s(pkg.name)}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-[#6b7280]">{s(pkg.location)}</p>

        <div className="mt-2.5 flex items-center gap-3 text-[11px] text-[#6b7280]">
          {s(pkg.duration) && (
            <span className="flex items-center gap-1"><Clock size={12} className="text-primary/50" />{s(pkg.duration)}</span>
          )}
          {s(pkg.type) && (
            <span className="flex items-center gap-1"><Bus size={12} className="text-primary/50" />{s(pkg.type)}</span>
          )}
        </div>

        <div className="mt-3 border-t border-black/5 pt-2.5">
          <p className="text-[10px] text-[#9aa3af]">A partir de</p>
          <p className="font-display text-lg font-extrabold text-[#00a88c]">
            {s(pkg.installments)}x R$ {s(pkg.monthly)}
          </p>
        </div>

        <span className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent py-2 text-xs font-semibold text-white transition-colors group-hover:bg-accent/90" style={{ fontFamily: "var(--font-display)" }}>
          Ver detalhes
        </span>
      </div>
    </Link>
  );
}

export function ProximasViagens({ items }: { items: Pkg[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };
  // duas fileiras: pacote 0 e 1 na 1ª coluna, 2 e 3 na 2ª coluna, etc.
  const row1 = items.filter((_, i) => i % 2 === 0);
  const row2 = items.filter((_, i) => i % 2 === 1);

  return (
    <section className="container mx-auto px-5 py-16 xl:px-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">Próximas viagens</p>
          <h2 className="mt-1 font-display text-3xl font-bold text-primary md:text-4xl">
            Escolha <span className="text-[#00a88c]">o seu destino</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/pacotes"
            className="hidden items-center gap-1.5 rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary/40 sm:inline-flex"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ver todas as viagens <ArrowRight size={15} />
          </Link>
          <button onClick={() => scroll(-1)} aria-label="Anterior" className="flex size-9 items-center justify-center rounded-full border border-black/10 text-primary transition-colors hover:bg-primary/5">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} aria-label="Próximo" className="flex size-9 items-center justify-center rounded-full border border-black/10 text-primary transition-colors hover:bg-primary/5">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max flex-col gap-4">
          <div className="flex gap-4">
            {row1.map((pkg) => (
              <PackageCard key={s(pkg.id) || s(pkg.name)} pkg={pkg} />
            ))}
          </div>
          {row2.length > 0 && (
            <div className="flex gap-4">
              {row2.map((pkg) => (
                <PackageCard key={s(pkg.id) || s(pkg.name)} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
