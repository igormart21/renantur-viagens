import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const circuits = [
  {
    title: "Circuito Andino",
    desc: "Cruze as cordilheiras em uma jornada épica entre Chile e Argentina.",
    img: "https://images.unsplash.com/photo-1589410115091-a968987cc91e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Patagônia Selvagem",
    desc: "A vastidão do fim do mundo em um roteiro de contemplação e luxo.",
    img: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&q=80&w=1200"
  }
];

export const RoadTripSection = () => {
  return (
    <section id="rodoviario" className="py-32 bg-primary overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">A Estrada é o Destino</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Circuitos <br />
              <span className="italic font-medium text-white/50">Rodoviários Premium.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-sm text-lg leading-relaxed">
            Experiências terrestres com o máximo conforto e roteiros desenhados para quem ama a jornada.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {circuits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-20`}
            >
              <div className="w-full md:w-3/5 aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-110" />
              </div>
              <div className="w-full md:w-2/5">
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed">
                  {item.desc}
                </p>
                <button className="flex items-center gap-4 text-accent font-bold text-lg group">
                  Explorar Circuito
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 transition-all group-hover:bg-accent group-hover:text-white">
                    <ArrowRight size={20} />
                  </div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
