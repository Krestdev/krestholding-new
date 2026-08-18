"use client";

import { HomePageContent } from "@/hooks/home/type";
import { servicesQuery } from "@/hooks/services/servicesQuery";
import { subsidiariesQuery } from "@/hooks/subsidiaries/subsidiariesQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import CtaArrow from "@/components/ui/CtaArrow";

interface HeroSectionProps {
  homeData?: HomePageContent | null;
}

export default function HeroSection({ homeData }: HeroSectionProps) {
  const { locale } = useLocaleStore();

  const { data: services } = useQuery({
    queryKey: ["services", locale, "hero"],
    queryFn: () => servicesQuery.get({ locale, limit: 50, sort: "order" }),
  });

  const { data: subsidiaries } = useQuery({
    queryKey: ["subsidiaries", locale, "hero"],
    queryFn: () => subsidiariesQuery.get({ locale, limit: 12 }),
  });

  const tickerItems = (services ?? []).filter((s) => s.featuredInHero !== false);
  const logos = (subsidiaries ?? []).filter((s) => s.featuredInHome !== false);

  const bgMedia = typeof homeData?.heroBgMedia === "object" ? homeData.heroBgMedia : undefined;

  return (
    <section className="relative flex flex-col items-center pt-[120px] pb-10 px-6 lg:px-10 bg-[#0d0d0d] border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {bgMedia?.url && (
          <Image src={bgMedia.url} alt="" fill priority className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/80 to-[#0d0d0d]" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px]">
        <div className="max-w-[560px] flex flex-col gap-6">
          <h1 className="font-sans font-medium text-white text-4xl sm:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight">
            {homeData?.heroHeading || "Une courte phrase d'accroche"}
          </h1>

          <p className="text-[#ccc] text-lg sm:text-xl leading-relaxed max-w-xl">
            {homeData?.heroSubheading ||
              "Nous prenons des participations dans des entreprises camerounaises à fort potentiel, et nous les développons."}
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Link
              href={homeData?.heroCtaUrl || "#notre-modele"}
              className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              <span>{homeData?.heroCtaLabel || "Notre modèle"}</span>
              <CtaArrow />
            </Link>

            <Link
              href={homeData?.heroSecondaryCtaUrl || "/partenaires"}
              className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              <span>{homeData?.heroSecondaryCtaLabel || "Nos participations"}</span>
              <CtaArrow />
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10 pt-24 lg:pt-[90px]">
          {logos.length > 0 && (
            <div className="relative w-full sm:w-[340px] h-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <div
                className="animate-horizontal-ticker flex items-center gap-10 w-max"
                style={{ animationDuration: `${logos.length * 4}s` }}
              >
                {[...logos, ...logos].map((sub, idx) => {
                  const logo = typeof sub.logo === "object" ? sub.logo : undefined;
                  return (
                    <div key={`${sub.id}-${idx}`} className="relative h-8 w-28 shrink-0">
                      {logo?.url ? (
                        <Image src={logo.url} alt={sub.name} fill className="object-contain object-left" />
                      ) : (
                        <span className="flex items-center h-full text-white text-sm font-semibold tracking-wide uppercase whitespace-nowrap">
                          {sub.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tickerItems.length > 0 && (
            <div
              className="relative h-[200px] w-full sm:w-[430px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
            >
              <div
                className="animate-vertical-ticker flex flex-col gap-6"
                style={{ animationDuration: `${tickerItems.length * 3}s` }}
              >
                {[...tickerItems, ...tickerItems].map((item, idx) => (
                  <p key={`${item.id}-${idx}`} className="font-medium text-white text-lg shrink-0">
                    {item.title}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
