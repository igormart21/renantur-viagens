import { getDestinationBySlug } from "@/lib/queries";
import {
  DestinosView,
  destinationData,
  type DestinoData,
} from "@/components/site/destinos-view";

export default async function DestinoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getDestinationBySlug(id);

  const data: DestinoData = row
    ? {
        name: row.name,
        tagline: row.tagline,
        desc: row.description,
        hero: row.hero,
        rating: row.rating,
        highlights: row.highlights ?? [],
        stats: { temp: row.temp, people: row.people, airport: row.airport },
      }
    : destinationData[id] || destinationData["maceio"];

  return <DestinosView data={data} />;
}
