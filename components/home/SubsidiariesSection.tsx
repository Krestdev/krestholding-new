import { Subsidiary } from "@/hooks/subsidiaries/type";
import { useLocaleStore } from "@/store/localeStore";
import Image from "next/image";
import Link from "next/link";

interface SubsidiariesSectionProps {
  subsidiaries: Subsidiary[];
}

export default function SubsidiariesSection({ subsidiaries }: SubsidiariesSectionProps) {
  const { t } = useLocaleStore();

  return (
    <section className="max-w-7xl mx-auto px-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">{t("home.subsidiariesTitle")}</h2>
          <p className="text-slate-400 mt-2">{t("home.subsidiariesSubtitle")}</p>
        </div>
        <Link
          href="/partenaires"
          className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {t("home.viewAllPartners")} &rarr;
        </Link>
      </div>

      {subsidiaries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsidiaries.map((item) => {
            const logo = typeof item.logo === "object" ? item.logo : undefined;
            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:-translate-y-1 shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                      {item.category}
                    </span>
                    {logo?.url && (
                      <Image
                        src={logo.url}
                        alt={item.name}
                        width={60}
                        height={30}
                        className="h-8 w-auto object-contain"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  <p className="text-sm text-slate-400 line-clamp-3">
                    {item.shortDescription || "Description détaillée non renseignée."}
                  </p>
                </div>
                {item.websiteUrl && (
                  <div className="pt-6">
                    <a
                      href={item.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-indigo-400 hover:underline"
                    >
                      {t("common.visitSite")} &rarr;
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          {t("home.noSubsidiaries")}
        </div>
      )}
    </section>
  );
}
