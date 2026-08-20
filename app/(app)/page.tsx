"use client";

import HeroSection from "@/components/home/HeroSection";
import AboutIntroSection from "@/components/home/AboutIntroSection";
import PolesSection from "@/components/home/PolesSection";
import InvestmentProcessSection from "@/components/home/InvestmentProcessSection";
import FaqSection from "@/components/home/FaqSection";
import SubsidiariesSection from "@/components/home/SubsidiariesSection";
import CertificationsSection from "@/components/home/CertificationsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsSection from "@/components/home/NewsSection";
import HomeContactSection from "@/components/home/HomeContactSection";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import FetchError from "@/components/errors";

import { homeQuery } from "@/hooks/home/homeQuery";
import { subsidiariesQuery } from "@/hooks/subsidiaries/subsidiariesQuery";
import { servicesQuery } from "@/hooks/services/servicesQuery";
import { newsQuery } from "@/hooks/news/newsQuery";
import { testimonialsQuery } from "@/hooks/testimonials/testimonialsQuery";
import { faqsQuery } from "@/hooks/faqs/faqsQuery";
import { certificationsQuery } from "@/hooks/certifications/certificationsQuery";

import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { locale, t } = useLocaleStore();

  const {
    data: homeData,
    isLoading: isHomeLoading,
    error: homeError,
  } = useQuery({
    queryKey: ["home", locale],
    queryFn: () => homeQuery.getBlobal({ locale }),
  });

  const { data: subsidiaries } = useQuery({
    queryKey: ["subsidiaries", locale, "home"],
    queryFn: () => subsidiariesQuery.get({ locale, limit: 12 }),
  });

  const { data: poles } = useQuery({
    queryKey: ["services", locale, "poles"],
    queryFn: () => servicesQuery.get({ locale, limit: 10, sort: "order" }),
  });

  const { data: news } = useQuery({
    queryKey: ["news", locale, "home"],
    queryFn: () => newsQuery.get({ locale, limit: 4, sort: "-publishedAt" }),
  });

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials", locale, "home"],
    queryFn: () => testimonialsQuery.get({ locale, limit: 4 }),
  });

  const { data: faqs } = useQuery({
    queryKey: ["faqs", locale, "home"],
    queryFn: () => faqsQuery.get({ locale, limit: 6, sort: "order" }),
  });

  const { data: certifications } = useQuery({
    queryKey: ["certifications", locale, "home"],
    queryFn: () => certificationsQuery.get({ locale, limit: 2, sort: "order" }),
  });

  if (isHomeLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh] text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <span>{t("common.loading")}</span>
        </div>
      </div>
    );
  }

  if (homeError) {
    return <FetchError error={homeError} data={homeData === null || homeData === undefined} />;
  }

  return (
    <div className="bg-[#0d0d0d] -mt-[81px]">
      <HeroSection homeData={homeData} />
      <AboutIntroSection homeData={homeData} />
      <PolesSection poles={poles ?? []} homeData={homeData} />
      <InvestmentProcessSection homeData={homeData} />
      <FaqSection faqs={faqs ?? []} homeData={homeData} />
      <SubsidiariesSection subsidiaries={subsidiaries ?? []} homeData={homeData} />
      <CertificationsSection certifications={certifications ?? []} homeData={homeData} />
      <TestimonialsSection testimonials={testimonials ?? []} homeData={homeData} />
      <NewsSection news={news ?? []} newsCalloutText={homeData?.newsHeading} homeData={homeData} />
      <HomeContactSection homeData={homeData} />
      <NewsletterBanner homeData={homeData} />
    </div>
  );
}
