"use client";

import { useState, useEffect, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  MapPin,
  Star,
  ShieldCheck,
  Plane,
  Bus,
  Ship,
  Globe,
  BedDouble,
  TrainFront,
  Building2,
  Car,
  Mountain,
  User,
  UtensilsCrossed,
  PartyPopper,
  Footprints,
  Lock,
  CheckCircle2,
  Printer,
  Download,
  ZoomIn,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_SETTINGS } from "@/lib/site-settings";
import { TestimonialsWidget, type Testimonial } from "@/components/site/testimonials-widget";
import { ImageLightbox } from "@/components/site/image-lightbox";

type IconType = ComponentType<{ size?: number; className?: string }>;
type Pkg = Record<string, unknown>;
type Day = { day?: string; title?: string; place?: string; description?: string };

function s(v: unknown): string {
  return v == null ? "" : String(v);
}
function arr(v: unknown): string[] {
  return Array.isArray(v) ? (v as string[]) : [];
}

/** Ícone do selo de categoria. */
function categoryIcon(category: string): IconType {
  if (category === "Rodoviários") return Bus;
  if (category === "Cruzeiros") return Ship;
  if (category === "Internacional") return Globe;
  return Plane;
}

/** Ícone de cada item incluso, conforme o texto. */
function includeIcon(text: string): IconType {
  const t = text.toLowerCase();
  if (/(aéreo|aereo|voo|passagem)/.test(t)) return Plane;
  if (/(ônibus|onibus|rodovi)/.test(t)) return Bus;
  if (/(trem|train)/.test(t)) return TrainFront;
  if (/(cruzeiro|navio|barco)/.test(t)) return Ship;
  if (/(cabine)/.test(t)) return BedDouble;
  if (/(hotel|diária|diaria|pernoite|hosped|pousada)/.test(t)) return BedDouble;
  if (/(city tour|cidade)/.test(t)) return Building2;
  if (/(transfer|traslado)/.test(t)) return Car;
  if (/(guia)/.test(t)) return User;
  if (/(vale|trilha|trekking|caminhada|aventura)/.test(t)) return Footprints;
  if (/(pensão|pensao|café|cafe|refeição|refeicao|alimenta)/.test(t)) return UtensilsCrossed;
  if (/(entretenimento|show|festa)/.test(t)) return PartyPopper;
  if (/(seguro)/.test(t)) return ShieldCheck;
  if (/(passeio|tour|excurs)/.test(t)) return Mountain;
  return Check;
}

const CATEGORY_LABEL: Record<string, string> = {
  Aéreos: "Pacote Aéreo",
  Rodoviários: "Pacote Rodoviário",
  Cruzeiros: "Cruzeiro",
  Internacional: "Pacote Internacional",
};

