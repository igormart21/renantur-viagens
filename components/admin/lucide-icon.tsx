import { icons, type LucideProps } from "lucide-react";

/** Renderiza um ícone lucide a partir do nome (string), com fallback. */
export function LucideIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons] ?? icons.Circle;
  return <Icon {...props} />;
}
