"use client";

import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";
import { Subsidiary } from "@/hooks/subsidiaries/type";

interface DetailHeroProps {
  subsidiary: Subsidiary;
}

export default function DetailHero({ subsidiary }: DetailHeroProps) {
  const location = [subsidiary.city, subsidiary.country].filter(Boolean).join(", ");

  return (
    <section className="relative flex flex-col items-center px-6 lg:px-10 pt-[120px] pb-10 bg-gradient-to-b from-[rgba(13,13,13,0.8)] to-[#0d0d0d]">
      <div className="w-full max-w-[1280px] flex flex-col gap-16">
        <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
          <Link href="/" className="text-white/64 hover:text-white transition-colors">
            Accueil
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <Link href="/partenaires" className="text-white hover:text-white/70 transition-colors">
            Nos participations
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <span className="font-bold text-white">{subsidiary.name}</span>
        </div>

        <div className="flex flex-col gap-6 max-w-[624px]">
          <div className="flex flex-col gap-3">
            <span className="font-abel text-[#f29308] text-xl tracking-tight uppercase">
              {subsidiary.category}
            </span>
            <h1 className="font-sans font-medium text-white text-4xl sm:text-[42px]">{subsidiary.name}</h1>
          </div>
          <p className="text-white/80 text-xl sm:text-2xl leading-relaxed max-w-[566px]">
            {subsidiary.shortDescription ||
              "Scrollez pour découvrir comment nous transformons chaque projet en une expérience unique."}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-[#218da8] text-sm">
            {subsidiary.participationLabel && <span>Participation de {subsidiary.participationLabel}</span>}
            {subsidiary.entryYear && <span>Entrée au capital en {subsidiary.entryYear}</span>}
            {location && <span>{location}</span>}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {subsidiary.websiteUrl && (
              <a
                href={subsidiary.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-white text-black font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/90"
              >
                Site de l&apos;entreprise
              </a>
            )}
            <Link
              href="/partenaires"
              className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 border border-white/10 text-white font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/10"
            >
              Toutes nos participations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
