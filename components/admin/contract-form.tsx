"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Option = { id: number; label: string };
type Row = Record<string, unknown> | null;

const STATUS = ["rascunho", "emitido", "pago", "cancelado"];
const selectCls =
  "border-input bg-transparent flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

function v(record: Row, key: string): string {
  const x = record?.[key];
  return x == null ? "" : String(x);
}

export function ContractForm({
  clients,
  packages,
  record,
  action,
}: {
  clients: Option[];
  packages: Option[];
  record: Row;
  action: (formData: FormData) => void;
}) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form action={action} onSubmit={() => setSubmitting(true)} className="space-y-6">
      {record?.id != null && <input type="hidden" name="id" value={String(record.id)} />}

      <div className="space-y-1.5">
        <Label htmlFor="title">Título do contrato *</Label>
        <Input id="title" name="title" required defaultValue={v(record, "title")} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="client_id">Cliente</Label>
          <select id="client_id" name="client_id" defaultValue={v(record, "client_id")} className={selectCls}>
            <option value="">— selecione —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="package_id">Pacote</Label>
          <select id="package_id" name="package_id" defaultValue={v(record, "package_id")} className={selectCls}>
            <option value="">— selecione —</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="total_value">Valor total (R$)</Label>
          <Input id="total_value" name="total_value" type="number" step="0.01" defaultValue={v(record, "total_value")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="entry_value">Entrada (R$)</Label>
          <Input id="entry_value" name="entry_value" type="number" step="0.01" defaultValue={v(record, "entry_value")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="installments">Parcelas</Label>
          <Input id="installments" name="installments" type="number" defaultValue={v(record, "installments") || "1"} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <select id="status" name="status" defaultValue={v(record, "status") || "rascunho"} className={selectCls}>
            {STATUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="travel_date">Data da viagem</Label>
          <Input id="travel_date" name="travel_date" type="date" defaultValue={v(record, "travel_date")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="signed_at">Assinado em</Label>
          <Input id="signed_at" name="signed_at" type="date" defaultValue={v(record, "signed_at")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Observações</Label>
        <Textarea id="notes" name="notes" rows={3} defaultValue={v(record, "notes")} />
      </div>

      <div className="flex gap-3 border-t pt-5">
        <Button type="submit" disabled={submitting}>{submitting ? "Salvando..." : "Salvar"}</Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/contratos">Cancelar</Link>
        </Button>
      </div>
    </form>
  );
}
