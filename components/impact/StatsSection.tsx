import { ImpactPageContent, ImpactStatItem } from "@/hooks/impact/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface StatsSectionProps {
  pageData?: ImpactPageContent | null;
}

const DEFAULT_STATS: ImpactStatItem[] = [
  { value: "18", label: "Emplois directs créés" },
  { value: "6", label: "Entreprises accompagnées" },
  { value: "2018", label: "Année de fondation" },
  { value: "5", label: "Fournisseurs locaux référencés" },
  { value: "4", label: "Communes desservies" },
  { value: "2", label: "Certifications ISO" },
];

export default function StatsSection({ pageData }: StatsSectionProps) {
  const stats = pageData?.stats?.length ? pageData.stats : DEFAULT_STATS;

  return (
    <section id="impact-en-chiffres" className="bg-[#0d0d0d] pt-16 lg:pt-[120px] pb-16 px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-white" />
          <span className="font-abel text-white text-xl uppercase tracking-tight">
            {pageData?.statsKicker || "L'impact en chiffres"}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          <div className="flex flex-col gap-6 lg:w-[467px] shrink-0">
            <h2 className="font-sans text-white text-3xl sm:text-4xl leading-tight">
              {pageData?.statsHeading || "Investir avec KREST, c'est investir dans l'Afrique de demain"}
            </h2>
            <p className="text-white/64 text-base leading-relaxed">
              {pageData?.statsIntro ||
                "Données arrêtées au 31 décembre 2025 — périmètre : les 6 entités du portefeuille — définitions au bloc 6."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10 flex-1 lg:pt-[74px]">
            {stats.map((stat, idx) => (
              <div key={stat.id ?? idx} className="flex flex-col gap-4">
                <span className="font-sans text-white text-4xl sm:text-5xl tracking-tight">{stat.value}</span>
                <span className="font-abel text-white/64 text-sm uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
