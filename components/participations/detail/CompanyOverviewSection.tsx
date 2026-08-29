import { Subsidiary } from "@/hooks/subsidiaries/type";
import KickerIcon from "@/components/ui/KickerIcon";
import InfoGrid, { InfoGridRow } from "./InfoGrid";

interface CompanyOverviewSectionProps {
  subsidiary: Subsidiary;
}

export default function CompanyOverviewSection({ subsidiary }: CompanyOverviewSectionProps) {
  const leftRows: InfoGridRow[] = [
    { label: "Raison sociale", value: subsidiary.legalName || subsidiary.name },
    { label: "Activité", value: subsidiary.activityLabel || subsidiary.category },
    {
      label: "Création de l'entreprise",
      value: subsidiary.foundedYear || "à compléter",
      placeholder: !subsidiary.foundedYear,
    },
    { label: "Entrée de KREST au capital", value: subsidiary.entryYear || "—" },
  ];

  const rightRows: InfoGridRow[] = [
    { label: "Implantation", value: subsidiary.city || "à compléter", placeholder: !subsidiary.city },
    { label: "Effectif", value: subsidiary.headcount || "à compléter", placeholder: !subsidiary.headcount },
    {
      label: "Certification",
      value: subsidiary.certificationLabel || "—",
      placeholder: !subsidiary.certificationLabel,
    },
    {
      label: "Site web",
      value: subsidiary.websiteUrl ? (
        <a
          href={subsidiary.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#010101] dark:text-white hover:underline"
        >
          {subsidiary.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
        </a>
      ) : (
        "à compléter"
      ),
      placeholder: !subsidiary.websiteUrl,
    },
  ];

  return (
    <section className="bg-white dark:bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111] dark:text-white" />
          <span className="font-abel text-[#111] dark:text-white text-xl uppercase tracking-tight">
            {subsidiary.name} en un coup d&apos;œil
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <h2 className="font-sans text-[#111] dark:text-white text-3xl sm:text-[32px] leading-tight tracking-tight max-w-[512px]">
            Une phrase sur trois lignes qui présente brièvement l&apos;entreprise affiché sur cette page,
            d&apos;un côté
          </h2>
          <p className="text-[rgba(17,17,17,0.9)] dark:text-white/90 text-lg sm:text-xl leading-snug max-w-[514px]">
            {subsidiary.companyOverviewIntro ||
              "Une phrase sur trois lignes qui donne brièvement l'idée entreprise affiché sur cette page, de ce côté."}
          </p>
        </div>

        <InfoGrid leftRows={leftRows} rightRows={rightRows} />
      </div>
    </section>
  );
}
