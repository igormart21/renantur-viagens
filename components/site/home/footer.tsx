import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { Link } from "@/components/site/router-shim";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-settings";

const RAPIDOS = [
  { label: "Início", href: "/" },
  { label: "Pacotes", href: "/pacotes" },
  { label: "Excursões", href: "/circuitos" },
  { label: "Internacionais", href: "/pacotes" },
  { label: "Cruzeiros", href: "/pacotes" },
  { label: "Aluguel de Ônibus", href: "/transfer" },
];
export const Footer = ({ settings = DEFAULT_SETTINGS }: { settings?: SiteSettings }) => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto grid gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-4 xl:px-10">
        {/* Marca */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-footer-transparent.png"
            alt="Renantur Viagens"
            className="h-20 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Transformamos sonhos em experiências inesquecíveis pela América do Sul e pelo mundo.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent">
              <Instagram size={17} />
            </a>
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent">
              <Facebook size={17} />
            </a>
            <a href={settings.whatsapp} target="_blank" rel="noopener noreferrer" className="flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#00a88c]">
              <WhatsAppIcon size={17} />
            </a>
          </div>
        </div>

        {/* Links rápidos */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white/80">Links rápidos</h4>
          <ul className="mt-4 space-y-2.5">
            {RAPIDOS.map((l) => (
              <li key={l.label}>
                <Link to={l.href} className="text-sm text-white/60 transition-colors hover:text-accent">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white/80">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-2.5"><Phone size={15} className="text-accent" /> {settings.phone}</li>
            <li className="flex items-center gap-2.5"><Mail size={15} className="text-accent" /> {settings.email}</li>
            <li className="flex items-center gap-2.5"><MapPin size={15} className="text-accent" /> {settings.location}</li>
            <li className="flex items-center gap-2.5"><Clock size={15} className="text-accent" /> Seg a Sex · 08h às 18h</li>
          </ul>
        </div>

        {/* Certificações */}
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white/80">Certificações</h4>
          <div className="mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo_cadastur.png"
              alt="Cadastur - Ministério do Turismo"
              className="h-10 w-auto opacity-85 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-white/40 sm:flex-row xl:px-10">
          <p>© 2026 {settings.brand_name} Viagens. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <Link to="/politica-de-privacidade" className="transition-colors hover:text-white/70">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="transition-colors hover:text-white/70">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
