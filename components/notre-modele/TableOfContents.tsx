"use client";

import { useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

const PILLS = [
  { label: "Thèse", mobileLabel: "Thèse", href: "#these" },
  { label: "Secteurs & géographies", mobileLabel: "Secteurs", href: "#secteurs" },
  { label: "Éligibilité & Processus", mobileLabel: "Processus", href: "#processus" },
  { label: "Les 5 pôles", mobileLabel: "Les 5 pôles", href: "#poles" },
];

export default function TableOfContents() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-[81px] z-40 bg-[#288fa5] dark:bg-[#0d0d0d] border-b border-white/10 px-6 lg:px-10 py-3 lg:py-4">
      <div className="max-w-[1280px] mx-auto">
        {/* Desktop: plain sticky pill row */}
        <div className="hidden lg:flex flex-wrap items-center gap-3">
          {PILLS.map((pill) => (
            <a
              key={pill.href}
              href={pill.href}
              className="bg-white/12 border border-white/12 px-4 py-2.5 text-sm font-medium text-white/64 hover:text-white hover:bg-white/16 transition-colors"
            >
              {pill.label}
            </a>
          ))}
        </div>

        {/* Mobile: collapsed accordion trigger */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex w-full items-center justify-between px-4 py-2.5 bg-white/12 border border-white/12 text-sm font-medium text-white"
          >
            <span>Sommaire</span>
            {open ? <CaretUp size={16} /> : <CaretDown size={16} />}
          </button>

          {open && (
            <div className="flex flex-col gap-2 pt-2">
              {PILLS.map((pill) => (
                <a
                  key={pill.href}
                  href={pill.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-white/64 bg-white/12 border border-white/12 hover:text-white hover:bg-white/16 transition-colors"
                >
                  {pill.mobileLabel}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
