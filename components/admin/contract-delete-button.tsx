"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteContract } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

export function ContractDeleteButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      disabled={pending}
      onClick={() => {
        if (!confirm("Excluir este contrato?")) return;
        startTransition(async () => {
          try {
            await deleteContract(id);
            toast.success("Contrato excluído");
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
