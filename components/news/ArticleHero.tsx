import Link from "next/link";
import Image from "next/image";
import { CaretRight } from "@phosphor-icons/react";
import { News } from "@/hooks/news/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import { estimateReadingTime } from "@/lib/richText";

interface ArticleHeroProps {
  article: News;
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  const entity = article.relatedSubsidiaries?.[0];
  const entityName = typeof entity === "object" ? (entity as Subsidiary)?.name : undefined;
  const image = typeof article.featuredImage === "object" ? article.featuredImage : undefined;
  const readingTime = estimateReadingTime(article.content);

  return (
    <section className="relative flex flex-col items-center px-6 lg:px-10 pt-[120px] pb-10 bg-gradient-to-b from-[rgba(13,13,13,0.8)] to-[#0d0d0d]">
      <div className="w-full max-w-[1280px] flex flex-col gap-10">
        <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
          <Link href="/" className="text-white/64 hover:text-white transition-colors">
            Accueil
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <Link href="/actualite" className="text-white hover:text-white/70 transition-colors">
            Actualités
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <span className="font-bold text-white truncate max-w-[200px]">{article.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row items-end gap-6 lg:gap-6">
          <div className="flex flex-col gap-20 w-full lg:w-[515px] shrink-0">
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-6 text-xl uppercase tracking-tight">
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

              <div className="flex flex-col gap-8">
                <h1 className="font-sans font-medium text-white text-[32px] leading-tight">{article.title}</h1>
                {article.excerpt && (
                  <p className="text-white/80 text-2xl leading-relaxed">{article.excerpt}</p>
                )}
              </div>
            </div>

            <span className="font-abel text-white text-xl tracking-tight uppercase">
              {readingTime} min de lecture
            </span>
          </div>

          <div className="relative w-full h-[280px] lg:h-[387px] flex-1 border border-white/12 overflow-hidden">
            {image?.url ? (
              <Image src={image.url} alt={article.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-l from-white/24 to-[#999]/0" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
