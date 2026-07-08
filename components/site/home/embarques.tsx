import { MapPin } from "lucide-react";
import { Link } from "@/components/site/router-shim";
import { Reveal } from "./reveal";

const PONTOS = ["Volta Redonda", "Barra Mansa", "Resende", "Rio de Janeiro", "Nova Iguaçu", "Queimados"];

export const Embarques = () => {
  return (
    <section className="container mx-auto px-5 py-16 xl:px-10">
      <Reveal>
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Texto + lista */}
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#00a88c]">Embarques</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-[1.2] text-primary md:text-[2.4rem]">
              Levamos você de onde estiver no Rio de Janeiro!
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6b7280]">
              Contamos com pontos de embarque estratégicos para facilitar sua viagem.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {PONTOS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px] font-medium text-[#3d4a5d] transition-colors hover:text-[#00a88c]">
                  <MapPin size={18} className="shrink-0 text-[#00a88c]" /> {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full bg-[#00a88c] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#008878] hover:shadow-lg hover:shadow-[#00a88c]/20"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ver pontos detalhados
              </Link>
            </div>
          </div>

          {/* Imagem da seção (flutuando de forma orgânica sobre o fundo do site) */}
          <div className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/embarques-sem-fundo.png"
              alt="Pontos de embarque no Rio de Janeiro"
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
};
