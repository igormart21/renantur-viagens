import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: "HOME", href: "/" },
    { 
      name: "PACOTES", 
      href: "/pacotes",
      dropdown: ["Pacotes Aéreos", "Pacotes Rodoviários", "Pacotes Internacionais", "Cruzeiros"]
    },
    { 
      name: "DESTINOS", 
      href: "#",
      dropdown: ["Maceió", "Maragogi", "Porto de Galinhas", "Gramado", "Fernando de Noronha", "Porto Seguro", "Salvador", "Natal", "Rio de Janeiro"]
    },
    { name: "CIRCUITOS", href: "/circuitos" },
    { name: "TRANSFER", href: "/transfer" },
    { name: "GALERIA", href: "/galeria" },
    { name: "QUEM SOMOS", href: "/quem-somos" },
    { name: "CONTATO", href: "/contato" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || location.pathname !== "/" ? "bg-white/90 backdrop-blur-lg shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">R</div>
          <span className={`font-heading text-2xl font-bold tracking-tight ${isScrolled || location.pathname !== "/" ? "text-primary" : "text-white"}`}>
            Renantur <span className="text-accent">Viagens</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.href}
                className={`text-[11px] font-bold tracking-[0.1em] transition-colors hover:text-accent flex items-center gap-1 ${
                  isScrolled || location.pathname !== "/" ? "text-primary/70" : "text-white/80"
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={12} className="opacity-50" />}
              </Link>

              {/* Dropdown Menu */}
              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-64 bg-white shadow-2xl rounded-2xl overflow-hidden py-4 border border-primary/5"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item}
                          to={`/destinos/${item.toLowerCase().replace(/ /g, "-")}`}
                          className="block px-8 py-3 text-sm font-medium text-primary/60 hover:text-accent hover:bg-primary/5 transition-colors"
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
          <a
            href="https://wa.me/55"
            className="flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-wider transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 active:scale-95 ml-4"
          >
            <Phone size={14} />
            Fale no WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={28} className={isScrolled || location.pathname !== "/" ? "text-primary" : "text-white"} />
          ) : (
            <Menu size={28} className={isScrolled || location.pathname !== "/" ? "text-primary" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-heading text-2xl font-bold text-primary">Renantur</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 mb-12">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-primary/5 pb-4">
                  <Link
                    to={link.href}
                    className="text-2xl font-bold text-primary hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="mt-4 flex flex-col gap-3 pl-4">
                      {link.dropdown.slice(0, 4).map(item => (
                        <Link key={item} to="#" className="text-primary/40 font-medium">{item}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/55"
              className="mt-auto flex items-center justify-center gap-3 bg-success text-white py-6 rounded-2xl font-bold text-lg"
            >
              <Phone size={20} />
              WhatsApp Especialista
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
