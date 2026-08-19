"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocaleStore } from "@/store/localeStore";
import { News } from "@/hooks/news/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface NewsSectionProps {
  subsidiary: Subsidiary;
  news: News[];
}

export default function NewsSection({ subsidiary, news }: NewsSectionProps) {
  const { locale } = useLocaleStore();

  const related = news.filter((item) =>
    (item.relatedSubsidiaries || []).some((ref) =>
      typeof ref === "object" ? ref?.id === subsidiary.id : ref === subsidiary.id,
    ),
  );

  return (
    <section className="bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-white" />
          <span className="font-abel text-white text-xl uppercase tracking-tight">
            Actualités de cette participation
          </span>
        </div>

        {related.length === 0 ? (
          <div className="text-center py-16 px-6 text-white/40 border border-white/10">
            Aucune actualité liée à cette participation pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {related.slice(0, 3).map((item) => {
              const image = typeof item.featuredImage === "object" ? item.featuredImage : undefined;
              return (
                <Link key={item.id} href={`/actualite/${item.slug}`} className="group flex flex-col">
                  <div className="relative h-[369px] w-full bg-white/5 overflow-hidden">
                    {image?.url && (
                      <Image
                        src={image.url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="flex items-end gap-6 px-4 py-8 border-b border-white/10">
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="flex items-center gap-6 font-mono text-[10px] uppercase">
                        {item.publishedAt && (
                          <span className="text-[#218da8] tracking-[1px]">
                            {new Date(item.publishedAt).toLocaleDateString(locale, {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        )}
                        <span className="text-[#878887]">{item.category || "Communiqué"}</span>
                      </div>
                      <p className="font-inter font-medium text-white text-lg leading-snug tracking-tight line-clamp-3">
                        {item.title}
                      </p>
                    </div>
                    <div className="shrink-0 size-6 flex items-center justify-center border border-white/10 text-white" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
