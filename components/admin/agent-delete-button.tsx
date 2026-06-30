"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteAgent } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

export function AgentDeleteButton({ userId }: { userId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-8"
      disabled={pending}
      onClick={() => {
        if (!confirm("Remover o acesso deste agente ao painel?")) return;
        startTransition(async () => {
          try {
            await deleteAgent(userId);
            toast.success("Agente removido");
          } catch {
            toast.error("Erro ao remover agente");
          }
        });
      }}
    >
      <Trash2 className="size-4 text-destructive" />
    </Button>
  );
}
