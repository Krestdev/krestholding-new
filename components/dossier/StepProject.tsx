"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import CtaArrow from "@/components/ui/CtaArrow";
import StepProgress from "./StepProgress";
import { DossierAmountRange, DossierNeedType, DossierSubmissionInput } from "@/hooks/dossierSubmissions/type";

interface StepProjectProps {
  data: Partial<DossierSubmissionInput>;
  onChange: (patch: Partial<DossierSubmissionInput>) => void;
  onNext: () => void;
  onBack: () => void;
}

const NEED_TYPES: DossierNeedType[] = ["Capital", "Structuration", "Accès au marché", "Autre"];

const AMOUNT_RANGES: { value: DossierAmountRange; label: string }[] = [
  { value: "lt-10m", label: "< 10M FCFA" },
  { value: "10m-50m", label: "10M - 50M FCFA" },
  { value: "50m-200m", label: "50M - 200M FCFA" },
  { value: "gt-200m", label: "> 200M FCFA" },
  { value: "non-determine", label: "Non déterminé" },
];

const inputClass =
  "w-full h-[42px] px-3 bg-white/[0.04] border border-white/10 text-base text-white focus:outline-none focus:border-white/32 transition-colors";
const labelClass = "font-mono text-white text-xs tracking-[0.5px] uppercase";

export default function StepProject({ data, onChange, onNext, onBack }: StepProjectProps) {
  const isComplete = Boolean(data.projectDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[43px] pb-24">
      <StepProgress step={2} title="Votre projet" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[1062px]">
        <div className="flex flex-col gap-3">
          <label className={labelClass}>Nature du besoin</label>
          <select
            value={data.needType || ""}
            onChange={(e) => onChange({ needType: (e.target.value || undefined) as DossierNeedType | undefined })}
            className={`${inputClass} appearance-none text-white/32 [&:has(option:checked:not([value='']))]:text-white`}
          >
            <option value="" className="text-black">
              Exemple : Capital · structuration · accès au marché
            </option>
            {NEED_TYPES.map((n) => (
              <option key={n} value={n} className="text-black">
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <label className={labelClass}>Montant recherché</label>
          <select
            value={data.amountRange || ""}
            onChange={(e) =>
              onChange({ amountRange: (e.target.value || undefined) as DossierAmountRange | undefined })
            }
            className={`${inputClass} appearance-none text-white/32 [&:has(option:checked:not([value='']))]:text-white`}
          >
            <option value="" className="text-black">
              Montant recherché (fourchette)
            </option>
            {AMOUNT_RANGES.map((r) => (
              <option key={r.value} value={r.value} className="text-black">
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 flex flex-col gap-3">
          <label className={labelClass}>Votre projet en quelques lignes *</label>
          <textarea
            required
            value={data.projectDescription || ""}
            onChange={(e) => onChange({ projectDescription: e.target.value })}
            placeholder="Décrivez votre projet en quelques lignes *"
            rows={5}
            className="w-full px-3 py-4 bg-white/[0.04] border border-white/10 text-base text-white placeholder:text-white/32 focus:outline-none focus:border-white/32 transition-colors resize-none"
          />
        </div>
      </div>

      <div className="flex items-start gap-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 border border-white/56 text-white/56 font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/10"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </button>
        <button
          type="submit"
          disabled={!isComplete}
          className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-[#f29308] text-black font-mono text-sm uppercase tracking-wide transition-colors hover:bg-[#f29308]/85 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Continuer</span>
          <CtaArrow size={20} />
        </button>
      </div>
    </form>
  );
}
