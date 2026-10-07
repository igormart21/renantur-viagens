/** Idade em anos a partir de uma data ISO (yyyy-mm-dd). */
export function age(birthdate: string): string {
  if (!birthdate) return "—";
  const b = new Date(birthdate + "T00:00:00");
  const now = new Date();
  let a = now.getFullYear() - b.getFullYear();
  if (now < new Date(now.getFullYear(), b.getMonth(), b.getDate())) a--;
  return Number.isNaN(a) ? "—" : String(a);
}
