"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { updateProfile } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(updateProfile, null);

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail de acesso</Label>
        <Input id="email" name="email" type="email" defaultValue={email} />
        <p className="text-xs text-muted-foreground">
          Ao alterar o e-mail, pode ser necessário confirmar pelo link enviado.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Nova senha</Label>
        <Input id="password" name="password" type="password" placeholder="Deixe em branco para manter a atual" />
        <p className="text-xs text-muted-foreground">Mínimo de 6 caracteres.</p>
      </div>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state?.ok && (
        <p className="flex items-center gap-2 text-sm font-medium text-success">
          <CheckCircle2 className="size-4" /> Perfil atualizado com sucesso.
        </p>
      )}

      <div className="border-t pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </form>
  );
}
