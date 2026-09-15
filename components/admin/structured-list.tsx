"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export type ListColumn = { key: string; label: string; multiline?: boolean }

/** Mantém o formato já utilizado no banco, com campos comuns para edição. */
export function StructuredList({
  name,
  value,
  columns,
  itemLabel,
  duration,
}: {
  name: string
  value: unknown
  columns: ListColumn[]
  itemLabel: string
  duration?: string
}) {
  const isItinerary = name === "itinerary"
  const [selected, setSelected] = useState(0)
  const [nights, setNights] = useState(
    duration?.match(/(\d+)\s*noite/i)?.[1] ?? "0"
  )
  const [items, setItems] = useState<Record<string, string>[]>(() =>
    Array.isArray(value)
      ? value.map((item) =>
          typeof item === "object" && item !== null ? { ...item } : {}
        )
      : []
  )
  const [dayCount, setDayCount] = useState(
    Number(duration?.match(/(\d+)\s*dia/i)?.[1]) || items.length
  )
  const [durationChanged, setDurationChanged] = useState(false)
  function resizeDays(count: number) {
    if (!Number.isInteger(count) || count < 1 || count > 90) return
    if (
      count < items.length &&
      items
        .slice(count)
        .some((item) => item.title || item.place || item.description) &&
      !window.confirm(
        "Reduzir os dias apagará o conteúdo dos últimos dias. Continuar?"
      )
    )
      return
    setItems(
      Array.from(
        { length: count },
        (_, i) => items[i] ?? { day: `${i + 1}º DIA` }
      )
    )
    setSelected(Math.min(selected, count - 1))
    setDayCount(count)
    setDurationChanged(true)
  }
  function move(index: number, delta: number) {
    setItems((current) => {
      const next = [...current]
      ;[next[index], next[index + delta]] = [next[index + delta], next[index]]
      return next
    })
  }
  return (
    <div className="space-y-4">
      {isItinerary && (
        <div className="space-y-4 rounded-xl bg-muted/30 p-4">
          <input
            type="hidden"
            name="duration"
            value={
              !durationChanged && duration
                ? duration
                : dayCount
                  ? `${dayCount} dias / ${nights || "0"} noites`
                  : ""
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <label className="space-y-1.5 text-sm font-medium">
              <span>Quantidade de dias</span>
              <Input
                type="number"
                min="1"
                max="90"
                value={dayCount || ""}
                onChange={(e) => resizeDays(Number(e.target.value))}
              />
            </label>
            <label className="space-y-1.5 text-sm font-medium">
              <span>Quantidade de noites</span>
              <Input
                type="number"
                min="0"
                max="90"
                value={nights}
                onChange={(e) => {
                  setNights(e.target.value)
                  setDurationChanged(true)
                }}
              />
            </label>
          </div>
          {items.length > 0 && (
            <label className="block space-y-1.5 text-sm font-medium">
              <span>Selecione o dia para editar</span>
              <select
                className="h-10 w-full rounded-md border bg-background px-3"
                value={Math.min(selected, items.length - 1)}
                onChange={(e) => setSelected(Number(e.target.value))}
              >
                {items.map((item, i) => (
                  <option key={i} value={i}>
                    {item.day || `${i + 1}º DIA`}
                    {item.title ? ` — ${item.title}` : ""}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      {items.map((item, index) => (
        <fieldset
          key={index}
          hidden={isItinerary && index !== Math.min(selected, items.length - 1)}
          className="space-y-3 rounded-xl border bg-muted/20 p-4"
        >
          <legend className="px-1 text-sm font-semibold">
            {itemLabel} {index + 1}
          </legend>
          <div className="flex justify-end gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Mover ${itemLabel} ${index + 1} para cima`}
              disabled={index === 0}
              onClick={() => move(index, -1)}
            >
              <ArrowUp className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Mover ${itemLabel} ${index + 1} para baixo`}
              disabled={index === items.length - 1}
              onClick={() => move(index, 1)}
            >
              <ArrowDown className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Remover ${itemLabel} ${index + 1}`}
              onClick={() => {
                setItems(items.filter((_, i) => i !== index))
                setDayCount(items.length - 1)
                setDurationChanged(true)
              }}
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
          {columns.map((column) => {
            const Control = column.multiline ? Textarea : Input
            return (
              <label
                key={column.key}
                className="block space-y-1.5 text-sm font-medium"
              >
                <span>{column.label}</span>
                <Control
                  value={item[column.key] ?? ""}
                  onChange={(event) =>
                    setItems(
                      items.map((row, i) =>
                        i === index
                          ? { ...row, [column.key]: event.target.value }
                          : row
                      )
                    )
                  }
                />
              </label>
            )
          })}
        </fieldset>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setItems([
            ...items,
            isItinerary ? { day: `${items.length + 1}º DIA` } : {},
          ])
          setSelected(items.length)
          setDayCount(items.length + 1)
          setDurationChanged(true)
        }}
      >
        <Plus className="size-4" /> Adicionar {itemLabel.toLowerCase()}
      </Button>
    </div>
  )
}
