import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, ArrowRight, Phone } from "lucide-react";
import { useState } from "react";

type Cat = "Todos" | "Aéreos" | "Rodoviários" | "Cruzeiros" | "Internacional";

const packages = [
  { id: 1,  name: "Circuito Andino",             flag: "🇦🇷🇨🇱🇧🇴", location: "Argentina · Chile · Bolívia", subtitle: "Aventura pela Cordilheira",           includes: "Ônibus + Hotel + Passeios + Guia local + Transfer", duration: "12 dias",   type: "Turismo de aventura",    entry: "100,00", installments: 12, monthly: "188", total: "2.360", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000", category: "Rodoviários" as Cat,   tag: "Mais vendido" },
  { id: 2,  name: "Circuito Patagônia",          flag: "🇦🇷🇨🇱",    location: "Argentina · Chile",           subtitle: "Natureza selvagem no fim do mundo",   includes: "Ônibus + Hotel + Passeios + Guia local + Transfer", duration: "10 dias",   type: "Ecoturismo",             entry: "100,00", installments: 12, monthly: "228", total: "2.833", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1000", category: "Rodoviários" as Cat,   tag: "Destaque" },
  { id: 3,  name: "Inverno Argentina",           flag: "🇦🇷",       location: "Bariloche · Mendoza",         subtitle: "Neve, chocolate e lagos alpinos",     includes: "Ônibus + Hotel + Passeios + Guia local + Transfer", duration: "8 dias",    type: "Turismo de inverno",     entry: "100,00", installments: 12, monthly: "137", total: "1.747", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000", category: "Rodoviários" as Cat,   tag: "Inverno" },
  { id: 4,  name: "Buenos Aires",                flag: "🇦🇷",       location: "Argentina",                   subtitle: "Tango, cultura e gastronomia",        includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",  duration: "5 dias",    type: "Pacote Aéreo",           entry: "100,00", installments: 12, monthly: "149", total: "1.890", img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1000", category: "Aéreos" as Cat,        tag: "Cidade" },
  { id: 5,  name: "Santiago & Valparaíso",       flag: "🇨🇱",       location: "Chile",                       subtitle: "Arte, vinho e arquitetura colonial",  includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",  duration: "5 dias",    type: "Pacote Aéreo",           entry: "100,00", installments: 12, monthly: "166", total: "2.100", img: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?auto=format&fit=crop&q=80&w=1000", category: "Aéreos" as Cat,        tag: "Chile" },
  { id: 6,  name: "Machu Picchu & Cusco",        flag: "🇵🇪",       location: "Peru",                        subtitle: "A maravilha do mundo inca",           includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",  duration: "8 dias",    type: "Pacote Aéreo",           entry: "100,00", installments: 12, monthly: "425", total: "5.200", img: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat, tag: "Exclusivo" },
  { id: 7,  name: "Deserto Atacama",             flag: "🇨🇱",       location: "Norte do Chile",              subtitle: "Imersão no deserto mais árido",       includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",  duration: "6 dias",    type: "Turismo de aventura",    entry: "100,00", installments: 12, monthly: "308", total: "3.800", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat, tag: "Paisagens" },
  { id: 8,  name: "Salar de Uyuni",              flag: "🇧🇴",       location: "Bolívia",                     subtitle: "O maior espelho do mundo",            includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",  duration: "6 dias",    type: "Turismo de aventura",    entry: "100,00", installments: 12, monthly: "275", total: "3.400", img: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat, tag: "Deserto" },
  { id: 9,  name: "Cruzeiro América do Sul",     flag: "🇧🇷🇺🇾🇦🇷", location: "Brasil · Uruguai · Argentina", subtitle: "Litoral sul-americano a bordo",       includes: "Cruzeiro + Cabine + Pensão completa + Entretenimento", duration: "7 noites", type: "Cruzeiro marítimo",     entry: "100,00", installments: 12, monthly: "258", total: "3.200", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1000", category: "Cruzeiros" as Cat,     tag: "Oferta" },
  { id: 10, name: "Cruzeiro Patagônia",          flag: "🇨🇱🇦🇷",    location: "Chile · Argentina",           subtitle: "Fjords e geleiras do fim do mundo",   includes: "Cruzeiro + Cabine + Pensão completa + Entretenimento", duration: "10 noites",type: "Cruzeiro marítimo",     entry: "100,00", installments: 12, monthly: "491", total: "5.900", img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1000", category: "Cruzeiros" as Cat,     tag: "Premium" },
  { id: 11, name: "Torres del Paine",            flag: "🇨🇱",       location: "Patagônia, Chile",            subtitle: "O parque mais selvagem do Chile",     includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",  duration: "7 dias",    type: "Ecoturismo",             entry: "100,00", installments: 12, monthly: "333", total: "4.100", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat, tag: "Natureza" },
  { id: 12, name: "Circuito Andino Norte",       flag: "🇵🇪🇧🇴",    location: "Peru · Bolívia",              subtitle: "Incas, Titicaca e Salar de Uyuni",    includes: "Aéreo + Hotel + Passeios + Guia local + Transfer",  duration: "10 dias",   type: "Turismo cultural",       entry: "100,00", installments: 12, monthly: "316", total: "3.900", img: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&q=80&w=1000", category: "Internacional" as Cat, tag: "América do Sul" },
];

const categories: Cat[] = ["Todos", "Aéreos", "Rodoviários", "Cruzeiros", "Internacional"];

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
                className="rounded-2xl overflow-hidden shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-400 cursor-pointer group flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img src={pkg.img} alt={pkg.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-primary text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                      {categoryIcon[pkg.category] ?? "🌐"} {pkg.category === "Rodoviários" ? "Pacote Rodoviário" : pkg.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-accent text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {pkg.tag}
                    </span>
                  </div>

                  {/* Gradient to dark */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />

                  {/* Duration + type pills */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                    <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] font-bold px-2.5 py-1 rounded-full">
                      <Clock size={9} /> {pkg.duration}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] font-bold px-2.5 py-1 rounded-full">
                      {pkg.type}
                    </span>
                  </div>

                  {/* Transport inset photo */}
                  {transportImg[pkg.category] && (
                    <div className="absolute bottom-3 right-3 w-20 h-14 rounded-xl overflow-hidden border-2 border-white shadow-xl">
                      <img
                        src={transportImg[pkg.category]}
                        alt="transporte"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Dark info panel */}
                <div className="bg-primary flex-1 p-6 flex flex-col gap-3">
                  {/* Destination */}
                  <div>
                    <h3
                      className="text-white font-bold text-2xl leading-tight"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {pkg.name} <span className="text-lg">{pkg.flag}</span>
                    </h3>
                    <p className="text-white/55 text-xs font-medium mt-0.5">{pkg.subtitle}</p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-white/40 text-[10px] font-medium">
                    <MapPin size={10} className="text-accent" />
                    {pkg.location}
                  </div>

                  {/* Includes */}
                  <p className="text-white/40 text-[10px] leading-relaxed border-t border-white/10 pt-3">
                    {pkg.includes}
                  </p>

                  {/* Pricing */}
                  <div className="mt-auto pt-2">
                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-2">A partir de</p>

                    <div className="inline-flex items-center bg-accent/20 border border-accent/40 rounded-full px-3 py-1 mb-3">
                      <span className="text-accent text-[10px] font-bold">
                        Entrada de R$ {pkg.entry} mais
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-white/60 text-sm font-bold">{pkg.installments}x de</span>
                      <span
                        className="text-white font-bold"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.2rem", lineHeight: 1 }}
                      >
                        R$ {pkg.monthly}
                      </span>
                    </div>

                    <p className="text-white/35 text-[10px] mt-1.5">
                      Ou R$ {pkg.total} à vista
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://wa.me/5524999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 w-full flex items-center justify-center gap-2 bg-accent text-white text-xs font-bold py-3 rounded-xl hover:bg-accent/90 transition-colors"
                  >
                    Reservar agora
                    <ArrowRight size={13} />
                  </a>
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
              href="https://wa.me/5524999999999"
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
