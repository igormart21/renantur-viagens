"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "befly-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          language?: string;
          "new-tab"?: string;
        };
      }
    }
  }
}

export const SearchSection = () => {
  return (
    <section className="relative bg-background py-16 md:py-20">
      <div className="container mx-auto px-6 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="editorial-label text-accent mb-3 flex items-center justify-center gap-2">
            <Search size={14} />
            Buscador de viagens
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight mb-3">
            Encontre sua próxima viagem
          </h2>
          <p className="text-primary/55 text-base md:text-lg max-w-xl mx-auto mb-10">
            Pesquise passagens, hotéis e pacotes em tempo real e fale com a Renantur
            para fechar com as melhores condições.
          </p>

          {/* Motor de busca (widget onertravel/befly) */}
          <div
            id="befly-wrapper"
            className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-primary/5 text-left"
          >
            <befly-widget language="pt-br" new-tab="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