export function PackageDetail({
  pkg,
  testimonials,
  whatsapp,
  googleReviewsUrl,
}: {
  pkg: Pkg;
  testimonials: Testimonial[];
  whatsapp?: string;
  googleReviewsUrl?: string;
}) {
  const name = s(pkg.name);
  const slug = s(pkg.slug);
  const includesList =
    arr(pkg.highlights).length > 0
      ? arr(pkg.highlights)
      : s(pkg.includes)
          .split(/\s*\+\s*/)
          .map((x) => x.trim())
          .filter(Boolean);
  const itinerary = (Array.isArray(pkg.itinerary) ? pkg.itinerary : []) as Day[];
  const gallery = arr(pkg.gallery);
  const heroImages = Array.from(new Set([s(pkg.img), ...gallery].filter(Boolean)));
  const categoryLabel = CATEGORY_LABEL[s(pkg.category)] ?? "Pacote";
  const CatIcon = categoryIcon(s(pkg.category));
  const composition = includesList.slice(0, 3).join(" + ").toUpperCase();
  const local = s(pkg.location) || name;
  const description =
    s(pkg.description_long) ||
    `Viva uma experiência completa em ${local}, com tudo organizado pela Renantur Viagens — do embarque ao retorno. Roteiro pensado nos mínimos detalhes para você só se preocupar em aproveitar.`;

  const roteiro: Day[] =
    itinerary.length > 0
      ? itinerary
      : [
          { day: "1º DIA", title: "Embarque e chegada", place: local, description: "Recepção, transfer e acomodação. Tempo para se ambientar e começar a viver o destino com tranquilidade." },
          { day: "DURANTE A VIAGEM", title: "Passeios e experiências", place: local, description: `Roteiro completo com ${includesList.slice(0, 3).join(", ").toLowerCase() || "os passeios inclusos"} e acompanhamento de guia, aproveitando o melhor de cada lugar.` },
          { day: "ÚLTIMO DIA", title: "Despedida e retorno", place: local, description: "Tempo livre para os últimos momentos e transfer de retorno, levando na bagagem memórias inesquecíveis." },
        ];

  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (heroImages.length < 2) return;
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [form, setForm] = useState({ nome: "", email: "", telefone: "", quando: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const emailOk = form.email.trim() === "" || /\S+@\S+\.\S+/.test(form.email);
  const valid = form.nome.trim().length > 1 && emailOk && form.telefone.trim().length >= 8;

  async function submitQuote() {
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("quotes").insert({
        name: form.nome.trim(),
        email: form.email.trim(),
        phone: form.telefone.trim(),
        travel_when: form.quando,
        package_id: Number(pkg.id) || null,
        package_name: name,
        status: "novo",
      });
      if (error) throw error;
      setStatus("ok");

      // Encaminha o lead para o WhatsApp da agência com uma mensagem pronta.
      const linhas = [
        `Olá! Vim do site da Renantur e quero um orçamento para o pacote *${name}*.`,
        "",
        `Nome: ${form.nome.trim()}`,
      ];
      if (form.email.trim()) linhas.push(`E-mail: ${form.email.trim()}`);
      linhas.push(`WhatsApp: ${form.telefone.trim()}`);
      if (form.quando) linhas.push(`Quando pretende viajar: ${form.quando}`);
      const texto = linhas.join("\n");

      const base = whatsapp || DEFAULT_SETTINGS.whatsapp;
      const sep = base.includes("?") ? "&" : "?";
      window.location.href = `${base}${sep}text=${encodeURIComponent(texto)}`;
    } catch {
      setStatus("error");
    }
  }

  function handlePrintRoteiro() {
    if (typeof document === "undefined") return;
    document.body.classList.add("print-roteiro-only");
    const cleanup = () => {
      document.body.classList.remove("print-roteiro-only");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
  }

  const fieldCls =
    "w-full rounded-lg border border-white/20 bg-white px-4 py-3 text-sm text-primary placeholder:text-primary/40 outline-none focus:border-accent";
  const ctaCls =
    "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-[13px] font-bold text-white transition-transform hover:scale-105";

  return (
    <div className="bg-background">
      {/* ════════ HERO + INCLUSOS — card único ocupa as 2 linhas (sem buraco) ════════ */}
      <section className="relative">
        {/* faixa de imagem no topo — slide com todas as fotos do pacote */}
        <div className="absolute inset-x-0 top-0 z-0 h-[540px] overflow-hidden">
          <AnimatePresence mode="sync">
            {heroImages.length > 0 && (
              <motion.img
                key={heroImages[heroIndex]}
                src={heroImages[heroIndex]}
                alt={name}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1 }, scale: { duration: 5, ease: "linear" } }}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/55 to-primary/25" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-6 xl:px-12 grid lg:grid-cols-2 gap-x-12 pt-36 pb-20">
          {/* HEADLINE — col1 / row1 (sobre a imagem) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-white lg:col-start-1 lg:row-start-1 lg:min-h-[360px]"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">
              Descubra <span className="text-accent">{name}</span>{" "}
              <span className="text-white/75 font-bold">de um jeito único</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85 leading-relaxed">{description}</p>

            {heroImages.length > 1 && (
              <div className="mt-8 flex items-center gap-2">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setHeroIndex(i)}
                    aria-label={`Ver foto ${i + 1} de ${heroImages.length}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === heroIndex ? "w-8 bg-accent" : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* CARD — col2 / ocupa row1 + row2 (fica ao lado do headline E dos inclusos) */}
          <motion.div
            id="orcamento"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md self-start scroll-mt-28 rounded-3xl bg-primary text-white p-6 md:p-8 shadow-2xl shadow-black/40 ring-1 ring-white/10 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:ml-auto"
          >
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
                <CatIcon size={14} /> {categoryLabel}
              </span>
            </div>

            <h2 className="mt-6 text-center text-[28px] font-extrabold leading-none">{name}</h2>
            {s(pkg.tag) && (
              <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-white/55">
                {s(pkg.tag)}
              </p>
            )}
            {composition && (
              <p className="mt-3 text-center text-xs font-bold uppercase tracking-wide text-white/80">
                {composition}
              </p>
            )}

            {/* preço */}
            <div className="mt-5 flex flex-col items-center gap-2.5">
              {s(pkg.entry) && (
                <>
                  <span className="rounded-md bg-accent px-3 py-1 text-[13px] font-bold">
                    Entrada de R$ {s(pkg.entry)} mais
                  </span>
                  <span className="text-[11px] font-medium text-white/55">
                    Entrada no carnê ou boleto
                  </span>
                </>
              )}
              <div className="flex items-end gap-2">
                <span className="mb-1 text-sm font-semibold text-white/70">{s(pkg.installments)}x de</span>
                <span className="text-xl font-bold">R$</span>
                <span className="text-5xl font-extrabold leading-none">{s(pkg.monthly)}</span>
                <span className="mb-2 rounded-md bg-accent px-2 py-0.5 text-[11px] font-bold">sem juros</span>
              </div>
              {s(pkg.total) && (
                <span className="rounded-md bg-white/15 px-3 py-1 text-[11px] font-bold tracking-wide">
                  R$ {s(pkg.total)} À VISTA
                </span>
              )}
            </div>

            {/* inclusos com ícones */}
            {includesList.length > 0 && (
              <div className="mt-6 rounded-2xl bg-white p-4 text-primary">
                <div className="grid grid-cols-2 gap-x-3 gap-y-3.5">
                  {includesList.slice(0, 8).map((item) => {
                    const Icon = includeIcon(item);
                    return (
                      <div key={item} className="flex items-center gap-2 text-[13px] font-medium">
                        <Icon size={18} className="shrink-0 text-primary" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* formulário */}
            {status === "ok" ? (
              <div className="mt-6 rounded-2xl bg-white/10 p-6 text-center">
                <CheckCircle2 className="mx-auto mb-3 text-success" size={40} />
                <p className="text-lg font-bold">Solicitação enviada! 🎉</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Recebemos seu pedido para <strong>{name}</strong>. Em breve um especialista da
                  Renantur entra em contato.
                </p>
              </div>
            ) : (
              <>
                <h3 className="mt-7 text-center text-[15px] font-bold leading-snug">
                  Receba roteiro + valores exclusivos em até 1 minuto
                </h3>
                <div className="mt-4 space-y-3">
                  <input className={fieldCls} placeholder="Nome completo *" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                  <input className={fieldCls} type="email" placeholder="E-mail (opcional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <input className={fieldCls} placeholder="WhatsApp *" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
                  <select className={fieldCls} value={form.quando} onChange={(e) => setForm({ ...form, quando: e.target.value })}>
                    <option value="">Quando pretende viajar?</option>
                    <option>Nos próximos 3 meses</option>
                    <option>Em 3 a 6 meses</option>
                    <option>Em 6 a 12 meses</option>
                    <option>Ainda estou planejando</option>
                  </select>
                  <button
                    type="button"
                    onClick={submitQuote}
                    disabled={!valid || status === "sending"}
                    className="w-full rounded-xl bg-success px-4 py-3.5 text-[13px] font-bold uppercase tracking-wide text-white shadow-lg shadow-success/25 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {status === "sending" ? "Enviando..." : "Quero meu orçamento agora"}
                  </button>
                  {!valid && (
                    <p className="text-center text-[11px] text-white/50">
                      Preencha nome e WhatsApp para enviar.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-center text-xs text-red-200">
                      Não foi possível enviar agora. Tente novamente em instantes.
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>

          {/* INCLUSOS — col1 / row2 (já no fundo claro, ao lado do card) */}
          <div className="lg:col-start-1 lg:row-start-2 lg:pt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-success">
              <CatIcon size={14} /> {categoryLabel}
            </span>
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-primary">
              {name}{" "}
              {s(pkg.tag) && <span className="italic font-medium text-accent">{s(pkg.tag)}</span>}
            </h2>
            <p className="mt-3 text-primary/50 font-semibold">Confira o que está incluso no pacote:</p>
            <ul className="mt-6 space-y-3.5">
              {includesList.map((item) => {
                const Icon = includeIcon(item);
                return (
                  <li key={item} className="flex items-center gap-3 text-primary/80">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                      <Icon size={18} />
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-primary/70">
              <span className="flex items-center gap-2"><Star size={16} className="text-accent" fill="#FF6B57" />Mais de 12.000 viajantes</span>
              <span className="flex items-center gap-2"><Lock size={16} className="text-success" />Seus dados protegidos</span>
            </div>
            <a href="#orcamento" className={`mt-7 ${ctaCls}`}>
              Quero meu roteiro e valores
            </a>
          </div>
        </div>
      </section>

      {/* ════════ ROTEIRO ════════ */}
      <section id="roteiro-imprimir" className="bg-primary py-20">
        <div className="container mx-auto px-6 xl:px-12">
          <div className="text-center mb-14">
            <p className="editorial-label text-accent mb-3">Dia a dia</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Conheça o roteiro da <span className="italic font-medium text-white/70">sua viagem</span>
            </h2>
            <p className="mt-4 text-white/55">{s(pkg.duration) && `${s(pkg.duration)} · `}{local}</p>

            <div className="no-print mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePrintRoteiro}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-[13px] font-bold text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
              >
                <Printer size={16} /> Imprimir roteiro
              </button>
              {slug && (
                <a
                  href={`/pacotes/${slug}/pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-white transition-transform hover:scale-105"
                >
                  <Download size={16} /> Baixar em PDF
                </a>
              )}
            </div>
          </div>
          <div className="max-w-3xl mx-auto relative border-l-2 border-white/15 pl-8 space-y-12">
            {roteiro.map((d, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[42px] flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">{i + 1}</span>
                {d.day && <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1.5">{d.day}</p>}
                <h3 className="text-xl font-bold text-white mb-1.5">{d.title}</h3>
                {d.place && (
                  <p className="mb-2.5 flex items-center gap-1.5 text-white/50 text-sm font-semibold">
                    <MapPin size={13} className="text-accent" />{d.place}
                  </p>
                )}
                {d.description && <p className="text-white/60 leading-relaxed">{d.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ GALERIA ════════ */}
      {gallery.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6 xl:px-12">
            <div className="text-center mb-12">
              <p className="editorial-label text-accent mb-3">Imagens</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Principais pontos turísticos deste roteiro</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Ampliar imagem ${i + 1}`}
                  className="group relative block h-56 w-full overflow-hidden rounded-2xl shadow-card"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-primary/0 text-white opacity-0 transition-all duration-300 group-hover:bg-primary/30 group-hover:opacity-100">
                    <ZoomIn size={26} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <ImageLightbox
        images={gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />

      {/* ════════ DEPOIMENTOS ════════ */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6 xl:px-12">
            <div className="text-center mb-12">
              <p className="editorial-label text-accent mb-3">Depoimentos</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">O que nossos viajantes têm a dizer</h2>
            </div>
            <div className="max-w-5xl mx-auto">
              <TestimonialsWidget items={testimonials} googleUrl={googleReviewsUrl} rating="5,0" count={78} />
            </div>
          </div>
        </section>
      )}

      {/* ════════ CTA FINAL ════════ */}
      <section className="pb-24 pt-4">
        <div className="container mx-auto px-6 xl:px-12">
          <div className="bg-primary rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Não adie essa <span className="text-accent italic font-medium">experiência.</span>
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                Solicite seu orçamento e garanta as melhores condições para {name} com a Renantur.
              </p>
              <a href="#orcamento" className="inline-flex items-center justify-center gap-3 rounded-full bg-success px-10 py-4 text-base font-bold uppercase tracking-wide text-white shadow-2xl shadow-success/30 transition-transform hover:scale-105">
                Quero meu orçamento agora
              </a>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-20" />
          </div>
        </div>
      </section>
    </div>
  );
}
