"use client";

import { useState } from "react";
import Image from "next/image";
import { Faq } from "@/hooks/faqs/type";
import { HomePageContent } from "@/hooks/home/type";
import { Plus, X } from "@phosphor-icons/react";
import RichTextRenderer from "@/components/ui/RichTextRenderer";
import RichTextRenderer from "@/components/ui/RichTextRenderer";

interface FaqSectionProps {
  faqs?: Faq[];
  homeData?: HomePageContent | null;
}

const DEFAULT_FAQS: Partial<Faq>[] = [
  {
    id: 1,
    question: "Quels types d'entreprises acceptez-vous ?",
    answer:
      "Des PME camerounaises rentables, dirigées par une équipe solide, avec un potentiel de croissance régionale démontré.",
  },
  { id: 2, question: "Prenez-vous des participations minoritaires ?" },
  { id: 3, question: "Financez-vous des projets à l'amorçage ?" },
  {
    id: 4,
    question: "Quel est le délai de réponse après soumission d'un dossier ?",
  },
];

export default function FaqSection({ faqs, homeData }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;
  const faqImage =
    typeof homeData?.faqImage === "object" ? homeData.faqImage : undefined;

  return (
    <section className="bg-white dark:bg-[#0d0d0d] border-b border-black/10 dark:border-white/10 px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-[340px] shrink-0 bg-[#f7f7f7] dark:bg-white/[0.04] flex items-center justify-center p-10">
          <div className="relative w-full h-[260px]">
            <Image
              src={faqImage?.url || "/visuel.png"}
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex-1">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.id ?? idx}
                className="border-b border-black/[0.05] dark:border-white/[0.08]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="group w-full flex items-start gap-6 sm:gap-20 p-6 sm:p-10 text-left transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
                >
                  <div className="flex-1 flex flex-col gap-4">
                    <h3 className="font-inter font-medium text-black dark:text-white text-lg sm:text-xl">
                      {item.question}
                    </h3>
                    {isOpen &&
                      item.answer &&
                      (typeof item.answer === "string" ? (
                        <p className="font-inter font-medium text-[#333] dark:text-white/70 text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      ) : (
                        <RichTextRenderer
                          data={item.answer}
                          className="font-inter text-[#333] dark:text-white/70 text-sm"
                        />
                      ))}
                  </div>
                  <div className="shrink-0 size-6 flex items-center justify-center border border-black/5 dark:border-white/10 mt-1 text-black dark:text-white transition-all duration-300 group-hover:border-black/30 dark:group-hover:border-white/30 group-hover:scale-110">
                    {isOpen ? <X size={16} /> : <Plus size={16} />}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
