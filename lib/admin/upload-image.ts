import { createClient } from "@/lib/supabase/client"

/** Reduz fotos grandes antes do envio, para manter as galerias leves. */
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (
    !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)
  )
    throw new Error("Use imagens JPG, PNG, WebP ou GIF.")
  let blob: Blob = file
  let extension = file.type.split("/")[1]
  if (file.type !== "image/gif") {
    const bitmap = await createImageBitmap(file)
    try {
      const scale = Math.min(1, 1920 / Math.max(bitmap.width, bitmap.height))
      const canvas = document.createElement("canvas")
      canvas.width = Math.max(1, Math.round(bitmap.width * scale))
      canvas.height = Math.max(1, Math.round(bitmap.height * scale))
      const context = canvas.getContext("2d")
      if (context) {
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
        const optimized = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/webp", 0.82)
        )
        if (optimized && (optimized.size < file.size || scale < 1)) {
          blob = optimized
          extension = optimized.type.split("/")[1]
        }
      }
    } finally {
      bitmap.close()
    }
  }
  const supabase = createClient()
  const path = `${folder}/${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage
    .from("images")
    .upload(path, blob, { contentType: blob.type })
  if (error) throw error
  return supabase.storage.from("images").getPublicUrl(path).data.publicUrl
}
