import { motion } from "framer-motion";
import { Car, Clock, Shield, Users, MessageSquare, PhoneCall } from "lucide-react";

const services = [
  { title: "Transfers de Aeroporto", icon: Car, desc: "Recepção personalizada nos principais aeroportos do país com monitoramento de voo em tempo real." },
  { title: "Transfers de Porto", icon: Shield, desc: "Conforto e pontualidade para seus embarques e desembarques em cruzeiros." },
  { title: "Eventos & Grupos", icon: Users, desc: "Logística completa para eventos corporativos e grupos familiares com veículos sob medida." },
  { title: "Atendimento Especial", icon: Clock, desc: "Disponibilidade 24/7 para traslados intermunicipais e viagens executivas." }
];

export const Transfer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-background min-h-screen"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Mobilidade Premium</span>
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 tracking-tight">
              Transfer <br />
              <span className="text-accent italic font-medium">Executivo.</span>
            </h1>
            <p className="text-xl text-primary/60 leading-relaxed mb-10">
              Segurança, pontualidade e discrição. Oferecemos soluções completas de transporte terrestre com veículos de alto padrão e motoristas especializados.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2">
                <MessageSquare size={20} />
                Reservar agora
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" 
              className="rounded-[3rem] shadow-2xl h-[500px] w-full object-cover" 
              alt="Luxury Car" 
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-primary/5 hidden md:block">
              <div className="text-accent font-bold text-4xl mb-1 italic">100%</div>
              <div className="text-primary/40 font-bold uppercase text-[10px] tracking-widest leading-none">Segurança & Conforto</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] shadow-premium hover:shadow-2xl transition-all border border-primary/5 group"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-accent group-hover:text-white transition-colors">
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
              <p className="text-primary/60 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-primary rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-10">Precisa de um orçamento personalizado?</h2>
            <p className="text-white/60 text-lg mb-12 italic">Fale diretamente com nossa central de reservas e garanta seu transporte com exclusividade.</p>
            <button className="bg-success text-white px-12 py-6 rounded-full font-bold text-xl flex items-center gap-3 mx-auto transition-transform hover:scale-105 shadow-2xl shadow-success/30">
              <PhoneCall size={24} />
              (24) 99999-9999
            </button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};
