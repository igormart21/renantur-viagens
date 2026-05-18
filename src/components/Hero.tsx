import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=85&w=2560",
    headline: "Patagônia Argentina",
    sub: "selvagem e deslumbrante.",
    place: "Patagônia, Argentina",
  },
  {
    img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=85&w=2560",
    headline: "Torres del Paine",
    sub: "natureza no limite.",
    place: "Chile, América do Sul",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=85&w=2560",
    headline: "Bariloche no inverno",
    sub: "neve e chocolate.",
    place: "Bariloche, Argentina",
  },
  {
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=85&w=2560",
    headline: "Circuito Andino",
    sub: "Argentina · Chile · Bolívia.",
    place: "Cordilheira dos Andes",
  },
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const beflyRef = useRef<HTMLDivElement>(null);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Inject befly widget — script loaded on-demand so the element
  // is guaranteed to be in the DOM when the script runs
  useEffect(() => {
    const container = beflyRef.current;
    if (!container) return;

    const mountWidget = () => {
      container.innerHTML = "";
      const widget = document.createElement("befly-widget");
      widget.setAttribute("language", "pt-br");
      widget.setAttribute("new-tab", "true");
      container.appendChild(widget);
    };

    // Already loaded from a previous mount (e.g. HMR)
    if (document.getElementById("befly-script")) {
      mountWidget();
      return;
    }

    const script = document.createElement("script");
    script.id = "befly-script";
    script.type = "text/javascript";
    script.src =
      "https://static.onertravel.com/widget/search/production/widget-befly.js";
    script.onload = () => {
      // Tiny delay so the custom element has time to register
      setTimeout(mountWidget, 80);
    };
    script.onerror = () => {
      console.warn("Befly widget script failed to load");
    };
    document.head.appendChild(script);
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
          {/* White card that hosts the widget */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/25">
            {/* Widget container — injected via useEffect */}
            <div ref={beflyRef} style={{ minHeight: 72 }} />
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
