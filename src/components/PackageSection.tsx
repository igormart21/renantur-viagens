import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, ArrowRight } from "lucide-react";

type Category = "Todos" | "Aéreos" | "Rodoviários" | "Cruzeiros" | "Internacional";

const packages = [
  {
    id: 1,
    name: "Circuito Andino",
    flag: "🇦🇷🇨🇱🇧🇴",
    location: "Argentina · Chile · Bolívia",
    subtitle: "Aventura pela Cordilheira",
    includes: "Ônibus + Hotel + Passeios + Guia local + Transfer",
    duration: "12 dias",
    type: "Turismo de aventura",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000",
    category: "Rodoviários" as Category,
    tag: "Mais vendido",
    entry: "100,00",
    installments: 12,
    monthly: "188",
    total: "2.360",
  },
  {
    id: 2,
    name: "Circuito Patagônia",
    flag: "🇦🇷🇨🇱",
    location: "Argentina · Chile",
    subtitle: "Natureza selvagem no fim do mundo",
    includes: "Ônibus + Hotel + Passeios + Guia local + Transfer",
    duration: "10 dias",
    type: "Ecoturismo",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1000",
    category: "Rodoviários" as Category,
    tag: "Destaque",
    entry: "100,00",
    installments: 12,
    monthly: "228",
    total: "2.833",
  },
  {
    id: 3,
    name: "Circuito Inverno Argentina",
    flag: "🇦🇷",
    location: "Bariloche · Mendoza",
    subtitle: "Neve, chocolate e lagos alpinos",
    includes: "Ônibus + Hotel + Passeios + Guia local + Transfer",
    duration: "8 dias",
    type: "Turismo de inverno",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000",
    category: "Rodoviários" as Category,
    tag: "Inverno",
    entry: "100,00",
    installments: 12,
    monthly: "137",
    total: "1.747",
  },
  {
    id: 4,
    name: "Buenos Aires",
    flag: "🇦🇷",
    location: "Argentina",
    subtitle: "Tango, cultura e gastronomia",
    includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",
    duration: "5 dias",
    type: "Pacote Aéreo",
    img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1000",
    category: "Aéreos" as Category,
    tag: "Cidade",
    entry: "100,00",
    installments: 12,
    monthly: "149",
    total: "1.890",
  },
  {
    id: 5,
    name: "Cruzeiro América do Sul",
    flag: "🇧🇷🇺🇾🇦🇷",
    location: "Brasil · Uruguai · Argentina",
    subtitle: "Imersão no litoral sul-americano",
    includes: "Cruzeiro + Cabine + Pensão completa + Entretenimento",
    duration: "7 noites",
    type: "Cruzeiro marítimo",
    img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1000",
    category: "Cruzeiros" as Category,
    tag: "Oferta",
    entry: "100,00",
    installments: 12,
    monthly: "258",
    total: "3.200",
  },
  {
    id: 6,
    name: "Machu Picchu & Cusco",
    flag: "🇵🇪",
    location: "Peru",
    subtitle: "A maravilha do mundo inca",
    includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",
    duration: "8 dias",
    type: "Pacote Aéreo",
    img: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=1000",
    category: "Internacional" as Category,
    tag: "Exclusivo",
    entry: "100,00",
    installments: 12,
    monthly: "425",
    total: "5.200",
  },
  {
    id: 7,
    name: "Deserto Atacama",
    flag: "🇨🇱",
    location: "Norte do Chile",
    subtitle: "Imersão no deserto mais árido",
    includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",
    duration: "6 dias",
    type: "Turismo de aventura",
    img: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=1000",
    category: "Internacional" as Category,
    tag: "Paisagens",
    entry: "100,00",
    installments: 12,
    monthly: "308",
    total: "3.800",
  },
  {
    id: 8,
    name: "Salar de Uyuni",
    flag: "🇧🇴",
    location: "Bolívia",
    subtitle: "O maior espelho do mundo",
    includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",
    duration: "6 dias",
    type: "Turismo de aventura",
    img: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=1000",
    category: "Internacional" as Category,
    tag: "Paisagens",
    entry: "100,00",
    installments: 12,
    monthly: "275",
    total: "3.400",
  },
];

const categories: Category[] = ["Todos", "Aéreos", "Rodoviários", "Cruzeiros", "Internacional"];

const categoryIcon: Record<string, string> = {
  Aéreos: "✈️",
  Rodoviários: "🚌",
  Cruzeiros: "🚢",
  Internacional: "🌎",
};

const transportImg: Record<string, string> = {
  Rodoviários: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=300",
  Aéreos: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=300",
  Internacional: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=300",
};

export const PackageSection = () => {
  const [active, setActive] = useState<Category>("Todos");

  const filtered =
    active === "Todos" ? packages : packages.filter((p) => p.category === active);

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
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg, i) => (
              <motion.article
                layout
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl overflow-hidden shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-400 cursor-pointer group flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={pkg.img}
                    alt={pkg.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      <span>{categoryIcon[pkg.category] ?? "🌐"}</span>
                      {pkg.category === "Rodoviários" ? "Pacote Rodoviário" : pkg.type}
                    </span>
                  </div>
                  {/* Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-accent text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {pkg.tag}
                    </span>
                  </div>
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

                  {/* Duration + type pills over gradient */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] font-bold px-2.5 py-1 rounded-full">
                      <Clock size={9} />
                      {pkg.duration}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] font-bold px-2.5 py-1 rounded-full">
                      {pkg.type}
                    </span>
                  </div>

                  {/* Transport inset photo */}
                  {transportImg[pkg.category] && (
                    <div className="absolute bottom-3 right-3 w-16 h-11 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                      <img
                        src={transportImg[pkg.category]}
                        alt="transporte"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Dark info panel */}
                <div className="bg-primary flex-1 p-5 flex flex-col gap-3">
                  {/* Destination + flag */}
                  <div>
                    <h3
                      className="text-white font-bold text-xl leading-tight"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {pkg.name} <span className="text-base">{pkg.flag}</span>
                    </h3>
                    <p className="text-white/55 text-xs font-medium mt-0.5">{pkg.subtitle}</p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-white/40 text-[10px] font-medium">
                    <MapPin size={10} className="text-accent" />
                    {pkg.location}
                  </div>

                  {/* Includes */}
                  <p className="text-white/45 text-[10px] leading-relaxed border-t border-white/10 pt-3">
                    {pkg.includes}
                  </p>

                  {/* Pricing */}
                  <div className="mt-auto pt-2">
                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-2">A partir de</p>

                    {/* Entry pill */}
                    <div className="inline-flex items-center bg-accent/20 border border-accent/40 rounded-full px-3 py-1 mb-2">
                      <span className="text-accent text-[10px] font-bold">
                        Entrada de R$ {pkg.entry} mais
                      </span>
                    </div>

                    {/* Installments */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-white/60 text-sm font-bold">{pkg.installments}x de</span>
                      <span
                        className="text-white font-bold leading-none"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.6rem,3vw,2rem)" }}
                      >
                        R$ {pkg.monthly}
                      </span>
                    </div>

                    {/* À vista */}
                    <p className="text-white/35 text-[10px] mt-1">
                      Ou R$ {pkg.total} à vista
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://wa.me/5524999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 w-full flex items-center justify-center gap-2 bg-accent text-white text-xs font-bold py-3 rounded-xl hover:bg-accent/90 transition-colors"
                  >
                    Reservar agora
                    <ArrowRight size={13} />
                  </a>
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
