import { motion } from "framer-motion";
import { Heart, CreditCard, Compass, ShieldCheck, Headphones, Sparkles } from "lucide-react";

const features = [
  { title: "Atendimento humanizado", icon: Heart, desc: "Pessoas apaixonadas por viagens cuidando de cada detalhe da sua." },
  { title: "Parcelamento facilitado", icon: CreditCard, desc: "Viabilizamos seu sonho com as melhores condições do mercado." },
  { title: "Roteiros exclusivos", icon: Compass, desc: "Curadoria especializada em destinos fora do óbvio e experiências premium." },
  { title: "Suporte especializado", icon: Headphones, desc: "Assistência total durante toda a sua viagem, onde quer que você esteja." },
  { title: "Viagens seguras", icon: ShieldCheck, desc: "Segurança e tranquilidade em todos os traslados e hospedagens selecionadas." },
  { title: "Experiência completa", icon: Sparkles, desc: "Do planejamento ao retorno, garantimos uma jornada sem preocupações." },
];

export const WhyUsSection = () => {
  return (
    <section id="sobre" className="py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Por que viajar conosco</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            Excelência em cada <br />
            <span className="italic font-medium text-primary/60">detalhe da sua jornada.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] shadow-premium hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-8 transition-colors group-hover:bg-accent group-hover:text-white">
                <item.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
              <p className="text-primary/60 leading-relaxed text-lg">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
