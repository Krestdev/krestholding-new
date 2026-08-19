import { Subsidiary } from "@/hooks/subsidiaries/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface WhyJoinedSectionProps {
  subsidiary: Subsidiary;
}

const DEFAULT_MOTIVATION = [
  "Position déjà établie sur son marché",
  "Potentiel de structuration identifié",
  "Adéquation avec le périmètre sectoriel du groupe",
];

const DEFAULT_ENTRY_SITUATION = [
  "Niveau de maturité de l'entreprise",
  "Ce qui manquait pour passer à l'échelle",
  "Durée d'engagement retenue",
];

export default function WhyJoinedSection({ subsidiary }: WhyJoinedSectionProps) {
  const motivationPoints = subsidiary.motivationPoints?.length
    ? subsidiary.motivationPoints.map((p) => p.text)
    : DEFAULT_MOTIVATION;
  const entrySituationPoints = subsidiary.entrySituationPoints?.length
    ? subsidiary.entrySituationPoints.map((p) => p.text)
    : DEFAULT_ENTRY_SITUATION;

  return (
    <section className="bg-white pb-24 lg:pb-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111]" />
          <span className="font-abel text-[#111] text-xl uppercase tracking-tight">
            Pourquoi avons-nous rejoint {subsidiary.name} ?
          </span>
        </div>

        <h2 className="font-sans text-[#111] text-3xl sm:text-[32px] leading-tight max-w-[512px]">
          Une phrase sur trois lignes qui présente brièvement l&apos;entreprise affiché sur cette page,
          d&apos;un côté
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 text-[#111]">
          <div className="flex-1 bg-[#f29308]/15 border border-[#f29308] p-6 flex flex-col gap-6">
            <h3 className="font-abel font-bold text-lg uppercase">Ce qui a motivé la prise de participation</h3>
            <ul className="flex flex-col gap-4 px-4 text-base list-disc marker:text-[#f29308]">
              {motivationPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-[#218da8]/15 border border-[#218da8] p-6 flex flex-col gap-6">
            <h3 className="font-abel font-bold text-lg uppercase">La situation à l&apos;entrée</h3>
            <ul className="flex flex-col gap-4 px-4 text-base list-disc marker:text-[#218da8]">
              {entrySituationPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
