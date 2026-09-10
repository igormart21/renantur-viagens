import { getTransferServices, getTransferGallery, getSettings } from "@/lib/queries";
import { mergeSettings } from "@/lib/site-settings";
import {
  TransferView,
  type TransferService,
  type TransferPhoto,
} from "@/components/site/transfer-view";

export default async function TransferPage() {
  const [serviceRows, galleryRows, settingsRow] = await Promise.all([
    getTransferServices(),
    getTransferGallery(),
    getSettings(),
  ]);
  const settings = mergeSettings(settingsRow);

  return (
    <TransferView
      services={(serviceRows ?? undefined) as unknown as TransferService[] | undefined}
      gallery={(galleryRows ?? undefined) as unknown as TransferPhoto[] | undefined}
      whatsapp={settings.whatsapp}
    />
  );
}
