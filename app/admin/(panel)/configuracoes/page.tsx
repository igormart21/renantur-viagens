import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { saveSettings } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/admin/fade-in";
import { LucideIcon } from "@/components/admin/lucide-icon";
import { ImageUpload } from "@/components/admin/image-upload";
import { DEFAULT_CONTRACT_TERMS } from "@/lib/contract-terms";

type Field = { key: string; label: string; placeholder?: string; help?: string; type?: "textarea" | "image" };

const SECTIONS: { title: string; icon: string; desc: string; full?: boolean; fields: Field[] }[] = [
  {
    title: "Marca",
    icon: "Sparkles",
    desc: "Nome e assinatura exibidos no site.",
    fields: [
      { key: "brand_name", label: "Nome da marca", placeholder: "Renantur" },
      { key: "brand_tagline", label: "Slogan", placeholder: "Viagens & Turismo" },
    ],
  },
  {
    title: "Contato",
    icon: "Phone",
    desc: "Como os clientes falam com você.",
    fields: [
      { key: "whatsapp", label: "WhatsApp (link ou número)", placeholder: "https://wa.me/55..." },
      { key: "phone", label: "Telefone", placeholder: "(24) 99999-9999" },
      { key: "email", label: "E-mail", placeholder: "contato@renantur.com.br" },
      { key: "location", label: "Localização", placeholder: "Sul Fluminense, RJ" },
      { key: "address", label: "Endereço (voucher)", placeholder: "Av. Amaral Peixoto nº445 Sala 602 - Centro - Volta Redonda RJ" },
      { key: "cnpj", label: "CNPJ (voucher)", placeholder: "10.493.380/0001-05" },
      { key: "website", label: "Site (voucher)", placeholder: "www.renantur.com.br" },
    ],
  },
  {
    title: "Redes sociais",
    icon: "Share2",
    desc: "Links exibidos no rodapé e contato.",
    fields: [
      { key: "instagram", label: "Instagram (URL)", placeholder: "https://instagram.com/..." },
      { key: "facebook", label: "Facebook (URL)", placeholder: "https://facebook.com/..." },
      { key: "google_reviews_url", label: "Avaliações Google (URL)", placeholder: "https://..." },
    ],
  },
  {
    title: "Documentos (voucher e contrato)",
    icon: "FileSignature",
    desc: "Logo e cláusulas usadas nos PDFs de voucher e contrato.",
    full: true,
    fields: [
      { key: "logo_url", label: "Logo", type: "image", help: "PNG ou JPG. Se vazio, usa a logo padrão da Renantur." },
      { key: "contract_terms", label: "Cláusulas do contrato", type: "textarea", help: "Uma cláusula por parágrafo. A numeração é feita automaticamente; as observações da venda entram como última cláusula." },
    ],
  },
  {
    title: "Institucional",
    icon: "FileText",
    desc: "Textos da seção “Quem Somos”.",
    full: true,
    fields: [
      { key: "about_title", label: "Título institucional" },
      { key: "about_text", label: "Texto institucional", type: "textarea" },
    ],
  },
];

export default async function ConfiguracoesPage() {
  let settings: Record<string, unknown> = {};
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
    settings = data ?? {};
  }

  const val = (k: string) => String(settings[k] ?? "");

  if (!isSupabaseConfigured) {
    return (
      <FadeIn>
        <h1 className="font-display text-[34px] font-bold leading-none text-primary">Configurações</h1>
        <p className="mt-3 text-sm text-muted-foreground">Configure o Supabase para editar as configurações.</p>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <form action={saveSettings}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[34px] font-bold leading-none text-primary">
              Configurações do site
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Contato, redes sociais e textos institucionais exibidos no site público.
            </p>
          </div>
          <Button type="submit" size="lg">Salvar alterações</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {SECTIONS.map((section) => (
            <Card key={section.title} className={section.full ? "lg:col-span-2" : ""}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <LucideIcon name={section.icon} className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{section.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{section.desc}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={section.full ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
                  {section.fields.map((f) => (
                    <div
                      key={f.key}
                      className={`space-y-1.5 ${f.type === "textarea" ? "sm:col-span-2" : ""}`}
                    >
                      <Label htmlFor={f.key}>{f.label}</Label>
                      {f.type === "image" ? (
                        <ImageUpload name={f.key} defaultValue={val(f.key)} pdfSafe />
                      ) : f.type === "textarea" ? (
                        <Textarea
                          id={f.key}
                          name={f.key}
                          rows={f.key === "contract_terms" ? 12 : 6}
                          defaultValue={val(f.key) || (f.key === "contract_terms" ? DEFAULT_CONTRACT_TERMS : "")}
                        />
                      ) : (
                        <Input id={f.key} name={f.key} placeholder={f.placeholder} defaultValue={val(f.key)} />
                      )}
                      {f.help && <p className="text-xs text-muted-foreground">{f.help}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit" size="lg">Salvar alterações</Button>
        </div>
      </form>
    </FadeIn>
  );
}
