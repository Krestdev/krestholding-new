"use client";

import PageHero from "@/components/notre-modele/PageHero";
import TableOfContents from "@/components/notre-modele/TableOfContents";
import ThesisSection from "@/components/notre-modele/ThesisSection";
import SectorsSection from "@/components/notre-modele/SectorsSection";
import EligibilitySection from "@/components/notre-modele/EligibilitySection";
import PolesSection from "@/components/notre-modele/PolesSection";
import FetchError from "@/components/errors";
import { notreModeleQuery } from "@/hooks/notreModele/notreModeleQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import { homeQuery } from "@/hooks/home/homeQuery";

export default function NotreModelePage() {
  const { locale, t } = useLocaleStore();

  const {
    data: homeData,
    isLoading: isHomeLoading,
    error: homeError,
  } = useQuery({
    queryKey: ["home", locale],
    queryFn: () => homeQuery.getBlobal({ locale }),
  });

  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notreModele", locale],
    queryFn: () => notreModeleQuery.getBlobal({ locale }),
  });

  if (isLoading || isHomeLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh] text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <span>{t("common.loading")}</span>
        </div>
      </div>
    );
  }

  if (error || homeError) {
    return (
      <FetchError
        error={error}
        data={pageData === null || pageData === undefined}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-[#0d0d0d] -mt-[81px]">
      <PageHero pageData={pageData} />
      <TableOfContents />
      <ThesisSection pageData={pageData} />
      <div className="hidden lg:block">
        <SectorsSection pageData={pageData} />
      </div>
      <EligibilitySection />
      <div className="hidden lg:block">
        <PolesSection pageData={pageData} />
      </div>
      <NewsletterBanner homeData={homeData} />
    </div>
  );
}
