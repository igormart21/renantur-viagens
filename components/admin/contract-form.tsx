"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { Trash2, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { age } from "@/lib/age";

type Row = Record<string, unknown> | null;
type Dependent = { name?: string; doc?: string; birthdate?: string };
export type SaleClient = { id: number; name: string; doc: string; birthdate: string; dependents: Dependent[] };
export type SalePackage = {
  id: number;
  name: string;
  seats: number;
  departure: string;
  boarding_points: { place?: string; time?: string }[];
  price: number;
};
export type Passenger = {
  name: string;
  doc: string;
  birthdate: string;
  seat: number | null;
  lap: boolean;
  boarding: string;
  price: number;
};

const STATUS = ["rascunho", "emitido", "pago", "cancelado"];
const HOW_HEARD = ["Instagram", "Facebook", "Google", "WhatsApp", "Indicação", "Já é cliente", "Outro"];
const PAYMENT = ["PIX", "Dinheiro", "Cartão de crédito", "Cartão de débito", "Boleto", "Carnê"];
const selectCls =
  "border-input bg-transparent flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

function v(record: Row, key: string): string {
  const x = record?.[key];
  return x == null ? "" : String(x);
}

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function ContractForm({
  clients,
  packages,
  others,
  record,
  action,
}: {
  clients: SaleClient[];
  packages: SalePackage[];
  /** Passageiros das outras vendas não canceladas, por pacote. */
  others: { package_id: number; passengers: Passenger[] }[];
  record: Row;
  action: (formData: FormData) => Promise<{ error: string } | void>;
}) {
  const [submitting, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [clientId, setClientId] = useState(v(record, "client_id"));
  const [packageId, setPackageId] = useState(v(record, "package_id"));
  const [travelDate, setTravelDate] = useState(v(record, "travel_date"));
  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.isArray(record?.passengers) ? (record.passengers as Passenger[]) : [],
  );
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");

  const pkg = packages.find((p) => String(p.id) === packageId);
  const client = clients.find((c) => String(c.id) === clientId);
  const taken = useMemo(() => {
    const set = new Set<number>();
    let count = 0;
    for (const o of others) {
      if (String(o.package_id) !== packageId) continue;
      for (const p of o.passengers) {
        if (p.lap) continue;
        count++;
        if (p.seat) set.add(Number(p.seat));
      }
    }
    return { set, count };
  }, [others, packageId]);
  const used = taken.count + passengers.filter((p) => !p.lap).length;
  const total = passengers.reduce((sum, p) => sum + (Number(p.price) || 0), 0);

  // Todas as pessoas cadastradas (titulares + dependentes), responsável primeiro.
  const people = useMemo(
    () =>
      [...clients]
        .sort((a, b) => (String(a.id) === clientId ? -1 : String(b.id) === clientId ? 1 : 0))
        .flatMap((c) => [
          { label: `${c.name} (titular)`, name: c.name, doc: c.doc, birthdate: c.birthdate },
          ...c.dependents
            .filter((d) => d.name)
            .map((d) => ({
              label: `${d.name} (dependente de ${c.name})`,
              name: d.name ?? "",
              doc: d.doc ?? "",
              birthdate: d.birthdate ?? "",
            })),
        ]),
    [clients, clientId],
  );

  function add(list: { name: string; doc: string; birthdate: string }[]) {
    const boarding = pkg?.boarding_points[0];
    setPassengers((current) => [
      ...current,
      ...list.map((p) => ({
        name: p.name,
        doc: p.doc,
        birthdate: p.birthdate,
        seat: null,
        lap: false,
        boarding: boarding ? [boarding.place, boarding.time].filter(Boolean).join(" às ") : "",
        price: pkg?.price ?? 0,
      })),
    ]);
  }

  function set(index: number, patch: Partial<Passenger>) {
    setPassengers((current) => current.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  }

  function pickSeat(seat: number) {
    const owner = passengers.findIndex((p) => p.seat === seat);
    if (owner >= 0) return set(owner, { seat: null });
    if (!passengers[selected] || passengers[selected].lap) return;
    set(selected, { seat });
    const next = passengers.findIndex((p, i) => i > selected && !p.seat && !p.lap);
    if (next >= 0) setSelected(next);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (submitting) return;
        const data = new FormData(event.currentTarget);
        setError("");
        startTransition(async () => {
          const result = await action(data);
          if (result?.error) setError(result.error);
        });
      }}
      className="space-y-8"
    >
      {record?.id != null && <input type="hidden" name="id" value={String(record.id)} />}
      <input type="hidden" name="passengers" value={JSON.stringify(passengers)} />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="space-y-1.5">
          <Label>Venda nº</Label>
          <Input value={record?.id != null ? String(record.id) : "Nova"} disabled />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="client_id">Responsável financeiro *</Label>
          <select id="client_id" name="client_id" required value={clientId} onChange={(e) => setClientId(e.target.value)} className={selectCls}>
            <option value="">— selecione o cliente —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}{c.doc ? ` — ${c.doc}` : ""}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="signed_at">Data da venda</Label>
          <Input
            id="signed_at"
            name="signed_at"
            type="date"
            defaultValue={v(record, "signed_at") || new Date().toLocaleDateString("en-CA")}
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="package_id">Pacote / destino *</Label>
          <select
            id="package_id"
            name="package_id"
            required
            value={packageId}
            onChange={(e) => {
              setPackageId(e.target.value);
              const next = packages.find((p) => String(p.id) === e.target.value);
              if (next?.departure) setTravelDate(next.departure);
            }}
            className={selectCls}
          >
            <option value="">— selecione o pacote —</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="travel_date">Saída</Label>
          <Input id="travel_date" name="travel_date" type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Valor da passagem</Label>
          <Input value={pkg ? brl(pkg.price) : ""} disabled />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="how_heard">Ficou sabendo da viagem</Label>
          <select id="how_heard" name="how_heard" defaultValue={v(record, "how_heard")} className={selectCls}>
            <option value="">—</option>
            {HOW_HEARD.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:col-span-2">
          {[
            ["Total de assentos", pkg?.seats ?? "—"],
            ["Assentos usados", pkg ? used : "—"],
            ["Disponíveis", pkg ? pkg.seats - used : "—"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-amber-50 p-2 text-center dark:bg-amber-950/30">
              <p className="text-[11px] text-muted-foreground">{label}</p>
              <p className={`text-xl font-bold ${label === "Disponíveis" && pkg && pkg.seats - used < 0 ? "text-destructive" : ""}`}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="border-b pb-3 text-lg font-semibold">Passageiros</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            list="people"
            placeholder="Buscar passageiro pelo nome (titular ou dependente)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <datalist id="people">
            {people.map((p) => <option key={p.label} value={p.label} />)}
          </datalist>
          <Button
            type="button"
            variant="outline"
            disabled={!search.trim()}
            onClick={() => {
              const person = people.find((p) => p.label === search);
              add([person ?? { name: search.trim(), doc: "", birthdate: "" }]);
              setSearch("");
            }}
          >
            <UserPlus className="size-4" /> Adicionar
          </Button>
          {client && (
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                add([
                  { name: client.name, doc: client.doc, birthdate: client.birthdate },
                  ...client.dependents.filter((d) => d.name).map((d) => ({ name: d.name ?? "", doc: d.doc ?? "", birthdate: d.birthdate ?? "" })),
                ])
              }
            >
              <Users className="size-4" /> Responsável + dependentes
            </Button>
          )}
        </div>

        {passengers.length > 0 && (
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs">
                <tr>
                  <th className="p-2">Passageiro</th>
                  <th className="p-2">Idade</th>
                  <th className="p-2">Embarque</th>
                  <th className="p-2 w-20">Assento</th>
                  <th className="p-2">Colo</th>
                  <th className="p-2 w-28">Valor (R$)</th>
                  <th className="p-2" />
                </tr>
              </thead>
              <tbody>
                {passengers.map((p, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`border-t ${selected === i ? "bg-primary/10" : ""}`}
                  >
                    <td className="p-2">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.doc && `CPF ${p.doc}`}</p>
                    </td>
                    <td className="p-2">{age(p.birthdate)}</td>
                    <td className="p-2">
                      <select className={selectCls} value={p.boarding} onChange={(e) => set(i, { boarding: e.target.value })}>
                        <option value="">—</option>
                        {pkg?.boarding_points.map((b) => {
                          const label = [b.place, b.time].filter(Boolean).join(" às ");
                          return <option key={label}>{label}</option>;
                        })}
                        {p.boarding && !pkg?.boarding_points.some((b) => [b.place, b.time].filter(Boolean).join(" às ") === p.boarding) && (
                          <option>{p.boarding}</option>
                        )}
                      </select>
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        min="1"
                        max={pkg?.seats}
                        disabled={p.lap}
                        value={p.seat ?? ""}
                        onChange={(e) => set(i, { seat: e.target.value ? Number(e.target.value) : null })}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        className="size-4"
                        aria-label="Criança de colo"
                        checked={p.lap}
                        onChange={(e) => set(i, { lap: e.target.checked, seat: e.target.checked ? null : p.seat })}
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={p.price}
                        onChange={(e) => set(i, { price: Number(e.target.value) })}
                      />
                    </td>
                    <td className="p-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Remover ${p.name}`}
                        onClick={() => setPassengers(passengers.filter((_, j) => j !== i))}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pkg && (
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Mapa de assentos{" "}
              <span className="font-normal text-muted-foreground">
                — clique na linha do passageiro e depois na poltrona livre
              </span>
            </p>
            <div className="mx-auto grid max-w-xs grid-cols-[repeat(2,1fr)_16px_repeat(2,1fr)] gap-1.5 rounded-2xl border bg-muted/20 p-3">
              {Array.from({ length: Math.ceil(pkg.seats / 4) }, (_, row) =>
                [1, 2, 0, 3, 4].map((col) => {
                  if (col === 0) return <span key={`${row}-aisle`} />;
                  const seat = row * 4 + col;
                  if (seat > pkg.seats) return <span key={seat} />;
                  const mine = passengers.findIndex((p) => p.seat === seat);
                  const busy = taken.set.has(seat);
                  return (
                    <button
                      key={seat}
                      type="button"
                      disabled={busy}
                      title={busy ? "Vendido" : mine >= 0 ? passengers[mine].name : "Livre"}
                      onClick={() => pickSeat(seat)}
                      className={`h-9 rounded-md text-xs font-bold transition-colors ${
                        busy
                          ? "cursor-not-allowed bg-muted-foreground/30 text-muted-foreground line-through"
                          : mine >= 0
                            ? "bg-primary text-primary-foreground"
                            : "border bg-background hover:bg-primary/10"
                      }`}
                    >
                      {seat}
                    </button>
                  );
                }),
              )}
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Branco: livre · Azul: desta venda · Cinza: vendido
            </p>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="border-b pb-3 text-lg font-semibold">Pagamento</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="space-y-1.5">
            <Label>Total a pagar</Label>
            <Input value={brl(total)} disabled className="font-bold" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="payment_method">Forma de pagamento</Label>
            <select id="payment_method" name="payment_method" defaultValue={v(record, "payment_method")} className={selectCls}>
              <option value="">—</option>
              {PAYMENT.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="entry_value">Entrada (R$)</Label>
            <Input id="entry_value" name="entry_value" type="number" step="0.01" defaultValue={v(record, "entry_value")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="installments">Parcelas</Label>
            <Input id="installments" name="installments" type="number" min="1" defaultValue={v(record, "installments") || "1"} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <select id="status" name="status" defaultValue={v(record, "status") || "rascunho"} className={selectCls}>
              {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="notes">Observações</Label>
          <Textarea id="notes" name="notes" rows={3} defaultValue={v(record, "notes")} />
        </div>
      </section>

      {error && (
        <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
      )}
      <div className="flex gap-3 border-t pt-5">
        <Button type="submit" disabled={submitting}>{submitting ? "Salvando..." : "Finalizar venda"}</Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/contratos">Cancelar</Link>
        </Button>
      </div>
    </form>
  );
}
