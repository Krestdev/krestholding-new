"use client";

import Link from "next/link";
import { ParticipationsPageContent } from "@/hooks/participations/type";

interface CtaBannerProps {
  pageData?: ParticipationsPageContent | null;
}

function PrimaryButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center px-6 py-4 bg-[#f29308] text-[#010101] font-mono text-sm uppercase tracking-[0.08em] transition-colors hover:bg-[#f29308]/85"
    >
      {label}
    </Link>
  );
}

function SecondaryButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="hidden sm:inline-flex items-center justify-center px-6 py-4 border border-white/32 text-white font-mono text-sm uppercase tracking-[0.08em] transition-colors hover:bg-white/10"
    >
      {label}
    </Link>
  );
}

export default function CtaBanner({ pageData }: CtaBannerProps) {
  return (
    <section className="bg-[#0d0d0d] border-y border-white/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-end gap-9 p-10 lg:p-20">
          <h3 className="font-sans text-white text-3xl sm:text-4xl tracking-tight max-w-[513px]">
            {pageData?.ctaLeftHeading ||
              "Vous dirigez une entreprise à fort potentiel ?"}
          </h3>
          <p className="text-white/80 text-xl sm:text-2xl leading-relaxed">
            {pageData?.ctaLeftBody ||
              "Vérifiez les critères, puis soumettez votre dossier. Réponse sous 15 jours ouvrés."}
          </p>
          <div className="flex flex-wrap gap-6 lg:gap-[38px]">
            <PrimaryButton
              href={
                pageData?.ctaLeftPrimaryUrl || "/contact/soumettre-un-dossier"
              }
              label={pageData?.ctaLeftPrimaryLabel || "Soumettre un dossier"}
            />
            <SecondaryButton
              href={pageData?.ctaLeftSecondaryUrl || "/notre-modele"}
              label={pageData?.ctaLeftSecondaryLabel || "Voir les critères"}
            />
          </div>
        </div>

        <div className="flex flex-col justify-end gap-9 p-10 lg:p-20 bg-[#f29308]/10">
          <h3 className="font-sans text-white text-3xl sm:text-4xl tracking-tight max-w-[513px]">
            {pageData?.ctaRightHeading ||
              "Investisseur, partenaire ou journaliste ?"}
          </h3>
          <p className="text-white/80 text-xl sm:text-2xl leading-relaxed">
            {pageData?.ctaRightBody ||
              "Pour une demande d'information sur le portefeuille ou une sollicitation presse."}
          </p>
          <div className="flex flex-wrap gap-6 lg:gap-[38px]">
            <PrimaryButton
              href={pageData?.ctaRightPrimaryUrl || "/contact"}
              label={pageData?.ctaRightPrimaryLabel || "Nous écrire"}
            />
            <SecondaryButton
              href={pageData?.ctaRightSecondaryUrl || "/contact"}
              label={pageData?.ctaRightSecondaryLabel || "Espace presse"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
