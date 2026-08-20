import CtaArrow from "@/components/ui/CtaArrow";

interface WizardIntroProps {
  onStart: () => void;
}

export default function WizardIntro({ onStart }: WizardIntroProps) {
  return (
    <div className="flex flex-col gap-20 pb-24">
      <h1 className="font-sans font-medium text-white text-4xl sm:text-[42px]">Soumettre un dossier</h1>

      <div className="flex flex-col lg:flex-row gap-2.5">
        <div className="flex-1 bg-[#f29308]/15 border border-[#f29308] p-6 flex flex-col gap-6 text-white">
          <h2 className="font-abel font-bold text-xl uppercase">Avant de commencer</h2>
          <ul className="flex flex-col gap-6 px-4 text-base list-disc marker:text-[#f29308]">
            <li>Vérifiez les critères d&apos;éligibilité</li>
            <li>Préparez votre présentation ou business plan (PDF ou Word, 10 Mo max)</li>
            <li>Comptez environ 8 minutes</li>
          </ul>
        </div>

        <div className="flex-1 bg-[#218da8]/15 border border-[#218da8] p-6 flex flex-col gap-6 text-white">
          <h2 className="font-abel font-bold text-xl uppercase">Ce qui se passe ensuite</h2>
          <ul className="flex flex-col gap-6 px-4 text-base list-disc marker:text-[#218da8]">
            <li>Accusé de réception immédiat avec un numéro de dossier</li>
            <li>Première analyse sous 15 jours ouvrés</li>
            <li>Retour systématique, positif ou négatif</li>
          </ul>
        </div>

        <div className="flex-1 bg-gradient-to-r from-[#cf2538]/0 to-[#cf2538] border-l-[3px] border-[#cf2538] p-6 flex flex-col gap-6">
          <h2 className="font-abel font-bold text-white text-xl uppercase">Note sur la confidentialité</h2>
          <p className="text-white/80 text-base leading-relaxed">
            Votre dossier est transmis uniquement à la Direction Générale de KREST HOLDING. Aucune information
            n&apos;est partagée avec des tiers. Vous recevez une réponse sous 15 jours ouvrés.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-white text-black font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/90 w-fit"
      >
        <span>Commencer</span>
        <CtaArrow size={16} />
      </button>
    </div>
  );
}
