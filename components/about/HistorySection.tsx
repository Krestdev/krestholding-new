import { AboutPageContent } from "@/hooks/about/type";
import { useLocaleStore } from "@/store/localeStore";
import Image from "next/image";

interface HistorySectionProps {
  aboutData?: AboutPageContent | null;
}

export default function HistorySection({ aboutData }: HistorySectionProps) {
  const { t } = useLocaleStore();
  const historyImage = typeof aboutData?.historyImage === "object" ? aboutData.historyImage : undefined;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-slate-900/60 border border-slate-800 p-8 sm:p-12 rounded-3xl">
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          {aboutData?.historyTitle || t("about.historyTitleFallback")}
        </h2>
        <div className="text-slate-300 leading-relaxed text-base">
          {aboutData?.historyBody ? (
            typeof aboutData.historyBody === "string" ? (
              <p>{aboutData.historyBody}</p>
            ) : (
              <p>
                Krest Holding s&apos;est développé à travers un engagement constant pour
                l&apos;excellence et la création de valeur dans des marchés hautement compétitifs.
              </p>
            )
          ) : (
            <p>
              Depuis sa création, Krest Holding n&apos;a cessé d&apos;élargir son périmètre
              d&apos;action en s&apos;appuyant sur des équipes d&apos;experts passionnés.
            </p>
          )}
        </div>
      </div>
      {historyImage?.url ? (
        <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-800">
          <Image src={historyImage.url} alt={historyImage.alt || "Histoire"} fill className="object-cover" />
        </div>
      ) : (
        <div className="h-64 sm:h-80 w-full rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          Image Notre Histoire
        </div>
      )}
    </section>
  );
}
