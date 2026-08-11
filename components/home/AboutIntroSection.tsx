import { HomePageContent } from "@/hooks/home/type";
import { useLocaleStore } from "@/store/localeStore";
import Link from "next/link";

interface AboutIntroSectionProps {
  homeData?: HomePageContent | null;
}

export default function AboutIntroSection({ homeData }: AboutIntroSectionProps) {
  const { t } = useLocaleStore();

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl sm:text-4xl font-bold text-white">
          {homeData?.aboutIntroHeading || "À Propos de Krest Holding"}
        </h2>
        <div className="text-slate-300 leading-relaxed text-base sm:text-lg">
          {homeData?.aboutIntroBody ? (
            typeof homeData.aboutIntroBody === "string" ? (
              <p>{homeData.aboutIntroBody}</p>
            ) : (
              <p>
                Fort de son expertise multidisciplinaire, Krest Holding bâtit des solutions
                stratégiques et novatrices pour stimuler la croissance économique et la
                transformation numérique.
              </p>
            )
          ) : (
            <p>
              Krest Holding est un groupe d&apos;investissement dynamique qui propulse la synergie
              de ses filiales dans divers secteurs d&apos;avenir.
            </p>
          )}
        </div>
        <Link
          href="/a-propos"
          className="inline-block text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {t("home.learnMoreAbout")} &rarr;
        </Link>
      </div>
    </section>
  );
}
