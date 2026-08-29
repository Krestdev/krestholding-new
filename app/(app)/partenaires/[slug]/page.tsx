"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import DetailHero from "@/components/participations/detail/DetailHero";
import CompanyOverviewSection from "@/components/participations/detail/CompanyOverviewSection";
import WhyJoinedSection from "@/components/participations/detail/WhyJoinedSection";
import PolesAndOutcomesSection from "@/components/participations/detail/PolesAndOutcomesSection";
import GallerySection from "@/components/participations/detail/GallerySection";
import GovernanceSection from "@/components/participations/detail/GovernanceSection";
import SynergiesSection from "@/components/participations/detail/SynergiesSection";
import NewsSection from "@/components/participations/detail/NewsSection";
import DetailNavRow from "@/components/participations/detail/DetailNavRow";
import CtaBanner from "@/components/participations/CtaBanner";
import FetchError from "@/components/errors";
import { subsidiariesQuery } from "@/hooks/subsidiaries/subsidiariesQuery";
import { participationsQuery } from "@/hooks/participations/participationsQuery";
import { newsQuery } from "@/hooks/news/newsQuery";
import { useLocaleStore } from "@/store/localeStore";
import { getSubsidiarySlug } from "@/lib/subsidiarySlug";

export default function SubsidiaryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLocaleStore();

  const {
    data: allSubsidiaries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subsidiaries", locale, "all"],
    queryFn: () => subsidiariesQuery.get({ locale }),
  });

  // Matched by the same helper that builds every "Voir la fiche" link, so a
  // subsidiary always resolves here even if it predates the `slug` field.
  const subsidiary = allSubsidiaries?.find((s) => getSubsidiarySlug(s) === slug);

  const { data: pageData } = useQuery({
    queryKey: ["participations", locale],
    queryFn: () => participationsQuery.getBlobal({ locale }),
  });

  const { data: news } = useQuery({
    queryKey: ["news", locale, "all"],
    queryFn: () => newsQuery.get({ locale }),
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

  if (error || !subsidiary) {
    return <FetchError error={error} data={subsidiary === null || subsidiary === undefined} />;
  }

  return (
    <div className="bg-white dark:bg-[#0d0d0d] -mt-[81px]">
      <DetailHero subsidiary={subsidiary} />
      <CompanyOverviewSection subsidiary={subsidiary} />
      <WhyJoinedSection subsidiary={subsidiary} />
      <PolesAndOutcomesSection subsidiary={subsidiary} />
      <div className="hidden lg:block">
        <GallerySection subsidiary={subsidiary} />
      </div>
      <div className="hidden lg:block">
        <GovernanceSection subsidiary={subsidiary} />
      </div>
      <div className="hidden lg:block">
        <SynergiesSection subsidiary={subsidiary} pageData={pageData} allSubsidiaries={allSubsidiaries ?? []} />
      </div>
      <div className="hidden lg:block">
        <NewsSection subsidiary={subsidiary} news={news ?? []} />
      </div>
      <div className="hidden lg:block">
        <DetailNavRow subsidiary={subsidiary} allSubsidiaries={allSubsidiaries ?? []} />
      </div>
      <CtaBanner pageData={pageData} />
    </div>
  );
}

