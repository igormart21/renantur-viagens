"use client";

import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";

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

/** Card de depoimento com texto recolhido (seta "Ver mais") e fotos reais da avaliação. */
export function TestimonialCard({ t }: { t: Testimonial }) {
  const [open, setOpen] = useState(false);
  const photos = (t.photos ?? []).filter(Boolean).slice(0, 3);

  return (
    <div className="h-full rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
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
        <div>
          <p className="font-display text-sm font-bold text-primary">{t.name}</p>
          <p className="text-xs text-[#9aa3af]">{t.city}</p>
        </div>
      </div>

      <div className="mt-3 flex gap-0.5">
        {Array.from({ length: t.stars || 5 }).map((_, k) => (
          <Star key={k} size={14} className="text-accent" fill="#F7941D" />
        ))}
      </div>

      <p className={`mt-3 text-sm leading-relaxed text-[#6b7280] ${open ? "" : "line-clamp-3"}`}>
        “{t.text}”
      </p>

      {t.text.length > 110 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-accent"
        >
          {open ? "Ver menos" : "Ver mais"}
          <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      )}

      {photos.length > 0 && (
        <div className="mt-3 flex gap-1.5">
          {photos.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={url} alt="" className="h-14 w-14 rounded-lg object-cover" />
          ))}
        </div>
      )}
    </div>
  );
}
