import { ImpactPageContent, JobsChartItem, JobsInfoCard } from "@/hooks/impact/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface JobsSectionProps {
  pageData?: ImpactPageContent | null;
}

const DEFAULT_CHART: JobsChartItem[] = [
  { label: "KrestHolding", value: 2 },
  { label: "LE CARINO", value: 1 },
  { label: "SAGA AFRICA", value: 4 },
  { label: "CREACONSULT", value: 4 },
  { label: "67 Design & Build", value: 2 },
  { label: "KrestDev", value: 2 },
];

const DEFAULT_CARDS: JobsInfoCard[] = [
  {
    title: "Recrutement local",
    description: "Part des recrutements effectués sur le bassin d'emploi de l'entité.",
  },
  {
    title: "Formation & montée en compétences",
    description: "Part des recrutements effectués sur le bassin d'emploi de l'entité.",
  },
  {
    title: "Nature des postes",
    description: "Répartition CDI / CDD / apprentissage.",
  },
];

export default function JobsSection({ pageData }: JobsSectionProps) {
  const chart = pageData?.jobsChartData?.length ? pageData.jobsChartData : DEFAULT_CHART;
  const cards = pageData?.jobsInfoCards?.length ? pageData.jobsInfoCards : DEFAULT_CARDS;
  const max = Math.max(...chart.map((c) => c.value), 1);

  return (
    <section id="emplois-competences" className="bg-[#0d0d0d] py-16 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-white" />
          <span className="font-abel text-white text-xl uppercase tracking-tight">
            {pageData?.jobsKicker || "Où se créent les emplois et les compétences"}
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

          <div className="flex flex-col gap-3">
            {cards.map((card, idx) => (
              <div key={card.id ?? idx} className="border border-white/10 p-6 flex flex-col gap-3">
                <h4 className="text-white text-sm font-medium">{card.title}</h4>
                <p className="text-white/64 text-xs leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
