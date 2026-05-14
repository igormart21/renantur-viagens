import { motion } from "framer-motion";

const destinations = [
  { name: "Rio de Janeiro", img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800", size: "large" },
  { name: "Angra dos Reis", img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800", size: "small" },
  { name: "Arraial do Cabo", img: "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=800", size: "small" },
  { name: "Ouro Preto", img: "https://images.unsplash.com/photo-1579541591970-e69670603632?auto=format&fit=crop&q=80&w=800", size: "medium" },
  { name: "Salvador", img: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&q=80&w=800", size: "medium" },
  { name: "Florianópolis", img: "https://images.unsplash.com/photo-1549400262-632000570e8a?auto=format&fit=crop&q=80&w=800", size: "large" }
];

export const DestinationGrid = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Portfólio</span>
          <h2 className="text-4xl md:text-6xl font-bold text-primary">Destinos Populares</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-[2rem] group cursor-pointer shadow-lg ${
                dest.size === "large" ? "col-span-2 row-span-2" : 
                dest.size === "medium" ? "col-span-2 row-span-1" : 
                "col-span-1 row-span-1"
              }`}
            >
              <img
                src={dest.img}
                alt={dest.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-xl md:text-3xl font-bold">{dest.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
