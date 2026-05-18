import { Instagram, Facebook, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cities = [
  "Volta Redonda", "Barra Mansa", "Quatis", "Floriano", "Porto Real",
  "Resende", "Piraí", "Barra do Piraí", "Rio de Janeiro", "Seropédica",
  "Queimados", "Nova Iguaçu", "São João de Meriti",
];

const links = {
  viagens: [
    { label: "Pacotes Aéreos", href: "/pacotes" },
    { label: "Pacotes Rodoviários", href: "/circuitos" },
    { label: "Cruzeiros", href: "/pacotes" },
    { label: "Internacional", href: "/pacotes" },
    { label: "Transfer", href: "/transfer" },
  ],
  destinos: [
    { label: "Nordeste", href: "/pacotes" },
    { label: "Sul do Brasil", href: "/pacotes" },
    { label: "Sudeste", href: "/pacotes" },
    { label: "Galeria de Fotos", href: "/galeria" },
  ],
  empresa: [
    { label: "Quem Somos", href: "/quem-somos" },
    { label: "Contato", href: "/contato" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-primary overflow-hidden">
      {/* Cidades Atendidas */}
      <div className="border-b border-white/8 py-14">
        <div className="container mx-auto px-6 xl:px-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="shrink-0">
              <p className="editorial-label text-accent mb-1">Presença regional</p>
              <p className="text-white/40 text-xs">Atendemos toda a região</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <span
                  key={city}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/6 border border-white/10 rounded-full text-white/60 text-xs font-medium hover:bg-white/10 transition-colors cursor-default"
                >
                  <MapPin size={10} className="text-accent" />
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 xl:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-12 xl:gap-16">
          {/* Brand */}
          <div className="xl:col-span-2">
            <Link to="/" className="flex flex-col mb-6">
              <span
                className="text-white text-3xl font-bold leading-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Renantur
              </span>
              <span className="text-accent text-[10px] font-bold tracking-[0.22em] uppercase mt-0.5">
                Viagens & Turismo
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
              Especialistas em turismo no Sul Fluminense. Transformamos destinos em memórias para você e sua família.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-8">
              <a href="https://wa.me/55" className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors group">
                <Phone size={15} className="text-accent" />
                <span>(24) 99999-9999</span>
              </a>
              <a href="mailto:contato@renantur.com.br" className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors">
                <Mail size={15} className="text-accent" />
                <span>contato@renantur.com.br</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/6 border border-white/12 rounded-full flex items-center justify-center text-white/60 hover:bg-accent hover:border-accent hover:text-white transition-all"
              >
                <Instagram size={17} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/6 border border-white/12 rounded-full flex items-center justify-center text-white/60 hover:bg-accent hover:border-accent hover:text-white transition-all"
              >
                <Facebook size={17} />
              </a>
            </div>
          </div>

          {/* Viagens */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.18em] mb-5">Viagens</h4>
            <ul className="space-y-3">
              {links.viagens.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-white/45 text-sm hover:text-accent transition-colors flex items-center gap-1.5 group">
                    <span>{l.label}</span>
                    <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.18em] mb-5">Destinos</h4>
            <ul className="space-y-3">
              {links.destinos.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-white/45 text-sm hover:text-accent transition-colors flex items-center gap-1.5 group">
                    <span>{l.label}</span>
                    <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa + CTA */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.18em] mb-5">Empresa</h4>
            <ul className="space-y-3 mb-8">
              {links.empresa.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-white/45 text-sm hover:text-accent transition-colors flex items-center gap-1.5 group">
                    <span>{l.label}</span>
                    <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-6 xl:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2026 Renantur Viagens. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">Termos de Uso</a>
            <a href="#" className="text-white/25 text-xs hover:text-white/60 transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
