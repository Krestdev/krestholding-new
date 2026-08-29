"use client";

import Link from "next/link";
import { Check, X } from "@phosphor-icons/react";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";

const CRITERIA_MATCH = [
  "Entreprise établie au Cameroun / CEMAC",
  "Activité en exploitation avec CA récurrent",
  "Secteur figurant dans notre périmètre",
  "Horizon d'engagement de 5 à 10 ans",
];

const CRITERIA_MISMATCH = [
  "Projets au stade de l'idée",
  "Demandes de prêt ou subvention",
  "Prises de participation passives",
  "Recherche d'une sortie rapide",
];

const STEPS = [
  {
    number: "01",
    duration: "~ 5 JOURS OUVRÉS",
    title: "Prise de contact du projet",
    description: "Sourcing propriétaire dans nos secteurs cibles. Échanges exploratoires initiaux.",
  },
  {
    number: "02",
    duration: "~ 3 SEMAINES",
    title: "Analyse du dossier",
    description: "Analyse approfondie de la viabilité financière, opérationnelle et alignement stratégique.",
  },
  {
    number: "03",
    duration: "~ 2 À 3 MOIS",
    title: "Due diligence & structuration",
    description: "Audit complet légal et financier avec montage d'une offre sur mesure.",
  },
  {
    number: "04",
    duration: "DURÉE LONGUE",
    title: "Entrée au capital & accompagnement",
    description: "Déploiement des 5 pôles d'expertise pour catalyser le développement durable.",
  },
];

export default function EligibilitySection() {
  return (
    <section className="bg-white py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex items-center gap-3">
          <KickerIcon className="text-black" />
          <span className="font-abel text-black text-xl uppercase tracking-tight">Comment vous participons</span>
        </div>

        <div className="flex flex-col gap-10">
          <h2 className="font-sans text-black text-3xl sm:text-4xl leading-tight max-w-[624px]">
            Votre entreprise correspond-elle ?
          </h2>
          <p className="text-black/70 text-lg max-w-[624px] leading-relaxed">
            KREST ne prend pas des participations passives. Nous entrons au capital pour vous transformer — en
            apportant nos 5 pôles d&apos;expertise aux côtés du capital financier.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-black/12 p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-[#1a9c5c]">
                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-[#1a9c5c]">
                  <Check size={14} weight="bold" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide">Ce que nous recherchons</span>
              </div>
              <ul className="flex flex-col gap-3">
                {CRITERIA_MATCH.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-black/80 text-base leading-relaxed">
                    <Check size={16} weight="bold" className="text-[#1a9c5c] shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-black/12 p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-[#d9382c]">
                <span className="flex items-center justify-center w-6 h-6 rounded-full border border-[#d9382c]">
                  <X size={14} weight="bold" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide">Ce que nous n&apos;accompagnons pas</span>
              </div>
              <ul className="flex flex-col gap-3">
                {CRITERIA_MISMATCH.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-black/80 text-base leading-relaxed">
                    <X size={16} weight="bold" className="text-[#d9382c] shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div id="processus" className="flex flex-col gap-10">
          <h3 className="font-sans text-black text-2xl sm:text-3xl leading-tight">
            Comment se déroule une prise de participation ?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="flex flex-col gap-4 pt-6 border-t border-black/16">
                <div className="flex items-center justify-between">
                  <span className="font-abel text-black/40 text-sm">{step.number}</span>
                  <span className="font-abel text-black/50 text-[11px] uppercase tracking-[0.15em]">
                    {step.duration}
                  </span>
                </div>
                <p className="text-black text-lg font-medium leading-snug">{step.title}</p>
                <p className="text-black/70 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#f5f5f4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6">
            <p className="text-black/70 text-sm max-w-[420px]">
              Votre dossier est traité en toute confidentialité. Réponse sous 15 jours.
            </p>
            <Link
              href="/#soumettre-dossier"
              className="group inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-black text-white text-sm font-medium uppercase tracking-wide transition-colors hover:bg-black/85 shrink-0"
            >
              <span>Soumettre un dossier</span>
              <CtaArrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
