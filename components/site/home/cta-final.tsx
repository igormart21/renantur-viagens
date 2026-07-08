import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-settings";
import { Reveal } from "./reveal";

const CTA_IMG =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000";

export const CtaFinal = ({ settings = DEFAULT_SETTINGS }: { settings?: SiteSettings }) => {
  return (
    <section className="container mx-auto px-5 py-12 xl:px-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CTA_IMG} alt="" className="h-64 w-full object-cover md:h-56" />
          <div className="absolute inset-0 bg-primary/85" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <div>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                Pronto para viver momentos inesquecíveis?
              </h2>
              <p className="mt-2 text-sm text-white/70 md:text-base">
                Entre em contato agora mesmo e descubra a viagem perfeita para você!
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
