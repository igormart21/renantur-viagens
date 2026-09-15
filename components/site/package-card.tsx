import { PackagePrice } from "./package-price";
import { Clock, Bus } from "lucide-react";
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

export function slugify(pkg: Pkg) {
  if (pkg.slug) return s(pkg.slug);
  return s(pkg.name).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Card de pacote no estilo da vitrine: corpo branco, compacto. Usado na home e em /pacotes. */
export function PackageCard({ pkg }: { pkg: Pkg }) {
  return (
    <Link
      to={`/pacotes/${slugify(pkg)}`}
      className="group block h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      {/* imagem */}
      <div className="relative h-52 overflow-hidden sm:h-48">
        {s(pkg.img) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s(pkg.img)} alt={s(pkg.name)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        )}
        <span className="absolute left-3 top-3 rounded-md bg-primary/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {CAT_LABEL[s(pkg.category)] ?? "Pacote"}
        </span>
        {s(pkg.tag) && (
          <span className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white ${tagStyle(s(pkg.tag))}`}>
            {s(pkg.tag)}
          </span>
        )}
      </div>

      {/* conteúdo */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-primary">{s(pkg.name)}</h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-[#6b7280]">{s(pkg.location)}</p>

        <div className="mt-3 flex items-center gap-4 text-xs text-[#6b7280]">
          {s(pkg.duration) && (
            <span className="flex items-center gap-1"><Clock size={13} className="text-primary/50" />{s(pkg.duration)}</span>
          )}
          {s(pkg.type) && (
            <span className="flex items-center gap-1"><Bus size={13} className="text-primary/50" />{s(pkg.type)}</span>
          )}
        </div>

        <div className="mt-4 border-t border-black/5 pt-3">
          <PackagePrice pkg={pkg} />
        </div>

        <span className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-accent/90" style={{ fontFamily: "var(--font-display)" }}>
          Ver detalhes
        </span>
      </div>
    </Link>
  );
}
