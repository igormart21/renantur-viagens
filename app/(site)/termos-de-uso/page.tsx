"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const SECOES = [
  {
    title: "1. Aceitação dos termos",
    body: "Ao acessar e utilizar este site ou contratar qualquer serviço da Renantur Viagens, você concorda com os termos e condições descritos nesta página. Caso não concorde, recomendamos que não utilize nossos serviços.",
  },
  {
    title: "2. Sobre os serviços",
    body: "A Renantur Viagens atua como agência de turismo, intermediando e organizando pacotes de viagem, excursões, transfers e cruzeiros, incluindo transporte, hospedagem, passeios e demais serviços descritos em cada pacote. As informações de cada pacote (duração, roteiro, valores e condições) estão sujeitas a confirmação e disponibilidade no momento da reserva.",
  },
  {
    title: "3. Reservas e pagamentos",
    body: "As reservas são confirmadas mediante o pagamento da entrada e a formalização do contrato de prestação de serviços. Os valores, formas de pagamento (incluindo entrada via carnê ou boleto) e parcelamento são informados no momento do orçamento e podem variar conforme o destino, a data e a disponibilidade.",
  },
  {
    title: "4. Cancelamentos e reembolsos",
    body: "As condições de cancelamento, remarcação e reembolso variam de acordo com o pacote contratado e as políticas dos fornecedores envolvidos (hotéis, companhias aéreas, operadoras). Essas condições são informadas no contrato de prestação de serviços firmado com o cliente antes da confirmação da viagem.",
  },
  {
    title: "5. Responsabilidades do cliente",
    body: "É responsabilidade do cliente fornecer informações corretas e completas no momento da reserva, verificar a documentação necessária para viagem (documento de identidade, passaporte, vistos e vacinas, quando exigido) e cumprir os horários e instruções repassados pela equipe da Renantur Viagens.",
  },
  {
    title: "6. Propriedade intelectual",
    body: "Todo o conteúdo deste site — textos, imagens, logotipo e identidade visual — pertence à Renantur Viagens ou é utilizado sob licença, sendo protegido por leis de direitos autorais. É proibida a reprodução sem autorização prévia.",
  },
  {
    title: "7. Limitação de responsabilidade",
    body: "A Renantur Viagens envida seus melhores esforços para garantir a qualidade dos serviços contratados, mas não se responsabiliza por eventos fora de seu controle, como condições climáticas, atrasos de companhias aéreas, greves ou casos fortuitos e de força maior.",
  },
  {
    title: "8. Alterações dos termos",
    body: "Estes termos podem ser atualizados periodicamente. A versão vigente é sempre a publicada nesta página, com a data da última atualização indicada no topo.",
  },
  {
    title: "9. Foro e legislação aplicável",
    body: "Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de Volta Redonda, RJ, para dirimir eventuais controvérsias, com renúncia a qualquer outro, por mais privilegiado que seja.",
  },
];

export const TermosDeUso = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background min-h-screen"
    >
      <section className="pt-36 pb-16 container mx-auto px-6 xl:px-12">
        <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6 flex items-center gap-2">
          <FileText size={16} /> Condições Gerais
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight leading-tight mb-4">
          Termos de <span className="text-accent italic font-medium">Uso</span>
        </h1>
        <p className="text-primary/50 text-base max-w-xl">Última atualização: setembro de 2026.</p>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 xl:px-12">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-14 rounded-[2.5rem] shadow-premium border border-primary/5 space-y-10">
            <p className="text-primary/60 leading-relaxed">
              Estes Termos de Uso regulam a utilização do site e a contratação dos serviços de
              turismo da <strong className="text-primary">Renantur Viagens</strong>. Ao navegar
              neste site ou contratar um de nossos pacotes, você concorda com as condições
              descritas abaixo.
            </p>

            {SECOES.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-bold text-primary mb-3">{s.title}</h2>
                <p className="text-primary/60 leading-relaxed">{s.body}</p>
              </div>
            ))}

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">10. Contato</h2>
              <p className="text-primary/60 leading-relaxed">
                Dúvidas sobre estes termos podem ser esclarecidas em:{" "}
                <strong className="text-primary">contato@renantur.com.br</strong> ou{" "}
                <strong className="text-primary">(24) 3026-4973</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default TermosDeUso;
