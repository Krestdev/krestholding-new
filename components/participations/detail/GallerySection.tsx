"use client";

import { useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface GallerySectionProps {
  subsidiary: Subsidiary;
}

const VISIBLE_COUNT = 3;

export default function GallerySection({ subsidiary }: GallerySectionProps) {
  const images = (subsidiary.gallery || [])
    .map((item) => (typeof item.image === "object" ? item.image : undefined))
    .filter((img): img is NonNullable<typeof img> => Boolean(img?.url));

  const [start, setStart] = useState(0);
  const total = images.length;
  const canScroll = total > VISIBLE_COUNT;
  const visible = total > 0 ? images.slice(start, start + VISIBLE_COUNT) : [];
  const placeholderCount = Math.max(0, VISIBLE_COUNT - visible.length);

  const goPrev = () => setStart((s) => Math.max(0, s - 1));
  const goNext = () => setStart((s) => Math.min(Math.max(0, total - VISIBLE_COUNT), s + 1));

  return (
    <section className="bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-white" />
          <span className="font-abel text-white text-xl uppercase tracking-tight">
            Ce que fait {subsidiary.name}
          </span>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 w-full">
            {visible.map((img, idx) => (
              <div key={img.id ?? idx} className="relative h-[320px] sm:h-[500px] w-full overflow-hidden">
                <Image src={img.url} alt={img.alt || subsidiary.name} fill className="object-cover" />
              </div>
            ))}
            {Array.from({ length: placeholderCount }).map((_, idx) => (
              <div
                key={`placeholder-${idx}`}
                className="h-[320px] sm:h-[500px] w-full bg-gradient-to-b from-black/0 to-[#737373]"
              />
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canScroll || start === 0}
              aria-label="Précédent"
              className="flex h-10 w-[65px] items-center justify-center rounded-full border border-white/64 bg-white/20 text-white disabled:opacity-40 transition-opacity"
            >
              <CaretLeft size={18} />
            </button>
            <span className="text-white/64 text-base">
              {String(total ? start + 1 : 0).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={goNext}
              disabled={!canScroll || start >= total - VISIBLE_COUNT}
              aria-label="Suivant"
              className="flex h-10 w-[65px] items-center justify-center rounded-full border border-white/64 bg-white/20 text-white disabled:opacity-40 transition-opacity"
            >
              <CaretRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
