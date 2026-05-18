import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Region = "Nordeste" | "Sul" | "Sudeste";

const destinations: Record<Region, { name: string; img: string; size: "lg" | "sm" }[]> = {
  Nordeste: [
    { name: "Maceió",              img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Maragogi",            img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Porto de Galinhas",   img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Salvador",            img: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Fernando de Noronha", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Natal",               img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=900",  size: "sm" },
  ],
  Sul: [
    { name: "Gramado",             img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Florianópolis",       img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Curitiba",            img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Balneário Camboriú",  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Canela",              img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Foz do Iguaçu",       img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=900",  size: "sm" },
  ],
  Sudeste: [
    { name: "Rio de Janeiro",      img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Angra dos Reis",      img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Arraial do Cabo",     img: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Ouro Preto",          img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Tiradentes",          img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Capitólio",           img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=900",  size: "sm" },
  ],
};

const regions: Region[] = ["Nordeste", "Sul", "Sudeste"];

export const DestinationGrid = () => {
  const [activeRegion, setActiveRegion] = useState<Region>("Nordeste");

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="editorial-label text-accent mb-3">Nossos Destinos</p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Roteiros com
              <br />
              <em className="font-semibold text-primary/50">curadoria exclusiva.</em>
            </h2>
          </div>

          {/* Region Tabs */}
          <div className="flex gap-1.5 bg-primary/5 rounded-full p-1.5">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeRegion === region
                    ? "bg-primary text-white shadow-lg"
                    : "text-primary/50 hover:text-primary"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[260px]"
          >
            {destinations[activeRegion].map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                  dest.size === "lg" ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                }`}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-400 group-hover:from-black/80" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3
                    className={`text-white font-bold leading-tight ${
                      dest.size === "lg" ? "text-2xl md:text-3xl" : "text-base md:text-xl"
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <span className="text-accent text-xs font-bold">Ver pacotes</span>
                    <ArrowRight size={11} className="text-accent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="/pacotes"
            className="inline-flex items-center gap-3 border-2 border-primary text-primary px-10 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explorar todos os destinos
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
