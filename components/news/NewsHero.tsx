"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CaretRight, CaretLeft } from "@phosphor-icons/react";
import CtaArrow from "@/components/ui/CtaArrow";
import { News } from "@/hooks/news/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";

interface NewsHeroProps {
  news: News[];
}

const FEATURED_COUNT = 5;

export default function NewsHero({ news }: NewsHeroProps) {
  const featured = [...news]
    .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())
    .slice(0, FEATURED_COUNT);

  const [index, setIndex] = useState(0);
  const article = featured[index];

  const goPrev = () => setIndex((i) => (i - 1 + featured.length) % featured.length);
  const goNext = () => setIndex((i) => (i + 1) % featured.length);

  const entity = article?.relatedSubsidiaries?.[0];
  const entityName = typeof entity === "object" ? (entity as Subsidiary)?.name : undefined;
  const image = typeof article?.featuredImage === "object" ? article.featuredImage : undefined;

  return (
    <section className="relative flex flex-col items-center px-6 lg:px-10 pt-[120px] pb-10 bg-gradient-to-b from-[rgba(13,13,13,0.8)] to-[#0d0d0d]">
      <div className="w-full max-w-[1280px] flex flex-col gap-10">
        <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
          <Link href="/" className="text-white/64 hover:text-white transition-colors">
            Accueil
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <span className="font-bold text-white">Actualités</span>
        </div>

        {article ? (
          <div className="flex flex-col lg:flex-row items-end gap-6 lg:gap-10">
            <div className="flex flex-col gap-20 w-full lg:w-[515px] shrink-0">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6 text-xl uppercase tracking-tight">
                  {article.publishedAt && (
                    <span className="font-abel text-[#f29308]">
                      {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  <span className="font-abel text-white">{article.category || "Communiqué"}</span>
                  {entityName && <span className="font-abel font-bold text-white">{entityName}</span>}
                </div>
                <h1 className="font-sans font-medium text-white text-4xl sm:text-[42px] leading-tight">
                  {article.title}
                </h1>
              </div>

              <div className="flex items-start justify-between gap-4">
                <Link
                  href={`/actualite/${article.slug}`}
                  className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-white text-black font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/90"
                >
                  <span>Lire l&apos;article</span>
                  <CtaArrow size={16} />
                </Link>

                {featured.length > 1 && (
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Article précédent"
                      className="flex items-center justify-center p-3 bg-white/24 border border-white/64 text-white transition-colors hover:bg-white/32"
                    >
                      <CaretLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Article suivant"
                      className="flex items-center justify-center p-3 bg-white/24 border border-white/64 text-white transition-colors hover:bg-white/32"
                    >
                      <CaretRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="relative w-full h-[280px] lg:h-[387px] flex-1 border border-white/12 overflow-hidden">
              {image?.url ? (
                <Image src={image.url} alt={article.title} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-l from-white/24 to-[#999]/0" />
              )}
            </div>
          </div>
        ) : (
          <p className="text-white/70 text-xl">Aucune publication pour le moment.</p>
        )}
      </div>
    </section>
  );
}
