import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

const circuits = [
  {
    id: 1,
    region: "Nordeste",
    title: "Circuito Nordeste",
    subtitle: "Maceió · Maragogi · Porto de Galinhas",
    desc: "Das piscinas naturais de Maragogi às falésias coloridas de Porto de Galinhas, passando pelas praias urbanas de Maceió. O nordeste em sua melhor versão.",
    img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=1400",
    stops: ["Maceió", "Maragogi", "Porto de Galinhas"],
    days: "7 a 10 dias",
    from: "2.490",
    accent: "#FF6B57",
  },
  {
    id: 2,
    region: "Sul",
    title: "Circuito Sul",
    subtitle: "Gramado · Curitiba · Florianópolis · Balneário",
    desc: "Da arquitetura europeia de Gramado às praias de águas esverdeadas de Florianópolis. Um roteiro que mistura gastronomia, natureza e praias deslumbrantes.",
    img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=1400",
    stops: ["Gramado", "Canela", "Curitiba", "Florianópolis", "Balneário Camboriú"],
    days: "8 a 12 dias",
    from: "2.100",
    accent: "#3BB273",
  },
  {
    id: 3,
    region: "Sudeste",
    title: "Circuito Rio–Minas",
    subtitle: "Rio de Janeiro · Angra · Ouro Preto · Tiradentes",
    desc: "Do Cristo Redentor às igrejas barrocas de Ouro Preto. Com parada nas enseadas de Angra dos Reis e nas ruas de pedra de Tiradentes — um roteiro histórico e cinematográfico.",
    img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=1400",
    stops: ["Rio de Janeiro", "Angra dos Reis", "Arraial do Cabo", "Ouro Preto", "Tiradentes"],
    days: "6 a 9 dias",
    from: "1.690",
    accent: "#0F6D7A",
  },
  {
    id: 4,
    region: "Centro-Oeste & Norte",
    title: "Circuito Pantanal & Bonito",
    subtitle: "Campo Grande · Bonito · Miranda · Pantanal",
    desc: "Das grutas cristalinas de Bonito à imensidão do Pantanal. Um roteiro para quem busca natureza selvagem, mergulho em rios transparentes e contemplação total.",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1400",
    stops: ["Campo Grande", "Bonito", "Miranda", "Pantanal"],
    days: "6 a 8 dias",
    from: "3.200",
    accent: "#FF6B57",
  },
];

export const Circuitos = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-primary"
    >
      {/* Page Header */}
      <div className="pt-36 pb-12 container mx-auto px-6 xl:px-12">
        <p className="editorial-label text-accent mb-3">Road Trips & Expedições</p>
        <h1
          className="text-5xl md:text-8xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Circuito Rodoviário
          <br />
          <em className="text-white/35 font-semibold">pelo Brasil.</em>
        </h1>
        <p className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed">
          Acreditamos que a estrada é parte fundamental da experiência. Ônibus modernos, guia especializado e paradas que valem a viagem.
        </p>
      </div>

      {/* Circuits */}
      <div className="container mx-auto px-6 xl:px-12 pb-24 flex flex-col gap-20 md:gap-28">
        {circuits.map((circuit, i) => (
          <motion.div
            key={circuit.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className={`flex flex-col gap-10 lg:gap-16 ${
              i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center`}
          >
            {/* Image */}
            <div className="w-full lg:w-3/5 relative group">
              <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
                <img
                  src={circuit.img}
                  alt={circuit.title}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
              {/* Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className="px-4 py-2 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-lg"
                  style={{ backgroundColor: circuit.accent }}
                >
                  {circuit.region}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="text-white text-xs font-bold">{circuit.days}</span>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-2/5">
              <p className="editorial-label mb-3" style={{ color: circuit.accent }}>
                {circuit.subtitle}
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {circuit.title}
              </h2>
              <p className="text-white/55 text-sm md:text-base leading-relaxed mb-8">
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
                      <span className="px-3 py-1.5 bg-white/8 border border-white/12 rounded-full text-white/75 text-xs font-medium">
                        {stop}
                      </span>
                      {si < circuit.stops.length - 1 && (
                        <span className="text-white/20 text-xs">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price + CTA */}
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">A partir de</p>
                  <p
                    className="text-white text-3xl font-bold"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    R$ {circuit.from}
                  </p>
                </div>
                <a
                  href="https://wa.me/55"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
                  style={{ backgroundColor: circuit.accent }}
                >
                  <Phone size={14} />
                  Reservar
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 xl:px-12 pb-24">
        <div className="bg-white/8 border border-white/12 rounded-3xl p-10 md:p-16 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Quer um circuito personalizado?
          </h2>
          <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
            Monte seu próprio roteiro rodoviário com as paradas que você mais quer conhecer.
          </p>
          <a
            href="https://wa.me/55"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-white px-10 py-4 rounded-full font-bold text-sm shadow-xl shadow-accent/20 hover:scale-105 transition-transform"
          >
            <Phone size={16} />
            Falar com especialista
          </a>
        </div>
      </div>
    </motion.div>
  );
};
