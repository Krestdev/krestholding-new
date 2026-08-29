"use client";

import { useState } from "react";
import Link from "next/link";
import { Subsidiary, SubsidiaryAccentColor } from "@/hooks/subsidiaries/type";
import { ParticipationsPageContent } from "@/hooks/participations/type";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";
import SubsidiaryCard from "@/components/participations/SubsidiaryCard";
import { getSubsidiarySlug } from "@/lib/subsidiarySlug";

interface PortfolioSectionProps {
  pageData?: ParticipationsPageContent | null;
  subsidiaries: Subsidiary[];
}

type ViewMode = "grid" | "table";

const ACCENT: Record<SubsidiaryAccentColor, { bar: string; text: string; border: string }> = {
  teal: { bar: "bg-[#218da8]", text: "text-[#218da8]", border: "border-[#218da8]/24" },
  red: { bar: "bg-[#cf2538]", text: "text-[#cf2538]", border: "border-[#cf2538]/24" },
  orange: { bar: "bg-[#f29308]", text: "text-[#f29308]", border: "border-[#f29308]/24" },
  gray: { bar: "bg-[#4d5766]", text: "text-[#4d5766]", border: "border-[#4d5766]/24" },
};

export default function PortfolioSection({ pageData, subsidiaries }: PortfolioSectionProps) {
  const [view, setView] = useState<ViewMode>("grid");
  const items = subsidiaries ?? [];

  return (
    <section className="bg-white dark:bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111] dark:text-white" />
          <span className="font-abel text-[#111] dark:text-white text-xl uppercase tracking-tight">
            {pageData?.portfolioKicker || "Ce que nous avons construit avec nos partenaires"}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <h2 className="font-sans text-[#111] dark:text-white text-3xl sm:text-4xl leading-tight tracking-tight max-w-[512px]">
            {pageData?.portfolioHeading ||
              "Un portefeuille bâti avec conviction afin de générer une performance durable pour nos investisseurs"}
          </h2>
          <p className="text-[rgba(17,17,17,0.9)] dark:text-white/90 text-lg sm:text-xl leading-snug max-w-[514px]">
            {pageData?.portfolioSubheading ||
              "Chaque participation est sélectionnée selon notre thèse d'investissement et s'appuie sur les 5 pôles d'accompagnement du groupe."}
          </p>

          <div className="flex flex-col gap-2.5 shrink-0">
            <span className="text-[rgba(17,17,17,0.8)] dark:text-white/80 text-sm">Changer la vue des entités</span>
            <div className="flex border border-[#218da8] w-fit">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`font-mono text-[13px] uppercase tracking-[0.06em] px-4 py-2.5 transition-colors ${
                  view === "grid" ? "bg-[#218da8] text-white" : "bg-transparent text-[#010101] dark:text-white"
                }`}
              >
                Grille
              </button>
              <button
                type="button"
                onClick={() => setView("table")}
                className={`font-mono text-[13px] uppercase tracking-[0.06em] px-4 py-2.5 transition-colors ${
                  view === "table" ? "bg-[#218da8] text-white" : "bg-transparent text-[#010101] dark:text-white"
                }`}
              >
                Tableau
              </button>
            </div>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <SubsidiaryCard key={item.id} subsidiary={item} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(17,17,17,0.12)] dark:border-white/[0.12]">
                  {["Entité", "Secteur", "Participation", "Entrée", "Description", ""].map((h) => (
                    <th
                      key={h}
                      className="font-abel text-[#111] dark:text-white text-xs uppercase tracking-[1px] text-left py-3 pr-6"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const accent = ACCENT[item.accentColor || "teal"];
                  return (
                    <tr key={item.id} className="border-b border-[rgba(17,17,17,0.06)] dark:border-white/[0.06] group">
                      <td className="py-4 pr-6 font-sans text-[#111] dark:text-white text-base whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className={`py-4 pr-6 text-xs uppercase tracking-[0.5px] ${accent.text} whitespace-nowrap`}>
                        {item.category}
                      </td>
                      <td className="py-4 pr-6 text-[rgba(17,17,17,0.8)] dark:text-white/80 text-sm whitespace-nowrap">
                        {item.participationLabel || "—"}
                      </td>
                      <td className="py-4 pr-6 text-[rgba(17,17,17,0.8)] dark:text-white/80 text-sm whitespace-nowrap">
                        {item.entryYear ?? "—"}
                      </td>
                      <td className="py-4 pr-6 text-[rgba(17,17,17,0.8)] dark:text-white/80 text-sm min-w-[280px]">
                        {item.shortDescription}
                      </td>
                      <td className="py-4 pl-0">
                        <Link
                          href={`/partenaires/${getSubsidiarySlug(item)}`}
                          className="flex items-center gap-2 text-xs text-[rgba(17,17,17,0.8)] dark:text-white/80 whitespace-nowrap"
                        >
                          <span>Voir la fiche</span>
                          <CtaArrow
                            size={14}
                            className={`${accent.text} transition-transform duration-300 group-hover:translate-x-1`}
                          />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
