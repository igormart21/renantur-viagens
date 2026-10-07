import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { saveContract } from "@/lib/admin/actions";
import { loadSaleOptions } from "@/lib/admin/sales";
import { ContractForm } from "@/components/admin/contract-form";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/admin/fade-in";

export default async function NewContractPage() {
  if (!isSupabaseConfigured) {
    return (
      <FadeIn>
        <h1 className="mb-2 font-display text-[34px] font-bold leading-none text-primary">Nova venda</h1>
        <p className="text-sm text-muted-foreground">Configure o Supabase para registrar vendas.</p>
      </FadeIn>
    );
  }
  const supabase = await createClient();
  const options = await loadSaleOptions(supabase);

  return (
    <FadeIn className="mx-auto max-w-5xl">
      <Link
        href="/admin/contratos"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft className="size-4" /> Vendas de pacotes
      </Link>
      <h1 className="mb-6 font-display text-[34px] font-bold leading-none text-primary">Nova venda</h1>
      <Card>
        <CardContent className="p-6 lg:p-8">
          <ContractForm {...options} record={null} action={saveContract} />
        </CardContent>
      </Card>
    </FadeIn>
  );
}
