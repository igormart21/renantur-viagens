"use client";

import { useActionState, useEffect, useRef } from "react";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { addAgent } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddAgentForm() {
  const [state, action, pending] = useActionState(addAgent, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      toast.success("Agente adicionado com sucesso");
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="ag-name">Nome</Label>
          <Input id="ag-name" name="name" placeholder="Nome do agente" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ag-email">E-mail *</Label>
          <Input id="ag-email" name="email" type="email" required placeholder="agente@email.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ag-pass">Senha *</Label>
          <Input id="ag-pass" name="password" type="text" required placeholder="mín. 6 caracteres" />
        </div>
      </div>

      {state?.error && state.error !== "service-role-missing" && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" disabled={pending}>
        <UserPlus className="mr-1.5 size-4" />
        {pending ? "Adicionando..." : "Adicionar agente"}
      </Button>
    </form>
  );
}
