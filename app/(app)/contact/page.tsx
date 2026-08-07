"use client";

import ContactHeader from "@/components/contact/ContactHeader";
import EmailCard from "@/components/contact/EmailCard";
import PhoneCard from "@/components/contact/PhoneCard";
import AddressCard from "@/components/contact/AddressCard";
import MapSection from "@/components/contact/MapSection";
import FetchError from "@/components/errors";
import { contactQuery } from "@/hooks/contact/contactQuery";
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

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[50vh] text-slate-400">
        {t("common.loading")}
      </div>
    );
  }

  if (error) {
    return <FetchError error={error} data={contactData === null || contactData === undefined} />;
  }

  const emails = contactData?.emails || [];
  const phones = contactData?.phones || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      <ContactHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EmailCard emails={emails} />
        <PhoneCard phones={phones} />
        <AddressCard contactData={contactData} />
      </div>

      {contactData?.mapIframeUrl && <MapSection mapIframeUrl={contactData.mapIframeUrl} />}
    </div>
  );
}
