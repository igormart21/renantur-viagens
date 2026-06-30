import { notFound } from "next/navigation";
import { getEntity } from "@/lib/admin/entities";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { FadeIn } from "@/components/admin/fade-in";
import { DataTable } from "@/components/admin/data-table";

export default async function EntityListPage({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity: entityKey } = await params;
  const entity = getEntity(entityKey);
  if (!entity) notFound();

  let rows: Record<string, unknown>[] = [];
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase
      .from(entity.table)
      .select("*")
      .order(entity.defaultSort, { ascending: true });
    rows = data ?? [];
  }

  const columns = entity.listColumns.map((key) => ({
    key,
    label: entity.fields.find((f) => f.key === key)?.label ?? key,
  }));

  if (!isSupabaseConfigured) {
    return (
      <FadeIn>
        <h1 className="mb-2 text-2xl font-bold">{entity.labelPlural}</h1>
        <p className="text-sm text-muted-foreground">
          Configure o Supabase para gerenciar {entity.labelPlural.toLowerCase()}.
        </p>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <DataTable
        entityKey={entity.key}
        label={entity.label}
        labelPlural={entity.labelPlural}
        columns={columns}
        rows={rows}
      />
    </FadeIn>
  );
}
