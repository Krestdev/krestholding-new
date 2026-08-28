"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import CtaArrow from "@/components/ui/CtaArrow";
import StepProgress from "./StepProgress";
import { DossierSubmissionInput } from "@/hooks/dossierSubmissions/type";

interface StepCompanyProps {
  data: Partial<DossierSubmissionInput>;
  onChange: (patch: Partial<DossierSubmissionInput>) => void;
  onNext: () => void;
  onBack: () => void;
}

const inputClass =
  "w-full h-[42px] px-3 bg-white/[0.04] border border-white/10 text-base text-white placeholder:text-white/32 focus:outline-none focus:border-white/32 transition-colors";
const labelClass = "font-mono text-white text-xs tracking-[0.5px] uppercase";

export default function StepCompany({ data, onChange, onNext, onBack }: StepCompanyProps) {
  const isComplete = data.companyName && data.industry && data.foundedYear && data.headcount && data.cityCountry;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[43px] pb-24">
      <StepProgress step={1} title="Votre entreprise" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[1062px]">
        <div className="flex flex-col gap-3">
          <label className={labelClass}>Raison sociale *</label>
          <input
            required
            value={data.companyName || ""}
            onChange={(e) => onChange({ companyName: e.target.value })}
            placeholder="Raison sociale"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className={labelClass}>Secteur d&apos;activité *</label>
          <input
            required
            value={data.industry || ""}
            onChange={(e) => onChange({ industry: e.target.value })}
            placeholder="Secteur d'activité"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className={labelClass}>Année de création *</label>
          <input
            required
            type="number"
            value={data.foundedYear || ""}
            onChange={(e) => onChange({ foundedYear: Number(e.target.value) })}
            placeholder="Année de création"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className={labelClass}>Effectif *</label>
          <input
            required
            value={data.headcount || ""}
            onChange={(e) => onChange({ headcount: e.target.value })}
            placeholder="Effectif"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className={labelClass}>Ville / Pays *</label>
          <input
            required
            value={data.cityCountry || ""}
            onChange={(e) => onChange({ cityCountry: e.target.value })}
            placeholder="Ville / Pays"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className={labelClass}>Site web</label>
          <input
            value={data.websiteUrl || ""}
            onChange={(e) => onChange({ websiteUrl: e.target.value })}
            placeholder="Site web"
            className={inputClass}
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
