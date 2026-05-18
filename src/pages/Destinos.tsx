import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Umbrella, Camera, Coffee, MessageCircle, ChevronLeft } from "lucide-react";

const destinationData: Record<string, any> = {
  "maceio": {
    name: "Maceió",
    tagline: "O Caribe Brasileiro",
    desc: "Maceió encanta por suas águas mornas e cristalinas, cercadas por vastos coqueirais e piscinas naturais formadas por arrecifes.",
    hero: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=2000",
    rating: 4.9,
    highlights: ["Piscinas Naturais de Pajuçara", "Praia do Francês", "Gastronomia Regional", "Artesanato Local"],
    stats: { temp: "28°C", people: "1M+", airport: "MCZ" }
  },
  "gramado": {
    name: "Gramado",
    tagline: "A Europa no Brasil",
    desc: "Gramado é o destino perfeito para quem busca sofisticação, gastronomia de alto nível e um clima europeu acolhedor na Serra Gaúcha.",
    hero: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=2000",
    rating: 5.0,
    highlights: ["Lago Negro", "Rua Coberta", "Snowland", "Fábricas de Chocolate"],
    stats: { temp: "15°C", people: "35k", airport: "CXJ" }
  },
  "rio-de-janeiro": {
    name: "Rio de Janeiro",
    tagline: "A Cidade Maravilhosa",
    desc: "O Rio combina montanhas icônicas, praias lendárias e uma energia vibrante que faz dele o destino mais famoso do Brasil.",
    hero: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=2000",
    rating: 4.8,
    highlights: ["Cristo Redentor", "Pão de Açúcar", "Copacabana", "Santa Teresa"],
    stats: { temp: "26°C", people: "6M+", airport: "GIG" }
  }
};

export const Destinos = () => {
  const { id } = useParams();
  const data = destinationData[id || "maceio"] || destinationData["maceio"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={data.hero} alt={data.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/40 cinematic-overlay" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 pt-20">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 mb-8 hover:text-white transition-colors">
            <ChevronLeft size={20} />
            Voltar
          </Link>
          <div className="max-w-4xl">
            <span className="bg-accent text-white px-4 py-1.5 rounded-full font-bold text-[10px] tracking-widest uppercase mb-4 inline-block">
              {data.tagline}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
              Descubra <br />
              <span className="italic font-medium text-white/80">{data.name}</span>
            </h1>
            <div className="flex items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-accent" fill="#FF6B57" />
                <span className="font-bold">{data.rating} Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                <span className="font-bold">{data.stats.airport}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="container mx-auto px-6 md:px-12 -translate-y-1/2 relative z-20">
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl p-6 md:p-12 grid grid-cols-2 md:flex md:flex-row justify-around gap-6 md:gap-8 border border-primary/5">
          <div className="text-center">
            <div className="text-accent mb-2 flex justify-center"><Umbrella size={24} className="md:w-8 md:h-8" /></div>
            <div className="text-2xl md:text-3xl font-bold text-primary">{data.stats.temp}</div>
            <div className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">Clima</div>
          </div>
          <div className="h-12 w-px bg-primary/10 hidden md:block" />
          <div className="text-center">
            <div className="text-accent mb-2 flex justify-center"><Camera size={24} className="md:w-8 md:h-8" /></div>
            <div className="text-2xl md:text-3xl font-bold text-primary">12+</div>
            <div className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">Atrações</div>
          </div>
          <div className="h-12 w-px bg-primary/10 hidden md:block" />
          <div className="text-center col-span-2 md:col-span-1 border-t border-primary/5 pt-4 md:pt-0 md:border-none">
            <div className="text-accent mb-2 flex justify-center"><Coffee size={24} className="md:w-8 md:h-8" /></div>
            <div className="text-2xl md:text-3xl font-bold text-primary">Premium</div>
            <div className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">Padrão</div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-8">A Experiência</h2>
            <p className="text-xl text-primary/60 leading-relaxed mb-10">
              {data.desc}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {data.highlights.map((h: string) => (
                <div key={h} className="flex items-center gap-3 text-primary font-semibold">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Star size={18} />
                  </div>
                  {h}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=600" className="rounded-3xl h-64 w-full object-cover shadow-lg" alt="" />
            <img src="https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=600" className="rounded-3xl h-64 w-full object-cover shadow-lg translate-y-12" alt="" />
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-32">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto bg-primary rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">
                Interessado em <span className="text-accent italic font-medium">{data.name}?</span>
              </h2>
              <p className="text-white/60 text-xl mb-12 max-w-xl mx-auto">
                Temos roteiros exclusivos e hotéis parceiros com condições especiais para você.
              </p>
              <button className="bg-success text-white px-12 py-6 rounded-full font-bold text-xl flex items-center gap-3 mx-auto transition-transform hover:scale-105 shadow-2xl shadow-success/30">
                <MessageCircle size={24} fill="white" />
                Falar com Consultor
              </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-20" />
          </div>
        </div>
      </section>
    </motion.div>
  );
};
