"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const SECOES = [
  {
    title: "1. Quem somos",
    body: "A Renantur Viagens é uma agência de turismo com sede em Volta Redonda, RJ, responsável pelo tratamento dos dados pessoais coletados através deste site, do WhatsApp e dos demais canais de atendimento da empresa.",
  },
  {
    title: "2. Quais dados coletamos",
    body: "Coletamos as informações que você nos fornece diretamente ao solicitar um orçamento, preencher formulários ou entrar em contato conosco, como nome, e-mail, telefone/WhatsApp e o pacote ou destino de interesse. Também podemos coletar dados de navegação (como páginas visitadas) para melhorar a experiência no site.",
  },
  {
    title: "3. Como usamos seus dados",
    body: "Utilizamos seus dados para responder às suas solicitações de orçamento, entrar em contato sobre viagens e pacotes, elaborar contratos de prestação de serviços turísticos, enviar comunicações sobre promoções (quando autorizado) e cumprir obrigações legais e contratuais.",
  },
  {
    title: "4. Compartilhamento de dados",
    body: "Seus dados não são vendidos a terceiros. Podem ser compartilhados apenas com fornecedores diretamente envolvidos na prestação do serviço contratado (como hotéis, transportadoras e companhias aéreas) e com órgãos públicos, quando exigido por lei.",
  },
  {
    title: "5. Cookies",
    body: "Este site pode utilizar cookies para lembrar suas preferências e entender como os visitantes utilizam nossas páginas. Você pode desativar os cookies nas configurações do seu navegador a qualquer momento, embora isso possa afetar algumas funcionalidades do site.",
  },
  {
    title: "6. Seus direitos (LGPD)",
    body: "Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a confirmar a existência de tratamento, acessar, corrigir, solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, e revogar o consentimento a qualquer momento. Para exercer esses direitos, entre em contato pelos canais informados abaixo.",
  },
  {
    title: "7. Segurança dos dados",
    body: "Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados pessoais contra acessos não autorizados, perda, alteração ou divulgação indevida.",
  },
  {
    title: "8. Alterações desta política",
    body: "Esta política pode ser atualizada periodicamente para refletir melhorias em nossas práticas de privacidade. A data da última atualização está sempre indicada no topo desta página.",
  },
];

export const PoliticaDePrivacidade = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background min-h-screen"
    >
      <section className="pt-36 pb-16 container mx-auto px-6 xl:px-12">
        <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6 flex items-center gap-2">
          <ShieldCheck size={16} /> Transparência e Segurança
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight leading-tight mb-4">
          Política de <span className="text-accent italic font-medium">Privacidade</span>
        </h1>
        <p className="text-primary/50 text-base max-w-xl">Última atualização: setembro de 2026.</p>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 xl:px-12">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-14 rounded-[2.5rem] shadow-premium border border-primary/5 space-y-10">
            <p className="text-primary/60 leading-relaxed">
              A Renantur Viagens respeita a sua privacidade e está comprometida em proteger os
              dados pessoais coletados através deste site e dos nossos canais de atendimento. Esta
              política explica quais informações coletamos, como as utilizamos e quais são os
              seus direitos.
            </p>

            {SECOES.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-bold text-primary mb-3">{s.title}</h2>
                <p className="text-primary/60 leading-relaxed">{s.body}</p>
              </div>
            ))}

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">9. Contato</h2>
              <p className="text-primary/60 leading-relaxed">
                Em caso de dúvidas sobre esta política ou para exercer seus direitos, entre em
                contato: <strong className="text-primary">contato@renantur.com.br</strong> ou{" "}
                <strong className="text-primary">(24) 3026-4973</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PoliticaDePrivacidade;
