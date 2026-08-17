"use client";

import { HomePageContent } from "@/hooks/home/type";
import { ServiceItem } from "@/hooks/services/type";
import { Asterisk, Briefcase } from "@phosphor-icons/react";
import Image from "next/image";

interface PolesSectionProps {
  poles: ServiceItem[];
  homeData?: HomePageContent | null;
}

const DEFAULT_POLES: Partial<ServiceItem>[] = [
  { title: "Growth, Marketing & Brand", example: "Ex. Refonte de la marque LE CARINO" },
  { title: "Développement informatique", example: "Ex. Mise en conformité fiscale multi-entités" },
  { title: "Comptabilité & Fiscalité", example: "Ex. Achats groupés inter-entités" },
  { title: "Procurement", example: "Ex. Structuration de la paie et du droit social" },
  { title: "Ressources Humaines", example: "Ex. Système de réservation SAGA AFRICA" },
];

export default function PolesSection({ poles, homeData }: PolesSectionProps) {
  const items = poles && poles.length > 0 ? poles : DEFAULT_POLES;

  return (
    <section className="bg-white py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Asterisk size={20} weight="fill" className="text-black" />
          <span className="font-abel text-black text-xl uppercase tracking-tight">
            {homeData?.polesKicker || "Ce que nous apportons au-delà du capital"}
          </span>
        </div>

        <h2 className="font-sans font-medium text-[#010101] text-3xl sm:text-4xl tracking-tight pt-2">
          {homeData?.polesHeading || "Les 5 pôles d'accompagnement"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 pt-6">
          {items.map((pole, idx) => {
            const icon = typeof pole.icon === "object" ? pole.icon : undefined;
            return (
              <div key={idx} className="flex flex-col justify-between gap-6 px-6 py-10 border-t border-black/[0.06]">
                {icon?.url ? (
                  <div className="relative size-16">
                    <Image src={icon.url} alt="" fill className="object-contain" />
                  </div>
                ) : (
                  <Briefcase size={40} className="text-black" />
                )}

                <div className="flex flex-col gap-4">
                  <h3 className="font-inter font-bold text-[#111] text-lg leading-snug">{pole.title}</h3>
                  {pole.example && <p className="font-inter font-medium text-[#288fa5] text-sm">{pole.example}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
