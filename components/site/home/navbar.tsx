"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Link, useLocation } from "@/components/site/router-shim";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-settings";

const LINKS = [
  { label: "Início", href: "/" },
  { label: "Pacotes", href: "/pacotes" },
  { label: "Excursões", href: "/circuitos" },
  { label: "Internacionais", href: "/pacotes?categoria=Internacional" },
  { label: "Cruzeiros", href: "/pacotes?categoria=Cruzeiros" },
  { label: "Aluguel de Ônibus", href: "/transfer" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Contato", href: "/contato" },
];

export const Navbar = ({ settings = DEFAULT_SETTINGS }: { settings?: SiteSettings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const searchParams = useSearchParams();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    const [hrefPath, hrefQuery] = href.split("?");
    if (hrefPath === "/") return pathname === "/";
    if (pathname !== hrefPath) return false;
    const hrefCategoria = new URLSearchParams(hrefQuery).get("categoria");
    return hrefCategoria ? searchParams.get("categoria") === hrefCategoria : !searchParams.get("categoria");
  };

  return (
    <header
      style={{ paddingTop: scrolled ? 4 : 7, paddingBottom: scrolled ? 4 : 7 }}
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-5 xl:px-10">
        {/* Logo (fundo transparente sobre navbar branco) */}
        <Link to="/" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/renantur-logo.png"
            alt="Renantur Viagens"
            style={{ height: scrolled ? 52 : 62 }}
            className="w-auto object-contain transition-all"
            draggable={false}
          />
        </Link>

        {/* Menu desktop */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.label}
                to={l.href}
                className={`rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
                  active ? "text-accent" : "text-[#3d4a5d] hover:bg-primary/5 hover:text-primary"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={settings.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2.5 rounded-full bg-[#00a88c] py-1.5 pl-1.5 pr-5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#008878] hover:shadow-lg sm:inline-flex"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-white">
              <WhatsAppIcon size={18} className="text-[#00a88c]" />
            </span>
            Fale no WhatsApp
          </a>
          <button
            className="flex size-10 items-center justify-center rounded-lg text-primary xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav className="border-t border-black/5 bg-white px-5 py-3 xl:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-3 text-base font-medium ${
                isActive(l.href) ? "text-accent" : "text-[#3d4a5d] hover:bg-primary/5 hover:text-primary"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={settings.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#00a88c] px-5 py-3 text-sm font-semibold text-white"
          >
            <WhatsAppIcon size={18} /> Fale no WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
};
