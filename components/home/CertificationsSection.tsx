"use client";

import Image from "next/image";
import { SealCheck } from "@phosphor-icons/react";
import { Certification } from "@/hooks/certifications/type";
import { HomePageContent } from "@/hooks/home/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface CertificationsSectionProps {
  certifications?: Certification[];
  homeData?: HomePageContent | null;
}

export default function CertificationsSection({ certifications, homeData }: CertificationsSectionProps) {
  const items = (certifications ?? []).slice(0, 2);

  return (
    <section className="bg-[#0d0d0d] py-20 px-6 lg:px-20 border-y border-white/10">
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-10 items-center">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <KickerIcon className="text-white" />
            <span className="font-mono text-white text-xl uppercase tracking-tight">
              {homeData?.certificationsKicker || "Certifié"}
            </span>
          </div>

          <h2 className="font-sans font-medium text-white text-3xl sm:text-5xl leading-tight">
            {homeData?.certificationsHeading ||
              "Construit avec les standards de qualité, de gouvernance et de conformité que nos partenaires exigent."}
          </h2>

          <p className="text-[#ccc] text-lg sm:text-xl leading-relaxed">
            {homeData?.certificationsBody ||
              "ISO 9001 · ISO 14001 · Gouvernance actionnariale · Audits annuels · Conformité CEMAC"}
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center gap-10">
          {items.length > 0
            ? items.map((cert) => {
                const badge = typeof cert.badgeIcon === "object" ? cert.badgeIcon : undefined;
                return badge?.url ? (
                  <div key={cert.id} className="relative h-[220px] w-[220px] shrink-0">
                    <Image src={badge.url} alt={cert.title} fill className="object-contain" />
                  </div>
                ) : (
                  <div
                    key={cert.id}
                    className="flex flex-col items-center justify-center gap-2 h-[220px] w-[220px] rounded-full border border-white/20 text-white shrink-0"
                  >
                    <SealCheck size={40} />
                    <span className="text-sm font-semibold text-center px-4">{cert.code}</span>
                  </div>
                );
              })
            : ["/enterprise_ready1.png", "/enteprise_ready2.png"].map((src) => (
                <div key={src} className="relative h-[220px] w-[220px] shrink-0">
                  <Image src={src} alt="" fill className="object-contain" />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
