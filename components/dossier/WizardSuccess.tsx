import Link from "next/link";
import CtaArrow from "@/components/ui/CtaArrow";

interface WizardSuccessProps {
  reference?: string;
}

export default function WizardSuccess({ reference }: WizardSuccessProps) {
  return (
    <div className="flex flex-col gap-8 pb-24">
      <p className="font-mono text-white text-xs tracking-[0.5px] uppercase">Terminé</p>

      <div className="flex flex-col gap-8 text-white">
        <h1 className="font-sans font-medium text-4xl sm:text-[42px]">Votre dossier a bien été reçu.</h1>
        <p className="text-lg max-w-[624px]">
          Référence <span className="font-bold">{reference || "—"}</span> · Vous recevez un courriel de
          confirmation. Notre équipe revient vers vous sous 15 jours ouvrés.
        </p>
      </div>

      <Link
        href="/contact"
        className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-[#f29308] text-black font-mono text-sm uppercase tracking-wide transition-colors hover:bg-[#f29308]/85 w-fit"
      >
        <span>Aller à contact</span>
        <CtaArrow size={20} />
      </Link>
    </div>
  );
}
