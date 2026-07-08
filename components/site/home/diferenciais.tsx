import {
  HeartHandshake,
  UserCheck,
  BusFront,
  Headset,
  CreditCard,
  ShieldCheck,
  BadgeCheck,
  Award,
} from "lucide-react";
import { Reveal } from "./reveal";

const ITENS = [
  { icon: HeartHandshake, label: "Atendimento personalizado" },
  { icon: UserCheck, label: "Guia acompanhando o grupo" },
  { icon: BusFront, label: "Transporte executivo" },
  { icon: Headset, label: "Suporte durante toda a viagem" },
  { icon: CreditCard, label: "Parcelamento facilitado" },
  { icon: ShieldCheck, label: "Segurança e confiança" },
  { icon: BadgeCheck, label: "Empresa cadastrada no Cadastur" },
  { icon: Award, label: "Experiência no mercado" },
];

export const Diferenciais = () => {
  return (
    <section className="container mx-auto px-5 xl:px-10">
      <Reveal>
        <div className="rounded-3xl bg-primary px-6 py-10 text-white md:px-12 md:py-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
            Por que escolher a Renantur?
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
            Experiência, segurança e{" "}
            <span className="text-accent">momentos inesquecíveis!</span>
          </h2>

          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
            {ITENS.map((it) => (
              <div key={it.label} className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#00a88c]">
                  <it.icon className="size-5" strokeWidth={1.6} />
                </span>
                <span className="text-sm font-medium leading-snug text-white/85">{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};
