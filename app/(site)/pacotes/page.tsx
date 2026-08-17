import { Suspense } from "react";
import { getPackages } from "@/lib/queries";
import { PacotesView, type PackageItem } from "@/components/site/pacotes-view";

export default async function PacotesPage() {
  const rows = await getPackages();
  const items = rows
    ? (rows as unknown as PackageItem[])
    : undefined; // undefined => usa os dados estáticos padrão
  return (
    <Suspense fallback={null}>
      <PacotesView items={items} />
    </Suspense>
  );
}
