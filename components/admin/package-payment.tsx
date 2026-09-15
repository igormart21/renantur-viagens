"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

export function PackagePayment({
  record,
}: {
  record: Record<string, unknown> | null
}) {
  const [mode, setMode] = useState(
    record
      ? record.monthly
        ? record.total
          ? "both"
          : "installments"
        : record.total
          ? "cash"
          : "both"
      : "both"
  )
  const [withEntry, setWithEntry] = useState(
    Boolean(
      record?.entry &&
      Number(String(record.entry).replace(/\./g, "").replace(",", ".")) > 0
    )
  )
  const [values, setValues] = useState({
    total: String(record?.total ?? ""),
    entry: String(record?.entry ?? ""),
    installments: String(record?.installments || ""),
    monthly: String(record?.monthly ?? ""),
  })
  const cash = mode !== "installments"
  const financed = mode !== "cash"
  const selectClass = "h-10 w-full rounded-md border bg-background px-3"
  function money(key: "entry" | "monthly" | "total", label: string) {
    return (
      <label className="block space-y-1.5 text-sm font-medium">
        <span>{label}</span>
        <Input
          name={key}
          inputMode="decimal"
          placeholder="Ex.: 1.500,00"
          required
          value={values[key]}
          onChange={(e) => setValues({ ...values, [key]: e.target.value })}
        />
      </label>
    )
  }
  return (
    <fieldset className="space-y-4 rounded-xl border bg-muted/20 p-4">
      <legend className="px-1 font-semibold">
        Valores e condições de pagamento
      </legend>
      <label className="block space-y-1.5 text-sm font-medium">
        <span>Forma de pagamento</span>
        <select
          className={selectClass}
          aria-label="Forma de pagamento"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="both">À vista e parcelado</option>
          <option value="cash">Somente à vista</option>
          <option value="installments">Somente parcelado</option>
        </select>
      </label>
      {cash ? (
        money("total", "Valor à vista (R$)")
      ) : (
        <input type="hidden" name="total" value="" />
      )}
      {financed ? (
        <div className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium">
            <span>Entrada</span>
            <select
              className={selectClass}
              aria-label="Entrada"
              value={withEntry ? "yes" : "no"}
              onChange={(e) => setWithEntry(e.target.value === "yes")}
            >
              <option value="no">Sem entrada</option>
              <option value="yes">Com entrada</option>
            </select>
          </label>
          {withEntry ? (
            money("entry", "Valor da entrada (R$)")
          ) : (
            <input type="hidden" name="entry" value="" />
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5 text-sm font-medium">
              <span>Quantidade de parcelas</span>
              <Input
                type="number"
                name="installments"
                min="1"
                step="1"
                required
                value={values.installments}
                onChange={(e) =>
                  setValues({ ...values, installments: e.target.value })
                }
              />
            </label>
            {money("monthly", "Valor de cada parcela (R$)")}
          </div>
          {values.monthly && values.installments && (
            <p className="rounded-lg bg-background p-3 text-sm">
              {withEntry
                ? `Entrada de R$ ${values.entry || "…"} + `
                : "Sem entrada · "}
              {values.installments}x de R$ {values.monthly}
            </p>
          )}
        </div>
      ) : (
        <>
          <input type="hidden" name="entry" value="" />
          <input type="hidden" name="installments" value="0" />
          <input type="hidden" name="monthly" value="" />
        </>
      )}
    </fieldset>
  )
}
