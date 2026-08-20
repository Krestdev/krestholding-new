"use client";

import { useMemo, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import KickerIcon from "@/components/ui/KickerIcon";
import NewsCard from "@/components/news/NewsCard";
import { News } from "@/hooks/news/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import { ActualitesPageContent } from "@/hooks/actualites/type";

interface PublicationsSectionProps {
  news: News[];
  pageData?: ActualitesPageContent | null;
}

const PER_PAGE = 8;
const ALL = "__all__";

function relatedNames(item: News): string[] {
  return (item.relatedSubsidiaries || [])
    .map((ref) => (typeof ref === "object" ? (ref as Subsidiary)?.name : undefined))
    .filter((n): n is string => Boolean(n));
}

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: (number | "…")[] = [];
  sorted.forEach((p, idx) => {
    if (idx > 0 && p - (sorted[idx - 1] as number) > 1) result.push("…");
    result.push(p);
  });
  return result;
}

export default function PublicationsSection({ news, pageData }: PublicationsSectionProps) {
  const [category, setCategory] = useState(ALL);
  const [entity, setEntity] = useState(ALL);
  const [year, setYear] = useState(ALL);
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => Array.from(new Set(news.map((n) => n.category).filter((c): c is string => Boolean(c)))),
    [news],
  );
  const entities = useMemo(
    () => Array.from(new Set(news.flatMap(relatedNames))),
    [news],
  );
  const years = useMemo(
    () =>
      Array.from(
        new Set(news.map((n) => (n.publishedAt ? new Date(n.publishedAt).getFullYear() : undefined)).filter((y): y is number => Boolean(y))),
      ).sort((a, b) => b - a),
    [news],
  );

  const filtered = useMemo(() => {
    return news.filter((item) => {
      if (category !== ALL && item.category !== category) return false;
      if (entity !== ALL && !relatedNames(item).includes(entity)) return false;
      if (year !== ALL) {
        const itemYear = item.publishedAt ? new Date(item.publishedAt).getFullYear() : undefined;
        if (String(itemYear) !== year) return false;
      }
      return true;
    });
  }, [news, category, entity, year]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const updateFilter = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
  };

  const selectClass =
    "bg-white border border-black/10 px-3 py-3 text-[13px] font-mono uppercase tracking-wide text-black focus:outline-none";

  return (
    <section className="bg-white py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111]" />
          <span className="font-abel text-[#111] text-xl uppercase tracking-tight">
            {pageData?.portfolioKicker || "Toutes nos publications"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={category}
              onChange={(e) => updateFilter(setCategory)(e.target.value)}
              className={selectClass}
            >
              <option value={ALL}>Toutes les catégories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select value={entity} onChange={(e) => updateFilter(setEntity)(e.target.value)} className={selectClass}>
              <option value={ALL}>Toutes les entités</option>
              {entities.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <select value={year} onChange={(e) => updateFilter(setYear)(e.target.value)} className={selectClass}>
              <option value={ALL}>Toutes les années</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[#111] text-xl">
            {filtered.length} publication{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {pageItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
            {pageItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 text-black/40 border border-black/10">
            Aucune publication ne correspond à ces filtres.
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-3 px-3 py-2 border border-[#218da8] text-[#218da8] font-mono text-sm uppercase tracking-wide disabled:opacity-40 transition-opacity"
            >
              <CaretLeft size={16} />
              <span>Précédent</span>
            </button>

            {getPageNumbers(currentPage, totalPages).map((p, idx) =>
              p === "…" ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-3 py-2 border border-[#218da8] bg-[#218da8] text-white font-mono text-sm"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`px-3 py-2 border border-[#218da8] font-mono text-sm transition-colors ${
                    p === currentPage ? "bg-[#218da8] text-white" : "text-[#218da8] hover:bg-[#218da8]/10"
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-3 px-3 py-2 bg-[#218da8] border border-[#218da8] text-white font-mono text-sm uppercase tracking-wide disabled:opacity-40 transition-opacity"
            >
              <span>Suivant</span>
              <CaretRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
