import { CarrieresPageContent, JobsChartItem, TagItem } from "@/hooks/carrieres/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface JobsDistributionSectionProps {
  pageData?: CarrieresPageContent | null;
}

const DEFAULT_CHART: JobsChartItem[] = [
  { label: "KrestHolding", value: 2 },
  { label: "LE CARINO", value: 1 },
  { label: "SAGA AFRICA", value: 4 },
  { label: "CREACONSULT", value: 4 },
  { label: "67 Design & Build", value: 2 },
  { label: "KrestDev", value: 2 },
];

const DEFAULT_SKILL_TAGS: TagItem[] = [
  { text: "Restauration" },
  { text: "Ingénierie" },
  { text: "Développement" },
  { text: "Comptabilité" },
  { text: "Commercial" },
];

const DEFAULT_LOCATION_TAGS: TagItem[] = [
  { text: "Douala" },
  { text: "Yaoundé" },
  { text: "Télétravail partiel" },
];

export default function JobsDistributionSection({ pageData }: JobsDistributionSectionProps) {
  const chart = pageData?.jobsChartData?.length ? pageData.jobsChartData : DEFAULT_CHART;
  const skillTags = pageData?.jobsSkillTags?.length ? pageData.jobsSkillTags : DEFAULT_SKILL_TAGS;
  const locationTags = pageData?.jobsLocationTags?.length ? pageData.jobsLocationTags : DEFAULT_LOCATION_TAGS;
  const max = Math.max(...chart.map((c) => c.value), 1);

  return (
    <section id="ou-sont-les-postes" className="bg-[#0d0d0d] py-16 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-white" />
          <span className="font-abel text-white text-xl uppercase tracking-tight">
            {pageData?.jobsKicker || "Où sont les postes"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6">
          <div className="flex flex-col gap-12">
            <h3 className="font-sans text-white text-2xl">
              {pageData?.jobsChartHeading || "Répartition des offres ouvertes"}
            </h3>
            <div className="flex flex-col gap-9">
              {chart.map((row, idx) => (
                <div key={row.id ?? idx} className="flex items-center gap-6 w-full">
                  <span className="text-white text-sm w-[160px] shrink-0 truncate">{row.label}</span>
                  <div className="flex-1 h-[11px] bg-white/10">
                    <div
                      className="h-full bg-[#f29308]"
                      style={{ width: `${Math.max(0, Math.min(100, (row.value / max) * 100))}%` }}
                    />
                  </div>
                  <span className="text-white text-sm w-4 text-right shrink-0">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <h3 className="font-sans text-white text-2xl">Métiers représentés</h3>
              <div className="flex flex-wrap gap-3">
                {skillTags.map((tag, idx) => (
                  <span
                    key={tag.id ?? idx}
                    className="border border-white/16 px-4 py-2.5 text-white text-sm"
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <h3 className="font-sans text-white text-2xl">Lieu</h3>
              <div className="flex flex-wrap gap-3">
                {locationTags.map((tag, idx) => (
                  <span
                    key={tag.id ?? idx}
                    className="border border-white/16 px-4 py-2.5 text-white text-sm"
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
