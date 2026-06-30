import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { saveContract } from "@/lib/admin/actions";
import { ContractForm } from "@/components/admin/contract-form";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/admin/fade-in";

export default async function NewContractPage() {
  if (!isSupabaseConfigured) {
    return (
      <FadeIn>
        <h1 className="mb-2 font-display text-[34px] font-bold leading-none text-primary">Novo contrato</h1>
        <p className="text-sm text-muted-foreground">Configure o Supabase para criar contratos.</p>
      </FadeIn>
    );
  }
  const supabase = await createClient();
  const [{ data: clients }, { data: packages }] = await Promise.all([
    supabase.from("clients").select("id, name").order("name"),
    supabase.from("packages").select("id, name").order("name"),
  ]);

  return (
    <FadeIn className="mx-auto max-w-4xl">
      <Link
        href="/admin/contratos"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft className="size-4" /> Contratos
      </Link>
      <h1 className="mb-6 font-display text-[34px] font-bold leading-none text-primary">Novo contrato</h1>
      <Card>
        <CardContent className="p-6 lg:p-8">
          <ContractForm
            clients={(clients ?? []).map((c) => ({ id: c.id as number, label: c.name as string }))}
            packages={(packages ?? []).map((p) => ({ id: p.id as number, label: p.name as string }))}
            record={null}
            action={saveContract}
          />
        </CardContent>
      </Card>
    </FadeIn>
  );
}
