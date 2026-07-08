"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AdminNav } from "./admin-nav";

export function AdminMobileNav({ novasCotacoes = 0 }: { novasCotacoes?: number }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // fecha o menu ao navegar
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Abrir menu"
          className="flex size-9 items-center justify-center rounded-lg text-primary transition-colors hover:bg-primary/10 md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-0 bg-[#0a2d57] p-0 text-white [&>button]:text-white/70 [&>button]:hover:text-white">
        <SheetTitle className="sr-only">Menu do painel</SheetTitle>
        <AdminNav novasCotacoes={novasCotacoes} />
      </SheetContent>
    </Sheet>
  );
}
