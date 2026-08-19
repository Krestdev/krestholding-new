"use client";

import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";
import { ParticipationsPageContent, StatItem } from "@/hooks/participations/type";

interface PageHeroProps {
  pageData?: ParticipationsPageContent | null;
}

const DEFAULT_STATS: StatItem[] = [
  { value: "2019", label: "Première entrée au capital" },
  { value: "5", label: "Secteurs représentés" },
  { value: "6", label: "Participation actives" },
  { value: "2", label: "Certifications ISO au portefeuille" },
];

export default function PageHero({ pageData }: PageHeroProps) {
  const stats = pageData?.heroStats?.length ? pageData.heroStats : DEFAULT_STATS;

  return (
    <section className="relative flex flex-col items-center px-6 lg:px-10 pt-[120px] pb-10 bg-gradient-to-b from-[rgba(13,13,13,0.8)] to-[#0d0d0d]">
      <div className="w-full max-w-[1280px] flex flex-col gap-10">
        <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
          <Link href="/" className="text-white/64 hover:text-white transition-colors">
            Accueil
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <span className="font-bold text-white">Nos participations</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-10 lg:gap-[83px]">
          <div className="flex flex-col gap-12 max-w-[624px]">
            <h1 className="font-sans font-medium text-white text-4xl sm:text-[42px] leading-tight">
              {pageData?.heroHeading ||
                "Un portefeuille stratégique construit avec rigueur et vision, jamais accumulé par hasard."}
            </h1>
            <p className="text-white/80 text-xl sm:text-2xl leading-relaxed max-w-[566px]">
              {pageData?.heroSubheading ||
                "Scrollez pour découvrir comment nous transformons chaque projet en une expérience unique."}
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-8 pt-6 w-full">
            {stats.map((stat, idx) => (
              <div key={stat.id ?? idx} className="flex flex-col gap-6">
                <span className="font-sans text-white text-5xl tracking-tight">{stat.value}</span>
                <span className="font-abel text-[#f29308] text-base tracking-[0.15em] uppercase leading-snug whitespace-pre-line">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
