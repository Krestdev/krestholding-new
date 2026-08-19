import { Subsidiary } from "@/hooks/subsidiaries/type";
import { ParticipationsPageContent } from "@/hooks/participations/type";
import KickerIcon from "@/components/ui/KickerIcon";
import SubsidiaryCard from "@/components/participations/SubsidiaryCard";
import { DEFAULT_SYNERGIES } from "@/components/participations/SynergiesSection";

interface SynergiesSectionProps {
  subsidiary: Subsidiary;
  pageData?: ParticipationsPageContent | null;
  allSubsidiaries: Subsidiary[];
}

const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

const findByName = (list: Subsidiary[], name: string) => list.find((s) => sameName(s.name, name));

export default function SynergiesSection({ subsidiary, pageData, allSubsidiaries }: SynergiesSectionProps) {
  const entityId = (ref: Subsidiary | number | undefined) =>
    typeof ref === "object" && ref !== null ? ref.id : ref;

  // Real, CMS-managed synergies (relationship fields on the shared
  // `participations-page-content` global) take priority over the default set.
  let counterparts = (pageData?.synergies || [])
    .map((syn) => {
      const aId = entityId(syn.entityA as Subsidiary | number);
      const bId = entityId(syn.entityB as Subsidiary | number);
      const ref =
        aId === subsidiary.id
          ? (syn.entityB as Subsidiary | number)
          : bId === subsidiary.id
            ? (syn.entityA as Subsidiary | number)
            : null;
      if (ref === null) return null;
      const counterpart = typeof ref === "object" ? ref : allSubsidiaries.find((s) => s.id === ref);
      return counterpart ? { id: counterpart.id, subsidiary: counterpart, description: syn.description } : null;
    })
    .filter((v): v is { id: number; subsidiary: Subsidiary; description: string } => v !== null);

  // Nothing curated yet for this entity in the global — fall back to the same
  // placeholder pairs shown on the listing page, resolved against real docs
  // so the cards still link to a working "Voir la fiche" page.
  if (counterparts.length === 0) {
    counterparts = DEFAULT_SYNERGIES.map((syn, idx) => {
      const counterpartName = sameName(syn.entityA, subsidiary.name)
        ? syn.entityB
        : sameName(syn.entityB, subsidiary.name)
          ? syn.entityA
          : null;
      if (!counterpartName) return null;
      const counterpart = findByName(allSubsidiaries, counterpartName);
      return counterpart ? { id: idx, subsidiary: counterpart, description: syn.description } : null;
    }).filter((v): v is { id: number; subsidiary: Subsidiary; description: string } => v !== null);
  }

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

        {counterparts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {counterparts.map((c) => (
              <SubsidiaryCard key={c.id} subsidiary={c.subsidiary} theme="dark" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 text-white/40 border border-white/10">
            Aucune synergie renseignée pour cette participation pour le moment.
          </div>
        )}
      </div>
    </section>
  );
}
