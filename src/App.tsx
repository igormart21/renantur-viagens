import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Pacotes } from "./pages/Pacotes";
import { Destinos } from "./pages/Destinos";
import { Circuitos } from "./pages/Circuitos";
import { Transfer } from "./pages/Transfer";
import { Galeria } from "./pages/Galeria";
import { QuemSomos } from "./pages/QuemSomos";
import { Contato } from "./pages/Contato";

import "./index.css";

// Scroll to Top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// WhatsApp Sticky Button
const WhatsAppButton = () => (
  <a
    href="https://wa.me/55"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-[100] bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
  >
    <svg viewBox="0 0 32 32" width="32" height="32" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.004 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.355.638 4.653 1.848 6.665L2.667 29.333l6.85-1.797A13.276 13.276 0 0 0 16.004 29.333C23.372 29.333 29.333 23.364 29.333 16S23.372 2.667 16.004 2.667zm0 24.267a11.004 11.004 0 0 1-5.614-1.543l-.402-.24-4.065 1.067 1.085-3.963-.263-.418A10.99 10.99 0 0 1 5.003 16c0-6.069 4.935-11.003 11.001-11.003S27.003 9.931 27.003 16s-4.93 10.934-10.999 10.934zm6.03-8.206c-.33-.165-1.952-.963-2.255-1.073-.303-.11-.524-.165-.744.165-.22.33-.854 1.073-1.047 1.294-.193.22-.385.248-.716.083-.33-.165-1.394-.514-2.656-1.638-.982-.875-1.644-1.955-1.837-2.285-.193-.33-.02-.508.145-.673.15-.148.33-.385.496-.578.165-.192.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.744-1.793-1.02-2.454-.268-.643-.54-.556-.744-.566l-.633-.011c-.22 0-.578.082-.88.413-.303.33-1.155 1.128-1.155 2.75s1.183 3.19 1.348 3.41c.165.22 2.327 3.554 5.641 4.985.789.34 1.404.544 1.883.696.79.252 1.51.216 2.079.131.634-.094 1.952-.798 2.228-1.568.275-.77.275-1.43.193-1.568-.083-.138-.303-.22-.633-.385z"/>
    </svg>
    <span className="absolute right-full mr-3 bg-white text-primary px-4 py-2 rounded-full font-bold text-xs shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      Fale conosco
    </span>
  </a>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background relative overflow-x-hidden">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pacotes" element={<Pacotes />} />
            <Route path="/destinos/:id" element={<Destinos />} />
            <Route path="/circuitos" element={<Circuitos />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
