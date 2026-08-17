"use client";

import { useState } from "react";
import { HomePageContent } from "@/hooks/home/type";

interface HomeContactSectionProps {
  homeData?: HomePageContent | null;
}

const DEFAULT_CHECKLIST = [
  "Vérifiez les critères d'éligibilité",
  "Préparez votre présentation ou business plan (PDF, 10 Mo max)",
  "Comptez environ 8 minutes",
];

const FIELDS = [
  { label: "Raison sociale *", placeholder: "Raison sociale" },
  { label: "Secteur d'activité *", placeholder: "Secteur d'activité" },
  { label: "Année de création *", placeholder: "Année de création" },
  { label: "Effectif *", placeholder: "Effectif" },
  { label: "Ville / Pays *", placeholder: "Ville / Pays" },
  { label: "Site web", placeholder: "Site web" },
];

export default function HomeContactSection({ homeData }: HomeContactSectionProps) {
  const [step] = useState(1);
  const checklist = homeData?.contactChecklist?.length
    ? homeData.contactChecklist.map((c) => c.item)
    : DEFAULT_CHECKLIST;

  return (
    <section id="soumettre-dossier" className="bg-[#0d0d0d] py-24 lg:py-[197px] pb-24 lg:pb-[180px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
        <div className="flex flex-col gap-8 max-w-[487px]">
          <span className="font-mono text-white text-xl uppercase tracking-tight">
            {homeData?.contactKicker || "Candidater"}
          </span>

          <h2 className="font-sans text-white text-4xl">{homeData?.contactHeading || "Soumettre un dossier"}</h2>

          <div className="border-l-2 border-[#cf2538] pl-4">
            <p className="text-sm leading-relaxed">
              <span className="font-bold text-white">{homeData?.contactConfidentialityTitle || "Confidentialité."}</span>{" "}
              <span className="text-[#878887]">
                {homeData?.contactConfidentialityBody ||
                  "Votre dossier est transmis uniquement à la Direction Générale de KREST HOLDING. Aucune information n'est partagée avec des tiers."}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-mono text-[#878887] text-xs uppercase tracking-widest pb-2">Avant de commencer</p>
            {checklist.map((item, idx) => (
              <p key={idx} className="text-[#878887] text-sm px-4 py-2">
                {item}
              </p>
            ))}
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 flex flex-col gap-1">
            <p className="font-mono text-[#878887] text-[10px] uppercase tracking-widest">Contact direct</p>
            <p className="text-white text-sm">{homeData?.contactEmail || "contact@krestholding.com"}</p>
            <p className="text-[#878887] text-xs">{homeData?.contactAddress || "Douala, Cameroun · Zone CEMAC"}</p>
          </div>
        </div>

        <div className="bg-white/[0.01] border border-white/[0.08] rounded-xl p-8">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? "bg-[#218da8]" : "bg-[#1a2c38]"}`} />
            ))}
          </div>

          <p className="font-mono text-[#878887] text-[10px] uppercase tracking-widest pt-8 pb-6">
            Étape {step} sur 3 — Votre entreprise
          </p>

          <div className="flex flex-wrap gap-4">
            {FIELDS.map((field) => (
              <div key={field.label} className="flex flex-col gap-1.5 w-[calc(50%-8px)]">
                <label className="font-mono text-[#878887] text-[10px] uppercase tracking-wide">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  disabled
                  className="bg-white/[0.04] border border-white/10 rounded px-3 py-2.5 text-base text-white/32 placeholder:text-white/32 cursor-not-allowed"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled
            className="mt-8 px-6 py-2.5 bg-[#218da8] text-white font-mono text-sm uppercase tracking-wide opacity-70 cursor-not-allowed"
          >
            Continuer
          </button>
        </div>
      </div>
    </section>
  );
}
