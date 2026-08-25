"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2.5 flex-wrap">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-3 px-3 py-2 border border-[#218da8] text-[#218da8] font-mono text-sm uppercase tracking-wide disabled:opacity-40 transition-opacity"
      >
        <CaretLeft size={16} />
        <span>Précédent</span>
      </button>

      {getPageNumbers(currentPage, totalPages).map((p, idx) =>
        p === "…" ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-2 border border-[#218da8] bg-[#218da8] text-white font-mono text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
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
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-3 px-3 py-2 bg-[#218da8] border border-[#218da8] text-white font-mono text-sm uppercase tracking-wide disabled:opacity-40 transition-opacity"
      >
        <span>Suivant</span>
        <CaretRight size={16} />
      </button>
    </div>
  );
}
