import { Instagram as InstaIcon } from "lucide-react";
import { Reveal } from "./reveal";

export const InstagramRow = ({
  photos,
  url = "#",
}: {
  photos: string[];
  url?: string;
}) => {
  if (!photos.length) return null;
  return (
    <section className="container mx-auto px-5 py-10 xl:px-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">Acompanhe nosso Instagram</p>
          <p className="font-display text-lg font-bold text-primary">@renanturviagens</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <InstaIcon size={16} /> Seguir no Instagram
        </a>
      </div>
      <Reveal>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {photos.slice(0, 6).map((src, i) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/40">
                <InstaIcon className="size-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
};
