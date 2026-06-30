"use client";

/**
 * Shim que expõe a API do react-router-dom usada pelo site original
 * (Link com prop `to`, useLocation) sobre o roteador do Next.js.
 * Permite migrar os componentes mantendo o JSX idêntico ao original.
 */
import NextLink from "next/link";
import { usePathname, useParams as useNextParams } from "next/navigation";
import type { ComponentProps } from "react";

type NextLinkProps = Omit<ComponentProps<typeof NextLink>, "href">;

export function Link({ to, ...props }: { to: string } & NextLinkProps) {
  return <NextLink href={to} {...props} />;
}

export function useLocation() {
  const pathname = usePathname();
  return { pathname };
}

export function useParams<T extends Record<string, string> = Record<string, string>>() {
  return useNextParams() as T;
}
