import { motion } from "framer-motion";
import { Compass, Map, ChevronRight, Info } from "lucide-react";

const circuits = [
  {
    id: 1,
    title: "Circuito Andino",
    subtitle: "Chile & Argentina",
    desc: "Uma jornada épica cruzando as cordilheiras, passando por vinícolas e paisagens vulcânicas deslumbrantes.",
    img: "https://images.unsplash.com/photo-1589410115091-a968987cc91e?auto=format&fit=crop&q=80&w=1200",
    stops: ["Santiago", "Mendoza", "Bariloche", "Puerto Varas"]
  },
  {
    id: 2,
    title: "Patagônia Selvagem",
    subtitle: "El Calafate & Torres del Paine",
    desc: "A vastidão do fim do mundo em um roteiro que combina geleiras milenares com hotéis boutique de luxo.",
    img: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&q=80&w=1200",
    stops: ["El Calafate", "Torres del Paine", "Ushuaia"]
  },
  {
    id: 3,
    title: "Serra Gaúcha Premium",
    subtitle: "Rio Grande do Sul, Brasil",
    desc: "O melhor da cultura europeia no Brasil, com foco em enogastronomia e hospitalidade de alto padrão.",
    img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=1200",
    stops: ["Gramado", "Canela", "Bento Gonçalves"]
  }
];

export const Circuitos = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-primary min-h-screen"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mb-16 md:24">
          <span className="text-accent font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:xs mb-4 md:6 block">Road Trips & Expedições</span>
          <h1 className="text-4xl md:text-8xl font-bold text-white mb-6 md:8 tracking-tight leading-tight">
            Circuitos <br />
            <span className="italic font-medium text-white/40">Rodoviários.</span>
          </h1>
          <p className="text-base md:text-xl text-white/50 leading-relaxed max-w-2xl">
            Acreditamos que a estrada é parte fundamental da experiência. Nossos circuitos terrestres oferecem conforto absoluto e vistas cinematográficas.
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {circuits.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-24`}
            >
              <div className="w-full lg:w-3/5 relative group">
                <div className="aspect-[16/9] rounded-[3.5rem] overflow-hidden shadow-2xl">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-accent p-8 rounded-full shadow-2xl hidden md:block group-hover:rotate-12 transition-transform">
                  <Compass size={48} className="text-white" />
                </div>
              </div>
              
              <div className="w-full lg:w-2/5">
                <span className="text-accent font-bold text-sm tracking-widest uppercase mb-4 block">{item.subtitle}</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">{item.title}</h2>
                <p className="text-white/60 text-lg md:text-xl mb-10 leading-relaxed italic">
                  "{item.desc}"
                </p>
                
                <div className="mb-12">
                  <div className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Map size={16} />
                    Principais Paradas
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {item.stops.map(stop => (
                      <span key={stop} className="px-5 py-2 bg-white/5 rounded-full text-white/80 text-sm border border-white/10 font-medium">
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    Ver Itinerário
                    <ChevronRight size={20} />
                  </button>
                  <button className="border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <Info size={20} />
                    Saiba Mais
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
