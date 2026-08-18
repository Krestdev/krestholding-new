"use client";

import { Subsidiary, SubsidiaryAccentColor } from "@/hooks/subsidiaries/type";
import { HomePageContent } from "@/hooks/home/type";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";

interface SubsidiariesSectionProps {
  subsidiaries: Subsidiary[];
  homeData?: HomePageContent | null;
}

const ACCENT: Record<SubsidiaryAccentColor, { bar: string; text: string; border: string }> = {
  teal: { bar: "bg-[#218da8]", text: "text-[#218da8]", border: "border-[#218da8]/24" },
  red: { bar: "bg-[#cf2538]", text: "text-[#cf2538]", border: "border-[#cf2538]/24" },
  orange: { bar: "bg-[#f29308]", text: "text-[#f29308]", border: "border-[#f29308]/24" },
  gray: { bar: "bg-[#4d5766]", text: "text-[#4d5766]", border: "border-[#4d5766]/24" },
};

export default function SubsidiariesSection({ subsidiaries, homeData }: SubsidiariesSectionProps) {
  const items = subsidiaries ?? [];
  const synergies = homeData?.synergies ?? [];

  const subsidiaryName = (ref: Subsidiary | number | undefined) =>
    typeof ref === "object" && ref !== null ? ref.name : undefined;

  return (
    <section className="bg-[#0d0d0d] py-24 lg:py-[112px] px-6 lg:px-10 border-y border-white/10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-15">
        <div className="flex items-center gap-3">
          <KickerIcon className="text-white" />
          <span className="font-abel text-white text-xl uppercase tracking-tight">
            {homeData?.subsidiariesKicker || "Ce que nous apportons au-delà du capital"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <h2 className="font-sans font-medium text-white text-3xl sm:text-4xl tracking-tight max-w-[512px]">
            {homeData?.subsidiariesHeading || "Un portefeuille construit, pas accumulé"}
          </h2>
          <p className="text-white/90 text-lg max-w-[536px]">
            {homeData?.subsidiariesSubheading ||
              "Chaque entité a été identifiée selon notre thèse d'investissement et bénéficie des 5 pôles d'accompagnement du groupe."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const accent = ACCENT[item.accentColor || "teal"];
            return (
              <div key={item.id} className={`border ${accent.border} overflow-hidden flex flex-col`}>
                <div className={`h-1 w-full ${accent.bar}`} />
                <div className="p-6 flex flex-col gap-1">
                  <span className={`font-abel text-[11px] uppercase tracking-widest ${accent.text}`}>
                    {item.category}
                  </span>
                  <h3 className="font-sans font-bold text-white text-xl pt-1">{item.name}</h3>

                  <div className="flex items-center gap-3 pt-1 text-xs">
                    {item.participationLabel && (
                      <span className="text-white/80">
                        Participation : <span className="text-white font-medium">{item.participationLabel}</span>
                      </span>
                    )}
                    {item.entryYear && (
                      <>
                        <span className="text-[#4d5766]">·</span>
                        <span className="text-white/80">
                          Entrée <span className="text-white">{item.entryYear}</span>
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed pt-4">{item.shortDescription}</p>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06]">
                    <span className="text-white/80 text-xs">Voir la fiche</span>
                    <CtaArrow size={14} className={accent.text} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {synergies.length > 0 && (
          <div className="flex flex-col gap-6 pt-4">
            <h3 className="font-sans font-medium text-white text-3xl sm:text-4xl tracking-tight">
              {homeData?.synergiesHeading || "Ce que les entités s'apportent entre elles"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {synergies.map((syn, idx) => (
                <div key={syn.id ?? idx} className="bg-white/[0.01] border border-white/[0.06] rounded-lg p-5">
                  <p className="text-sm">
                    <span className="text-[#218da8] font-bold">{subsidiaryName(syn.entityA)}</span>
                    <span className="text-[#4d5766] mx-2">↔</span>
                    <span className="text-[#f29308] font-bold">{subsidiaryName(syn.entityB)}</span>
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed pt-2">{syn.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
