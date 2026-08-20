"use client";

import Link from "next/link";
import { NotreModeleContent } from "@/hooks/notreModele/type";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";

interface ImpactSectionProps {
  pageData?: NotreModeleContent | null;
}

const DEFAULT_STATS = [
  { value: "80%", label: "De participation en moyenne" },
  { value: "+18", label: "Emplois directs créés" },
  { value: "5", label: "Pôles d'accompagnement" },
  { value: "2", label: "Certifications ISO" },
  { value: "6", label: "Entreprises accompagnées" },
];

export default function ImpactSection({ pageData }: ImpactSectionProps) {
  const stats = pageData?.impactStats?.length ? pageData.impactStats : DEFAULT_STATS;

  return (
    <section className="bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          <div className="flex items-center gap-3 shrink-0 lg:w-[260px]">
            <KickerIcon className="text-white" />
            <span className="font-abel text-white text-xl uppercase tracking-tight">
              {pageData?.impactKicker || "Notre impact"}
            </span>
          </div>
          <p className="text-white text-2xl sm:text-4xl leading-tight lg:flex-1">
            {pageData?.impactHeading ||
              "Krest sème les graines d'un avenir radieux, là où la terre murmure ses promesses et où chaque horizon porte l'éclat d'un rêve partagé."}
          </p>
        </div>

        <div className="flex flex-wrap items-end justify-end gap-x-6 gap-y-8 border-t border-white/16 pt-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex-1 min-w-[140px] flex flex-col gap-6 px-2">
              <span className="font-sans text-white text-4xl sm:text-5xl tracking-tight">{stat.value}</span>
              <span className="font-abel text-[#f29308] text-xs uppercase tracking-[0.2em] leading-tight">
                {stat.label}
              </span>
            </div>
          ))}

          <Link
            href={pageData?.impactCtaUrl || "/a-propos"}
            className="group inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-white text-black text-sm font-medium uppercase tracking-wide transition-colors hover:bg-white/90"
          >
            <span>{pageData?.impactCtaLabel || "Découvrir plus"}</span>
            <CtaArrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
