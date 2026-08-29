import { JobOpening, JobOpeningTextItem } from "@/hooks/jobOpenings/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface ConditionsSectionProps {
  job: JobOpening;
}

const DEFAULT_OFFER: JobOpeningTextItem[] = [{ text: "Structure à taille humaine, moyens mutualisés." }];

export default function ConditionsSection({ job }: ConditionsSectionProps) {
  const whatWeOffer = job.whatWeOffer?.length ? job.whatWeOffer : DEFAULT_OFFER;
  const workEnvironment =
    job.workEnvironment || "Passer d'une entreprise du groupe à une autre.";
  const recruitmentSteps =
    job.recruitmentStepsText || "Candidature → Échange → Entretien entité → Réponse";

  return (
    <section className="bg-white dark:bg-[#0d0d0d] px-6 lg:px-10 pb-16 lg:pb-[120px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111] dark:text-white" />
          <span className="font-abel text-[#111] dark:text-white text-xl uppercase tracking-tight">Conditions & processus</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col gap-4">
            <h4 className="text-[#111] dark:text-white text-lg font-medium">Ce que nous offrons</h4>
            <ul className="flex flex-col gap-2 list-disc pl-5">
              {whatWeOffer.map((item, idx) => (
                <li key={item.id ?? idx} className="text-black/70 dark:text-white/70 text-sm leading-relaxed">
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col gap-4">
            <h4 className="text-[#111] dark:text-white text-lg font-medium">Environnement de travail</h4>
            <p className="text-black/70 dark:text-white/70 text-sm leading-relaxed">{workEnvironment}</p>
          </div>

          <div className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col gap-4">
            <h4 className="text-[#111] dark:text-white text-lg font-medium">Étapes du recrutement</h4>
            <p className="text-black/70 dark:text-white/70 text-sm leading-relaxed">{recruitmentSteps}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
