import { CompanyValue } from "@/hooks/companyValues/type";
import { useLocaleStore } from "@/store/localeStore";

interface CompanyValuesSectionProps {
  values: CompanyValue[];
}

export default function CompanyValuesSection({ values }: CompanyValuesSectionProps) {
  const { t } = useLocaleStore();

  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">{t("about.valuesTitle")}</h2>
        <p className="text-slate-400">{t("about.valuesSubtitle")}</p>
      </div>

      {values.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => (
            <div
              key={val.id}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                {val.order ?? 0}
              </div>
              <h3 className="text-lg font-bold text-white">{val.title}</h3>
              <p className="text-sm text-slate-400">{val.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          {t("about.noValues")}
        </div>
      )}
    </section>
  );
}
