"use client"

import Link from "next/link"
import { Fragment, useState, useTransition } from "react"
import type { FieldConfig } from "@/lib/admin/entities"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PackagePayment } from "./package-payment"
import { StructuredList } from "./structured-list"
import { GalleryUpload } from "./gallery-upload"
import { ImageUpload } from "./image-upload"

type Row = Record<string, unknown> | null

function val(record: Row, key: string): string {
  const v = record?.[key]
  if (v === null || v === undefined) return ""
  if (Array.isArray(v)) return (v as string[]).join("\n")
  return String(v)
}

function jsonVal(record: Row, key: string): string {
  const v = record?.[key]
  if (v === null || v === undefined || v === "") return "[]"
  if (typeof v === "string") return v
  try {
    return JSON.stringify(v, null, 2)
  } catch {
    return "[]"
  }
}

export function EntityForm({
  fields,
  record,
  action,
  cancelHref,
}: {
  fields: FieldConfig[]
  record: Row
  action: (formData: FormData) => Promise<{ error: string } | void>
  cancelHref: string
}) {
  const [submitting, startTransition] = useTransition()
  const [error, setError] = useState("")
  const isPackage = fields.some((field) => field.key === "itinerary")

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (submitting) return
        if (event.currentTarget.querySelector('[data-uploading="true"]')) {
          setError("Aguarde o envio das fotos antes de salvar.")
          return
        }
        const data = new FormData(event.currentTarget)
        setError("")
        startTransition(async () => {
          const result = await action(data)
          if (result?.error) setError(result.error)
        })
      }}
      className="space-y-6"
    >
      {record?.id != null && (
        <input type="hidden" name="id" value={String(record.id)} />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {fields
          .filter(
            (field) =>
              !isPackage ||
              !["duration", "installments", "monthly", "total"].includes(
                field.key
              )
          )
          .map((field) => {
            if (isPackage && field.key === "entry")
              return (
                <div key={field.key} className="space-y-4 sm:col-span-2">
                  <h2 className="border-b pb-3 text-lg font-semibold">
                    {field.section}
                  </h2>
                  <PackagePayment record={record} />
                </div>
              )
            const id = `f-${field.key}`
            const wide = [
              "textarea",
              "array",
              "json",
              "image",
              "structured",
              "gallery",
            ].includes(field.type)
            return (
              <Fragment key={field.key}>
                {field.section && (
                  <h2 className="mt-4 border-b pb-3 text-lg font-semibold sm:col-span-2">
                    {field.section}
                  </h2>
                )}
                <div
                  key={field.key}
                  className={`space-y-1.5 ${wide ? "sm:col-span-2" : ""}`}
                >
                  {field.type !== "boolean" && (
                    <Label htmlFor={id}>
                      {field.label}
                      {field.required && (
                        <span className="text-destructive"> *</span>
                      )}
                    </Label>
                  )}

                  {field.type === "text" && (
                    <Input
                      id={id}
                      name={field.key}
                      defaultValue={val(record, field.key)}
                      required={field.required}
                    />
                  )}

                  {field.type === "date" && (
                    <Input
                      id={id}
                      name={field.key}
                      type="date"
                      defaultValue={val(record, field.key)}
                    />
                  )}

                  {field.type === "number" && (
                    <Input
                      id={id}
                      name={field.key}
                      type="number"
                      step="any"
                      defaultValue={val(record, field.key)}
                      required={field.required}
                    />
                  )}

                  {field.type === "textarea" && (
                    <Textarea
                      id={id}
                      name={field.key}
                      rows={3}
                      defaultValue={val(record, field.key)}
                    />
                  )}

                  {field.type === "array" && (
                    <Textarea
                      id={id}
                      name={field.key}
                      rows={4}
                      defaultValue={val(record, field.key)}
                    />
                  )}

                  {field.type === "json" && (
                    <Textarea
                      id={id}
                      name={field.key}
                      rows={8}
                      className="font-mono text-xs"
                      defaultValue={jsonVal(record, field.key)}
                    />
                  )}

                  {field.type === "structured" && (
                    <StructuredList
                      name={field.key}
                      value={record?.[field.key]}
                      columns={field.columns ?? []}
                      itemLabel={field.itemLabel ?? "Item"}
                      duration={val(record, "duration")}
                    />
                  )}

                  {field.type === "gallery" && (
                    <GalleryUpload
                      name={field.key}
                      value={record?.[field.key]}
                    />
                  )}

                  {field.type === "image" && (
                    <ImageUpload
                      name={field.key}
                      defaultValue={val(record, field.key)}
                      required={field.required}
                    />
                  )}

                  {field.type === "select" && (
                    <select
                      id={id}
                      name={field.key}
                      defaultValue={
                        val(record, field.key) || field.options?.[0]
                      }
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      {field.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === "boolean" && (
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input
                        type="checkbox"
                        name={field.key}
                        defaultChecked={
                          record ? Boolean(record[field.key]) : true
                        }
                        className="size-4 rounded border-input"
                      />
                      {field.label}
                    </label>
                  )}

                  {field.help && (
                    <p className="text-xs text-muted-foreground">
                      {field.help}
                    </p>
                  )}
                </div>
              </Fragment>
            )
          })}
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </p>
      )}
      <div className="flex gap-3 border-t pt-5">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Salvando..." : "Salvar"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href={cancelHref}>Cancelar</Link>
        </Button>
      </div>
    </form>
  )
}
