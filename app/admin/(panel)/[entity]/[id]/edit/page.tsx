import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Download } from "lucide-react";
import { getEntity } from "@/lib/admin/entities";
import { saveEntityRow } from "@/lib/admin/actions";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { EntityForm } from "@/components/admin/entity-form";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/admin/fade-in";

export default async function EditEntityPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity: entityKey, id } = await params;
  const entity = getEntity(entityKey);
  if (!entity) notFound();
  if (!isSupabaseConfigured) notFound();

  const supabase = await createClient();
  const { data: record } = await supabase
    .from(entity.table)
    .select("*")
    .eq("id", id)
    .single();

  if (!record) notFound();

  const action = saveEntityRow.bind(null, entity.key);

  return (
    <FadeIn className="mx-auto max-w-4xl">
      <Link
        href={`/admin/${entity.key}`}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft className="size-4" /> {entity.labelPlural}
      </Link>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-[34px] font-bold leading-none text-primary">
          Editar {entity.label}
        </h1>
        {entity.key === "pacotes" && typeof record.slug === "string" && record.slug && (
          <a
            href={`/pacotes/${record.slug}/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            <Download className="size-4" /> Baixar roteiro em PDF
          </a>
        )}
      </div>
      <Card>
        <CardContent className="p-6 lg:p-8">
          <EntityForm
            fields={entity.fields}
            record={record}
            action={action}
            cancelHref={`/admin/${entity.key}`}
          />
        </CardContent>
      </Card>
    </FadeIn>
  );
}
