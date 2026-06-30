"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteQuote, setQuoteStatus } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";

const STATUS = ["novo", "contatado", "fechado", "perdido"];
const selectCls =
  "h-8 rounded-md border border-input bg-transparent px-2 text-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

export function QuoteRowActions({ id, status }: { id: number; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-2">
      <select
        defaultValue={status}
        disabled={pending}
        className={selectCls}
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
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={pending}
        onClick={() => {
          if (!confirm("Excluir esta cotação?")) return;
          startTransition(async () => {
            try {
              await deleteQuote(id);
              toast.success("Cotação excluída");
            } catch {
              toast.error("Erro ao excluir");
            }
          });
        }}
      >
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </div>
  );
}
