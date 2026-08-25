import { ImpactPageContent, EsgEngagementItem } from "@/hooks/impact/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface EsgSectionProps {
  pageData?: ImpactPageContent | null;
}

const DEFAULT_ENGAGEMENTS: EsgEngagementItem[] = [
  { text: "Extension progressive de la démarche qualité aux autres entités" },
  { text: "Critères environnementaux dans les achats du pôle Procurement" },
  { text: "Cadre de reporting extra-financier commun aux six entités" },
];

export default function EsgSection({ pageData }: EsgSectionProps) {
  const engagements = pageData?.esgEngagementItems?.length ? pageData.esgEngagementItems : DEFAULT_ENGAGEMENTS;

  return (
    <section id="environnement-certifications" className="bg-white py-16 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111]" />
          <span className="font-abel text-[#111] text-xl uppercase tracking-tight">
            {pageData?.esgKicker || "Démarche extra-financière"}
          </span>
        </div>

        <h3 className="font-sans text-[#111] text-3xl sm:text-4xl leading-tight">
          {pageData?.esgHeading || "Notre démarche extra-financière"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="border border-black/24 p-6 flex flex-col gap-8">
            <h4 className="font-sans text-[#111] text-lg leading-snug">
              {pageData?.esgCert1Title || "ISO 14001 — management environnemental"}
            </h4>
            <div className="flex flex-col gap-3">
              <span className="text-black/64 text-xs uppercase tracking-wide">Portée</span>
              <span className="text-[#111] text-sm">
                {pageData?.esgCert1Scope || "Creaconsult, LE CARINO, KrestDev"}
              </span>
            </div>
          </div>

          <div className="border border-black/24 p-6 flex flex-col gap-8">
            <h4 className="font-sans text-[#111] text-lg leading-snug">
              {pageData?.esgCert2Title || "ISO 9001 — management de la qualité"}
            </h4>
            <div className="flex flex-col gap-3">
              <span className="text-black/64 text-xs uppercase tracking-wide">Portée</span>
              <span className="text-[#111] text-sm">
                {pageData?.esgCert2Scope || "Creaconsult, LE CARINO, KrestDev"}
              </span>
            </div>
          </div>

          <div className="border border-black/24 p-6 flex flex-col gap-8">
            <h4 className="font-sans text-[#111] text-lg leading-snug">
              {pageData?.esgEngagementTitle || "Engagements en cours de déploiement"}
            </h4>
            <div className="flex flex-col gap-3">
              <span className="text-black/64 text-xs uppercase tracking-wide">Objectif</span>
              <ul className="flex flex-col gap-3">
                {engagements.map((item, idx) => (
                  <li key={item.id ?? idx} className="text-[#111] text-sm leading-relaxed">
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
