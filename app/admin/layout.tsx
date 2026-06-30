export default function AdminThemeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Aplica a paleta da marca Renantur a todo o /admin (login + painel),
  // sem afetar o site público.
  return <div className="theme-admin">{children}</div>;
}
