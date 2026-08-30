import { Subsidiary, SubsidiaryPole } from "@/hooks/subsidiaries/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface PolesAndOutcomesSectionProps {
  subsidiary: Subsidiary;
}

const ALL_POLES: SubsidiaryPole[] = [
  "Growth, Marketing & Brand",
  "Développement informatique",
  "Comptabilité & Fiscalité",
  "Procurement",
  "Ressources Humaines",
];

const DEFAULT_STARTING_SITUATION =
  "Décrivez ici le contexte et les enjeux de l'entreprise avant l'entrée au capital de KREST HOLDING.";
const DEFAULT_WHAT_KREST_DID =
  "Décrivez ici les actions menées par KREST HOLDING pour accompagner cette participation.";
const DEFAULT_RESULT =
  "Décrivez ici les résultats obtenus grâce à l'accompagnement de KREST HOLDING.";

export default function PolesAndOutcomesSection({ subsidiary }: PolesAndOutcomesSectionProps) {
  const activePoles = new Set(subsidiary.polesActive || []);

  return (
    <section className="bg-white dark:bg-[#0d0d0d] pb-24 lg:pb-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111] dark:text-white" />
          <span className="font-abel text-[#111] dark:text-white text-xl uppercase tracking-tight">Ce que KREST a apporté</span>
        </div>

        <div className="flex flex-col gap-8">
          <h2 className="font-sans text-[#111] dark:text-white text-3xl sm:text-[32px] leading-tight max-w-[512px]">
            Nos pôles mobilisés sur cette participation
          </h2>

          <div className="flex flex-wrap gap-4">
            {ALL_POLES.map((pole) => {
              const active = activePoles.has(pole);
              return (
                <span
                  key={pole}
                  className={
                    active
                      ? "bg-[#f29308]/15 border border-[#f29308] text-[#111] dark:text-white text-base px-4 py-2"
                      : "bg-black/[0.15] dark:bg-white/[0.15] border border-dashed border-black/32 dark:border-white/32 text-black/64 dark:text-white/64 text-base px-4 py-2"
                  }
                >
                  {pole}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 bg-[#cf2538]/15 border border-[#cf2538] p-6 flex flex-col gap-6">
            <h3 className="font-abel font-bold text-lg uppercase text-[#cf2538]">Situation de départ</h3>
            <p className="text-[#111] dark:text-white text-base leading-relaxed whitespace-pre-line">
              {subsidiary.startingSituationBody || DEFAULT_STARTING_SITUATION}
            </p>
          </div>
          <div className="flex-1 bg-[#218da8]/15 border border-[#218da8] p-6 flex flex-col gap-6">
            <h3 className="font-abel font-bold text-lg uppercase text-[#218da8]">Ce que KREST a fait</h3>
            <p className="text-[#111] dark:text-white text-base leading-relaxed whitespace-pre-line">
              {subsidiary.whatKrestDidBody || DEFAULT_WHAT_KREST_DID}
            </p>
          </div>
          <div className="flex-1 bg-[#f29308]/15 border border-[#f29308] p-6 flex flex-col gap-6">
            <h3 className="font-abel font-bold text-lg uppercase text-[#111] dark:text-white">Résultat</h3>
            <p className="text-[#111] dark:text-white text-base leading-relaxed whitespace-pre-line">
              {subsidiary.resultBody || DEFAULT_RESULT}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
