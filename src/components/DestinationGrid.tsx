import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Region = "Argentina" | "Chile" | "Peru & Bolívia";

const destinations: Record<Region, { name: string; img: string; size: "lg" | "sm" }[]> = {
  Argentina: [
    { name: "Patagônia",           img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Bariloche",           img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Buenos Aires",        img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Ushuaia",             img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Mendoza",             img: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Salta",               img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=900",  size: "sm" },
  ],
  Chile: [
    { name: "Torres del Paine",    img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Atacama",             img: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Valparaíso",          img: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Santiago",            img: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Pucón",               img: "https://images.unsplash.com/photo-1592609931041-40265b692757?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Puerto Varas",        img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&q=80&w=900",  size: "sm" },
  ],
  "Peru & Bolívia": [
    { name: "Machu Picchu",        img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "Salar de Uyuni",      img: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Cusco",               img: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Lago Titicaca",       img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=900",  size: "lg" },
    { name: "La Paz",              img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=900",  size: "sm" },
    { name: "Lima",                img: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&q=80&w=900",  size: "sm" },
  ],
};

const regions: Region[] = ["Argentina", "Chile", "Peru & Bolívia"];

export const DestinationGrid = () => {
  const [activeRegion, setActiveRegion] = useState<Region>("Argentina");

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
