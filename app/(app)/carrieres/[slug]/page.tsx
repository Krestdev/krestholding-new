"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import JobDetailHero from "@/components/carrieres/detail/JobDetailHero";
import CompanySection from "@/components/carrieres/detail/CompanySection";
import MissionsProfileSection from "@/components/carrieres/detail/MissionsProfileSection";
import ConditionsSection from "@/components/carrieres/detail/ConditionsSection";
import SpontaneousApplicationSection from "@/components/carrieres/SpontaneousApplicationSection";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import FetchError from "@/components/errors";
import { jobOpeningsQuery } from "@/hooks/jobOpenings/jobOpeningsQuery";
import { carrieresQuery } from "@/hooks/carrieres/carrieresQuery";
import { homeQuery } from "@/hooks/home/homeQuery";
import { useLocaleStore } from "@/store/localeStore";
import { getJobOpeningSlug } from "@/lib/jobOpeningSlug";
import { Subsidiary } from "@/hooks/subsidiaries/type";

export default function JobOpeningDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLocaleStore();

  const {
    data: allJobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobOpenings", locale],
    queryFn: () => jobOpeningsQuery.get({ locale }),
  });

  const job = allJobs?.find((j) => getJobOpeningSlug(j) === slug);

  const { data: pageData } = useQuery({
    queryKey: ["carrieres", locale],
    queryFn: () => carrieresQuery.getBlobal({ locale }),
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

  if (error || !job) {
    return <FetchError error={error} data={job === null || job === undefined} />;
  }

  const entity = typeof job.relatedSubsidiary === "object" ? (job.relatedSubsidiary as Subsidiary) : undefined;

  return (
    <div className="bg-[#0d0d0d] -mt-[81px]">
      <JobDetailHero job={job} />
      <CompanySection job={job} />
      <MissionsProfileSection job={job} />
      <ConditionsSection job={job} />
      <SpontaneousApplicationSection
        pageData={pageData}
        prefill={{
          desiredRole: job.title,
          targetEntityOrSector: entity?.name || "",
          relatedJobOpeningId: job.id,
        }}
      />
      <NewsletterBanner homeData={homeData} />
    </div>
  );
}
