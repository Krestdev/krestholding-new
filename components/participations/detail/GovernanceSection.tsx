import { Subsidiary } from "@/hooks/subsidiaries/type";
import KickerIcon from "@/components/ui/KickerIcon";
import InfoGrid, { InfoGridRow } from "./InfoGrid";

interface GovernanceSectionProps {
  subsidiary: Subsidiary;
}

export default function GovernanceSection({ subsidiary }: GovernanceSectionProps) {
  const leftRows: InfoGridRow[] = [
    { label: "Niveau de détention", value: subsidiary.participationLabel || "—" },
    { label: "Type de participation", value: subsidiary.participationType || "—" },
    { label: "Entrée de KREST au capital", value: subsidiary.entryYear || "—" },
    {
      label: "Durée d'engagement",
      value: subsidiary.engagementDuration || "à compléter",
      placeholder: !subsidiary.engagementDuration,
    },
  ];

  const rightRows: InfoGridRow[] = [
    {
      label: "Représentation au conseil",
      value: subsidiary.boardRepresentation || "à compléter",
      placeholder: !subsidiary.boardRepresentation,
    },
    {
      label: "Rythme de reporting",
      value: subsidiary.reportingFrequency || "à compléter",
      placeholder: !subsidiary.reportingFrequency,
    },
    { label: "Direction opérationnelle", value: subsidiary.operationalDirection || "—" },
    { label: "Status", value: subsidiary.participationStatus || "Participation active", tall: true },
  ];

  return (
    <section className="bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-white" />
          <span className="font-abel text-white text-xl uppercase tracking-tight leading-snug">
            Gouvernance & modalités
            <br />
            de détention
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <h2 className="font-sans text-white text-3xl sm:text-[32px] leading-tight tracking-tight max-w-[512px]">
            Comment KREST exerce son rôle d&apos;actionnaire ici
          </h2>
          <p className="text-white/64 text-lg sm:text-xl leading-snug max-w-[514px]">
            {subsidiary.governanceIntro ||
              "Une phrase sur trois lignes qui donne brièvement l'idée entreprise affiché sur cette page, de ce côté."}
          </p>
        </div>

        <InfoGrid leftRows={leftRows} rightRows={rightRows} theme="dark" />
      </div>
    </section>
  );
}
