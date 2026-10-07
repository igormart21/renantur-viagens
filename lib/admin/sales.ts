import type { SupabaseClient } from "@supabase/supabase-js";
import type { Passenger, SaleClient, SalePackage } from "@/components/admin/contract-form";

/** "1.880,00" → 1880 */
function money(text: unknown): number {
  const n = Number(String(text ?? "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

/** Preço por passageiro: à vista, ou entrada + parcelas. */
export function packagePrice(p: Record<string, unknown>): number {
  return money(p.total) || money(p.entry) + Number(p.installments ?? 0) * money(p.monthly);
}

export const seatsOf = (passengers: unknown) =>
  Array.isArray(passengers) ? passengers.filter((p) => !p?.lap).length : 0;

/** Dados para o formulário de venda (exclui a própria venda das ocupadas). */
export async function loadSaleOptions(supabase: SupabaseClient, excludeId?: string) {
  let othersQuery = supabase.from("contracts").select("package_id, passengers").neq("status", "cancelado");
  if (excludeId) othersQuery = othersQuery.neq("id", excludeId);
  const [{ data: clients }, { data: packages }, { data: others }] = await Promise.all([
    supabase.from("clients").select("id, name, doc, birthdate, dependents").order("name"),
    supabase
      .from("packages")
      .select("id, name, seats, departure, boarding_points, total, entry, installments, monthly")
      .order("name"),
    othersQuery,
  ]);
  return {
    clients: (clients ?? []).map((c) => ({
      id: c.id,
      name: c.name ?? "",
      doc: c.doc ?? "",
      birthdate: c.birthdate ?? "",
      dependents: Array.isArray(c.dependents) ? c.dependents : [],
    })) as SaleClient[],
    packages: (packages ?? []).map((p) => ({
      id: p.id,
      name: p.name ?? "",
      seats: Number(p.seats ?? 64),
      departure: p.departure ?? "",
      boarding_points: Array.isArray(p.boarding_points) ? p.boarding_points : [],
      price: packagePrice(p),
    })) as SalePackage[],
    others: (others ?? []).map((o) => ({
      package_id: Number(o.package_id),
      passengers: (Array.isArray(o.passengers) ? o.passengers : []) as Passenger[],
    })),
  };
}

/** Recalcula packages.seats_used (lido pelo site para "últimas vagas"/"esgotado"). */
export async function syncSeatsUsed(supabase: SupabaseClient, packageIds: unknown[]) {
  for (const id of new Set(packageIds.filter(Boolean).map(Number))) {
    const { data } = await supabase
      .from("contracts")
      .select("passengers")
      .eq("package_id", id)
      .neq("status", "cancelado");
    const used = (data ?? []).reduce((n, c) => n + seatsOf(c.passengers), 0);
    await supabase.from("packages").update({ seats_used: used }).eq("id", id);
  }
}

/** Valida passageiros/assentos de uma venda. Retorna a mensagem de erro, se houver. */
export function validateSeats(
  passengers: Passenger[],
  capacity: number,
  others: Passenger[][],
  countsSeats: boolean,
): string | null {
  if (passengers.length === 0) return "Adicione ao menos um passageiro.";
  if (passengers.some((p) => !p.name)) return "Informe o nome de todos os passageiros.";
  const taken = new Set(others.flat().map((p) => Number(p.seat)).filter(Boolean));
  const mine = new Set<number>();
  for (const { seat } of passengers) {
    if (seat == null) continue;
    if (!Number.isInteger(seat) || seat < 1 || seat > capacity)
      return `O assento ${seat} não existe neste pacote (1 a ${capacity}).`;
    if (taken.has(seat)) return `O assento ${seat} já foi vendido.`;
    if (mine.has(seat)) return `O assento ${seat} está repetido nesta venda.`;
    mine.add(seat);
  }
  const used = others.reduce((n, p) => n + seatsOf(p), 0);
  if (countsSeats && used + seatsOf(passengers) > capacity)
    return `Vagas insuficientes: restam ${Math.max(capacity - used, 0)} de ${capacity}.`;
  return null;
}
