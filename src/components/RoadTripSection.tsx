import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const circuits = [
  {
    id: 1,
    region: "Argentina · Chile · Bolívia",
    title: "Circuito Andino",
    subtitle: "A cordilheira como você nunca viu",
    desc: "Um roteiro épico pela espinha dorsal da América do Sul. De Mendoza às salinas bolivianas, passando pelas vinícolas argentinas e o deserto do Atacama.",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1400",
    stops: ["Mendoza", "Santiago", "Atacama", "Salta", "Salar de Uyuni"],
    days: "12 a 15 dias",
    color: "#FF6B57",
  },
  {
    id: 2,
    region: "Argentina · Chile",
    title: "Circuito Patagônia",
    subtitle: "Fim do mundo, começo de tudo",
    desc: "Das Torres del Paine às geleiras de El Calafate. Um roteiro entre dois países onde a natureza selvagem toma conta de tudo e cada paisagem parece pintada.",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1400",
    stops: ["Puerto Natales", "Torres del Paine", "El Calafate", "Ushuaia"],
    days: "10 a 14 dias",
    color: "#3BB273",
  },
  {
    id: 3,
    region: "Argentina",
    title: "Circuito Inverno Argentina",
    subtitle: "Neve, chocolate e paisagens alpinas",
    desc: "Bariloche no inverno é um cartão-postal de outro mundo. Neve nas montanhas, lagos azuis e a culinária alemã que encantou gerações de viajantes.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1400",
    stops: ["Buenos Aires", "Bariloche", "Villa La Angostura", "San Martín de los Andes"],
    days: "8 a 10 dias",
    color: "#0F6D7A",
  },
];

export const RoadTripSection = () => {
  return (
    <section className="bg-primary overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-6 xl:px-12 pt-24 md:pt-32 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="editorial-label text-accent mb-3">Circuito Rodoviário pela América do Sul</p>
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              A estrada
              <br />
              <em className="text-white/40 font-semibold">é o destino.</em>
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-base leading-relaxed">
            Roteiros terrestres com ônibus modernos, ar-condicionado, guia especializado e paradas estratégicas.
          </p>
        </div>
      </div>

      {/* Circuits */}
      <div className="flex flex-col">
        {circuits.map((circuit, i) => (
          <motion.div
            key={circuit.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className={`container mx-auto px-6 xl:px-12 pb-20 md:pb-28 flex flex-col gap-10 md:gap-0 ${
              i % 2 === 0
                ? "md:flex-row items-center"
                : "md:flex-row-reverse items-center"
            }`}
          >
            {/* Image */}
            <div className="w-full md:w-3/5 md:pr-16 md:pl-0" style={{ paddingRight: i % 2 !== 0 ? 0 : undefined, paddingLeft: i % 2 !== 0 ? "4rem" : undefined }}>
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
                <img
                  src={circuit.img}
                  alt={circuit.title}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                {/* Region badge */}
                <div className="absolute top-5 left-5">
                  <span
                    className="px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: circuit.color }}
                  >
                    {circuit.region}
                  </span>
                </div>
                {/* Days badge */}
                <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full">
                  <span className="text-white text-xs font-bold">{circuit.days}</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="w-full md:w-2/5">
              <p className="editorial-label mb-3" style={{ color: circuit.color }}>
                {circuit.subtitle}
              </p>
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {circuit.title}
              </h3>
              <p className="text-white/55 text-base leading-relaxed mb-8">
                {circuit.desc}
              </p>

              {/* Stops */}
              <div className="mb-8">
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <MapPin size={12} />
                  Paradas do Roteiro
                </p>
                <div className="flex flex-wrap gap-2">
                  {circuit.stops.map((stop, si) => (
                    <span key={stop} className="flex items-center gap-1.5">
                      <span className="px-4 py-1.5 bg-white/8 border border-white/12 rounded-full text-white/75 text-xs font-medium">
                        {stop}
                      </span>
                      {si < circuit.stops.length - 1 && (
                        <span className="text-white/20 text-xs">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="/circuitos"
                className="inline-flex items-center gap-3 font-bold text-sm group"
                style={{ color: circuit.color }}
              >
                Ver itinerário completo
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all group-hover:scale-110"
                  style={{ borderColor: `${circuit.color}40`, backgroundColor: `${circuit.color}15` }}
                >
                  <ArrowRight size={16} style={{ color: circuit.color }} />
                </span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
