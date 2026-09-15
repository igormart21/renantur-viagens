"use client"

import { useRef, useState } from "react"
import { uploadImage } from "@/lib/admin/upload-image"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "./image-upload"

export function GalleryUpload({
  name,
  value,
}: {
  name: string
  value: unknown
}) {
  const [images, setImages] = useState(() =>
    (Array.isArray(value) ? value : []).map((url, id) => ({
      id,
      url: String(url),
    }))
  )
  const nextId = useRef(images.length)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  async function addFiles(files: File[]) {
    setUploading(true)
    setError("")
    const failures: string[] = []
    for (const file of files) {
      try {
        const url = await uploadImage(file, name)
        const id = nextId.current++
        setImages((current) => [...current, { id, url }])
      } catch {
        failures.push(file.name)
      }
    }
    if (failures.length)
      setError(
        `Não foi possível enviar: ${failures.join(", ")}. Tente novamente.`
      )
    setUploading(false)
  }
  return (
    <div className="space-y-4" data-uploading={uploading}>
      <input
        type="hidden"
        name={name}
        value={images
          .map((image) => image.url)
          .filter(Boolean)
          .join("\n")}
      />
      <label className="block space-y-2 text-sm font-medium">
        <span>Selecionar fotos do computador</span>
        <input
          className="block w-full rounded-lg border p-3 text-sm"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          disabled={uploading}
          onChange={(event) => {
            const files = Array.from(event.target.files ?? [])
            event.target.value = ""
            void addFiles(files)
          }}
        />
      </label>
      <p className="text-xs text-muted-foreground">
        Selecione várias fotos de uma vez, por exemplo 10 a 15. As imagens são
        otimizadas antes do envio.
      </p>
      {uploading && (
        <p role="status" className="text-sm">
          Enviando fotos… Aguarde antes de salvar.
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <div key={image.id} className="space-y-3 rounded-xl border p-4">
            <p className="text-sm font-medium">Foto {index + 1}</p>
            <ImageUpload
              name={`${name}-${image.id}`}
              defaultValue={image.url}
              onChange={(url) =>
                setImages((current) =>
                  current.map((item) =>
                    item.id === image.id ? { ...item, url } : item
                  )
                )
              }
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setImages(images.filter((item) => item.id !== image.id))
              }
            >
              Remover foto
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setImages([...images, { id: nextId.current++, url: "" }])
        }}
      >
        Adicionar foto
      </Button>
    </div>
  )
}
