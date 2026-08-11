"use client";

import PartenairesHeader from "@/components/partenaires/PartenairesHeader";
import SubsidiaryCategoryGroup from "@/components/partenaires/SubsidiaryCategoryGroup";
import FetchError from "@/components/errors";
import { subsidiariesQuery } from "@/hooks/subsidiaries/subsidiariesQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function PartenairesPage() {
  const { locale, t } = useLocaleStore();

  const {
    data: subsidiaries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subsidiaries", locale, "all"],
    queryFn: () => subsidiariesQuery.get({ locale }),
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[50vh] text-slate-400">
        {t("common.loading")}
      </div>
    );
  }

  if (error) {
    return <FetchError error={error} data={subsidiaries === null || subsidiaries === undefined} />;
  }

  const items = subsidiaries ?? [];
  const categories = Array.from(new Set(items.map((s) => s.category)));

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      <PartenairesHeader />

      {categories.length > 0 ? (
        categories.map((category) => (
          <SubsidiaryCategoryGroup
            key={category}
            category={category}
            subsidiaries={items.filter((s) => s.category === category)}
          />
        ))
      ) : (
        <div className="text-center py-16 text-slate-500 bg-slate-900/40 rounded-3xl border border-slate-800">
          {t("partenaires.noResults")}
        </div>
      )}
    </div>
  );
}
