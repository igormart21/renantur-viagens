import { useEffect, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "befly-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        language?: string;
        "new-tab"?: string;
      };
    }
  }
}
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=85&w=2560",
    headline: "Descubra o Brasil",
    sub: "com quem entende.",
    place: "Fernando de Noronha, PE",
  },
  {
    img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=85&w=2560",
    headline: "Rio de Janeiro",
    sub: "inesquecível.",
    place: "Rio de Janeiro, RJ",
  },
  {
    img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=85&w=2560",
    headline: "Nordeste paradisíaco",
    sub: "te espera.",
    place: "Maceió, AL",
  },
  {
    img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=85&w=2560",
    headline: "Gramado & Serra",
    sub: "encantadores.",
    place: "Gramado, RS",
  },
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden">
      {/* Slideshow */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <img
            src={s.img}
            alt={s.place}
            className="h-full w-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/15 to-black/75" />

      {/* ─── Main Content ─── */}
      <div className="relative z-20 container mx-auto px-6 xl:px-12 pt-28 pb-10 flex flex-col items-center">

        {/* Location pill */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current + "-loc"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/15"
          >
            <MapPin size={11} className="text-accent" />
            <span className="text-white/75 text-[10px] font-bold tracking-[0.22em] uppercase">
              {slide.place}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Headline */}
        <div className="text-center mb-4 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.h1
              key={current + "-h"}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-white leading-[0.9] tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              <span className="block font-bold"
                style={{ fontSize: "clamp(3rem, 8.5vw, 7.5rem)" }}>
                {slide.headline}
              </span>
              <span className="block font-semibold italic text-white/60"
                style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}>
                {slide.sub}
              </span>
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <p className="text-white/55 text-sm md:text-base max-w-sm text-center mb-8 leading-relaxed font-light">
          Pacotes aéreos, rodoviários, cruzeiros e transfer —<br className="hidden sm:block" />
          do Sul Fluminense para o mundo.
        </p>

        {/* ─── BEFLY WIDGET ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mb-8"
        >
          <div id="wrapper" className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/25">
            <befly-widget language="pt-br" new-tab="true" />
          </div>
        </motion.div>

        {/* Slide dots */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-1.5 bg-accent"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
