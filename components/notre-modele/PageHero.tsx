"use client";

import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";
import { NotreModeleContent } from "@/hooks/notreModele/type";

interface PageHeroProps {
  pageData?: NotreModeleContent | null;
}

export default function PageHero({ pageData }: PageHeroProps) {
  return (
    <section className="relative flex flex-col items-center px-6 lg:px-10 pt-[120px] pb-10 overflow-hidden bg-[#288fa5] dark:bg-[#0d0d0d]">
      {/* Light theme: transparent at top fading to solid teal at the bottom.
          Dark theme: solid near-black at top fading to transparent at the bottom.
          Same opposite-direction gradient pattern confirmed via the Figma API
          on the home page's Hero — verified here too, not guessed. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#288fa5]/0 to-[#288fa5] dark:from-[#0d0d0d] dark:to-[#0d0d0d]/0 pointer-events-none" />

      <div className="relative w-full max-w-[1280px] flex flex-col gap-10">
        <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
          <Link href="/" className="text-white/64 hover:text-white transition-colors">
            Accueil
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <span className="font-bold text-white">Notre modèle</span>
        </div>

        <h1 className="font-sans text-white text-4xl sm:text-5xl leading-tight max-w-[624px]">
          {pageData?.heroHeading || "Notre modèle d'investissement et d'accompagnement"}
        </h1>
      </div>
    </section>
  );
}
