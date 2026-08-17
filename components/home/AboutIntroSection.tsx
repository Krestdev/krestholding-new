"use client";

import { HomePageContent } from "@/hooks/home/type";
import Link from "next/link";
import { Asterisk } from "@phosphor-icons/react";
import CtaArrow from "@/components/ui/CtaArrow";

interface AboutIntroSectionProps {
  homeData?: HomePageContent | null;
}

const DEFAULT_TAGS = ["ISO 9001", "ISO 14001", "Cameroun · CEMAC", "Depuis 2018"];

const DEFAULT_STATS = [
  { value: "2018", label: "Année de fondation" },
  { value: "18", label: "Emplois directs créés" },
  { value: "80%", label: "De participation en moyenne" },
  { value: "5", label: "Pôles d'accompagnement" },
  { value: "2", label: "Certifications ISO" },
  { value: "6", label: "Entreprises accompagnées" },
];

export default function AboutIntroSection({ homeData }: AboutIntroSectionProps) {
  const tags = homeData?.aboutTags?.length ? homeData.aboutTags.map((t) => t.label) : DEFAULT_TAGS;
  const stats = homeData?.aboutStats?.length ? homeData.aboutStats : DEFAULT_STATS;

  return (
    <section className="bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-[120px]">
        {/* Intro */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[80px]">
          <div className="flex items-center gap-3 shrink-0 lg:w-[340px]">
            <Asterisk size={22} weight="fill" className="text-white" />
            <span className="font-abel text-white text-xl uppercase tracking-tight">
              {homeData?.aboutKicker || "A propos de nous"}
            </span>
          </div>

          <div className="flex flex-col gap-8 max-w-[680px]">
            <h2 className="font-sans font-medium text-white text-3xl sm:text-4xl leading-tight">
              {homeData?.aboutIntroHeading ||
                "Depuis 2018, KREST HOLDING identifie, structure et accompagne des entreprises à travers 5 pôles d'expertise mutualisés. Un modèle de création de valeur durable ancré dans l'économie camerounaise."}
            </h2>
            {homeData?.aboutIntroBody && typeof homeData.aboutIntroBody === "string" && (
              <p className="text-[#ccc] text-lg leading-relaxed">{homeData.aboutIntroBody}</p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="font-abel text-[#218da8] text-xs uppercase tracking-widest border border-[#218da8]/30 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Asterisk size={20} weight="fill" className="text-white" />
            <span className="font-abel text-white text-xl uppercase tracking-tight">
              {homeData?.aboutSecondKicker || "Comment nous créons de la valeur"}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-end gap-10">
            <div className="flex flex-col gap-6 w-full lg:w-[468px] shrink-0">
              <h3 className="font-sans text-white text-3xl sm:text-4xl leading-tight">
                {homeData?.aboutStatsHeading || "Investir avec KREST, c'est investir dans l'Afrique de demain"}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {homeData?.aboutStatsBody ||
                  "Nos indicateurs mesurent la valeur créée dans l'économie réelle : emplois pérennes, entreprises certifiées, synergies inter-entités."}
              </p>
              <Link
                href={homeData?.aboutCtaUrl || "#"}
                className="inline-flex items-center gap-2 border border-white/20 rounded px-5 py-2.5 text-sm text-white font-medium w-fit"
              >
                <span>{homeData?.aboutCtaLabel || "Notre rapport d'impact"}</span>
                <CtaArrow />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-x-8 gap-y-8 w-full border-t border-white/[0.06] pt-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="font-sans text-white text-4xl sm:text-5xl tracking-tight">{stat.value}</span>
                  <span className="font-abel text-[#f29308] text-xs uppercase tracking-[0.2em] leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
