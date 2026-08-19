import { Subsidiary } from "@/hooks/subsidiaries/type";
import { ParticipationsPageContent } from "@/hooks/participations/type";
import KickerIcon from "@/components/ui/KickerIcon";
import SubsidiaryCard from "@/components/participations/SubsidiaryCard";

interface SynergiesSectionProps {
  subsidiary: Subsidiary;
  pageData?: ParticipationsPageContent | null;
}

export default function SynergiesSection({ subsidiary, pageData }: SynergiesSectionProps) {
  const entityId = (ref: Subsidiary | number | undefined) =>
    typeof ref === "object" && ref !== null ? ref.id : ref;

  const counterparts = (pageData?.synergies || [])
    .map((syn) => {
      const aId = entityId(syn.entityA as Subsidiary | number);
      const bId = entityId(syn.entityB as Subsidiary | number);
      if (aId === subsidiary.id) return syn.entityB as Subsidiary | number;
      if (bId === subsidiary.id) return syn.entityA as Subsidiary | number;
      return null;
    })
    .filter((ref): ref is Subsidiary => typeof ref === "object" && ref !== null);

  if (counterparts.length === 0) return null;

  return (
    <section className="bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-white" />
          <span className="font-abel text-white text-xl uppercase tracking-tight">Synergies</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <h2 className="font-sans text-white text-3xl sm:text-[32px] leading-tight tracking-tight max-w-[512px]">
            Avec les autres entités du groupe
          </h2>
          <p className="text-white/64 text-lg sm:text-xl leading-snug max-w-[514px]">
            {subsidiary.synergiesIntro ||
              "Une phrase sur trois lignes qui donne brièvement l'idée entreprise affiché sur cette page, de ce côté."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {counterparts.map((entity, idx) => (
            <SubsidiaryCard key={entity.id ?? idx} subsidiary={entity} theme="dark" />
          ))}
        </div>
      </div>
    </section>
  );
}
