import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";

type Category = "Todos" | "Aéreos" | "Rodoviários" | "Cruzeiros" | "Internacional";

const packages = [
  {
    id: 1,
    name: "Circuito Andino",
    location: "Argentina · Chile · Bolívia",
    duration: "12 dias",
    price: "2.360",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1000",
    category: "Rodoviários" as Category,
    tag: "Mais vendido",
  },
  {
    id: 2,
    name: "Circuito Patagônia",
    location: "Argentina · Chile",
    duration: "10 dias",
    price: "2.833",
    img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1000",
    category: "Rodoviários" as Category,
    tag: "Destaque",
  },
  {
    id: 3,
    name: "Circuito Inverno Argentina",
    location: "Bariloche · Mendoza",
    duration: "8 dias",
    price: "1.747",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000",
    category: "Rodoviários" as Category,
    tag: "Inverno",
  },
  {
    id: 4,
    name: "Buenos Aires",
    location: "Argentina",
    duration: "5 dias",
    price: "1.890",
    img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1000",
    category: "Aéreos" as Category,
    tag: "Cidade",
  },
  {
    id: 5,
    name: "Cruzeiro América do Sul",
    location: "Brasil · Uruguai · Argentina",
    duration: "7 noites",
    price: "3.200",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
    category: "Cruzeiros" as Category,
    tag: "Oferta",
  },
  {
    id: 6,
    name: "Machu Picchu & Cusco",
    location: "Peru",
    duration: "8 dias",
    price: "5.200",
    img: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=1000",
    category: "Internacional" as Category,
    tag: "Exclusivo",
  },
  {
    id: 7,
    name: "Atacama & Santiago",
    location: "Chile",
    duration: "7 dias",
    price: "4.100",
    img: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?auto=format&fit=crop&q=80&w=1000",
    category: "Internacional" as Category,
    tag: "Chile",
  },
  {
    id: 8,
    name: "Salar de Uyuni",
    location: "Bolívia",
    duration: "6 dias",
    price: "3.800",
    img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&q=80&w=1000",
    category: "Internacional" as Category,
    tag: "Paisagens",
  },
];

const categories: Category[] = ["Todos", "Aéreos", "Rodoviários", "Cruzeiros", "Internacional"];

export const PackageSection = () => {
  const [active, setActive] = useState<Category>("Todos");

  const filtered =
    active === "Todos" ? packages.slice(0, 8) : packages.filter((p) => p.category === active);

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <p className="editorial-label text-accent mb-3">Vitrine de Passeios</p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Roteiros que
              <br />
              <em className="font-semibold text-primary/50">encantam.</em>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  active === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "bg-white text-primary/50 hover:bg-primary/6 border border-primary/8"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Package Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg, i) => (
              <motion.article
                layout
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card group cursor-pointer border border-primary/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={pkg.img}
                    alt={pkg.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <span className="bg-white/92 backdrop-blur-sm text-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {pkg.category}
                    </span>
                    <span className="bg-accent text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {pkg.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-primary/40 text-[10px] mb-2 font-medium uppercase tracking-wider">
                    <MapPin size={11} className="text-accent" />
                    {pkg.location}
                  </div>

                  <h3
                    className="text-xl font-bold text-primary mb-3 leading-tight group-hover:text-accent transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {pkg.name}
                  </h3>

                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-primary/6">
                    <div className="flex items-center gap-1.5 text-primary/50">
                      <Clock size={13} />
                      <span className="text-xs font-medium">{pkg.duration}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] text-primary/30 font-bold uppercase tracking-wider">a partir de</span>
                      <span
                        className="text-lg font-bold text-primary"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        R$ {pkg.price}
                      </span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-primary/60 hover:text-accent transition-colors group/btn py-1">
                    Ver roteiro
                    <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="/pacotes"
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/20"
          >
            Ver todos os pacotes
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
