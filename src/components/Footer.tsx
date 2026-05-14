import { motion } from "framer-motion";
import { MessageCircle, Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const cities = ["Volta Redonda", "Barra Mansa", "Resende", "Rio de Janeiro", "Nova Iguaçu", "Porto Real", "Quatis", "Piraí", "Seropédica"];

export const Footer = () => {
  return (
    <footer className="bg-primary pt-32 pb-12 text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Regions Served */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Presença Regional</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Cidades que Atendemos</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {cities.map((city) => (
              <span key={city} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white/70 font-medium hover:bg-white/10 transition-colors cursor-default">
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Real Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 border-t border-white/10 pt-20 mb-20">
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-xl">R</div>
              <span className="font-heading text-2xl font-bold text-white">
                Renantur <span className="text-accent">Viagens</span>
              </span>
            </Link>
            <p className="text-white/50 max-w-sm text-lg leading-relaxed mb-10">
              Sua plataforma premium de experiências turísticas. Transformamos destinos em memórias cinematográficas com exclusividade e segurança.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-accent transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-accent transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 tracking-widest text-sm uppercase">Explore</h4>
            <ul className="space-y-4 text-white/50">
              <li><Link to="/pacotes" className="hover:text-accent transition-colors">Pacotes</Link></li>
              <li><Link to="/circuitos" className="hover:text-accent transition-colors">Circuitos Rodoviários</Link></li>
              <li><Link to="/transfer" className="hover:text-accent transition-colors">Serviço de Transfer</Link></li>
              <li><Link to="/galeria" className="hover:text-accent transition-colors">Galeria</Link></li>
              <li><Link to="/quem-somos" className="hover:text-accent transition-colors">Quem Somos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 tracking-widest text-sm uppercase">Contato</h4>
            <ul className="space-y-6 text-white/50">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-accent shrink-0" />
                <span>Sul Fluminense, Rio de Janeiro - Brasil</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-accent shrink-0" />
                <span>(24) 99999-9999</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-accent shrink-0" />
                <span>contato@renantur.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-12 text-white/30 text-xs gap-6">
          <div>© 2026 Renantur Viagens. Todos os direitos reservados.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
