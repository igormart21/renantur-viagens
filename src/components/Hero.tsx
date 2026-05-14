import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />
        <div className="absolute inset-0 bg-black/40 cinematic-overlay" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 pt-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-8 md:mb-12"
        >
          <span className="inline-block text-accent font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6">
            Renantur Viagens Premium
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 leading-[1] md:leading-[0.9] tracking-tight">
            Transformamos destinos em <br className="hidden md:block" />
            <span className="text-white/90 italic font-medium">experiências inesquecíveis.</span>
          </h1>
          <p className="text-base md:text-xl text-white/80 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
            Pacotes rodoviários, aéreos, cruzeiros e experiências exclusivas pelo Brasil e América do Sul.
          </p>
        </motion.div>

        {/* Search Widget Container (The Centerpiece) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mb-16"
        >
          <div className="glass-dark p-3 rounded-[3rem] shadow-glass border border-white/10 overflow-hidden">
            <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
              <div className="flex-1 w-full text-left">
                <div className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-3">Reserve seu sonho</div>
                <div className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-primary tracking-tight">
                  <Search size={32} className="text-accent" />
                  Para onde vamos?
                </div>
              </div>
              <div className="hidden lg:block h-16 w-px bg-primary/10 mx-4" />
              <div className="flex-1 w-full hidden md:flex items-center gap-5 opacity-40">
                <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-2xl">🏝️</div>
                <div className="text-left">
                  <div className="text-xs font-bold text-primary/40 uppercase">Temporada</div>
                  <div className="text-sm font-semibold text-primary">Selecione as datas</div>
                </div>
              </div>
              <button className="w-full md:w-auto bg-primary text-white px-14 py-6 rounded-[1.5rem] font-bold text-lg transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                Pesquisar
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="text-white font-bold flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center transition-transform group-hover:scale-110">
              <ArrowRight size={20} />
            </span>
            Fale com um especialista
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 to-white/60" />
      </motion.div>
    </section>
  );
};
