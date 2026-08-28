import Link from "next/link";
import { ImpactPageContent } from "@/hooks/impact/type";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";

interface StorySectionProps {
  pageData?: ImpactPageContent | null;
}

export default function StorySection({ pageData }: StorySectionProps) {
  return (
    <section id="un-impact-raconte" className="bg-[#0d0d0d] py-16 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-white" />
          <span className="font-abel text-white text-xl uppercase tracking-tight">
            {pageData?.storyKicker || "Un impact raconté"}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <h3 className="font-sans text-white text-3xl sm:text-4xl leading-tight max-w-[621px]">
            {pageData?.storyHeading ||
              "Cheminer avec Krest, c'est écrire une page de l'histoire avec l'encre de l'espoir et le souffle du progrès"}
          </h3>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-[514px]">
            {pageData?.storyIntro ||
              "Une trajectoire concrète, racontée étape par étape : d'où nous sommes partis, ce que nous avons mis en place, et ce que cela a changé sur le terrain."}
          </p>
        </div>

        <div className="bg-gradient-to-b from-white/[0.03] to-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-3">
            <div className="border border-white/24 overflow-hidden flex flex-col">
              <div className="h-1 w-full bg-white" />
              <div className="p-6 flex flex-col gap-6">
                <p className="text-white text-lg">{pageData?.storySituationTitle || "Situation de départ"}</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  {pageData?.storySituationBody ||
                    "Avant l'entrée de KREST au capital, les entités du portefeuille faisaient face à un accès limité au financement, des process encore artisanaux et peu de visibilité sur leur trajectoire de croissance."}
                </p>
              </div>
            </div>

            <div className="border border-white/24 overflow-hidden flex flex-col">
              <div className="h-1 w-full bg-white" />
              <div className="p-6 flex flex-col gap-6">
                <p className="text-white text-lg">{pageData?.storyActionTitle || "Ce que KREST a fait"}</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  {pageData?.storyActionBody ||
                    "Structuration financière et de gouvernance, accompagnement des équipes locales, mise à disposition des 5 pôles d'expertise du groupe, et suivi rapproché des indicateurs de performance."}
                </p>
              </div>
            </div>

            <div className="border border-white/24 overflow-hidden flex flex-col">
              <div className="h-1 w-full bg-white" />
              <div className="p-6 flex flex-col gap-6">
                <p className="text-white text-lg">{pageData?.storyResultTitle || "Résultat"}</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  {pageData?.storyResultBody ||
                    "Des emplois créés localement, des compétences renforcées, et des entreprises mieux structurées, prêtes à saisir de nouvelles opportunités de croissance."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 p-6">
            <div className="flex flex-col gap-3">
              <p className="text-white text-2xl">{pageData?.storyCtaTitle || "Soumettez votre dossier"}</p>
              <p className="text-[#878887] text-sm">
                {pageData?.storyCtaBody ||
                  "Votre dossier est traité de manière confidentielle. Réponse sous 15 jours ouvrés."}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={pageData?.storyCtaPrimaryUrl || "/contact/soumettre-un-dossier"}
                className="group inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-[#f29308] text-white text-sm font-medium uppercase tracking-wide transition-colors hover:bg-[#f29308]/85"
              >
                <span>{pageData?.storyCtaPrimaryLabel || "Soumettre un dossier"}</span>
                <CtaArrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={pageData?.storyCtaSecondaryUrl || "/contact"}
                className="group inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-white text-black text-sm font-medium uppercase tracking-wide transition-colors hover:bg-white/90"
              >
                <span>{pageData?.storyCtaSecondaryLabel || "Nous écrire"}</span>
                <CtaArrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
