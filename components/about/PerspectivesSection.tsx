import { AboutPageContent } from "@/hooks/about/type";
import { useLocaleStore } from "@/store/localeStore";
import Image from "next/image";

interface PerspectivesSectionProps {
  aboutData?: AboutPageContent | null;
}

export default function PerspectivesSection({ aboutData }: PerspectivesSectionProps) {
  const { t } = useLocaleStore();
  const perspectivesImage =
    typeof aboutData?.perspectivesImage === "object" ? aboutData.perspectivesImage : undefined;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-slate-900/60 border border-slate-800 p-8 sm:p-12 rounded-3xl">
      {perspectivesImage?.url ? (
        <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-800 order-2 md:order-1">
          <Image
            src={perspectivesImage.url}
            alt={perspectivesImage.alt || "Perspectives"}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-64 sm:h-80 w-full rounded-2xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 order-2 md:order-1">
          Image Perspectives
        </div>
      )}
      <div className="space-y-4 order-1 md:order-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          {aboutData?.perspectivesTitle || t("about.perspectivesTitleFallback")}
        </h2>
        <div className="text-slate-300 leading-relaxed text-base">
          {aboutData?.perspectivesBody ? (
            typeof aboutData.perspectivesBody === "string" ? (
              <p>{aboutData.perspectivesBody}</p>
            ) : (
              <p>
                Nous poursuivons une dynamique d&apos;expansion axée sur la digitalisation, le
                développement durable et le renforcement de nos filiales.
              </p>
            )
          ) : (
            <p>
              Consolider nos acquis et saisir les nouvelles opportunités technologiques pour
              pérennisier nos activités.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
