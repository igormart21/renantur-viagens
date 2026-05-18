import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "Carla Mendonça",
    city: "Volta Redonda, RJ",
    stars: 5,
    text: "Viagem para Maceió e Maragogi perfeita! Tudo organizado, ônibus confortável e o Renan super atencioso do começo ao fim. Já estamos planejando a próxima viagem com eles!",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Roberto Almeida",
    city: "Barra Mansa, RJ",
    stars: 5,
    text: "Família viajou para Gramado com a Renantur. Hotel ótimo, passeios incríveis e atendimento impecável. Preço honesto e tudo dentro do prometido. Recomendo demais!",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Fernanda Costa",
    city: "Resende, RJ",
    stars: 5,
    text: "Contratei o pacote para Porto de Galinhas e superou todas as expectativas. Hotel na beira-mar, jangada incluída e guia muito simpático. Voltarei com certeza!",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Marcos Souza",
    city: "Porto Real, RJ",
    stars: 5,
    text: "Transfer para o Galeão impecável! Motorista pontual, carro limpo e chegamos com tranquilidade. Serviço de qualidade, preço justo. Uso sempre que viajo.",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Ana Paula Ferreira",
    city: "Volta Redonda, RJ",
    stars: 5,
    text: "Fiz o circuito Sul com eles — Gramado, Curitiba e Florianópolis. Que roteiro maravilhoso! Cada detalhe foi pensado. Com certeza a melhor agência do Sul Fluminense.",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "João Carlos Lima",
    city: "Quatis, RJ",
    stars: 5,
    text: "Cruzeiro pelo litoral sul, tudo perfeito. A Renantur cuidou de todo o processo, desde o embarque até o retorno. Atendimento humano e muito carinho com os clientes.",
    photo: "https://randomuser.me/api/portraits/men/54.jpg",
  },
];

const AUTO_DELAY = 5000;

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FBBC04" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), AUTO_DELAY);
    return () => clearInterval(t);
  }, [go, paused]);

  const t = testimonials[index];

  return (
    <section
      className="py-24 md:py-32 bg-background overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto px-6 xl:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="editorial-label text-accent mb-3">Avaliações Google</p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              O que nossos clientes
              <br />
              <em className="font-semibold text-primary/50">dizem sobre nós.</em>
            </h2>
          </div>

          {/* Google Badge */}
          <a
            href="https://share.google/JXGU2F8MGWyswp9ln"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-4 bg-white border border-primary/8 rounded-2xl px-6 py-4 shadow-card hover:shadow-lg transition-all group"
          >
            <GoogleIcon />
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <p className="text-xs font-bold text-primary">5.0 no Google</p>
              <p className="text-[10px] text-primary/40 font-medium">Ver todas as avaliações</p>
            </div>
            <ExternalLink size={13} className="text-primary/30 group-hover:text-accent transition-colors ml-1" />
          </a>
        </div>

        {/* Single-card carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl p-8 md:p-12 border border-primary/6 shadow-card"
              >
                {/* Quote mark */}
                <span
                  className="block text-8xl leading-none text-accent/20 font-serif mb-2 select-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  "
                </span>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.stars)].map((_, si) => <StarIcon key={si} />)}
                </div>

                {/* Text */}
                <p className="text-foreground/70 text-lg md:text-xl leading-relaxed mb-10">
                  {t.text}
                </p>

                {/* Reviewer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/10"
                    />
                    <div>
                      <p className="font-bold text-primary text-base leading-tight">{t.name}</p>
                      <p className="text-xs text-primary/40 font-medium mt-0.5">{t.city}</p>
                    </div>
                  </div>
                  <div className="opacity-25">
                    <GoogleIcon />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 h-2 bg-accent"
                      : "w-2 h-2 bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                className="w-11 h-11 rounded-full border border-primary/12 bg-white flex items-center justify-center text-primary/50 hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-11 h-11 rounded-full border border-primary/12 bg-white flex items-center justify-center text-primary/50 hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* CTA Google */}
        <div className="text-center mt-14">
          <a
            href="https://share.google/JXGU2F8MGWyswp9ln"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white border-2 border-primary/10 text-primary px-8 py-4 rounded-full font-bold text-sm hover:border-primary hover:shadow-lg transition-all duration-300 group"
          >
            <GoogleIcon />
            Ver todas as avaliações no Google
            <ExternalLink size={13} className="text-primary/40 group-hover:text-primary transition-colors" />
          </a>
        </div>

      </div>
    </section>
  );
};
