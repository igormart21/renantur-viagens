"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteQuote, setQuoteStatus } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const STATUS = ["novo", "contatado", "fechado", "perdido"];

export function QuoteDetailActions({ id, status }: { id: number; status: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="space-y-1.5">
        <Label className="text-xs">Status</Label>
        <select
          defaultValue={status}
          disabled={pending}
          className="h-9 rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          onChange={(e) => {
            const value = e.target.value;
            startTransition(async () => {
              try {
                await setQuoteStatus(id, value);
                toast.success("Status atualizado");
              } catch {
                toast.error("Erro ao atualizar");
              }
            });
          }}
        >
          {STATUS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={pending}
        className="text-destructive hover:text-destructive"
        onClick={() => {
          if (!confirm("Excluir esta cotação?")) return;
          startTransition(async () => {
            try {
              await deleteQuote(id);
              toast.success("Cotação excluída");
              router.push("/admin/cotacoes");
            } catch {
              toast.error("Erro ao excluir");
            }
          });
        }}
      >
        <Trash2 className="mr-1.5 size-4" /> Excluir
      </Button>
    </div>
  );
}
