"use client";

import { useState } from "react";
import { LinkedinLogo, XLogo, LinkSimple, Envelope } from "@phosphor-icons/react";
import { News } from "@/hooks/news/type";
import RichTextRenderer from "@/components/ui/RichTextRenderer";

interface ArticleBodyProps {
  article: News;
}

export default function ArticleBody({ article }: ArticleBodyProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => (typeof window !== "undefined" ? window.location.href : "");

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(article.title)}`,
    mail: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(getUrl())}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <section className="bg-white dark:bg-[#0d0d0d] px-6 lg:px-10 py-24 lg:py-[120px]">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 max-w-[840px] flex flex-col gap-16">
          <RichTextRenderer data={article.content} />

          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-black/32 dark:border-white/32">
            <span className="text-[#111] dark:text-white text-sm">Partager cette page :</span>

            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#111] dark:text-white text-sm hover:opacity-70 transition-opacity"
            >
              <span>LinkedIn</span>
              <LinkedinLogo size={16} />
            </a>

            <a
              href={shareLinks.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#111] dark:text-white text-sm hover:opacity-70 transition-opacity"
            >
              <span>X</span>
              <XLogo size={16} />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 text-[#111] dark:text-white text-sm hover:opacity-70 transition-opacity"
            >
              <span>{copied ? "Copié !" : "Copier le lien"}</span>
              <LinkSimple size={16} />
            </button>

            <a
              href={shareLinks.mail}
              className="inline-flex items-center gap-2 text-[#111] dark:text-white text-sm hover:opacity-70 transition-opacity"
            >
              <span>Envoyer par courriel</span>
              <Envelope size={16} />
            </a>
          </div>
        </div>

        <div className="hidden lg:block w-[408px] shrink-0 bg-[#d9d9d9] dark:bg-white/[0.08] min-h-[600px]" />
      </div>
    </section>
  );
}
