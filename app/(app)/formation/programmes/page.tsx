"use client";

import Breadcrumb from "@/components/formation/Breadcrumb";
import PageHeader from "@/components/formation/PageHeader";
import ProgrammesContent from "@/components/formation/ProgrammesContent";
import FetchError from "@/components/errors";
import { pagesQuery } from "@/hooks/pages/pagesQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function ProgrammesPage() {
  const { locale, t } = useLocaleStore();

  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pages", locale, "programmes"],
    queryFn: () => pagesQuery.getBySlug("programmes", { locale }),
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[50vh] text-slate-400">
        {t("common.loading")}
      </div>
    );
  }

  if (error) {
    return <FetchError error={error} data={pageData === null || pageData === undefined} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <div className="space-y-4">
        <Breadcrumb
          items={[
            { label: t("formation.breadcrumbHome"), href: "/" },
            { label: t("formation.breadcrumbTraining") },
          ]}
        />
        <PageHeader
          title={pageData?.title || "Programmes de Formation"}
          subtitle={
            pageData?.seo?.metaDescription ||
            "Découvrez l'ensemble des programmes de formation continue et d'excellence dispensés par Krest Holding."
          }
        />
      </div>

      <ProgrammesContent pageData={pageData} />
    </div>
  );
}
