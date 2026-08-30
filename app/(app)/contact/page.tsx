"use client";

import ContactHero from "@/components/contact/ContactHero";
import GeneralFormSection from "@/components/contact/GeneralFormSection";
import HeadquartersSection from "@/components/contact/HeadquartersSection";
import LocationsSection from "@/components/contact/LocationsSection";
import LegalSection from "@/components/contact/LegalSection";
import CtaBanner from "@/components/participations/CtaBanner";
import FetchError from "@/components/errors";
import { contactQuery } from "@/hooks/contact/contactQuery";
import { notreModeleQuery } from "@/hooks/notreModele/notreModeleQuery";
import { subsidiariesQuery } from "@/hooks/subsidiaries/subsidiariesQuery";
import { participationsQuery } from "@/hooks/participations/participationsQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function ContactPage() {
  const { locale, t } = useLocaleStore();

  const {
    data: contactData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contact", locale],
    queryFn: () => contactQuery.getBlobal({ locale }),
  });

  const { data: notreModeleData } = useQuery({
    queryKey: ["notreModele", locale],
    queryFn: () => notreModeleQuery.getBlobal({ locale }),
  });

  const { data: subsidiaries } = useQuery({
    queryKey: ["subsidiaries", locale, "all"],
    queryFn: () => subsidiariesQuery.get({ locale }),
  });

  const { data: participationsData } = useQuery({
    queryKey: ["participations", locale],
    queryFn: () => participationsQuery.getBlobal({ locale }),
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
    return <FetchError error={error} data={contactData === null || contactData === undefined} />;
  }

  return (
    <div className="bg-white dark:bg-[#0d0d0d] -mt-[81px]">
      <ContactHero />
      <GeneralFormSection />
      <HeadquartersSection contactData={contactData} notreModeleData={notreModeleData} />
      <div className="hidden lg:block">
        <LocationsSection subsidiaries={subsidiaries ?? []} />
      </div>
      <div className="hidden lg:block">
        <LegalSection contactData={contactData} />
      </div>
      <CtaBanner pageData={participationsData} />
    </div>
  );
}
