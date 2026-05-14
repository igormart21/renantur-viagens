import { motion } from "framer-motion";

const categories = [
  { name: "Pacotes Aéreos", img: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=800" },
  { name: "Rodoviários", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800" },
  { name: "Cruzeiros", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800" },
  { name: "Internacional", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800" },
  { name: "Nordeste", img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800" },
  { name: "Praia", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" },
  { name: "Serra", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" },
  { name: "Neve", img: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=800" },
];

export const CategorySection = () => {
  return (
    <section id="destinos" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Exploração</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Para cada desejo, <br />
              <span className="italic font-medium text-primary/60">um destino perfeito.</span>
            </h2>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 group">
            Ver todas as categorias
            <div className="w-8 h-[2px] bg-accent transition-all group-hover:w-12" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  {cat.name}
                </h3>
                <div className="w-8 h-1 bg-accent rounded-full opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
