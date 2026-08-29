"use client";

import PageHero from "@/components/participations/PageHero";
import PortfolioSection from "@/components/participations/PortfolioSection";
import SynergiesSection from "@/components/participations/SynergiesSection";
import PortfolioCompositionSection from "@/components/participations/PortfolioCompositionSection";
import CtaBanner from "@/components/participations/CtaBanner";
import FetchError from "@/components/errors";
import { participationsQuery } from "@/hooks/participations/participationsQuery";
import { subsidiariesQuery } from "@/hooks/subsidiaries/subsidiariesQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function PartenairesPage() {
  const { locale, t } = useLocaleStore();

  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["participations", locale],
    queryFn: () => participationsQuery.getBlobal({ locale }),
  });

  const { data: subsidiaries } = useQuery({
    queryKey: ["subsidiaries", locale, "all"],
    queryFn: () => subsidiariesQuery.get({ locale }),
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh] text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <span>{t("common.loading")}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <FetchError error={error} data={pageData === null || pageData === undefined} />;
  }

  const items = subsidiaries ?? [];

  return (
    <div className="bg-white dark:bg-[#0d0d0d] -mt-[81px]">
      <PageHero pageData={pageData} />
      <PortfolioSection pageData={pageData} subsidiaries={items} />
      <SynergiesSection pageData={pageData} />
      <PortfolioCompositionSection pageData={pageData} subsidiaries={items} />
      <CtaBanner pageData={pageData} />
    </div>
  );
}
