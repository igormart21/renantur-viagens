"use client";

import { motion } from "framer-motion";
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
  ChevronLeft,
  ChevronRight,
  Bus,
  Snowflake,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
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
  Bus,
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

const DEFAULT_BUS_GALLERY: TransferPhoto[] = [
  { url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200", caption: "Ônibus executivo" },
  { url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1200", caption: "Micro-ônibus" },
  { url: "https://images.unsplash.com/photo-1556122071-e404eaedb77f?auto=format&fit=crop&q=80&w=1200", caption: "Van executiva" },
];

type GalleryBadge = { big: string; small: string };

function waLink(whatsapp: string, message: string) {
  const base = whatsapp || DEFAULT_SETTINGS.whatsapp;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(message)}`;
}

/** Galeria em carrossel: passa sozinha e tem setas + indicadores, como nas outras seções. */
function Gallery({ photos, badge }: { photos: TransferPhoto[]; badge?: GalleryBadge }) {
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
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-primary/5 shadow-2xl">
        {photos.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s(p.url) || i}
            src={s(p.url)}
            alt={s(p.caption) || "Renantur"}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

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

      {badge && (
        <div className="absolute -bottom-8 -left-6 hidden rounded-[2rem] border border-primary/5 bg-white p-8 shadow-2xl md:block">
          <div className="mb-1 text-4xl font-bold italic text-accent">{badge.big}</div>
          <div className="text-[10px] font-bold uppercase leading-none tracking-widest text-primary/40">
            {badge.small}
          </div>
        </div>
      )}
    </div>
  );
}

type SectionBadge = { icon: IconType; label: string };

/** Bloco "texto + carrossel ao lado" reutilizável nas duas seções. */
function IntroSection({
  headingTag: HeadingTag = "h2",
  eyebrow,
  titleTop,
  titleBottom,
  description,
  badges,
  photos,
  galleryBadge,
}: {
  headingTag?: "h1" | "h2";
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  badges: SectionBadge[];
  photos: TransferPhoto[];
  galleryBadge?: GalleryBadge;
}) {
  return (
    <div className="mb-32 grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
      <div>
        <span className="mb-6 block text-xs font-bold uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </span>
        <HeadingTag className="mb-8 text-5xl font-bold tracking-tight text-primary md:text-7xl">
          {titleTop} <br />
          <span className="font-medium italic text-accent">{titleBottom}</span>
        </HeadingTag>
        <p className="mb-8 text-xl leading-relaxed text-primary/60">{description}</p>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-primary/70">
          {badges.map((b) => (
            <span key={b.label} className="flex items-center gap-2">
              <b.icon size={16} className="text-accent" /> {b.label}
            </span>
          ))}
        </div>
      </div>

      <Gallery photos={photos} badge={galleryBadge} />
    </div>
  );
}

export function TransferView({
  services,
  gallery,
  busGallery,
  whatsapp = DEFAULT_SETTINGS.whatsapp,
}: {
  services?: TransferService[];
  gallery?: TransferPhoto[];
  busGallery?: TransferPhoto[];
  whatsapp?: string;
}) {
  const svcList = services?.length ? services : DEFAULT_SERVICES;
  const transferPhotos = (gallery?.length ? gallery : DEFAULT_GALLERY).filter((p) => s(p.url));
  const busPhotos = (busGallery?.length ? busGallery : DEFAULT_BUS_GALLERY).filter((p) => s(p.url));

  const ctaHref = waLink(
    whatsapp,
    "Olá! Gostaria de um orçamento de transporte com a Renantur Viagens.",
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pb-20 pt-32"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* ═══ SEÇÃO 1 — TRANSFER EXECUTIVO ═══ */}
        <IntroSection
          headingTag="h1"
          eyebrow="Mobilidade Premium"
          titleTop="Transfer"
          titleBottom="Executivo."
          description="Segurança, pontualidade e discrição. Oferecemos soluções completas de transporte terrestre com veículos de alto padrão e motoristas especializados."
          badges={[
            { icon: Shield, label: "Motoristas verificados" },
            { icon: Sparkles, label: "Veículos de alto padrão" },
          ]}
          photos={transferPhotos}
          galleryBadge={{ big: "100%", small: "Segurança & Conforto" }}
        />

        {/* ═══ SEÇÃO 2 — ALUGUEL DE ÔNIBUS, VAN E MICRO-ÔNIBUS ═══ */}
        <IntroSection
          eyebrow="Frota para Grupos"
          titleTop="Aluguel de Ônibus,"
          titleBottom="Van & Micro-ônibus."
          description="Fretamento para excursões, eventos corporativos, escolas e grupos. Ônibus, micro-ônibus e vans com ar-condicionado, motorista e documentação sempre em dia."
          badges={[
            { icon: Users, label: "Grupos de todos os tamanhos" },
            { icon: Snowflake, label: "Ar-condicionado" },
          ]}
          photos={busPhotos}
          galleryBadge={{ big: "100%", small: "Segurança & Conforto" }}
        />

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
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16">
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2
                className="mb-3 text-3xl font-bold text-white md:text-4xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Precisa de um orçamento personalizado?
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/50">
                Fale diretamente com nossa central de reservas e garanta seu transporte com
                exclusividade.
              </p>
            </div>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#00a88c] py-1.5 pl-1.5 pr-5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#008878] hover:shadow-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-white">
                <WhatsAppIcon size={18} className="text-[#00a88c]" />
              </span>
              Falar no WhatsApp
            </a>
          </div>
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/[0.04]" />
          <div className="absolute -bottom-8 -right-4 h-60 w-60 rounded-full bg-accent/[0.08]" />
        </div>
      </div>
    </motion.div>
  );
}
