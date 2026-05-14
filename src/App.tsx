import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

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
    className="fixed bottom-10 right-10 z-[100] bg-success text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-bounce group"
  >
    <MessageCircle size={32} fill="white" />
    <span className="absolute right-full mr-4 bg-white text-primary px-6 py-2 rounded-full font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-primary/5">
      Fale com um Especialista
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
