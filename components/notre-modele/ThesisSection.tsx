"use client";

import { NotreModeleContent } from "@/hooks/notreModele/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface ThesisSectionProps {
  pageData?: NotreModeleContent | null;
}

export default function ThesisSection({ pageData }: ThesisSectionProps) {
  return (
    <section id="these" className="relative overflow-hidden bg-[#288fa5] dark:bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      {/* Same opposite-direction gradient overlay as PageHero — light theme
          fades transparent-to-teal top-to-bottom, dark theme fades solid-to-transparent. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#288fa5]/0 to-[#288fa5] dark:from-[#0d0d0d] dark:to-[#0d0d0d]/0 pointer-events-none" />
      <div className="relative max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <KickerIcon className="text-white" />
            <span className="font-abel text-white text-xl uppercase tracking-tight">
              {pageData?.thesisKicker || "Notre thèse d'investissement"}
            </span>
          </div>
          <p className="text-white/80 text-xl sm:text-2xl leading-relaxed lg:text-right lg:max-w-[566px]">
            {pageData?.thesisIntro || "Une thèse simple, appliquée avec rigueur à chaque dossier étudié."}
          </p>
        </div>

        <div className="relative flex flex-col gap-14 pt-14 border-t border-white/10">
          <p className="text-white text-xl sm:text-2xl lg:text-[32px] leading-snug max-w-[566px]">
            {pageData?.thesisBody ||
              "KREST HOLDING prend des participations majoritaires ou stratégiques dans des PME camerounaises rentables, dirigées par des équipes solides, avec un potentiel de croissance régionale démontré. Nous n'investissons pas dans des plans — nous investissons dans des dirigeants prêts à structurer leur entreprise pour durer."}
          </p>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed whitespace-pre-line">
            {pageData?.thesisQuote ||
              "KREST ne prend pas des participations passives.\nNous entrons au capital pour transformer — en apportant\nnos 5 pôles d'expertise aux côtés du capital financier."}
          </p>
        </div>
      </div>
    </section>
  );
}
