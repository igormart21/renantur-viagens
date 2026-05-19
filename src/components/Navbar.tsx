import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/PHOTO-2026-05-13-10-58-38.png";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: "Início", href: "/" },
    {
      name: "Pacotes",
      href: "/pacotes",
      dropdown: ["Pacotes Aéreos", "Pacotes Rodoviários", "Internacional", "Cruzeiros"],
    },
    {
      name: "Destinos",
      href: "#",
      dropdown: ["Maceió", "Maragogi", "Porto de Galinhas", "Fernando de Noronha", "Salvador", "Gramado", "Florianópolis", "Rio de Janeiro"],
    },
    { name: "Circuitos", href: "/circuitos" },
    { name: "Transfer", href: "/transfer" },
    { name: "Galeria", href: "/galeria" },
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Contato", href: "/contato" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white shadow-md border-b border-primary/5 py-2"
          : "bg-white/95 backdrop-blur-md border-b border-primary/5 py-2"
      }`}
    >
      <div className="container mx-auto px-6 xl:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center outline-none focus:outline-none" style={{ textDecoration: "none" }}>
          <img
            src={logo}
            alt="Renantur Viagens"
            className="h-14 w-auto object-contain select-none"
            draggable={false}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-7">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.href}
                className="flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors hover:text-accent text-foreground/70"
              >
                {link.name}
                {link.dropdown && (
                  <ChevronDown
                    size={11}
                    className={`transition-transform duration-200 ${activeDropdown === link.name ? "rotate-180" : ""}`}
                  />
                )}
              </Link>

              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white rounded-2xl shadow-2xl shadow-black/8 overflow-hidden py-2 border border-primary/6"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item}
                          to={
                            link.name === "Pacotes"
                              ? "/pacotes"
                              : `/destinos/${item.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ /g, "-")}`
                          }
                          className="block px-5 py-2.5 text-sm text-foreground/70 hover:text-accent hover:bg-primary/4 transition-colors font-semibold"
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X size={26} className="text-primary" />
          ) : (
            <Menu size={26} className="text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center px-8 pt-8 pb-6 border-b border-primary/6">
              <img src={logo} alt="Renantur Viagens" className="h-12 w-auto object-contain" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-11 h-11 bg-primary/5 rounded-full flex items-center justify-center"
              >
                <X size={22} className="text-primary" />
              </button>
            </div>

            <div className="flex flex-col px-8 py-6 gap-1 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="block py-4 text-2xl font-semibold text-primary border-b border-primary/5 hover:text-accent transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="flex flex-wrap gap-2 pt-3 pb-2 pl-2">
                      {link.dropdown.slice(0, 4).map((item) => (
                        <span key={item} className="text-xs text-primary/40 font-medium bg-primary/4 px-3 py-1 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="px-8 pb-10">
              <a
                href="https://wa.me/55"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-success text-white py-5 rounded-2xl font-bold text-base w-full shadow-lg shadow-success/20"
              >
                <Phone size={20} />
                Falar com Especialista
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
