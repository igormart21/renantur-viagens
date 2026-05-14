import { motion } from "framer-motion";
import { Star, Clock, MapPin, ChevronRight } from "lucide-react";

const packages = [
  {
    name: "Maceió & Maragogi",
    location: "Alagoas, Brasil",
    duration: "7 Dias",
    price: "2.490",
    img: "https://images.unsplash.com/photo-1544984243-75a62ecd23c8?auto=format&fit=crop&q=80&w=1200",
    tag: "Nordeste",
    rating: 4.9
  },
  {
    name: "Gramado Inesquecível",
    location: "Rio Grande do Sul, Brasil",
    duration: "4 Dias",
    price: "1.850",
    img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=1200",
    tag: "Serra Gaúcha",
    rating: 4.8
  },
  {
    name: "Fernando de Noronha",
    location: "Pernambuco, Brasil",
    duration: "6 Dias",
    price: "4.900",
    img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=1200",
    tag: "Exclusivo",
    rating: 5.0
  },
  {
    name: "Machu Picchu",
    location: "Cusco, Peru",
    duration: "8 Dias",
    price: "5.200",
    img: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=1200",
    tag: "Internacional",
    rating: 4.9
  }
];

export const PackageSection = () => {
  return (
    <section id="pacotes" className="py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Destaques</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Os roteiros mais <br />
              <span className="italic font-medium text-primary/60">desejados do momento.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-premium group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={pkg.img}
                  alt={pkg.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                    {pkg.tag}
                  </span>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="bg-primary/80 backdrop-blur-md text-white p-2 rounded-full">
                    <Star size={14} fill="white" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 text-primary/50 text-xs mb-3 font-medium">
                  <MapPin size={14} className="text-accent" />
                  {pkg.location}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                  {pkg.name}
                </h3>
                
                <div className="flex items-center justify-between mb-8 border-y border-primary/5 py-4">
                  <div className="flex items-center gap-2 text-primary/60">
                    <Clock size={16} />
                    <span className="text-sm font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-primary/40 font-medium">A partir de</span>
                    <span className="text-xl font-bold text-primary">R$ {pkg.price}</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 text-primary font-bold py-2 group/btn">
                  Explorar Roteiro
                  <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
