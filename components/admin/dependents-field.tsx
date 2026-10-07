"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { fetchCep } from "@/lib/cep"

type Dependent = Record<string, string | boolean>

const PERSON = [
  { key: "name", label: "Nome completo", wide: true },
  { key: "birthdate", label: "Data de nascimento", type: "date" },
  { key: "doc", label: "CPF" },
  { key: "rg", label: "RG" },
  { key: "rg_issuer", label: "Órgão emissor" },
]
const ADDRESS = [
  { key: "cep", label: "CEP" },
  { key: "street", label: "Rua", wide: true },
  { key: "number", label: "Número" },
  { key: "complement", label: "Complemento" },
  { key: "district", label: "Bairro" },
  { key: "city", label: "Cidade" },
  { key: "uf", label: "UF" },
]

/** Dependentes do titular, salvos como JSON na coluna clients.dependents. */
export function DependentsField({ name, value }: { name: string; value: unknown }) {
  const [items, setItems] = useState<Dependent[]>(() =>
    Array.isArray(value) ? value.map((d) => ({ same_address: true, ...d })) : []
  )

  function resize(count: number) {
    if (!Number.isInteger(count) || count < 0 || count > 20) return
    if (
      count < items.length &&
      items.slice(count).some((d) => d.name) &&
      !window.confirm("Reduzir apagará os dados dos últimos dependentes. Continuar?")
    )
      return
    setItems(Array.from({ length: count }, (_, i) => items[i] ?? { same_address: true }))
  }

  function set(index: number, patch: Dependent) {
    setItems((current) => current.map((d, i) => (i === index ? { ...d, ...patch } : d)))
  }

  function field(d: Dependent, index: number, f: { key: string; label: string; type?: string; wide?: boolean }) {
    return (
      <label key={f.key} className={`space-y-1.5 text-sm font-medium ${f.wide ? "sm:col-span-2" : ""}`}>
        <span>{f.label}</span>
        <Input
          type={f.type ?? "text"}
          value={String(d[f.key] ?? "")}
          onChange={(e) => set(index, { [f.key]: e.target.value })}
          onBlur={
            f.key === "cep"
              ? async (e) => {
                  const address = await fetchCep(e.target.value)
                  if (address) set(index, address)
                }
              : undefined
          }
        />
      </label>
    )
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <label className="block max-w-xs space-y-1.5 text-sm font-medium">
        <span>Número de dependentes</span>
        <Input type="number" min="0" max="20" value={items.length} onChange={(e) => resize(Number(e.target.value))} />
      </label>
      {items.map((d, index) => (
        <fieldset key={index} className="space-y-4 rounded-xl border bg-muted/20 p-4">
          <legend className="px-1 text-sm font-semibold">Dependente {index + 1}</legend>
          <div className="grid gap-4 sm:grid-cols-2">{PERSON.map((f) => field(d, index, f))}</div>
          <label className="block max-w-xs space-y-1.5 text-sm font-medium">
            <span>Usar o mesmo endereço do titular?</span>
            <select
              className="h-9 w-full rounded-md border bg-background px-3"
              value={d.same_address ? "yes" : "no"}
              onChange={(e) => set(index, { same_address: e.target.value === "yes" })}
            >
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </label>
          {!d.same_address && (
            <div className="grid gap-4 sm:grid-cols-2">{ADDRESS.map((f) => field(d, index, f))}</div>
          )}
        </fieldset>
      ))}
    </div>
  )
}
