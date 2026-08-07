"use client";

import HeroSection from "@/components/home/HeroSection";
import AboutIntroSection from "@/components/home/AboutIntroSection";
import SubsidiariesSection from "@/components/home/SubsidiariesSection";
import NewsSection from "@/components/home/NewsSection";
import FetchError from "@/components/errors";
import { homeQuery } from "@/hooks/home/homeQuery";
import { subsidiariesQuery } from "@/hooks/subsidiaries/subsidiariesQuery";
import { newsQuery } from "@/hooks/news/newsQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { locale, t } = useLocaleStore();

  const {
    data: homeData,
    isLoading: isHomeLoading,
    error: homeError,
  } = useQuery({
    queryKey: ["home", locale],
    queryFn: () => homeQuery.getBlobal({ locale }),
  });

  const { data: subsidiaries, isLoading: isSubsidiariesLoading } = useQuery({
    queryKey: ["subsidiaries", locale, "home"],
    queryFn: () => subsidiariesQuery.get({ locale, limit: 6 }),
  });

  const { data: news, isLoading: isNewsLoading } = useQuery({
    queryKey: ["news", locale, "home"],
    queryFn: () => newsQuery.get({ locale, limit: 3, sort: "-publishedAt" }),
  });

  if (isHomeLoading || isSubsidiariesLoading || isNewsLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[50vh] text-slate-400">
        {t("common.loading")}
      </div>
    );
  }

  if (homeError) {
    return <FetchError error={homeError} data={homeData === null || homeData === undefined} />;
  }

  return (
    <div className="space-y-24 pb-20">
      <HeroSection homeData={homeData} />
      <AboutIntroSection homeData={homeData} />
      <SubsidiariesSection subsidiaries={subsidiaries ?? []} />
      <NewsSection news={news ?? []} newsCalloutText={homeData?.newsCalloutText} />
    </div>
  );
}
