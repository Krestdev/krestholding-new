import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";
import { ImpactPageContent } from "@/hooks/impact/type";

interface ImpactHeroProps {
  pageData?: ImpactPageContent | null;
}

const PILLS = [
  { label: "L'impact en chiffres", href: "#impact-en-chiffres" },
  { label: "Emploi & compétences", href: "#emplois-competences" },
  { label: "Ancrage local", href: "#emplois-competences" },
  { label: "Un impact raconté", href: "#un-impact-raconte" },
  { label: "Environnement & certifications", href: "#environnement-certifications" },
  { label: "Comment nous mesurons", href: "#impact-en-chiffres" },
];

export default function ImpactHero({ pageData }: ImpactHeroProps) {
  return (
    <section className="relative flex flex-col items-center px-6 lg:px-10 pt-[120px] pb-10 bg-gradient-to-b from-[rgba(13,13,13,0.8)] to-[#0d0d0d]">
      <div className="w-full max-w-[1280px] flex flex-col gap-10">
        <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
          <Link href="/" className="text-white/64 hover:text-white transition-colors">
            Accueil
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <span className="font-bold text-white">Impact</span>
        </div>

        <div className="flex flex-col gap-8 max-w-[624px]">
          <h1 className="font-sans font-medium text-white text-4xl sm:text-5xl leading-tight">
            {pageData?.heroHeading || "Ce que notre modèle produit sur le terrain"}
          </h1>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
            {pageData?.heroSubheading ||
              "Nous mesurons l'impact social, économique et environnemental de nos investissements à travers l'Afrique Centrale."}
          </p>
        </div>

        <div className="hidden lg:flex flex-wrap items-center gap-3">
          {PILLS.map((pill) => (
            <a
              key={pill.label}
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
