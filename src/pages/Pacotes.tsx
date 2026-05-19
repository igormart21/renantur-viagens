import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, ArrowRight, Phone } from "lucide-react";
import { useState } from "react";

type Cat = "Todos" | "Aéreos" | "Rodoviários" | "Cruzeiros" | "Internacional";

const packages = [
  { id: 1,  name: "Circuito Andino",              location: "Argentina · Chile · Bolívia", duration: "12 dias",   price: "2.360", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000", category: "Rodoviários" as Cat,    tag: "Mais vendido" },
  { id: 2,  name: "Circuito Patagônia",          location: "Argentina · Chile",           duration: "10 dias",   price: "2.833", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1000", category: "Rodoviários" as Cat,    tag: "Destaque" },
  { id: 3,  name: "Circuito Inverno Argentina",  location: "Bariloche · Mendoza",         duration: "8 dias",    price: "1.747", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000", category: "Rodoviários" as Cat,    tag: "Inverno" },
  { id: 4,  name: "Buenos Aires",                location: "Argentina",                   duration: "5 dias",    price: "1.890", img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1000", category: "Aéreos" as Cat,         tag: "Cidade" },
  { id: 5,  name: "Santiago & Valparaíso",       location: "Chile",                       duration: "5 dias",    price: "2.100", img: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?auto=format&fit=crop&q=80&w=1000", category: "Aéreos" as Cat,         tag: "Chile" },
  { id: 6,  name: "Machu Picchu & Cusco",        location: "Peru",                        duration: "8 dias",    price: "5.200", img: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat,  tag: "Exclusivo" },
  { id: 7,  name: "Atacama",                     location: "Norte do Chile",              duration: "6 dias",    price: "3.800", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat,  tag: "Paisagens" },
  { id: 8,  name: "Salar de Uyuni",              location: "Bolívia",                     duration: "6 dias",    price: "3.400", img: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat,  tag: "Deserto" },
  { id: 9,  name: "Cruzeiro América do Sul",     location: "Brasil · Uruguai · Argentina",duration: "7 noites",  price: "3.200", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1000", category: "Cruzeiros" as Cat,      tag: "Oferta" },
  { id: 10, name: "Cruzeiro Patagônia",          location: "Chile · Argentina",           duration: "10 noites", price: "5.900", img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1000", category: "Cruzeiros" as Cat,      tag: "Premium" },
  { id: 11, name: "Torres del Paine",            location: "Patagônia, Chile",            duration: "7 dias",    price: "4.100", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat,  tag: "Natureza" },
  { id: 12, name: "Circuito Andino Norte",       location: "Peru · Bolívia",              duration: "10 dias",   price: "3.900", img: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat,  tag: "América do Sul" },
];

const categories: Cat[] = ["Todos", "Aéreos", "Rodoviários", "Cruzeiros", "Internacional"];

export const Pacotes = () => {
  const [active, setActive] = useState<Cat>("Todos");

  const filtered = active === "Todos" ? packages : packages.filter((p) => p.category === active);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Page Header */}
      <div className="pt-36 pb-12 container mx-auto px-6 xl:px-12">
        <p className="editorial-label text-accent mb-3">Vitrine de Passeios</p>
        <h1
          className="text-5xl md:text-7xl font-bold text-primary leading-tight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Nossos
          <br />
          <em className="text-primary/50 font-semibold">Pacotes.</em>
        </h1>
        <p className="text-foreground/50 text-base md:text-lg max-w-xl leading-relaxed">
          Aéreos, rodoviários, cruzeiros e internacionais — encontre o roteiro perfeito para você e sua família.
        </p>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 xl:px-12 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                active === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white text-primary/50 hover:bg-primary/6 border border-primary/8"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 xl:px-12 pb-20">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg, i) => (
              <motion.article
                layout
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden border border-primary/6 shadow-card group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img src={pkg.img} alt={pkg.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-3 left-3 right-3 flex gap-2">
                    <span className="bg-white/92 backdrop-blur-sm text-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {pkg.category}
                    </span>
                    <span className="bg-accent text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {pkg.tag}
                    </span>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-1.5 text-primary/40 text-[10px] mb-2 font-medium uppercase tracking-wider">
                    <MapPin size={11} className="text-accent" />
                    {pkg.location}
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors"
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
                      <span className="block text-[9px] text-primary/30 font-bold uppercase">a partir de</span>
                      <span
                        className="text-xl font-bold text-primary"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        R$ {pkg.price}
                      </span>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 bg-primary/5 text-primary font-bold text-sm py-3 rounded-xl transition-all group-hover:bg-primary group-hover:text-white">
                    Ver Detalhes
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CTA Banner */}
      <div className="container mx-auto px-6 xl:px-12 pb-24">
        <div className="bg-primary rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Não encontrou o roteiro ideal?
              </h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                Criamos roteiros personalizados sob medida. Fale com nosso especialista e monte o seu.
              </p>
            </div>
            <a
              href="https://wa.me/55"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-accent/20 hover:scale-105 transition-transform"
            >
              <Phone size={16} />
              Falar com especialista
            </a>
          </div>
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/4 rounded-full" />
          <div className="absolute -bottom-8 -right-4 w-60 h-60 bg-accent/8 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};
