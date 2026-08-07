"use client";

import Breadcrumb from "@/components/formation/Breadcrumb";
import PageHeader from "@/components/formation/PageHeader";
import CertificationsContent from "@/components/formation/CertificationsContent";
import FetchError from "@/components/errors";
import { pagesQuery } from "@/hooks/pages/pagesQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function CertificationsPage() {
  const { locale, t } = useLocaleStore();

  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pages", locale, "certifications"],
    queryFn: () => pagesQuery.getBySlug("certifications", { locale }),
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
            { label: t("formation.breadcrumbTraining"), href: "/formation/programmes" },
            { label: t("nav.certifications") },
          ]}
        />
        <PageHeader
          title={pageData?.title || "Certifications Accréditées"}
          subtitle={
            pageData?.seo?.metaDescription ||
            "Validez et valorisez vos compétences à travers nos accréditations certifiantes de haut niveau."
          }
        />
      </div>

      <CertificationsContent pageData={pageData} />
    </div>
  );
}
