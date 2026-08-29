"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import KickerIcon from "@/components/ui/KickerIcon";
import Pagination from "@/components/ui/Pagination";
import { CarrieresPageContent } from "@/hooks/carrieres/type";
import { JobOpening } from "@/hooks/jobOpenings/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import { getJobOpeningSlug } from "@/lib/jobOpeningSlug";

interface OpenPositionsSectionProps {
  pageData?: CarrieresPageContent | null;
  jobs: JobOpening[];
}

const PER_PAGE = 6;

function formatDate(date?: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function OpenPositionsSection({ pageData, jobs }: OpenPositionsSectionProps) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(jobs.length / PER_PAGE)), [jobs.length]);
  const currentPage = Math.min(page, totalPages);
  const pageItems = jobs.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <section id="nos-offres" className="bg-white dark:bg-[#0d0d0d] py-16 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div className="flex items-center gap-4">
            <KickerIcon className="text-[#111] dark:text-white" />
            <span className="font-abel text-[#111] dark:text-white text-xl uppercase tracking-tight">
              {pageData?.offersKicker || "Nos offres"}
            </span>
          </div>
          <p className="text-black/80 dark:text-white/80 text-base max-w-[500px]">
            {pageData?.offersIntro ||
              "Consultez les postes ouverts dans les entités du groupe et candidatez directement."}
          </p>
        </div>

        <h3 className="font-sans text-[#111] dark:text-white text-2xl">
          {pageData?.offersHeading || "Offres ouvertes dans le groupe"}
        </h3>

        {pageItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((job) => {
              const entity =
                typeof job.relatedSubsidiary === "object" ? (job.relatedSubsidiary as Subsidiary) : undefined;
              const published = formatDate(job.publishedAt);
              const deadline = formatDate(job.applicationDeadline);
              return (
                <Link
                  key={job.id}
                  href={`/carrieres/${getJobOpeningSlug(job)}`}
                  className="border border-black/24 dark:border-white/24 p-6 flex flex-col gap-6 transition-colors hover:border-black/40 dark:hover:border-white/40"
                >
                  {published && (
                    <span className="text-black dark:text-white text-[10px] uppercase tracking-wide">Publiée le {published}</span>
                  )}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-sans text-[#111] dark:text-white text-lg leading-snug">{job.title}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-black/80 dark:text-white/80">
                      {entity && <span>{entity.name}</span>}
                      {job.contractType && (
                        <>
                          <span>·</span>
                          <span>{job.contractType}</span>
                        </>
                      )}
                      {job.location && (
                        <>
                          <span>·</span>
                          <span>{job.location}</span>
                        </>
                      )}
                    </div>
                    <p className="text-black/80 dark:text-white/80 text-sm leading-relaxed">{job.description}</p>
                  </div>
                  {deadline && <span className="text-black dark:text-white text-xs">Date limite : {deadline}</span>}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-6 text-black/40 dark:text-white/40 border border-black/10 dark:border-white/10">
            Aucune offre ouverte pour le moment.
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </section>
  );
}
