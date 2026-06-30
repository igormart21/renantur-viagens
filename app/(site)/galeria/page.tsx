import { getGallery } from "@/lib/queries";
import { Galeria, type GalleryItem } from "@/components/site/galeria-view";

export default async function GaleriaPage() {
  const rows = await getGallery();
  const items = (rows ?? undefined) as unknown as GalleryItem[] | undefined;
  return <Galeria items={items} />;
}
