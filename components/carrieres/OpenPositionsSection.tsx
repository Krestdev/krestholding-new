"use client";

import { useMemo, useState } from "react";
import KickerIcon from "@/components/ui/KickerIcon";
import Pagination from "@/components/ui/Pagination";
import { CarrieresPageContent } from "@/hooks/carrieres/type";
import { JobOpening } from "@/hooks/jobOpenings/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";

interface OpenPositionsSectionProps {
  pageData?: CarrieresPageContent | null;
  jobs: JobOpening[];
}

const PER_PAGE = 6;

const DEFAULT_JOBS: JobOpening[] = [
  {
    id: -1,
    title: "Chef de projet BTP Senior",
    contractType: "CDI",
    location: "Douala",
    description:
      "Pilotage de chantiers, coordination des équipes techniques et suivi budgétaire des projets BTP.",
    publishedAt: new Date().toISOString(),
    applicationDeadline: new Date().toISOString(),
  },
  {
    id: -2,
    title: "Responsable R&D Logiciel",
    contractType: "CDI",
    location: "Yaoundé",
    description:
      "Conception et développement des applications métier internes du groupe.",
    publishedAt: new Date().toISOString(),
    applicationDeadline: new Date().toISOString(),
  },
  {
    id: -3,
    title: "Directeur de Restaurant",
    contractType: "CDI",
    location: "Yaoundé",
    description:
      "Gestion opérationnelle et animation d'équipe pour un établissement de restauration premium.",
    publishedAt: new Date().toISOString(),
    applicationDeadline: new Date().toISOString(),
  },
];

function formatDate(date?: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function OpenPositionsSection({
  pageData,
  jobs,
}: OpenPositionsSectionProps) {
  const [page, setPage] = useState(1);
  const items = jobs.length ? jobs : DEFAULT_JOBS;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / PER_PAGE)),
    [items.length],
  );
  const currentPage = Math.min(page, totalPages);
  const pageItems = items.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  return (
    <section
      id="nos-offres"
      className="bg-white py-16 lg:py-[120px] px-6 lg:px-10"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div className="flex items-center gap-4">
            <KickerIcon className="text-[#111]" />
            <span className="font-abel text-[#111] text-xl uppercase tracking-tight">
              {pageData?.offersKicker || "Nos offres"}
            </span>
          </div>
          <p className="text-black/64 text-base max-w-[500px]">
            {pageData?.offersIntro ||
              "Consultez les postes ouverts dans les entités du groupe et candidatez directement."}
          </p>
        </div>

        <h3 className="font-sans text-[#111] text-2xl">
          {pageData?.offersHeading || "Offres ouvertes dans le groupe"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((job) => {
            const entity =
              typeof job.relatedSubsidiary === "object"
                ? (job.relatedSubsidiary as Subsidiary)
                : undefined;
            const published = formatDate(job.publishedAt);
            const deadline = formatDate(job.applicationDeadline);
            return (
              <div
                key={job.id}
                className="border border-black/10 p-6 flex flex-col gap-6"
              >
                {published && (
                  <span className="text-black/40 text-[10px] uppercase tracking-wide">
                    Publiée le {published}
                  </span>
                )}
                <div className="flex flex-col gap-3">
                  <h4 className="font-sans text-[#111] text-lg leading-snug">
                    {job.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-black/64">
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
                  <p className="text-black/64 text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>
                {deadline && (
                  <span className="text-black/40 text-xs">
                    Date limite : {deadline}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}
