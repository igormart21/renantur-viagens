"use client"

import { useRef, useState } from "react"
import { Upload, X } from "lucide-react"
import { uploadImage } from "@/lib/admin/upload-image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ImageUpload({
  name,
  defaultValue = "",
  required,
  onChange,
}: {
  name: string
  defaultValue?: string
  required?: boolean
  onChange?: (url: string) => void
}) {
  const [url, setUrl] = useState(defaultValue)
  function updateUrl(value: string) {
    setUrl(value)
    onChange?.(value)
  }
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    setError(null)
    try {
      updateUrl(await uploadImage(file, name))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha no upload")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2" data-uploading={uploading}>
      {/* valor enviado no form */}
      <input type="hidden" name={name} value={url} required={required} />

      {url ? (
        <div className="relative w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            className="h-28 w-44 rounded-md border object-cover"
          />
          <button
            type="button"
            onClick={() => updateUrl("")}
            className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-white"
            aria-label="Remover"
          >
            <X className="size-3" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="mr-2 size-4" />
          {uploading ? "Enviando..." : "Enviar imagem"}
        </Button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
        }}
      />

      <Input
        placeholder="ou cole uma URL de imagem"
        value={url}
        onChange={(e) => updateUrl(e.target.value)}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
