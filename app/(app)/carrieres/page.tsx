"use client";

import CareersHero from "@/components/carrieres/CareersHero";
import JobsDistributionSection from "@/components/carrieres/JobsDistributionSection";
import WhyJoinSection from "@/components/carrieres/WhyJoinSection";
import OpenPositionsSection from "@/components/carrieres/OpenPositionsSection";
import RecruitmentProcessSection from "@/components/carrieres/RecruitmentProcessSection";
import SpontaneousApplicationSection from "@/components/carrieres/SpontaneousApplicationSection";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import FetchError from "@/components/errors";
import { carrieresQuery } from "@/hooks/carrieres/carrieresQuery";
import { jobOpeningsQuery } from "@/hooks/jobOpenings/jobOpeningsQuery";
import { homeQuery } from "@/hooks/home/homeQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function CarrieresPage() {
  const { locale, t } = useLocaleStore();

  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["carrieres", locale],
    queryFn: () => carrieresQuery.getBlobal({ locale }),
  });

  const { data: jobs } = useQuery({
    queryKey: ["jobOpenings", locale],
    queryFn: () => jobOpeningsQuery.get({ locale }),
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
    <div className="bg-white dark:bg-[#0d0d0d] -mt-[81px]">
      <CareersHero pageData={pageData} />
      <JobsDistributionSection pageData={pageData} />
      <div className="hidden lg:block">
        <WhyJoinSection pageData={pageData} />
      </div>
      <OpenPositionsSection pageData={pageData} jobs={jobs ?? []} />
      <RecruitmentProcessSection pageData={pageData} />
      <SpontaneousApplicationSection pageData={pageData} />
      <NewsletterBanner homeData={homeData} />
    </div>
  );
}
