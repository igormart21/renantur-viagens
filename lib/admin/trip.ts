import type { SupabaseClient } from "@supabase/supabase-js";
import type { Passenger } from "@/components/admin/contract-form";
import { roomInfo, type Room } from "@/lib/rooms";

export type Occupant = Passenger & {
  saleId: number;
  index: number;
  /** Venda em rascunho = reserva pendente. */
  pending: boolean;
  responsible: string;
};
export type TripRoom = Room & { number: number; saleId: number; beds: string; capacity: number; guests: Occupant[] };

/** Junta todas as vendas não canceladas de uma saída (pacote): quartos, passageiros e embarques. */
export async function loadTrip(supabase: SupabaseClient, packageId: string) {
  const [{ data: pkg }, { data: sales }] = await Promise.all([
    supabase.from("packages").select("id, name, location, departure, seats, seats_used, boarding_points").eq("id", packageId).single(),
    supabase
      .from("contracts")
      .select("id, status, travel_date, passengers, rooms, clients(name, phone)")
      .eq("package_id", packageId)
      .neq("status", "cancelado")
      .order("id"),
  ]);
  if (!pkg) return null;

  const passengers: Occupant[] = [];
  const rooms: TripRoom[] = [];
  for (const sale of sales ?? []) {
    const client = sale.clients as unknown as { name?: string; phone?: string } | null;
    for (const r of (Array.isArray(sale.rooms) ? sale.rooms : []) as Room[]) {
      const info = roomInfo(r.type);
      rooms.push({ ...r, number: rooms.length + 1, saleId: sale.id, beds: info.beds, capacity: info.capacity, guests: [] });
    }
    ((Array.isArray(sale.passengers) ? sale.passengers : []) as Passenger[]).forEach((p, index) => {
      // Vendas antigas não guardavam telefone: usa o do responsável financeiro como contato.
      const own = p.phone !== undefined;
      passengers.push({
        ...p,
        phone: own ? p.phone : (client?.phone ?? ""),
        contact: own ? p.contact : p.name === client?.name ? "" : (client?.name ?? ""),
        saleId: sale.id,
        index,
        pending: sale.status === "rascunho",
        responsible: client?.name ?? "",
      });
    });
  }
  for (const p of passengers) rooms.find((r) => r.id === p.room)?.guests.push(p);

  const beds = (r: TripRoom) => r.guests.filter((g) => !g.lap).length;
  return {
    pkg,
    departure: (pkg.departure as string | null) ?? (sales?.[0]?.travel_date as string | null) ?? null,
    boardingOrder: ((Array.isArray(pkg.boarding_points) ? pkg.boarding_points : []) as { place?: string; time?: string }[]).map(
      (b) => [b.place, b.time].filter(Boolean).join(" às "),
    ),
    passengers,
    rooms,
    unassigned: passengers.filter((p) => !rooms.some((r) => r.id === p.room)),
    freeBeds: rooms.reduce((n, r) => n + Math.max(r.capacity - beds(r), 0), 0),
  };
}

/** Passageiros por ponto de embarque, na sequência de paradas do pacote; dentro do ponto, pela poltrona. */
export function boardingGroups(passengers: Occupant[], order: string[] = []) {
  const groups = new Map<string, Occupant[]>();
  for (const p of passengers) {
    const key = p.boarding || "Sem ponto de embarque";
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  for (const list of groups.values()) list.sort((a, b) => (a.seat ?? 999) - (b.seat ?? 999));
  const rank = (k: string) => (order.indexOf(k) < 0 ? order.length : order.indexOf(k));
  return [...groups.entries()].sort(([a], [b]) => rank(a) - rank(b));
}

/** Dados faltantes por lista (não inventa nem copia documentos do responsável). */
export function missingData(passengers: Occupant[]) {
  return {
    transport: passengers
      .filter((p) => !p.doc || !p.rg || !p.birthdate)
      .map((p) => `${p.name}: ${[!p.doc && "CPF", !p.rg && "RG", !p.birthdate && "nascimento"].filter(Boolean).join(", ")}`),
    guide: passengers
      .filter((p) => !p.phone || !p.boarding)
      .map((p) => `${p.name}: ${[!p.phone && "telefone", !p.boarding && "ponto de embarque"].filter(Boolean).join(", ")}`),
  };
}
