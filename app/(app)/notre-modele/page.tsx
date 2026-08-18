"use client";

import PageHero from "@/components/notre-modele/PageHero";
import ThesisSection from "@/components/notre-modele/ThesisSection";
import SectorsSection from "@/components/notre-modele/SectorsSection";
import PolesSection from "@/components/notre-modele/PolesSection";
import ImpactSection from "@/components/notre-modele/ImpactSection";
import FetchError from "@/components/errors";
import { notreModeleQuery } from "@/hooks/notreModele/notreModeleQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function NotreModelePage() {
  const { locale, t } = useLocaleStore();

  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notreModele", locale],
    queryFn: () => notreModeleQuery.getBlobal({ locale }),
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
      <PageHero pageData={pageData} />
      <ThesisSection pageData={pageData} />
      <SectorsSection pageData={pageData} />
      <PolesSection pageData={pageData} />
      <ImpactSection pageData={pageData} />
    </div>
  );
}
