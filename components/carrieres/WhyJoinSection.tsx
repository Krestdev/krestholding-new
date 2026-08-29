import { CarrieresPageContent, WhyCard } from "@/hooks/carrieres/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface WhyJoinSectionProps {
  pageData?: CarrieresPageContent | null;
}

const DEFAULT_CARDS: WhyCard[] = [
  { title: "Une PME, un groupe derrière", description: "Structure à taille humaine, moyens mutualisés." },
  { title: "La Mobilité entre entités", description: "Passer d'une entreprise du groupe à une autre." },
  { title: "Un accès aux 5 pôles", description: "Growth · IT · Compta · Procurement · RH." },
  { title: "Des formations ciblées", description: "Ce que les pôles transfèrent aux équipes." },
];

export default function WhyJoinSection({ pageData }: WhyJoinSectionProps) {
  const cards = pageData?.whyCards?.length ? pageData.whyCards : DEFAULT_CARDS;

  return (
    <section id="pourquoi-nous-rejoindre" className="bg-[#218da8] dark:bg-[#0d0d0d] pb-16 lg:pb-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-white" />
          <span className="font-abel text-white text-xl uppercase tracking-tight">
            {pageData?.whyKicker || "Pourquoi nous rejoindre"}
          </span>
        </div>

        <h3 className="font-sans text-white text-2xl">
          {pageData?.whyHeading || "Ce que le groupe change au quotidien"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((card, idx) => (
            <div key={card.id ?? idx} className="bg-white/[0.08] border border-white/10 p-6 flex flex-col gap-3">
              <h4 className="text-white text-sm font-medium leading-snug">{card.title}</h4>
              <p className="text-white/64 text-xs leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
