"use client";

import { useRef } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  ParticipationsPageContent,
  SectorBreakdownItem,
  OwnershipBreakdownItem,
} from "@/hooks/participations/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface PortfolioCompositionSectionProps {
  pageData?: ParticipationsPageContent | null;
  subsidiaries: Subsidiary[];
}

const DEFAULT_SECTORS: SectorBreakdownItem[] = [
  { label: "Restauration & loisirs", percentage: 30 },
  { label: "BTP, construction & design", percentage: 54 },
  { label: "Bureau d'études", percentage: 54 },
  { label: "Solutions digitales", percentage: 44 },
  { label: "Services aux collectivités", percentage: 46 },
];

const DEFAULT_OWNERSHIP: OwnershipBreakdownItem[] = [
  { rank: "2", rankColor: "orange", label: "Détention totale (100 %)", percentage: 46, barColor: "orange" },
  { rank: "1", rankColor: "orange", label: "Majoritaire (70 – 99 %)", percentage: 22, barColor: "orange" },
  { rank: "1", rankColor: "teal", label: "Non communiqué", percentage: 65, barColor: "gray" },
];

function ProgressBarRow({
  label,
  percentage,
  barColor = "orange",
  rank,
  rankColor,
}: {
  label: string;
  percentage: number;
  barColor?: "orange" | "gray";
  rank?: string;
  rankColor?: "orange" | "teal" | null;
}) {
  const fill = barColor === "gray" ? "bg-[#878887]" : "bg-[#f29308]";
  const rankClass = rankColor === "teal" ? "text-[#218da8]" : "text-[#f29308]";

  return (
    <div className="flex gap-6 md:gap-[38px] items-center w-full">
      <div className="flex items-center gap-4 max-w-[220px] min-w-[220px]">
        {rank && <span className={`text-right w-4 text-xl tracking-tight ${rankClass}`}>{rank}</span>}
        <span className="text-black dark:text-white text-xl tracking-tight">{label}</span>
      </div>
      <div className="flex-1 h-[11px] relative bg-black/10 dark:bg-white/32">
        <div
          className={`absolute inset-y-0 left-0 ${fill}`}
          style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
        />
      </div>
    </div>
  );
}

export default function PortfolioCompositionSection({ pageData, subsidiaries }: PortfolioCompositionSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const sectors = pageData?.sectorBreakdown?.length ? pageData.sectorBreakdown : DEFAULT_SECTORS;
  const ownership = pageData?.ownershipBreakdown?.length ? pageData.ownershipBreakdown : DEFAULT_OWNERSHIP;

  const foundingYear = pageData?.foundingYear ?? 2018;
  const foundingLabel = pageData?.foundingLabel || "Fondation de KREST HOLDING";

  const timelineItems = [
    { id: "founding", year: String(foundingYear), title: foundingLabel, subtitle: null as string | null },
    ...[...(subsidiaries ?? [])]
      .sort((a, b) => (a.entryYear ?? 9999) - (b.entryYear ?? 9999) || (a.order ?? 0) - (b.order ?? 0))
      .map((s) => ({
        id: String(s.id),
        year: s.entryYear ? String(s.entryYear) : "—",
        title: s.name,
        subtitle: s.participationLabel ?? null,
      })),
  ];

  const scrollTimeline = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <section className="bg-white dark:bg-[#0d0d0d]">
      {/* Sector/ownership breakdown — absent from the mobile Figma frame entirely
          (only the timeline below survives on mobile), so hidden below lg. */}
      <div className="hidden lg:flex max-w-[1280px] mx-auto px-6 lg:px-10 pt-[120px] pb-[60px] flex-col gap-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex items-center gap-3">
            <KickerIcon className="text-black dark:text-white" />
            <span className="font-abel text-black dark:text-white text-xl uppercase tracking-tight leading-snug">
              Comment le portefeuille
              <br />
              est composé
            </span>
          </div>
          <p className="text-black/80 dark:text-white/80 text-xl sm:text-2xl leading-relaxed text-left lg:text-right max-w-[566px]">
            {pageData?.compositionSubheading ||
              "Une répartition pensée pour équilibrer performance, contrôle et diversification sectorielle."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-16">
          <div className="flex flex-col gap-12">
            <h3 className="font-sans text-black dark:text-white text-3xl sm:text-4xl tracking-tight">Par secteur</h3>
            <div className="flex flex-col gap-9">
              {sectors.map((sector, idx) => (
                <ProgressBarRow key={sector.id ?? idx} label={sector.label} percentage={sector.percentage} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <h3 className="font-sans text-black dark:text-white text-3xl sm:text-4xl tracking-tight">Par niveau de détention</h3>
            <div className="flex flex-col gap-9">
              {ownership.map((row, idx) => (
                <ProgressBarRow
                  key={row.id ?? idx}
                  label={row.label}
                  percentage={row.percentage}
                  barColor={row.barColor || "orange"}
                  rank={row.rank}
                  rankColor={row.rankColor}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 pt-16">
          <h3 className="font-sans text-black dark:text-white text-3xl sm:text-4xl tracking-tight">Par niveau de détention</h3>
          <div className="flex flex-col gap-9 max-w-[624px]">
            {ownership.map((row, idx) => (
              <ProgressBarRow
                key={row.id ?? idx}
                label={row.label}
                percentage={row.percentage}
                barColor={row.barColor || "orange"}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-[60px] pb-[120px] flex flex-col gap-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex items-center gap-3">
            <KickerIcon className="text-black dark:text-white" />
            <span className="font-abel text-black dark:text-white text-xl uppercase tracking-tight leading-snug whitespace-pre">
              {pageData?.timelineKicker || "Comment le portefeuille s'est construit"}
            </span>
          </div>
          <p className="text-black/80 dark:text-white/80 text-xl sm:text-2xl leading-relaxed text-left lg:text-right max-w-[566px]">
            {pageData?.timelineSubheading ||
              "Une trajectoire construite étape par étape, entrée après entrée au capital."}
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <span className="text-black/50 dark:text-white/50 text-sm">Faites défiler pour voir toute la trajectoire</span>
            <div className="flex border border-[#f29308] rounded-full overflow-hidden shrink-0">
              <button
                type="button"
                onClick={() => scrollTimeline(-1)}
                aria-label="Précédent"
                className="p-2 text-[#f29308] hover:bg-[#f29308]/10 transition-colors"
              >
                <CaretLeft size={16} />
              </button>
              <div className="w-px bg-[#f29308]/40" />
              <button
                type="button"
                onClick={() => scrollTimeline(1)}
                aria-label="Suivant"
                className="p-2 text-[#f29308] hover:bg-[#f29308]/10 transition-colors"
              >
                <CaretRight size={16} />
              </button>
            </div>
          </div>

          <div ref={scrollerRef} className="relative overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none]">
            <div className="relative flex gap-[61px] pt-[9.5px] min-w-max border-t border-[#218da8]/60">
              {timelineItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-5 w-[139px] shrink-0 -mt-[9.5px]">
                  <span className="flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 border-[#f29308] bg-white dark:bg-[#0d0d0d]">
                    <span className="h-2 w-2 rounded-full bg-[#218da8]" />
                  </span>
                  <span className="font-sans text-black dark:text-white text-3xl sm:text-4xl tracking-tight">{item.year}</span>
                  <span className="text-black dark:text-white text-base leading-snug">{item.title}</span>
                  {item.subtitle && <span className="text-black/50 dark:text-white/50 text-base -mt-3">{item.subtitle}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
