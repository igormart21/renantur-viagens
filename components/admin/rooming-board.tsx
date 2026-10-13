"use client";

import { useTransition } from "react";
import Link from "next/link";
import { BedDouble, Trash2, UserMinus } from "lucide-react";
import { toast } from "sonner";
import { deleteRoom, movePassenger, updateRoom } from "@/lib/admin/actions";
import { ROOM_TYPES } from "@/lib/rooms";
import { age } from "@/lib/age";
import type { Occupant, TripRoom } from "@/lib/admin/trip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const selectCls = "h-8 rounded-md border bg-background px-2 text-xs";
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Rooming list da saída: criar quarto, incluir/retirar/transferir ocupantes (inclusive de vendas
 * diferentes), alterar configuração, nº do apartamento, observações e excluir quarto.
 */
export function RoomingBoard({ rooms, unassigned }: { rooms: TripRoom[]; unassigned: Occupant[] }) {
  const [pending, startTransition] = useTransition();
  const run = (fn: () => Promise<void>) =>
    startTransition(async () => {
      try {
        await fn();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Não foi possível salvar.");
      }
    });
  const used = (r: TripRoom) => r.guests.filter((g) => !g.lap).length;
  const move = (g: Occupant, target: string) => run(() => movePassenger(g.saleId, g.index, target));

  function Target({ guest, label }: { guest: Occupant; label: string }) {
    return (
      <select aria-label={`${label}: ${guest.name}`} className={selectCls} disabled={pending} value="" onChange={(e) => move(guest, e.target.value)}>
        <option value="">{label}…</option>
        {rooms
          .filter((r) => r.id !== guest.room && (guest.lap || used(r) < r.capacity))
          .map((r) => (
            <option key={r.id} value={r.id}>
              Quarto {pad(r.number)} — {r.type} ({used(r)}/{r.capacity})
            </option>
          ))}
        {ROOM_TYPES.map((t) => (
          <option key={t.type} value={`new:${t.type}`}>Criar quarto: {t.type}</option>
        ))}
      </select>
    );
  }

  const who = (g: Occupant) => (
    <span className="text-xs text-muted-foreground">
      {age(g.birthdate)} anos · <Link href={`/admin/contratos/${g.saleId}/edit`} className="underline">venda nº {g.saleId}</Link>
      {g.pending && " · reserva pendente"}
    </span>
  );

  return (
    <div className="space-y-4">
      {rooms.map((r) => {
        const n = used(r);
        const free = r.capacity - n;
        return (
          <div key={r.id} className={`space-y-3 rounded-xl border p-4 ${free > 0 ? "border-primary/30 bg-primary/5" : "bg-muted/30"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <BedDouble className="size-4 text-primary" />
              <span className="font-semibold">
                Quarto {pad(r.number)} | {r.type} | {n}/{r.capacity} |{" "}
                <span className={free < 0 ? "text-destructive" : free > 0 ? "text-primary" : ""}>
                  {free > 0 ? `${free} vaga${free > 1 ? "s" : ""}` : free === 0 ? "Completo" : "Acima da capacidade"}
                </span>
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-auto text-destructive"
                disabled={pending}
                onClick={() => {
                  if (confirm(`Excluir o Quarto ${pad(r.number)}? Os ocupantes voltam para os pendentes.`)) run(() => deleteRoom(r.saleId, r.id));
                }}
              >
                <Trash2 className="size-4" /> Excluir quarto
              </Button>
            </div>
            <div className="grid gap-2 sm:grid-cols-[1fr_120px_1fr]">
              <select
                aria-label={`Configuração do quarto ${r.number}`}
                className="h-9 rounded-md border bg-background px-2 text-sm"
                disabled={pending}
                value={r.type}
                onChange={(e) => run(() => updateRoom(r.saleId, r.id, { type: e.target.value }))}
              >
                {ROOM_TYPES.map((t) => (
                  <option key={t.type} value={t.type}>{t.type} — {t.beds}</option>
                ))}
              </select>
              <Input
                placeholder="Nº do apto"
                defaultValue={r.apto ?? ""}
                onBlur={(e) => e.target.value !== (r.apto ?? "") && run(() => updateRoom(r.saleId, r.id, { apto: e.target.value }))}
              />
              <Input
                placeholder="Observações (ex.: berço, andar baixo)"
                defaultValue={r.notes ?? ""}
                onBlur={(e) => e.target.value !== (r.notes ?? "") && run(() => updateRoom(r.saleId, r.id, { notes: e.target.value }))}
              />
            </div>
            <ul>
              {r.guests.map((g) => (
                <li key={`${g.saleId}-${g.index}`} className="flex flex-wrap items-center gap-2 border-t py-2 text-sm first:border-t-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{g.name}{g.lap && " (colo)"}</p>
                    {who(g)}
                  </div>
                  <Target guest={g} label="Transferir" />
                  <Button type="button" variant="ghost" size="sm" disabled={pending} onClick={() => move(g, "")}>
                    <UserMinus className="size-4" /> Retirar
                  </Button>
                </li>
              ))}
            </ul>
            {free > 0 && unassigned.length > 0 && (
              <select
                aria-label={`Adicionar pessoa ao quarto ${r.number}`}
                className={selectCls}
                disabled={pending}
                value=""
                onChange={(e) => {
                  const g = unassigned.find((u) => `${u.saleId}-${u.index}` === e.target.value);
                  if (g) move(g, r.id);
                }}
              >
                <option value="">+ Adicionar pessoa…</option>
                {unassigned.map((g) => (
                  <option key={`${g.saleId}-${g.index}`} value={`${g.saleId}-${g.index}`}>
                    {g.name} (venda nº {g.saleId})
                  </option>
                ))}
              </select>
            )}
          </div>
        );
      })}

      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:bg-amber-950/30">
        <p className="mb-1 font-semibold">Sem quarto definido ({unassigned.length})</p>
        {unassigned.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todos os passageiros estão acomodados.</p>
        ) : (
          <ul>
            {unassigned.map((g) => (
              <li key={`${g.saleId}-${g.index}`} className="flex flex-wrap items-center gap-2 border-t py-2 text-sm first:border-t-0">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{g.name}{g.lap && " (colo)"}</p>
                  {who(g)}
                </div>
                <Target guest={g} label="Acomodar" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
