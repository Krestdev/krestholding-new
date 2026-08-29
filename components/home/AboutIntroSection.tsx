"use client";

import { HomePageContent } from "@/hooks/home/type";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowRight } from "@phosphor-icons/react";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

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
  const quoteAvatar = typeof homeData?.aboutQuoteAvatar === "object" ? homeData.aboutQuoteAvatar : undefined;
  const introHeading =
    homeData?.aboutIntroHeading ||
    "Depuis 2018, KREST HOLDING identifie, structure et accompagne des entreprises à travers 5 pôles d'expertise mutualisés. Un modèle de création de valeur durable ancré dans l'économie camerounaise.";

  return (
    <section className="bg-[#218da8] dark:bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16 lg:gap-[120px] divide-y divide-white/10 lg:divide-y-0 [&>*+*]:pt-16 lg:[&>*+*]:pt-0">
        {/* Intro */}
        <div className="flex flex-col items-start lg:flex-row gap-10 lg:gap-0">
          <div className="flex items-center gap-3 shrink-0 lg:w-[340px] lg:pt-[6px]">
            <KickerIcon className="text-white" />
            <span className="font-abel text-white text-xl uppercase tracking-tight">
              {homeData?.aboutKicker || "A propos de nous"}
            </span>
          </div>

          <div className="flex flex-col gap-8 lg:max-w-[600px]">
            <ScrollRevealText
              as="h2"
              text={introHeading}
              className="font-sans font-medium text-3xl sm:text-4xl leading-tight"
            />
            <p className="text-[#ccc] text-lg sm:text-xl leading-relaxed">
              {homeData?.aboutIntroBody ||
                "Chaque participation bénéficie d'un accompagnement mensuel structuré autour de nos 5 pôles d'expertise : marketing, IT, finance, achats et ressources humaines."}
            </p>

            <div className="flex flex-col w-full lg:w-[680px] bg-[#1f7e96] dark:bg-[#141414]">
              <div className="flex items-center gap-3 p-5">
                <div className="relative shrink-0 size-16 rounded-full border-[1.6px] border-white/10 overflow-hidden">
                  {quoteAvatar?.url && (
                    <Image src={quoteAvatar.url} alt="" fill className="object-cover" />
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="font-sans font-bold text-white text-[15px] leading-tight">
                    {homeData?.aboutQuoteAuthorName || "La Direction Générale"}
                  </p>
                  <p className="text-white/90 text-[15px] leading-tight">
                    {homeData?.aboutQuoteAuthorTitle || "KREST HOLDING"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between h-[140px] bg-[#0d0d0d] p-5">
                <div className="flex items-end gap-0.5">
                  <p className="text-[#ccc] text-xs leading-relaxed">
                    {homeData?.aboutQuoteText ||
                      "Chaque participation bénéficie d'un accompagnement mensuel structuré."}
                  </p>
                  <span className="shrink-0 w-0.5 h-3.5 bg-[#49ccc1]" aria-hidden />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center p-3 border border-white/10">
                    <Plus size={16} className="text-white" />
                  </div>
                  <div className="flex items-center justify-center p-3 bg-[#141414]">
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <KickerIcon className="text-white" />
            <span className="font-abel text-white text-xl uppercase tracking-tight">
              {homeData?.aboutSecondKicker || "Comment nous créons de la valeur"}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-10">
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
                className="group inline-flex items-center gap-2 border border-white/20 rounded px-5 py-2.5 text-sm text-white font-medium w-fit transition-colors hover:bg-white/5 hover:border-white/40"
              >
                <span>{homeData?.aboutCtaLabel || "Notre rapport d'impact"}</span>
                <CtaArrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex flex-col gap-8 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <span className="font-sans text-white text-4xl sm:text-5xl tracking-tight">{stat.value}</span>
                    <span className="font-abel text-black dark:text-[#f29308] text-xs uppercase tracking-[0.2em] leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 border-t border-white/[0.15] dark:border-white/[0.06] pt-6">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-abel text-white dark:text-[#218da8] text-xs uppercase tracking-widest border border-white/40 dark:border-[#218da8]/30 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
