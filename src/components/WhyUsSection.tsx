import { motion } from "framer-motion";

const features = [
  {
    num: "01",
    title: "Atendimento Humanizado",
    desc: "Pessoas apaixonadas por viagens cuidando de cada detalhe — do planejamento ao retorno.",
  },
  {
    num: "02",
    title: "Parcelamento Facilitado",
    desc: "Realize seu sonho com as melhores condições do mercado. Parcele em até 12x sem juros.",
  },
  {
    num: "03",
    title: "Roteiros Exclusivos",
    desc: "Curadoria especializada em destinos fora do óbvio. Cada roteiro é pensado com carinho.",
  },
  {
    num: "04",
    title: "Suporte 24/7",
    desc: "Assistência completa durante toda a viagem, onde quer que você esteja no Brasil ou no mundo.",
  },
  {
    num: "05",
    title: "Viagens Seguras",
    desc: "Transportes homologados, hospedagens verificadas e toda a segurança que sua família merece.",
  },
  {
    num: "06",
    title: "Experiência Completa",
    desc: "Do orçamento ao retorno, cuidamos de tudo. Você só precisa fazer as malas e aproveitar.",
  },
];

export const WhyUsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <p className="editorial-label text-accent mb-3">Por que nos escolher</p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Excelência em cada
              <br />
              <em className="font-semibold text-primary/50">detalhe da jornada.</em>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-foreground/50 text-sm leading-relaxed">
              Somos especialistas em turismo no Sul Fluminense, levando famílias e grupos a descobrir o melhor do Brasil.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/8 rounded-2xl overflow-hidden border border-primary/8">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-background p-8 md:p-10 group hover:bg-white transition-colors duration-300 relative overflow-hidden"
            >
              {/* Big number (decorative) */}
              <span
                className="absolute -top-3 -right-2 text-8xl font-bold text-primary/4 leading-none select-none pointer-events-none transition-colors duration-300 group-hover:text-primary/7"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {f.num}
              </span>

              {/* Number pill */}
              <span className="inline-block text-[10px] font-bold text-accent tracking-[0.2em] mb-5 bg-accent/8 px-3 py-1 rounded-full">
                {f.num}
              </span>

              <h3
                className="text-xl md:text-2xl font-bold text-primary mb-3 leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {f.title}
              </h3>
              <p className="text-foreground/50 text-sm leading-relaxed">{f.desc}</p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            { num: "500+", label: "Famílias atendidas" },
            { num: "30+", label: "Destinos no portfólio" },
            { num: "10+", label: "Anos de experiência" },
            { num: "13", label: "Cidades atendidas" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold text-primary mb-1"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {stat.num}
              </div>
              <div className="text-xs text-foreground/40 font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
