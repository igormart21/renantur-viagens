"use client";

import Link from "next/link";
import { useState } from "react";
import type { FieldConfig } from "@/lib/admin/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./image-upload";

type Row = Record<string, unknown> | null;

function val(record: Row, key: string): string {
  const v = record?.[key];
  if (v === null || v === undefined) return "";
  if (Array.isArray(v)) return (v as string[]).join("\n");
  return String(v);
}

function jsonVal(record: Row, key: string): string {
  const v = record?.[key];
  if (v === null || v === undefined || v === "") return "[]";
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return "[]";
  }
}

export function EntityForm({
  fields,
  record,
  action,
  cancelHref,
}: {
  fields: FieldConfig[];
  record: Row;
  action: (formData: FormData) => void;
  cancelHref: string;
}) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      action={action}
      onSubmit={() => setSubmitting(true)}
      className="space-y-6"
    >
      {record?.id != null && (
        <input type="hidden" name="id" value={String(record.id)} />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((field) => {
        const id = `f-${field.key}`;
        const wide = ["textarea", "array", "json", "image"].includes(field.type);
        return (
          <div
            key={field.key}
            className={`space-y-1.5 ${wide ? "sm:col-span-2" : ""}`}
          >
            {field.type !== "boolean" && (
              <Label htmlFor={id}>
                {field.label}
                {field.required && <span className="text-destructive"> *</span>}
              </Label>
            )}

            {field.type === "text" && (
              <Input id={id} name={field.key} defaultValue={val(record, field.key)} required={field.required} />
            )}

            {field.type === "date" && (
              <Input id={id} name={field.key} type="date" defaultValue={val(record, field.key)} />
            )}

            {field.type === "number" && (
              <Input id={id} name={field.key} type="number" step="any" defaultValue={val(record, field.key)} required={field.required} />
            )}

            {field.type === "textarea" && (
              <Textarea id={id} name={field.key} rows={3} defaultValue={val(record, field.key)} />
            )}

            {field.type === "array" && (
              <Textarea id={id} name={field.key} rows={4} defaultValue={val(record, field.key)} />
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

            {field.type === "image" && (
              <ImageUpload name={field.key} defaultValue={val(record, field.key)} required={field.required} />
            )}

            {field.type === "select" && (
              <select
                id={id}
                name={field.key}
                defaultValue={val(record, field.key) || field.options?.[0]}
                className="border-input bg-transparent flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
                  defaultChecked={record ? Boolean(record[field.key]) : true}
                  className="size-4 rounded border-input"
                />
                {field.label}
              </label>
            )}

            {field.help && (
              <p className="text-xs text-muted-foreground">{field.help}</p>
            )}
          </div>
        );
      })}
      </div>

      <div className="flex gap-3 border-t pt-5">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Salvando..." : "Salvar"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href={cancelHref}>Cancelar</Link>
        </Button>
      </div>
    </form>
  );
}
