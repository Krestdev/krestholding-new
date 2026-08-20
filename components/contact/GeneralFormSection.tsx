"use client";

import { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Check } from "@phosphor-icons/react";
import KickerIcon from "@/components/ui/KickerIcon";
import { contactSubmissionsQuery } from "@/hooks/contactSubmissions/contactSubmissionsQuery";
import { ContactMotif } from "@/hooks/contactSubmissions/type";

const MOTIF_OPTIONS: { value: ContactMotif; label: string }[] = [
  { value: "parcours-prioritaire", label: "Parcours prioritaire" },
  { value: "investisseur-partenaire", label: "Investisseur · Partenaire" },
  { value: "presse", label: "Presse" },
  { value: "candidat", label: "Candidat" },
  { value: "autre", label: "Autre" },
];

const inputClass =
  "w-full h-[42px] px-3 bg-black/[0.04] border border-black/10 text-base text-black placeholder:text-black/32 focus:outline-none focus:border-black/32 transition-colors";
const labelClass = "font-mono text-black text-xs tracking-[0.5px] uppercase";

export default function GeneralFormSection() {
  const [fullName, setFullName] = useState("");
  const [motif, setMotif] = useState<ContactMotif | "">("");
  const [email, setEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("237");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [organization, setOrganization] = useState("");
  const [country, setCountry] = useState("Cameroun");
  const [projectDescription, setProjectDescription] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      contactSubmissionsQuery.post({
        fullName,
        motif: motif as ContactMotif,
        email,
        phoneCountryCode,
        phoneNumber,
        organization,
        country,
        projectDescription,
        consentAccepted,
      }),
  });

  const isComplete =
    fullName && motif && email && phoneNumber && organization && country && projectDescription && consentAccepted;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
    mutation.mutate();
  };

  if (mutation.isSuccess) {
    return (
      <section id="formulaire-general" className="bg-white py-24 lg:py-[120px] px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto flex flex-col items-start gap-4">
          <div className="flex items-center gap-3 text-[#111]">
            <Check size={24} className="text-[#218da8]" />
            <p className="font-sans text-2xl">Merci, votre demande a bien été envoyée.</p>
          </div>
          <p className="text-black/64 text-base">Nous revenons vers vous dans le délai annoncé ci-dessus.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="formulaire-general" className="bg-white py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111]" />
          <span className="font-abel text-[#111] text-xl uppercase tracking-tight">Formulaire général</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <h2 className="font-sans text-[#111] text-3xl sm:text-[32px] leading-tight tracking-tight max-w-[512px]">
            Pour toute autre demande
          </h2>
          <p className="text-[rgba(17,17,17,0.9)] text-lg sm:text-xl leading-snug max-w-[514px]">
            Une phrase sur trois lignes qui donne brièvement l&apos;idée entreprise affiché sur cette page, de
            ce côté.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-[840px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <label className={labelClass}>Nom et prénom *</label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : Jesse Ikolo B."
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className={labelClass}>Motif de la demande *</label>
              <select
                required
                value={motif}
                onChange={(e) => setMotif(e.target.value as ContactMotif)}
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>
                  Motif
                </option>
                {MOTIF_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className={labelClass}>Courriel *</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jeandupont@dupont.co"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className={labelClass}>Téléphone *</label>
              <div className={`flex items-center gap-2 ${inputClass}`}>
                <input
                  required
                  value={phoneCountryCode}
                  onChange={(e) => setPhoneCountryCode(e.target.value)}
                  className="w-10 bg-transparent focus:outline-none"
                  aria-label="Indicatif"
                />
                <span className="text-black/32">·</span>
                <input
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="6XX XXX XXX"
                  className="flex-1 bg-transparent focus:outline-none"
                  aria-label="Numéro de téléphone"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className={labelClass}>Organisation *</label>
              <input
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Organisation"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className={labelClass}>Pays *</label>
              <div className={`flex items-center gap-2 ${inputClass}`}>
                <span>🇨🇲</span>
                <span className="text-black/32">—</span>
                <input
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="flex-1 bg-transparent focus:outline-none"
                  aria-label="Pays"
                />
              </div>
            </div>

            <div className="sm:col-span-2 flex flex-col gap-3">
              <label className={labelClass}>Votre projet en quelques lignes *</label>
              <textarea
                required
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Décrivez votre projet en quelques lignes *"
                rows={5}
                className="w-full px-3 py-4 bg-black/[0.04] border border-black/10 text-base text-black placeholder:text-black/32 focus:outline-none focus:border-black/32 transition-colors resize-none"
              />
            </div>
          </div>

          <label className="flex items-start gap-3 max-w-[390px] cursor-pointer">
            <input
              required
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-1 size-2 accent-black"
            />
            <span className="text-black/64 text-xs leading-relaxed">
              J&apos;accepte que mes données soient traitées dans le cadre de l&apos;examen de mon dossier.{" "}
              <a href="/mentions-legales" className="underline hover:text-black">
                Politique de confidentialité
              </a>
            </span>
          </label>

          {mutation.isError && (
            <p className="text-[#cf2538] text-sm">Une erreur est survenue, veuillez réessayer.</p>
          )}

          <button
            type="submit"
            disabled={!isComplete || mutation.isPending}
            className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-[#f29308] text-black font-mono text-sm uppercase tracking-wide transition-colors hover:bg-[#f29308]/85 disabled:opacity-40 disabled:cursor-not-allowed w-fit"
          >
            <span>{mutation.isPending ? "Envoi..." : "Envoyer"}</span>
            <ArrowLeft size={18} className="rotate-180" />
          </button>
        </form>
      </div>
    </section>
  );
}
