"use client";

import NewsHero from "@/components/news/NewsHero";
import PublicationsSection from "@/components/news/PublicationsSection";
import PressNewsletterBanner from "@/components/news/PressNewsletterBanner";
import FetchError from "@/components/errors";
import { actualitesQuery } from "@/hooks/actualites/actualitesQuery";
import { newsQuery } from "@/hooks/news/newsQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function ActualitePage() {
  const { locale, t } = useLocaleStore();

  const {
    data: news,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", locale, "all"],
    queryFn: () => newsQuery.get({ locale }),
  });

  const { data: pageData } = useQuery({
    queryKey: ["actualites", locale],
    queryFn: () => actualitesQuery.getBlobal({ locale }),
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
    return <FetchError error={error} data={news === null || news === undefined} />;
  }

  const items = news ?? [];

  return (
    <div className="bg-[#0d0d0d] -mt-[81px]">
      <NewsHero news={items} />
      <PublicationsSection news={items} pageData={pageData} />
      <PressNewsletterBanner pageData={pageData} />
    </div>
  );
}
