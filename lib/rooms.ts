/**
 * Quartos da venda (contracts.rooms). Passageiros apontam para o quarto via `room` = id,
 * inclusive de outra venda da mesma saída (encaixe no rooming list).
 */
export type Room = { id: string; type: string; apto?: string; notes?: string };

export const ROOM_TYPES = [
  { type: "Individual", beds: "Uma cama para 1 pessoa", capacity: 1 },
  { type: "Casal", beds: "Uma cama de casal", capacity: 2 },
  { type: "Twin / duplo solteiro", beds: "Duas camas separadas", capacity: 2 },
  { type: "Triplo casal + solteiro", beds: "Uma cama de casal + uma de solteiro", capacity: 3 },
  { type: "Triplo solteiro", beds: "Três camas separadas", capacity: 3 },
  { type: "Quádruplo casal + 2 solteiro", beds: "Uma cama de casal + duas de solteiro", capacity: 4 },
  { type: "Quádruplo solteiro", beds: "Quatro camas separadas", capacity: 4 },
];

export const roomInfo = (type: string) => ROOM_TYPES.find((r) => r.type === type) ?? ROOM_TYPES[2];
export const isRoomType = (type: unknown) => ROOM_TYPES.some((r) => r.type === type);

/**
 * Sugestão de quartos para N passageiros (sem contar crianças de colo).
 * Quem viaja sozinho vai para Twin, para ser encaixado com outra pessoa no rooming list.
 */
export function suggestRoomTypes(count: number): string[] {
  const byCount = ["", "Twin / duplo solteiro", "Casal", "Triplo casal + solteiro", "Quádruplo casal + 2 solteiro"];
  const types: string[] = [];
  let left = count;
  while (left > 4) {
    types.push(byCount[4]);
    left -= 4;
  }
  if (left > 0) types.push(byCount[left]);
  return types;
}

/** Ocupantes acima da capacidade, por quarto. Crianças de colo não ocupam cama. */
export function overCapacity(rooms: Room[], passengers: { room?: string; lap?: boolean }[]): Room | null {
  for (const r of rooms) {
    const used = passengers.filter((p) => p.room === r.id && !p.lap).length;
    if (used > roomInfo(r.type).capacity) return r;
  }
  return null;
}

export const newRoomId = () => crypto.randomUUID();
