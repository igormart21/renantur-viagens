import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Phone, Send, Instagram, Facebook } from "lucide-react";

export const Contato = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-background min-h-screen"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mb-24">
          <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Vamos Conversar?</span>
          <h1 className="text-5xl md:text-8xl font-bold text-primary tracking-tight leading-tight">
            Estamos aqui para <br />
            <span className="text-accent italic font-medium">atender você.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div>
            <div className="space-y-12">
              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary/30 uppercase tracking-widest mb-2">Telefone</h3>
                  <p className="text-2xl font-bold text-primary">(24) 99999-9999</p>
                  <p className="text-primary/40 font-medium">Segunda a Sexta, 09h às 18h</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary/30 uppercase tracking-widest mb-2">WhatsApp</h3>
                  <p className="text-2xl font-bold text-primary">Atendimento Imediato</p>
                  <button className="mt-4 bg-success text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-success/20">
                    Iniciar Conversa
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary/30 uppercase tracking-widest mb-2">E-mail</h3>
                  <p className="text-2xl font-bold text-primary">contato@renantur.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary/30 uppercase tracking-widest mb-2">Localização</h3>
                  <p className="text-2xl font-bold text-primary">Sul Fluminense, RJ</p>
                  <p className="text-primary/40 font-medium">Atendimento Digital & Presencial sob Agendamento</p>
                </div>
              </div>
            </div>

            <div className="mt-20 flex gap-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                <Instagram size={20} />
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                <Facebook size={20} />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-premium border border-primary/5">
            <h2 className="text-3xl font-bold text-primary mb-10 tracking-tight">Envie uma mensagem</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-4">Nome Completo</label>
                  <input type="text" className="w-full bg-primary/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-4">Telefone/WhatsApp</label>
                  <input type="text" className="w-full bg-primary/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 transition-all font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-4">E-mail</label>
                <input type="email" className="w-full bg-primary/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary/30 uppercase tracking-widest ml-4">Sua Mensagem</label>
                <textarea rows={5} className="w-full bg-primary/5 border-none rounded-3xl px-6 py-4 focus:ring-2 focus:ring-accent/20 transition-all font-medium" />
              </div>
              <button className="w-full bg-primary text-white py-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                <Send size={20} />
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
