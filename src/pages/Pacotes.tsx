import { motion } from "framer-motion";
import { Search, Filter, Clock, MapPin, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const packages = [
  { id: 1, name: "Maceió & Maragogi", location: "Alagoas, Brasil", duration: "7 Dias", price: "2.490", img: "https://images.unsplash.com/photo-1544984243-75a62ecd23c8?auto=format&fit=crop&q=80&w=1200", category: "Aéreos", tag: "Popular" },
  { id: 2, name: "Gramado Premium", location: "RS, Brasil", duration: "4 Dias", price: "1.850", img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=1200", category: "Rodoviários", tag: "Inverno" },
  { id: 3, name: "Noronha Experience", location: "PE, Brasil", duration: "6 Dias", price: "4.900", img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=1200", category: "Aéreos", tag: "Exclusivo" },
  { id: 4, name: "Cruzeiro Costa Sul", location: "Brasil & Uruguai", duration: "5 Dias", price: "3.200", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200", category: "Cruzeiros", tag: "Lazer" },
  { id: 5, name: "Machu Picchu", location: "Cusco, Peru", duration: "8 Dias", price: "5.200", img: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&q=80&w=1200", category: "Internacionais", tag: "Aventura" },
  { id: 6, name: "Santiago & Atacama", location: "Chile", duration: "10 Dias", price: "6.800", img: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&q=80&w=1200", category: "Internacionais", tag: "Deserto" }
];

const categories = ["Todos", "Aéreos", "Rodoviários", "Cruzeiros", "Internacionais"];

export const Pacotes = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredPackages = activeCategory === "Todos" 
    ? packages 
    : packages.filter(pkg => pkg.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-background min-h-screen"
    >
      {/* Header Section */}
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 tracking-tight">
            Nossos <span className="text-accent italic font-medium">Pacotes</span>
          </h1>
          <p className="text-xl text-primary/60 leading-relaxed max-w-2xl">
            Explore nossa seleção exclusiva de roteiros desenhados para proporcionar o máximo conforto e experiências inesquecíveis.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                  activeCategory === cat 
                  ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105" 
                  : "bg-white text-primary/40 hover:bg-primary/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={20} />
            <input 
              type="text" 
              placeholder="Buscar destino..." 
              className="w-full bg-white border border-primary/5 rounded-full py-4 pl-14 pr-8 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPackages.map((pkg, i) => (
            <motion.div
              layout
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-premium group cursor-pointer border border-primary/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={pkg.img}
                  alt={pkg.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                    {pkg.category}
                  </span>
                  <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                    {pkg.tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 text-primary/40 text-xs mb-3 font-medium uppercase tracking-wider">
                  <MapPin size={14} className="text-accent" />
                  {pkg.location}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                  {pkg.name}
                </h3>
                
                <div className="flex items-center justify-between mb-8 border-y border-primary/5 py-4">
                  <div className="flex items-center gap-2 text-primary/60">
                    <Clock size={16} />
                    <span className="text-sm font-semibold">{pkg.duration}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-primary/30 font-bold uppercase">A partir de</span>
                    <span className="text-2xl font-bold text-primary tracking-tight">R$ {pkg.price}</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-primary/5 text-primary font-bold py-5 rounded-2xl transition-all group-hover:bg-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary/20">
                  Ver Detalhes
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 md:px-12 mt-32">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Não encontrou o que procurava?</h2>
            <p className="text-white/60 text-lg mb-12">Nossos especialistas podem criar um roteiro personalizado sob medida para o seu desejo.</p>
            <button className="bg-accent text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Fale com um Especialista
            </button>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20" />
        </div>
      </div>
    </motion.div>
  );
};
