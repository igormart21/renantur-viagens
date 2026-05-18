import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const circuits = [
  {
    id: 1,
    region: "Nordeste",
    title: "Circuito Nordeste",
    subtitle: "Praias de águas cristalinas e paisagens únicas",
    desc: "Das piscinas naturais de Maragogi às falésias de Porto de Galinhas, um roteiro completo pelo melhor do litoral nordestino.",
    img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=1400",
    stops: ["Maceió", "Maragogi", "Porto de Galinhas"],
    days: "7 a 10 dias",
    color: "#FF6B57",
  },
  {
    id: 2,
    region: "Sul",
    title: "Circuito Sul",
    subtitle: "Enogastronomia, neve e praias deslumbrantes",
    desc: "Da magia europeia de Gramado às praias urbanas de Balneário Camboriú, passando pelas curitibanas charmosas e a ilha da magia.",
    img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=1400",
    stops: ["Gramado", "Curitiba", "Florianópolis", "Balneário Camboriú"],
    days: "8 a 12 dias",
    color: "#3BB273",
  },
  {
    id: 3,
    region: "Sudeste",
    title: "Circuito Rio–Minas",
    subtitle: "História, natureza e o melhor da costa verde",
    desc: "Do Cristo Redentor às igrejas barrocas de Ouro Preto, com parada obrigatória nas enseadas de Angra dos Reis e Arraial do Cabo.",
    img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=1400",
    stops: ["Rio de Janeiro", "Angra dos Reis", "Ouro Preto", "Tiradentes"],
    days: "6 a 9 dias",
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
            <p className="editorial-label text-accent mb-3">Circuito Rodoviário pelo Brasil</p>
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
