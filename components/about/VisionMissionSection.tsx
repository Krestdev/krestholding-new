import { AboutPageContent } from "@/hooks/about/type";
import { useLocaleStore } from "@/store/localeStore";

interface VisionMissionSectionProps {
  aboutData?: AboutPageContent | null;
}

export default function VisionMissionSection({ aboutData }: VisionMissionSectionProps) {
  const { t } = useLocaleStore();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
        <h3 className="text-2xl font-bold text-indigo-400">
          {aboutData?.visionTitle || t("about.visionTitleFallback")}
        </h3>
        <div className="text-slate-300 leading-relaxed">
          {aboutData?.visionBody ? (
            typeof aboutData.visionBody === "string" ? (
              <p>{aboutData.visionBody}</p>
            ) : (
              <p>
                Devenir un leader incontournable dans la transformation des services et des
                infrastructures.
              </p>
            )
          ) : (
            <p>
              Devenir un groupe de référence reconnu pour son agilité, son intégrité et son
              impact positif.
            </p>
          )}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
        <h3 className="text-2xl font-bold text-emerald-400">
          {aboutData?.missionTitle || t("about.missionTitleFallback")}
        </h3>
        <div className="text-slate-300 leading-relaxed">
          {aboutData?.missionBody ? (
            typeof aboutData.missionBody === "string" ? (
              <p>{aboutData.missionBody}</p>
            ) : (
              <p>
                Accompagner le succès durable de nos filiales tout en apportant des solutions
                concrètes à nos partenaires.
              </p>
            )
          ) : (
            <p>
              Offrir des produits et prestations d&apos;excellence en intégrant les normes de
              qualité les plus exigeantes.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
