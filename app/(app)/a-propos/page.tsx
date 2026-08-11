"use client";

import AboutHeader from "@/components/about/AboutHeader";
import HistorySection from "@/components/about/HistorySection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import PerspectivesSection from "@/components/about/PerspectivesSection";
import CompanyValuesSection from "@/components/about/CompanyValuesSection";
import FetchError from "@/components/errors";
import { aboutQuery } from "@/hooks/about/aboutQuery";
import { companyValuesQuery } from "@/hooks/companyValues/companyValuesQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function AboutPage() {
  const { locale, t } = useLocaleStore();

  const {
    data: aboutData,
    isLoading: isAboutLoading,
    error: aboutError,
  } = useQuery({
    queryKey: ["about", locale],
    queryFn: () => aboutQuery.getBlobal({ locale }),
  });

  const { data: values, isLoading: isValuesLoading } = useQuery({
    queryKey: ["companyValues", locale],
    queryFn: () => companyValuesQuery.get({ locale, sort: "order" }),
  });

  if (isAboutLoading || isValuesLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[50vh] text-slate-400">
        {t("common.loading")}
      </div>
    );
  }

  if (aboutError) {
    return <FetchError error={aboutError} data={aboutData === null || aboutData === undefined} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      <AboutHeader aboutData={aboutData} />
      <HistorySection aboutData={aboutData} />
      <VisionMissionSection aboutData={aboutData} />
      <PerspectivesSection aboutData={aboutData} />
      <CompanyValuesSection values={values ?? []} />
    </div>
  );
}
