import { motion } from "framer-motion";
import { Heart, Award, Users, MapPin, Target, Sparkles } from "lucide-react";

const values = [
  { title: "Paixão por Viajar", icon: Heart, desc: "Não apenas vendemos pacotes, compartilhamos o amor por descobrir o novo." },
  { title: "Excelência & Rigor", icon: Award, desc: "Curadoria rigorosa de hotéis e serviços para garantir o máximo padrão." },
  { title: "Atendimento Humano", icon: Users, desc: "Pessoas reais cuidando de cada detalhe da sua jornada, 24 horas por dia." },
  { title: "Roteiros sob Medida", icon: Target, desc: "Personalização absoluta para que cada viagem seja única e inesquecível." }
];

export const QuemSomos = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" className="h-full w-full object-cover" alt="" />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
        </div>
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight">Nossa <span className="text-accent italic font-medium">História</span></h1>
          <p className="text-white/60 text-xl md:text-2xl max-w-2xl mx-auto font-medium">
            Transformando sonhos em experiências cinematográficas há mais de uma década.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
              className="rounded-[3rem] shadow-2xl" 
              alt="Team" 
            />
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-primary/5 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white">
                  <Sparkles size={32} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">10+ Anos</div>
                  <div className="text-xs font-bold text-primary/30 uppercase tracking-widest">De Experiência</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Quem Somos</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              Especialistas em <br />
              <span className="italic font-medium text-primary/60">curadoria de destinos.</span>
            </h2>
            <div className="space-y-6 text-lg text-primary/60 leading-relaxed">
              <p>
                A <strong>Renantur Viagens</strong> nasceu de um desejo profundo de elevar o padrão do turismo no Brasil. Não somos apenas uma agência; somos arquitetos de memórias.
              </p>
              <p>
                Nossa equipe é formada por viajantes experientes que entendem que o luxo não está apenas no valor, mas na autenticidade da experiência, no atendimento personalizado e na segurança de cada passo.
              </p>
              <p>
                Com sede no Sul Fluminense, servimos orgulhosamente cidades como Volta Redonda, Barra Mansa e Resende, conectando nossa região aos destinos mais deslumbrantes do planeta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-primary">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-white">Nossos Valores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-accent mx-auto mb-8 border border-white/10">
                  <v.icon size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{v.title}</h3>
                <p className="text-white/40 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Region Map Placeholder */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <div className="mb-16">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Autoridade Regional</span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary italic">Presente no seu dia a dia.</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {["Volta Redonda", "Barra Mansa", "Resende", "Rio de Janeiro", "Nova Iguaçu", "Porto Real", "Quatis", "Seropédica"].map(city => (
              <div key={city} className="flex items-center gap-3 bg-primary/5 px-8 py-4 rounded-full border border-primary/5 text-primary font-bold">
                <MapPin size={18} className="text-accent" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
