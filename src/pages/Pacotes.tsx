import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, ArrowRight, Phone } from "lucide-react";
import { useState } from "react";

type Cat = "Todos" | "Aéreos" | "Rodoviários" | "Cruzeiros" | "Internacional";

const packages = [
  { id: 1,  name: "Maceió & Maragogi",          location: "Alagoas, Nordeste",       duration: "7 dias",    price: "2.490", img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=1000", category: "Aéreos" as Cat,         tag: "Mais vendido" },
  { id: 2,  name: "Porto de Galinhas",           location: "Pernambuco, Nordeste",    duration: "5 dias",    price: "2.890", img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=1000", category: "Aéreos" as Cat,         tag: "Destaque" },
  { id: 3,  name: "Fernando de Noronha",         location: "Pernambuco, Brasil",      duration: "6 dias",    price: "4.900", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000", category: "Aéreos" as Cat,         tag: "Exclusivo" },
  { id: 4,  name: "Salvador & Costa do Sauípe",  location: "Bahia, Nordeste",         duration: "6 dias",    price: "2.650", img: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=1000", category: "Aéreos" as Cat,         tag: "Nordeste" },
  { id: 5,  name: "Natal & Lençóis Maranhenses", location: "RN & MA, Nordeste",       duration: "8 dias",    price: "3.400", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000", category: "Aéreos" as Cat,         tag: "Paisagens" },
  { id: 6,  name: "Gramado & Serra Gaúcha",      location: "Rio Grande do Sul",       duration: "4 dias",    price: "1.850", img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=1000", category: "Rodoviários" as Cat,    tag: "Inverno" },
  { id: 7,  name: "Florianópolis & Balneário",   location: "Santa Catarina, Sul",     duration: "5 dias",    price: "2.100", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1000", category: "Rodoviários" as Cat,    tag: "Praias" },
  { id: 8,  name: "Angra dos Reis & Arraial",    location: "Rio de Janeiro",          duration: "4 dias",    price: "1.690", img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1000", category: "Rodoviários" as Cat,    tag: "Costa Verde" },
  { id: 9,  name: "Cruzeiro Costa Sul",          location: "Brasil & Uruguai",        duration: "5 noites",  price: "3.200", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1000", category: "Cruzeiros" as Cat,      tag: "Oferta" },
  { id: 10, name: "Cruzeiro Nordeste",           location: "Brasil, Caribe",          duration: "7 noites",  price: "4.100", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1000", category: "Cruzeiros" as Cat,      tag: "Premium" },
  { id: 11, name: "Machu Picchu",                location: "Cusco, Peru",             duration: "8 dias",    price: "5.200", img: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat,  tag: "América do Sul" },
  { id: 12, name: "Santiago & Atacama",          location: "Chile",                   duration: "10 dias",   price: "6.800", img: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat,  tag: "Deserto" },
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
