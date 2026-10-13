"use client";

import { useTransition } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { duplicatePackage } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

export function DuplicateButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-8"
      title="Duplicar pacote"
      disabled={pending}
      onClick={() => {
        if (!confirm("Duplicar este pacote? A cópia fica inativa até você ajustar as datas e salvar como ativo.")) return;
        startTransition(async () => {
          try {
            await duplicatePackage(id);
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Erro ao duplicar");
          }
        });
      }}
    >
      <Copy className="size-4" />
    </Button>
  );
}
