"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, type ComponentType } from "react";
import {
  Car,
  Clock,
  Shield,
  Users,
  Plane,
  Ship,
  Briefcase,
  Building2,
  Sparkles,
  MessageSquare,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DEFAULT_SETTINGS } from "@/lib/site-settings";

type IconType = ComponentType<{ size?: number; className?: string }>;

export type TransferService = { title?: string; icon?: string; description?: string };
export type TransferPhoto = { url?: string; caption?: string };

const ICONS: Record<string, IconType> = {
  Car,
  Clock,
  Shield,
  Users,
  Plane,
  Ship,
  Briefcase,
  Building2,
};

function s(v: unknown) {
  return v == null ? "" : String(v);
}

const DEFAULT_SERVICES: TransferService[] = [
  { title: "Transfers de Aeroporto", icon: "Car", description: "Recepção personalizada nos principais aeroportos do país com monitoramento de voo em tempo real." },
  { title: "Transfers de Porto", icon: "Shield", description: "Conforto e pontualidade para seus embarques e desembarques em cruzeiros." },
  { title: "Eventos & Grupos", icon: "Users", description: "Logística completa para eventos corporativos e grupos familiares com veículos sob medida." },
  { title: "Atendimento Especial", icon: "Clock", description: "Disponibilidade 24/7 para traslados intermunicipais e viagens executivas." },
];

const DEFAULT_GALLERY: TransferPhoto[] = [
  { url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200", caption: "Frota executiva" },
  { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200", caption: "Conforto a bordo" },
  { url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1200", caption: "Viagens executivas" },
];

function waLink(whatsapp: string, message: string) {
  const base = whatsapp || DEFAULT_SETTINGS.whatsapp;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(message)}`;
}

/** Galeria em carrossel: passa sozinha e tem setas + indicadores, como nas outras seções. */
function Gallery({ photos }: { photos: TransferPhoto[] }) {
  const [index, setIndex] = useState(0);
  const total = photos.length;

  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [total]);

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);
  const current = photos[index] ?? {};

  return (
    <div className="relative">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
        <AnimatePresence mode="sync">
          <motion.img
            key={s(current.url) || index}
            src={s(current.url)}
            alt={s(current.caption) || "Transfer Renantur"}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.9 }, scale: { duration: 6, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>

        {s(current.caption) && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-black/50 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            {s(current.caption)}
          </span>
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-primary shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima foto"
              className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-primary shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ver foto ${i + 1} de ${total}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="absolute -bottom-8 -left-6 hidden rounded-[2rem] border border-primary/5 bg-white p-8 shadow-2xl md:block">
        <div className="mb-1 text-4xl font-bold italic text-accent">100%</div>
        <div className="text-[10px] font-bold uppercase leading-none tracking-widest text-primary/40">
          Segurança &amp; Conforto
        </div>
      </div>
    </div>
  );
}

export function TransferView({
  services,
  gallery,
  whatsapp = DEFAULT_SETTINGS.whatsapp,
}: {
  services?: TransferService[];
  gallery?: TransferPhoto[];
  whatsapp?: string;
}) {
  const svcList = services?.length ? services : DEFAULT_SERVICES;
  const photos = (gallery?.length ? gallery : DEFAULT_GALLERY).filter((p) => s(p.url));

  const reservarHref = waLink(
    whatsapp,
    "Olá! Gostaria de reservar um transfer executivo com a Renantur Viagens.",
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pb-20 pt-32"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* ═══ HERO ═══ */}
        <div className="mb-32 grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div>
            <span className="mb-6 block text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Mobilidade Premium
            </span>
            <h1 className="mb-8 text-5xl font-bold tracking-tight text-primary md:text-7xl">
              Transfer <br />
              <span className="font-medium italic text-accent">Executivo.</span>
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-primary/60">
              Segurança, pontualidade e discrição. Oferecemos soluções completas de transporte
              terrestre com veículos de alto padrão e motoristas especializados.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={reservarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl bg-primary px-10 py-5 font-bold text-white shadow-xl shadow-primary/20 transition-transform hover:scale-105"
              >
                <MessageSquare size={20} />
                Reservar agora
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-primary/70">
              <span className="flex items-center gap-2">
                <Shield size={16} className="text-accent" /> Motoristas verificados
              </span>
              <span className="flex items-center gap-2">
                <Sparkles size={16} className="text-accent" /> Veículos de alto padrão
              </span>
            </div>
          </div>

          {/* galeria no lugar da imagem única */}
          <Gallery photos={photos} />
        </div>

        {/* ═══ SERVIÇOS ═══ */}
        <div className="mb-32 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {svcList.map((service, i) => {
            const Icon = ICONS[s(service.icon)] ?? Car;
            return (
              <motion.div
                key={s(service.title) || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-[2.5rem] border border-primary/5 bg-white p-10 shadow-premium transition-all hover:shadow-2xl"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon size={32} />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-primary">{s(service.title)}</h3>
                <p className="leading-relaxed text-primary/60">{s(service.description)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ═══ CTA ═══ */}
        <div className="relative overflow-hidden rounded-[4rem] bg-primary p-12 text-center text-white md:p-24">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-10 text-4xl font-bold md:text-5xl">
              Precisa de um orçamento personalizado?
            </h2>
            <p className="mb-12 text-lg italic text-white/60">
              Fale diretamente com nossa central de reservas e garanta seu transporte com
              exclusividade.
            </p>
            <a
              href={reservarHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto flex w-fit items-center gap-3 rounded-full bg-success px-12 py-6 text-xl font-bold text-white shadow-2xl shadow-success/30 transition-transform hover:scale-105"
            >
              <PhoneCall size={24} />
              Falar no WhatsApp
            </a>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
