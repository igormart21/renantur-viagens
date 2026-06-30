import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/admin/fade-in";
import { ProfileForm } from "@/components/admin/profile-form";

export const dynamic = "force-dynamic";

export default async function PerfilPage() {
  let email = "";
  let createdAt = "";
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    email = data.user?.email ?? "";
    createdAt = data.user?.created_at ?? "";
  }

  return (
    <FadeIn className="mx-auto max-w-3xl">
      <h1 className="font-display text-[34px] font-bold leading-none text-primary">Meu perfil</h1>
      <p className="mb-7 mt-2 text-sm text-muted-foreground">
        Gerencie suas credenciais de acesso ao painel.
      </p>

      <div className="mb-6 flex items-center gap-4 rounded-2xl border bg-background p-5 shadow-sm">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white">
          {email.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-base font-bold text-foreground">{email || "—"}</p>
          <p className="text-xs text-muted-foreground">
            Super administrador
            {createdAt && ` · desde ${new Date(createdAt).toLocaleDateString("pt-BR")}`}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 lg:p-8">
          <ProfileForm email={email} />
        </CardContent>
      </Card>
    </FadeIn>
  );
}
