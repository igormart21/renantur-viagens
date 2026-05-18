import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const services = [
  {
    label: "01",
    name: "Pacotes Aéreos",
    desc: "Buenos Aires, Lima, Santiago e destinos incríveis com tudo incluso.",
    img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=900",
    href: "/pacotes",
    accent: "#0F6D7A",
  },
  {
    label: "02",
    name: "Pacotes Rodoviários",
    desc: "Circuito Andino, Patagônia e Argentina de ônibus moderno.",
    img: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?auto=format&fit=crop&q=80&w=900",
    href: "/circuitos",
    accent: "#FF6B57",
  },
  {
    label: "03",
    name: "Cruzeiros",
    desc: "Navegue pelo litoral da América do Sul com estilo.",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=900",
    href: "/pacotes",
    accent: "#0F6D7A",
  },
  {
    label: "04",
    name: "Internacional",
    desc: "Machu Picchu, Atacama, Salar de Uyuni e muito mais.",
    img: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=900",
    href: "/pacotes",
    accent: "#3BB273",
  },
  {
    label: "05",
    name: "Transfer",
    desc: "Aeroportos, portos e traslados com pontualidade e conforto.",
    img: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&q=80&w=900",
    href: "/transfer",
    accent: "#FF6B57",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="editorial-label text-accent mb-3">Nossos Serviços</p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Viaje do jeito
              <br />
              <em className="font-semibold text-primary/50">que você merece.</em>
            </h2>
          </div>
          <Link
            to="/pacotes"
            className="flex items-center gap-2 text-primary/50 hover:text-accent text-sm font-semibold transition-colors group"
          >
            Ver todos os pacotes
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                i === 0 ? "col-span-2 md:col-span-1 row-span-1" : ""
              }`}
            >
              <Link to={s.href} className="block">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ transition: "transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)" }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Number */}
                  <div className="absolute top-4 left-4">
                    <span className="text-white/30 text-xs font-bold tracking-widest">{s.label}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3
                      className="text-white font-bold text-xl leading-tight mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {s.name}
                    </h3>
                    <p className="text-white/0 group-hover:text-white/70 transition-all duration-400 text-xs leading-relaxed translate-y-2 group-hover:translate-y-0">
                      {s.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-accent text-xs font-bold">Explorar</span>
                      <ArrowRight size={12} className="text-accent" />
                    </div>
                  </div>

                  {/* Accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
                    style={{ backgroundColor: s.accent }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
