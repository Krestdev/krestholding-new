"use client";

import Link from "next/link";
import { NotreModeleContent, PoleCard } from "@/hooks/notreModele/type";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";

interface PolesSectionProps {
  pageData?: NotreModeleContent | null;
}

const DEFAULT_POLES: PoleCard[] = [
  {
    title: "Growth, Marketing & Brand",
    examples: [
      { text: "Refonte de la marque LE CARINO" },
      { text: "Développement marketing de Saga Africa" },
    ],
  },
  {
    title: "Développement informatique",
    examples: [
      { text: "Système de réservation SAGA AFRICA" },
      { text: "Développement du site web Saga Africa" },
      { text: "Refonte du site LE CARINO" },
    ],
  },
  { title: "Comptabilité & Fiscalité", examples: [{ text: "Mise en conformité fiscale multi-entités" }] },
  { title: "Procurement", examples: [{ text: "Achats groupés inter-entités" }] },
  { title: "Ressources Humaines", examples: [{ text: "Structuration de la paie et du droit social" }] },
];

export default function PolesSection({ pageData }: PolesSectionProps) {
  const poles = pageData?.poleCards?.length ? pageData.poleCards : DEFAULT_POLES;

  return (
    <section id="poles" className="bg-[#0d0d0d] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20 py-24 lg:py-[120px]">
        <div className="flex flex-col gap-20">
          <div className="flex items-center gap-3">
            <KickerIcon className="text-white" />
            <span className="font-abel text-white text-xl uppercase tracking-tight">
              {pageData?.polesKicker || "Les 5 pôles d'expertise"}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            <h2 className="font-sans text-white text-3xl sm:text-4xl leading-tight lg:max-w-[621px]">
              {pageData?.polesHeading || "Ce que vous gagnez au-delà du capital"}
            </h2>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed lg:flex-1">
              {pageData?.polesIntro ||
                "Chaque participation active dès son entrée les 5 pôles d'expertise mutualisés du groupe."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {poles.map((pole, idx) => (
              <div key={idx} className="group relative border border-white/24 overflow-hidden flex flex-col">
                <div className="h-1 w-full bg-white" />
                <div className="p-6 flex flex-col gap-8 pb-20">
                  <p className="text-white text-2xl leading-relaxed">{pole.title}</p>
                  {pole.examples?.length ? (
                    <div className="flex flex-col gap-3">
                      <span className="font-abel text-white/60 text-xs uppercase tracking-[1px]">
                        Exemple de participation
                      </span>
                      <div className="flex flex-col gap-3">
                        {pole.examples.map((ex, exIdx) => (
                          <p
                            key={exIdx}
                            className={
                              exIdx === 0
                                ? "text-white text-sm"
                                : exIdx === 1
                                  ? "text-white/80 text-sm"
                                  : "text-white/50 text-sm"
                            }
                          >
                            {ex.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[176px] bg-gradient-to-b from-transparent to-white/10 pointer-events-none" />
                <div className="absolute right-0 bottom-0 backdrop-blur-md bg-white/24 flex items-center gap-2 pl-6 pr-3.5 py-3">
                  <span className="text-sm font-medium text-white/93 tracking-wide">VOIR PLUS</span>
                  <CtaArrow size={14} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <CaseStudy pageData={pageData} />
      </div>
    </section>
  );
}

function CaseStudy({ pageData }: PolesSectionProps) {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex items-center gap-3">
        <KickerIcon className="text-white" />
        <span className="font-abel text-white text-xl uppercase tracking-tight">
          {pageData?.caseStudyKicker || "Un accompagnement, raconté"}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        <h2 className="font-sans text-white text-3xl sm:text-4xl leading-tight lg:max-w-[621px]">
          {pageData?.caseStudyHeading ||
            "Cheminer avec Krest, c'est écrire une page de l'histoire avec l'encre de l'espoir et le souffle du progrès"}
        </h2>
        <p className="text-white/80 text-lg sm:text-xl leading-relaxed lg:flex-1">
          {pageData?.caseStudyIntro ||
            "C'est la raison pour laquelle chaque participation suit le même chemin : un diagnostic honnête, un plan d'action partagé, des résultats mesurés."}
        </p>
      </div>

      <div id="processus" className="flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-white/24 overflow-hidden flex flex-col">
            <div className="h-1 w-full bg-white" />
            <div className="p-6 flex flex-col gap-8">
              <p className="text-white text-2xl">{pageData?.caseStudySituationTitle || "Situation de départ"}</p>
              <p className="text-white text-base leading-relaxed">
                {pageData?.caseStudySituationBody ||
                  "CREACONSULT était un bureau d'études techniques rentable mais limité par une gestion administrative manuelle et l'absence de certifications reconnues à l'international."}
              </p>
            </div>
          </div>
          <div className="border border-white/24 overflow-hidden flex flex-col">
            <div className="h-1 w-full bg-white" />
            <div className="p-6 flex flex-col gap-8">
              <p className="text-white text-2xl">{pageData?.caseStudyActionTitle || "Ce que KREST a fait"}</p>
              <p className="text-white text-base leading-relaxed">
                {pageData?.caseStudyActionBody ||
                  "Entrée au capital à hauteur de 70 %, mise en place d'une comptabilité structurée, accompagnement vers la double certification ISO 9001 et ISO 14001, digitalisation des processus internes."}
              </p>
            </div>
          </div>
          <div className="border border-white/24 overflow-hidden flex flex-col">
            <div className="h-1 w-full bg-white" />
            <div className="p-6 flex flex-col gap-8">
              <p className="text-white text-2xl">{pageData?.caseStudyResultTitle || "Résultat"}</p>
              <p className="text-white text-base leading-relaxed">
                {pageData?.caseStudyResultBody ||
                  "Ingénierie certifiée ISO 9001 & ISO 14001, éligibilité à de nouveaux appels d'offres internationaux, et une gouvernance financière alignée sur les standards du groupe."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 p-6">
          <div className="flex flex-col gap-3">
            <p className="text-white text-2xl">{pageData?.caseStudyCtaTitle || "Soumettez votre dossier"}</p>
            <p className="text-[#878887] text-sm">
              {pageData?.caseStudyCtaBody ||
                "Votre dossier est traité de manière confidentielle. Réponse sous 15 jours ouvrés."}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={pageData?.caseStudyCtaPrimaryUrl || "/#soumettre-dossier"}
              className="group inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-[#f29308] text-white text-sm font-medium uppercase tracking-wide transition-colors hover:bg-[#f29308]/85"
            >
              <span>{pageData?.caseStudyCtaPrimaryLabel || "Soumettre un dossier"}</span>
              <CtaArrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={pageData?.caseStudyCtaSecondaryUrl || "/contact"}
              className="group inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-white text-black text-sm font-medium uppercase tracking-wide transition-colors hover:bg-white/90"
            >
              <span>{pageData?.caseStudyCtaSecondaryLabel || "Nous écrire"}</span>
              <CtaArrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
