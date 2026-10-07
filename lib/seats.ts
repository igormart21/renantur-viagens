/** Vagas restantes de um pacote, ou null se o pacote não controla vagas (dados estáticos). */
export function seatsLeft(pkg: Record<string, unknown>): number | null {
  if (pkg.seats == null) return null;
  return Math.max(Number(pkg.seats) - Number(pkg.seats_used ?? 0), 0);
}
