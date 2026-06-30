import Link from "next/link";
import { ArrowUpRight, Bell } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let email = "";
  let novasCotacoes = 0;
  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getUser();
      email = data.user?.email ?? "";
      const { count } = await supabase
        .from("quotes")
        .select("*", { count: "exact", head: true })
        .eq("status", "novo");
      novasCotacoes = count ?? 0;
    } catch {
      email = "";
    }
  }

  return (
    <div className="admin-shell flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-[#0c5763] md:block">
        <AdminNav novasCotacoes={novasCotacoes} />
      </aside>

      {/* Conteúdo */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/5 bg-[#f4f1ea]/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 md:hidden">
            <AdminMobileNav novasCotacoes={novasCotacoes} />
            <span
              className="font-display text-xl font-bold text-primary"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Renantur
            </span>
          </div>
          <div className="hidden md:block" />
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary/70 transition-colors hover:text-primary"
            >
              Ver site
              <ArrowUpRight className="size-3.5" />
            </Link>
            <Link
              href="/admin/cotacoes"
              className="relative inline-flex size-9 items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-primary/10 hover:text-primary"
              title="Cotações"
            >
              <Bell className="size-[18px]" />
              {novasCotacoes > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff6b57] px-1 text-[10px] font-bold text-white">
                  {novasCotacoes}
                </span>
              )}
            </Link>
            {email && (
              <Link
                href="/admin/perfil"
                className="flex items-center gap-2.5 border-l border-black/10 pl-4 transition-opacity hover:opacity-80"
                title="Meu perfil"
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {email.charAt(0).toUpperCase()}
                </div>
                <span className="hidden text-xs font-medium text-foreground/70 sm:block">
                  {email}
                </span>
              </Link>
            )}
          </div>
        </header>

        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10 2xl:px-14">
          <div className="mx-auto w-full max-w-[1760px]">{children}</div>
        </main>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}
