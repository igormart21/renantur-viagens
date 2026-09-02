"use client";

import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export type Testimonial = {
  name: string;
  city: string;
  stars: number;
  text: string;
  photo: string;
  photos?: string[];
};

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

const isPhoto = (url: string) => /^https?:\/\//.test((url || "").trim());

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function ReviewCard({ t, url }: { t: Testimonial; url?: string }) {
  const [open, setOpen] = useState(false);
  const long = t.text.length > 150;

  return (
    <li className="relative w-[280px] shrink-0 snap-start rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.name}
          className="absolute inset-0 z-0 rounded-2xl"
        />
      )}
      <div className="relative z-10 flex items-start gap-3">
        {isPhoto(t.photo) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.photo} alt={t.name} className="size-11 shrink-0 rounded-full object-cover" />
        ) : (
          <span
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-white"
            aria-hidden
          >
            {initials(t.name)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-bold text-primary">{t.name}</p>
          <div className="mt-0.5 flex gap-0.5">
            {Array.from({ length: t.stars || 5 }).map((_, k) => (
              <Star key={k} size={13} className="text-accent" fill="#F7941D" />
            ))}
          </div>
        </div>
        <GoogleIcon className="size-4 shrink-0 opacity-60" />
      </div>

      <p className={`relative z-10 mt-3 text-sm leading-relaxed text-[#6b7280] ${open ? "" : "line-clamp-4"}`}>
        {t.text}
      </p>

      {long && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen((v) => !v);
          }}
          className="relative z-10 mt-1.5 text-xs font-bold text-accent hover:underline"
        >
          {open ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </li>
  );
}

/** Widget de avaliações no estilo Google Reviews: nota + estrelas + contagem no topo, carrossel de cards abaixo. */
export function TestimonialsWidget({
  items,
  googleUrl,
  rating = "5,0",
  count,
}: {
  items: Testimonial[];
  googleUrl?: string;
  rating?: string;
  count?: number;
}) {
  const scroller = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => scroller.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  if (!items.length) return null;

  return (
    <div className="rounded-3xl border border-black/5 bg-white/60 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
          <GoogleIcon className="size-8 shrink-0" />
          <div>
            <p className="font-display text-base font-bold text-primary">Avaliações no Google</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="text-sm font-bold text-primary">{rating}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={13} className="text-accent" fill="#F7941D" />
                ))}
              </div>
              {typeof count === "number" && <span className="text-xs text-[#9aa3af]">({count})</span>}
            </div>
          </div>
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Anterior"
            className="flex size-9 items-center justify-center rounded-full border border-black/10 text-primary transition-colors hover:bg-primary/5"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Próximo"
            className="flex size-9 items-center justify-center rounded-full border border-black/10 text-primary transition-colors hover:bg-primary/5"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <ul
        ref={scroller}
        className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <ReviewCard key={i} t={t} url={googleUrl} />
        ))}
      </ul>
    </div>
  );
}
