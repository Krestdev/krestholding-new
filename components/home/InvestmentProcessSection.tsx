"use client";

import { HomePageContent } from "@/hooks/home/type";
import Link from "next/link";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";

interface InvestmentProcessSectionProps {
  homeData?: HomePageContent | null;
}

const DEFAULT_MODEL_STEPS = [
  {
    title: "Identifier",
    description:
      "Sourcing propriétaire dans nos secteurs cibles. Sélection sur la rentabilité récurrente et la qualité du dirigeant, pas sur le plan business seul.",
  },
  {
    title: "Structurer & financer",
    description:
      "Ingénierie juridique et financière de la prise de participation. Due diligence, pacte d'actionnaires, plan d'accompagnement sur-mesure.",
  },
  {
    title: "Développer",
    description:
      "Activation des 5 pôles : marketing, IT, finance, achats, RH. Suivi mensuel avec la Direction Générale. Horizon 5 à 10 ans.",
  },
];

const DEFAULT_PROCESS_STEPS = [
  { title: "Prise de contact", duration: "≈ 5 jours ouvrés" },
  { title: "Analyse du dossier", duration: "≈ 3 semaines" },
  { title: "Due diligence & structuration", duration: "≈ 2 à 3 mois" },
  { title: "Entrée au capital & accompagnement", duration: "Durée longue" },
];

export default function InvestmentProcessSection({ homeData }: InvestmentProcessSectionProps) {
  const modelSteps = homeData?.modelSteps?.length ? homeData.modelSteps : DEFAULT_MODEL_STEPS;
  const processSteps = homeData?.processSteps?.length ? homeData.processSteps : DEFAULT_PROCESS_STEPS;

  return (
    <section id="notre-modele" className="bg-white py-24 lg:py-[112px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-[389px_1fr] gap-10 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <KickerIcon className="text-black" />
              <span className="font-abel text-black text-xl uppercase tracking-tight">
                {homeData?.modelKicker || "Comment nous créons de la valeur"}
              </span>
            </div>
            <h2 className="font-sans font-medium text-[#010101] text-3xl sm:text-4xl tracking-tight">
              {homeData?.modelHeading || "Notre modèle en 3 temps"}
            </h2>
            <p className="text-[#878887] text-sm leading-relaxed">
              {homeData?.modelBody ||
                "KREST ne prend pas des participations passives. Nous entrons au capital pour transformer — en apportant nos 5 pôles d'expertise aux côtés du capital financier."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {modelSteps.map((step, idx) => (
              <div key={idx} className="relative border-t-2 border-x border-b border-black/[0.08] p-6 flex flex-col">
                <span className="text-[#218da8]/25 font-abel text-6xl leading-none pb-2">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans text-[#010101] text-lg pt-4">{step.title}</h3>
                <p className="text-[#878887] text-sm leading-relaxed pt-3">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h3 className="font-sans font-medium text-[#111] text-xl sm:text-2xl">
            {homeData?.processHeading || "Processus de prise de participation"}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 text-center">
                <div className="size-12 rounded-full bg-[#f29308]/20 flex items-center justify-center text-[#218da8] font-abel text-lg">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <p className="font-sans text-[#010101] text-base">{step.title}</p>
                <p className="font-abel text-[#218da8] text-sm uppercase tracking-wide">{step.duration}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/[0.02] border border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6">
          <div className="flex flex-col gap-1">
            <p className="font-sans text-[#010101] text-base">
              {homeData?.processNoteTitle || "Votre dossier est traité en toute confidentialité."}
            </p>
            <p className="text-[#878887] text-sm">
              {homeData?.processNoteBody || "Réponse systématique sous 15 jours ouvrés."}
            </p>
          </div>
          <Link
            href={homeData?.processCtaUrl || "#soumettre-dossier"}
            className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-black text-white text-sm font-medium shrink-0"
          >
            <span>{homeData?.processCtaLabel || "Soumettre un dossier"}</span>
            <CtaArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
