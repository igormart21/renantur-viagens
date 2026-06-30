"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteEntityRow } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  entityKey,
  id,
  label = "este item",
}: {
  entityKey: string;
  id: number;
  label?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Excluir ${label}? Esta ação não pode ser desfeita.`)) return;
        startTransition(async () => {
          try {
            await deleteEntityRow(entityKey, id);
            toast.success("Excluído com sucesso");
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Erro ao excluir");
          }
        });
      }}
    >
      <Trash2 className="size-4 text-destructive" />
    </Button>
  );
}
