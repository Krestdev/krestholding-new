"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretRight, Check } from "@phosphor-icons/react";
import { JobOpening } from "@/hooks/jobOpenings/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import CtaArrow from "@/components/ui/CtaArrow";

interface JobDetailHeroProps {
  job: JobOpening;
}

function formatDate(date?: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function JobDetailHero({ job }: JobDetailHeroProps) {
  const [copied, setCopied] = useState(false);
  const entity = typeof job.relatedSubsidiary === "object" ? (job.relatedSubsidiary as Subsidiary) : undefined;
  const published = formatDate(job.publishedAt);

  const tags = [job.contractType, job.location, job.workTime, published ? `Publié le ${published}` : null].filter(
    (t): t is string => Boolean(t),
  );

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(typeof window !== "undefined" ? window.location.href : "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <section className="relative flex flex-col items-center px-6 lg:px-10 pt-[120px] pb-10 overflow-hidden bg-[#4595a8] dark:bg-[#0d0d0d]">
      <div className="absolute inset-0 pointer-events-none dark:bg-gradient-to-b dark:from-[rgba(13,13,13,0.8)] dark:to-[#0d0d0d]" />
      <div className="relative w-full max-w-[1280px] flex flex-col gap-10">
        <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
          <Link href="/" className="text-white dark:text-white/64 hover:text-white transition-colors">
            Accueil
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <Link href="/carrieres" className="text-white hover:text-white/70 transition-colors">
            Carrières
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <span className="font-bold text-white truncate max-w-[200px]">{job.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="flex flex-col gap-6 max-w-[624px]">
            {entity && (
              <div className="flex items-center gap-3 text-sm uppercase tracking-wide">
                <span className="font-abel text-[#f29308]">{entity.name}</span>
                <span className="text-white/32">|</span>
                <span className="font-abel text-white/64">{entity.category}</span>
              </div>
            )}
            <h1 className="font-sans font-medium text-white text-4xl sm:text-5xl leading-tight">{job.title}</h1>

            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="border border-white/16 px-4 py-2.5 text-white text-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#candidature-spontanee"
                className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-[#f29308] text-white dark:text-black font-mono text-sm uppercase tracking-wide transition-colors hover:bg-[#f29308]/85"
              >
                <span>Postuler</span>
                <CtaArrow size={18} />
              </a>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2.5 px-6 py-3 border border-white/32 text-white font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/10"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>Copié !</span>
                  </>
                ) : (
                  <span>Partager</span>
                )}
              </button>
            </div>
          </div>

          <div className="border border-white dark:border-white/32 w-full lg:w-[360px] shrink-0 flex flex-col">
            <div className="border-b border-dashed border-white dark:border-white/32 p-4">
              <span className="font-abel text-white text-xs uppercase tracking-wide">Résumé</span>
            </div>
            {[
              ["Entité", entity?.name || "—"],
              ["Contrat", job.contractType || "—"],
              ["Lieu", job.location || "—"],
              ["Expérience", job.experienceLevel || "—"],
              ["Rémunération", job.compensation || "À trancher"],
            ].map(([label, value], idx, arr) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-4 px-4 py-3 ${idx < arr.length - 1 ? "border-b border-dashed border-white dark:border-white/32" : ""}`}
              >
                <span className="text-white/64 text-sm">{label}</span>
                <span className="text-white text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
