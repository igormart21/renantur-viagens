"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Users } from "lucide-react";
import { Link } from "@/components/site/router-shim";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-settings";

const DEFAULT_SLIDES = [
  "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=85&w=2560",
  "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=85&w=2560",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=85&w=2560",
  "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=85&w=2560",
];

export const Hero = ({
  settings = DEFAULT_SETTINGS,
  slides,
}: {
  settings?: SiteSettings;
  slides?: string[];
}) => {
  const imgs = slides && slides.length ? slides : DEFAULT_SLIDES;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (imgs.length < 2) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % imgs.length), 6000);
    return () => clearInterval(t);
  }, [imgs.length]);

  return (
    <section className="relative">
      {/* Banner */}
      <div className="relative flex min-h-[78vh] items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          {imgs.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt="Renantur Viagens"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === current ? 1 : 0 }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/25 to-primary/25" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-3xl px-6 pb-28 text-center"
        >
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-primary drop-shadow-sm md:text-6xl">
            Seu próximo destino
            <span className="mt-1 block font-script text-5xl font-normal text-accent md:text-7xl">
              começa aqui!
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium text-[#3d4a5d] md:text-lg">
            Viaje com segurança, conforto e experiências inesquecíveis com a Renantur Viagens.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#busca"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Search size={18} /> Solicitar orçamento
            </a>
            <a
              href={settings.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#00a88c] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#00a88c]/30 transition-transform hover:scale-105"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <WhatsAppIcon size={18} /> Falar no WhatsApp
            </a>
          </div>

          {imgs.length > 1 && (
            <div className="mt-9 flex justify-center gap-2">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Imagem ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? "w-7 bg-accent" : "w-1.5 bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Card de busca (sobreposto) */}
      <div id="busca" className="container relative z-20 mx-auto -mt-16 px-5 xl:px-10">
        <form
          action="/pacotes"
          className="grid gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-primary/10 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center md:gap-2 md:p-3"
        >
          <label className="flex items-center gap-3 rounded-xl px-3 py-2 md:border-r md:border-black/5">
            <Search className="size-5 shrink-0 text-[#00a88c]" />
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-primary" style={{ fontFamily: "var(--font-display)" }}>
                Para onde você quer ir?
              </span>
              <input
                name="destino"
                placeholder="Destino ou cidade"
                className="w-full text-sm text-[#6b7280] outline-none placeholder:text-[#9aa3af]"
              />
            </span>
          </label>
          <label className="flex items-center gap-3 rounded-xl px-3 py-2 md:border-r md:border-black/5">
            <Calendar className="size-5 shrink-0 text-[#00a88c]" />
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-primary" style={{ fontFamily: "var(--font-display)" }}>
                Quando?
              </span>
              <input name="data" placeholder="Data da viagem" className="w-full text-sm text-[#6b7280] outline-none placeholder:text-[#9aa3af]" />
            </span>
          </label>
          <label className="flex items-center gap-3 rounded-xl px-3 py-2">
            <Users className="size-5 shrink-0 text-[#00a88c]" />
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-primary" style={{ fontFamily: "var(--font-display)" }}>
                Quantas pessoas?
              </span>
              <input name="pessoas" placeholder="1 pessoa" className="w-full text-sm text-[#6b7280] outline-none placeholder:text-[#9aa3af]" />
            </span>
          </label>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <Search size={18} /> Buscar viagem
          </button>
        </form>
      </div>
    </section>
  );
};
