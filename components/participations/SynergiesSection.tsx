"use client";

import { ParticipationsPageContent } from "@/hooks/participations/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";

interface SynergiesSectionProps {
  pageData?: ParticipationsPageContent | null;
}

const DEFAULT_SYNERGIES = [
  {
    entityA: "CREACONSULT",
    entityB: "67 DESIGN & BUILD",
    description: "Études techniques et exécution BTP : du plan à la livraison en circuits intégrés.",
  },
  {
    entityA: "KRESTDEV",
    entityB: "LE CARINO",
    description: "Digitalisation de la restauration : réservation, caisse, fidélité.",
  },
  {
    entityA: "SAGA AFRICA",
    entityB: "Le Carino",
    description:
      "Approvisionnement mutualisé et partage de savoir-faire culinaire entre les deux enseignes de restauration.",
  },
  {
    entityA: "KRESTDEV",
    entityB: "Bull Services",
    description: "Plateforme digitale de gestion fourrière et dématérialisation des services aux collectivités.",
  },
  {
    entityA: "67 DESIGN & BUILD",
    entityB: "Saga Africa",
    description:
      "Conception et aménagement des espaces de restauration pour l'expansion du réseau Saga Africa.",
  },
  {
    entityA: "BULL SERVICES",
    entityB: "Communes",
    description: "Gestion fourrière mutualisée pour les collectivités de la zone CEMAC.",
  },
];

export default function SynergiesSection({ pageData }: SynergiesSectionProps) {
  const subsidiaryName = (ref: Subsidiary | number | undefined) =>
    typeof ref === "object" && ref !== null ? ref.name : undefined;

  const synergies = pageData?.synergies?.length
    ? pageData.synergies.map((syn, idx) => ({
        id: syn.id ?? idx,
        entityA: subsidiaryName(syn.entityA as Subsidiary | number) || "—",
        entityB: subsidiaryName(syn.entityB as Subsidiary | number) || "—",
        description: syn.description,
      }))
    : DEFAULT_SYNERGIES.map((syn, idx) => ({ id: idx, ...syn }));

  return (
    <section className="bg-white pb-24 lg:pb-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111]" />
          <span className="font-abel text-[#111] text-xl uppercase tracking-tight max-w-[294px]">
            {pageData?.synergiesKicker || "Ce que les entités s'apportent entre elles"}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <h2 className="font-sans text-[#010101] text-3xl sm:text-4xl leading-tight tracking-tight max-w-[621px]">
            {pageData?.synergiesHeading ||
              "Des synergies concrètes qui créent de la valeur à chaque niveau du groupe."}
          </h2>
          <p className="text-[rgba(1,1,1,0.8)] text-lg sm:text-xl leading-relaxed max-w-[514px]">
            {pageData?.synergiesSubheading ||
              "C'est la raison pour laquelle chaque participation bénéficie de l'ensemble de l'écosystème du groupe, au-delà du seul apport en capital."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {synergies.map((syn) => (
            <div key={syn.id} className="bg-neutral-50 border border-[rgba(17,17,17,0.06)] rounded-lg p-5">
              <p className="text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="text-[#218da8]">{syn.entityA}</span>
                <span className="text-[#4d5766] mx-4">↔</span>
                <span className="text-[#f29308]">{syn.entityB}</span>
              </p>
              <p className="text-[rgba(17,17,17,0.8)] text-sm leading-relaxed pt-4">{syn.description}</p>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[rgba(17,17,17,0.06)]">
                <span className="text-[rgba(17,17,17,0.8)] text-xs">Voir la fiche</span>
                <CtaArrow size={14} className="text-[#4d5766]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
