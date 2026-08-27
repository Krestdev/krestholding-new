import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";
import { CarrieresPageContent } from "@/hooks/carrieres/type";

interface CareersHeroProps {
  pageData?: CarrieresPageContent | null;
}

const PILLS = [
  { label: "Où sont les postes", href: "#ou-sont-les-postes" },
  { label: "Pourquoi nous rejoindre", href: "#pourquoi-nous-rejoindre" },
  { label: "Nos offres", href: "#nos-offres" },
  { label: "Notre processus", href: "#notre-processus" },
  { label: "Candidature spontanée", href: "#candidature-spontanee" },
];

export default function CareersHero({ pageData }: CareersHeroProps) {
  return (
    <section className="relative flex flex-col items-center px-6 lg:px-10 pt-[120px] pb-10 bg-gradient-to-b from-[rgba(13,13,13,0.8)] to-[#0d0d0d]">
      <div className="w-full max-w-[1280px] flex flex-col gap-10">
        <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
          <Link href="/" className="text-white/64 hover:text-white transition-colors">
            Accueil
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <span className="font-bold text-white">Carrières</span>
        </div>

        <h1 className="font-sans font-medium text-white text-4xl sm:text-5xl leading-tight max-w-[624px]">
          {pageData?.heroHeading || "Rejoindre KREST, c'est rejoindre l'une de nos sept structures"}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {PILLS.map((pill) => (
            <a
              key={pill.href}
              href={pill.href}
              className="bg-white/12 border border-white/12 px-4 py-2.5 text-sm font-medium text-white/64 hover:text-white hover:bg-white/16 transition-colors"
            >
              {pill.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
