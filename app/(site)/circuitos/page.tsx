import { getCircuits } from "@/lib/queries";
import { Circuitos, type CircuitItem } from "@/components/site/circuitos-view";

export default async function CircuitosPage() {
  const rows = await getCircuits();
  // o componente usa `desc` e `from`; a tabela usa `description` e `price_from`
  const items = rows
    ? (rows.map((c) => ({ ...c, desc: c.description, from: c.price_from })) as unknown as CircuitItem[])
    : undefined;
  return <Circuitos items={items} />;
}
