"use client";

import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";
import { NotreModeleContent } from "@/hooks/notreModele/type";

interface PageHeroProps {
  pageData?: NotreModeleContent | null;
}

const PILLS = [
  { label: "Thèse", mobileLabel: "Thèse", href: "#these" },
  { label: "Secteurs & géographies", mobileLabel: "Secteurs", href: "#secteurs" },
  { label: "Éligibilité & Processus", mobileLabel: "Processus", href: "#processus" },
  { label: "Les 5 pôles", mobileLabel: "Les 5 pôles", href: "#poles" },
];

export default function PageHero({ pageData }: PageHeroProps) {
  return (
    <section className="relative flex flex-col items-center px-6 lg:px-10 pt-[120px] pb-10 bg-gradient-to-b from-[#0d0d0d]/80 to-[#2c2c2c]">
      <div className="w-full max-w-[1280px] flex flex-col gap-10">
        <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
          <Link href="/" className="text-white/64 hover:text-white transition-colors">
            Accueil
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <span className="font-bold text-white">Notre modèle</span>
        </div>

        <h1 className="font-sans text-white text-4xl sm:text-5xl leading-tight max-w-[624px]">
          {pageData?.heroHeading || "Notre modèle d'investissement et d'accompagnement"}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {PILLS.map((pill) => (
            <a
              key={pill.href}
              href={pill.href}
              className="bg-white/12 border border-white/12 px-4 py-2.5 text-sm font-medium text-white/64 hover:text-white hover:bg-white/16 transition-colors"
            >
              <span className="lg:hidden">{pill.mobileLabel}</span>
              <span className="hidden lg:inline">{pill.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
