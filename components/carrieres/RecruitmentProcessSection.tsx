import { CarrieresPageContent, ProcessStepItem } from "@/hooks/carrieres/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface RecruitmentProcessSectionProps {
  pageData?: CarrieresPageContent | null;
}

const DEFAULT_STEPS: ProcessStepItem[] = [
  { title: "Candidature", description: "Accusé de réception immédiat." },
  { title: "Premier échange", description: "Environ 2 semaines." },
  { title: "Entretien avec l'entité", description: "Environ 3 semaines." },
  { title: "Réponse", description: "Systématique, positive ou négative." },
];

export default function RecruitmentProcessSection({ pageData }: RecruitmentProcessSectionProps) {
  const steps = pageData?.processSteps?.length ? pageData.processSteps : DEFAULT_STEPS;

  return (
    <section id="notre-processus" className="bg-white dark:bg-[#0d0d0d] py-16 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div className="flex items-center gap-4">
            <KickerIcon className="text-black dark:text-white" />
            <span className="font-abel text-black dark:text-white text-xl uppercase tracking-tight">
              {pageData?.processKicker || "Notre processus"}
            </span>
          </div>
          <p className="text-black/80 dark:text-white/80 text-base max-w-[500px]">
            {pageData?.processIntro || "Un processus clair, rapide, et une réponse systématique à chaque candidature."}
          </p>
        </div>

        <h3 className="font-sans text-black dark:text-white text-2xl sm:text-3xl">
          {pageData?.processHeading || "Notre process de recrutement en 4 étapes"}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-4 pt-4">
          {steps.map((step, idx) => (
            <div key={step.id ?? idx} className="relative bg-black/[0.04] dark:bg-white/[0.04] border border-black/30 dark:border-white/30 p-6 pt-8 flex flex-col gap-3">
              <span className="absolute -top-4 -left-1 font-abel text-[#f29308] text-3xl">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="text-black dark:text-white text-base font-medium">{step.title}</h4>
              <p className="text-black/70 dark:text-white/70 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
