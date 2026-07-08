"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, BarChart3, Settings, LogOut, Inbox, Users, UserCog, UsersRound } from "lucide-react";
import { ENTITIES, CONTENT_ENTITY_KEYS } from "@/lib/admin/entities";
import { LucideIcon } from "./lucide-icon";
import { signOut } from "@/lib/admin/actions";
import { cn } from "@/lib/utils";

const contentEntities = CONTENT_ENTITY_KEYS.map(
  (k) => ENTITIES.find((e) => e.key === k)!,
);

function NavLink({
  href,
  icon,
  label,
  active,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
        active
          ? "bg-white text-primary shadow-sm"
          : "text-white/65 hover:bg-white/10 hover:text-white",
      )}
    >
      {/* indicador laranja no item ativo */}
      {active && (
        <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-[#f7941d]" />
      )}
      <span className={cn("transition-colors", active ? "text-primary" : "text-white/55 group-hover:text-white")}>
        {icon}
      </span>
      <span className="truncate">{label}</span>
      {badge != null && badge > 0 && (
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f7941d] px-1.5 text-[11px] font-bold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-3 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
      {children}
    </p>
  );
}

export function AdminNav({ novasCotacoes = 0 }: { novasCotacoes?: number }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <nav className="admin-sidebar flex h-full flex-col overflow-y-auto px-3 pb-4">
      {/* Marca */}
      <div className="px-3 pb-2 pt-6">
        <p
          className="font-display text-2xl font-bold leading-none text-white"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Renantur
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f7941d]">
          Painel
        </p>
      </div>

      <div className="mt-2">
        <NavLink
          href="/admin"
          icon={<LayoutDashboard className="size-[18px]" />}
          label="Dashboard"
          active={isActive("/admin")}
        />
      </div>

      <GroupLabel>Operação</GroupLabel>
      <div className="space-y-0.5">
        <NavLink href="/admin/cotacoes" icon={<Inbox className="size-[18px]" />} label="Cotações" active={isActive("/admin/cotacoes")} badge={novasCotacoes} />
        <NavLink href="/admin/clientes" icon={<Users className="size-[18px]" />} label="Clientes" active={isActive("/admin/clientes")} />
        <NavLink href="/admin/contratos" icon={<FileText className="size-[18px]" />} label="Contratos" active={isActive("/admin/contratos")} />
        <NavLink href="/admin/relatorios" icon={<BarChart3 className="size-[18px]" />} label="Relatórios" active={isActive("/admin/relatorios")} />
        <NavLink href="/admin/configuracoes" icon={<Settings className="size-[18px]" />} label="Configurações" active={isActive("/admin/configuracoes")} />
      </div>

      <GroupLabel>Conteúdo do site</GroupLabel>
      <div className="space-y-0.5">
        {contentEntities.map((e) => (
          <NavLink
            key={e.key}
            href={`/admin/${e.key}`}
            icon={<LucideIcon name={e.icon} className="size-[18px]" />}
            label={e.labelPlural}
            active={isActive(`/admin/${e.key}`)}
          />
        ))}
      </div>

      <GroupLabel>Conta</GroupLabel>
      <div className="space-y-0.5">
        <NavLink href="/admin/perfil" icon={<UserCog className="size-[18px]" />} label="Meu perfil" active={isActive("/admin/perfil")} />
        <NavLink href="/admin/equipe" icon={<UsersRound className="size-[18px]" />} label="Equipe" active={isActive("/admin/equipe")} />
      </div>

      <form
        action={signOut}
        className="mt-auto pt-5"
        onSubmit={(e) => {
          if (!confirm("Deseja sair do painel?")) e.preventDefault();
        }}
      >
        <div className="mb-3 h-px bg-white/10" />
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-white/55 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-[18px]" />
          Sair
        </button>
      </form>
    </nav>
  );
}
