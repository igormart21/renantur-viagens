import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Mail,
  Phone,
  Luggage,
  CalendarClock,
  MessageSquareText,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/admin/fade-in";
import { QuoteDetailActions } from "@/components/admin/quote-detail-actions";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

const statusStyle: Record<string, string> = {
  novo: "bg-[#ff6b57] text-white",
  contatado: "bg-primary/10 text-primary",
  fechado: "bg-success/15 text-success",
  perdido: "bg-destructive/10 text-destructive",
};

function fmtDate(v: unknown) {
  if (!v) return "—";
  return new Date(String(v)).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function waLink(phone: string, name: string, pkg: string) {
  const digits = phone.replace(/\D/g, "");
  const full = digits.length <= 11 ? `55${digits}` : digits;
  const msg = encodeURIComponent(
    `Olá ${name}! Aqui é da Renantur Viagens. Recebemos sua solicitação de orçamento${pkg ? ` para o pacote ${pkg}` : ""}. Como podemos ajudar?`,
  );
  return `https://wa.me/${full}?text=${msg}`;
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 px-6 py-4">
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/[0.07] text-primary">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className="mt-1 text-[15px] font-medium text-foreground">{children}</div>
      </div>
    </div>
  );
}

export default async function CotacaoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isSupabaseConfigured) notFound();

  const supabase = await createClient();
  const { data: q } = await supabase.from("quotes").select("*").eq("id", id).single();
  if (!q) notFound();

  const name = String(q.name ?? "");
  const phone = String(q.phone ?? "");
  const email = String(q.email ?? "");
  const pkgName = String(q.package_name ?? "");
  const when = String(q.travel_when ?? "");
  const message = String(q.message ?? "");
  const status = String(q.status ?? "novo");
  const wa = phone ? waLink(phone, name, pkgName) : "";

  return (
    <FadeIn className="mx-auto max-w-5xl">
      <Link
        href="/admin/cotacoes"
        className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft className="size-4" /> Cotações
      </Link>

      {/* Cabeçalho */}
      <div className="mb-6 flex flex-wrap items-center gap-5">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white shadow-lg shadow-primary/20">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[34px] font-bold leading-none text-primary">{name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Solicitação recebida em {fmtDate(q.created_at)}</p>
        </div>
        <span
          className={`rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide ${statusStyle[status] ?? "bg-muted text-foreground"}`}
        >
          {status}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Coluna principal */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="overflow-hidden p-0">
            <div className="border-b bg-muted/30 px-6 py-3">
              <h2 className="text-sm font-bold text-primary">Contato</h2>
            </div>
            <CardContent className="divide-y p-0">
              <InfoRow icon={<Phone className="size-[18px]" />} label="WhatsApp / Telefone">
                {phone ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {phone}
                  </a>
                ) : ("—")}
              </InfoRow>
              <InfoRow icon={<Mail className="size-[18px]" />} label="E-mail">
                {email ? (
                  <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
                ) : ("—")}
              </InfoRow>
            </CardContent>
          </Card>

          <Card className="overflow-hidden p-0">
            <div className="border-b bg-muted/30 px-6 py-3">
              <h2 className="text-sm font-bold text-primary">Interesse</h2>
            </div>
            <CardContent className="divide-y p-0">
              <InfoRow icon={<Luggage className="size-[18px]" />} label="Pacote de interesse">
                {pkgName || "—"}
              </InfoRow>
              <InfoRow icon={<CalendarClock className="size-[18px]" />} label="Quando pretende viajar">
                {when || "—"}
              </InfoRow>
              {message && (
                <InfoRow icon={<MessageSquareText className="size-[18px]" />} label="Mensagem">
                  <p className="whitespace-pre-line font-normal leading-relaxed text-foreground/80">{message}</p>
                </InfoRow>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Ações */}
        <aside className="lg:col-span-1">
          <Card className="lg:sticky lg:top-24">
            <CardContent className="space-y-5 p-6">
              <div>
                <h2 className="font-display text-xl font-bold text-primary">Ações</h2>
                <p className="text-xs text-muted-foreground">Responda e gerencie esta cotação.</p>
              </div>

              {phone && (
                <Button asChild className="w-full bg-success hover:bg-success/90">
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon size={17} className="mr-1.5" /> Responder no WhatsApp
                  </a>
                </Button>
              )}

              <div className="border-t pt-5">
                <QuoteDetailActions id={Number(q.id)} status={status} />
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </FadeIn>
  );
}
