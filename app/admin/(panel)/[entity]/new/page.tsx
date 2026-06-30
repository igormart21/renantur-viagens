import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getEntity } from "@/lib/admin/entities";
import { saveEntityRow } from "@/lib/admin/actions";
import { EntityForm } from "@/components/admin/entity-form";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/admin/fade-in";

export default async function NewEntityPage({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity: entityKey } = await params;
  const entity = getEntity(entityKey);
  if (!entity) notFound();

  const action = saveEntityRow.bind(null, entity.key);

  return (
    <FadeIn className="mx-auto max-w-4xl">
      <Link
        href={`/admin/${entity.key}`}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft className="size-4" /> {entity.labelPlural}
      </Link>
      <h1 className="mb-6 font-display text-[34px] font-bold leading-none text-primary">
        Novo {entity.label}
      </h1>
      <Card>
        <CardContent className="p-6 lg:p-8">
          <EntityForm
            fields={entity.fields}
            record={null}
            action={action}
            cancelHref={`/admin/${entity.key}`}
          />
        </CardContent>
      </Card>
    </FadeIn>
  );
}
