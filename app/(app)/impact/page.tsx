"use client";

import ImpactHero from "@/components/impact/ImpactHero";
import StatsSection from "@/components/impact/StatsSection";
import JobsSection from "@/components/impact/JobsSection";
import StorySection from "@/components/impact/StorySection";
import EsgSection from "@/components/impact/EsgSection";
import CtaBanner from "@/components/participations/CtaBanner";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import FetchError from "@/components/errors";
import { impactQuery } from "@/hooks/impact/impactQuery";
import { participationsQuery } from "@/hooks/participations/participationsQuery";
import { homeQuery } from "@/hooks/home/homeQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function ImpactPage() {
  const { locale, t } = useLocaleStore();

  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["impact", locale],
    queryFn: () => impactQuery.getBlobal({ locale }),
  });

  const { data: participationsData } = useQuery({
    queryKey: ["participations", locale],
    queryFn: () => participationsQuery.getBlobal({ locale }),
  });

  const { data: homeData } = useQuery({
    queryKey: ["home", locale],
    queryFn: () => homeQuery.getBlobal({ locale }),
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

  return (
    <div className="bg-[#0d0d0d] -mt-[81px]">
      <ImpactHero pageData={pageData} />
      <StatsSection pageData={pageData} />
      <JobsSection pageData={pageData} />
      <StorySection pageData={pageData} />
      <EsgSection pageData={pageData} />
      <CtaBanner pageData={participationsData} />
      <NewsletterBanner homeData={homeData} />
    </div>
  );
}
