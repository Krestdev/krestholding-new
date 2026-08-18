"use client";

import { News } from "@/hooks/news/type";
import { HomePageContent } from "@/hooks/home/type";
import { useLocaleStore } from "@/store/localeStore";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "@phosphor-icons/react";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";

interface NewsSectionProps {
  news: News[];
  newsCalloutText?: string | null;
  homeData?: HomePageContent | null;
}

export default function NewsSection({ news, newsCalloutText, homeData }: NewsSectionProps) {
  const { locale } = useLocaleStore();

  return (
    <section className="bg-white py-24 lg:py-[120px] px-6 lg:px-10 border-b border-black/10">
      <div className="max-w-[1277px] mx-auto flex flex-col gap-20">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex items-center gap-3 lg:w-[340px] shrink-0">
            <KickerIcon className="text-black" />
            <span className="font-mono text-black text-xl uppercase tracking-tight">
              {homeData?.newsKicker || "Actualités"}
            </span>
          </div>
          <h2 className="font-sans text-black text-3xl sm:text-4xl leading-tight max-w-2xl">
            {newsCalloutText || homeData?.newsHeading || "Suivez les temps forts et communiqués du groupe KREST HOLDING."}
          </h2>
        </div>

        {news.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
            {news.map((item) => {
              const image = typeof item.featuredImage === "object" ? item.featuredImage : undefined;
              return (
                <Link key={item.id} href={`/actualite/${item.slug}`} className="group flex flex-col border border-black/10">
                  <div className="relative h-[280px] w-full bg-black/5 overflow-hidden">
                    {image?.url ? (
                      <Image src={image.url} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-black/20">
                        <Newspaper size={32} />
                      </div>
                    )}
                  </div>

                  <div className="flex items-end gap-4 p-6">
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="flex items-center gap-4 font-mono text-[10px] uppercase">
                        {item.publishedAt && (
                          <span className="text-[#218da8] tracking-wide">
                            {new Date(item.publishedAt).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        )}
                        <span className="text-[#878887]">{item.category || "Communiqué"}</span>
                      </div>
                      <p className="font-inter font-medium text-black text-base leading-snug line-clamp-3">{item.title}</p>
                    </div>
                    <div className="shrink-0 size-6 flex items-center justify-center border border-black/10 text-black">
                      <CtaArrow size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-6 text-black/40 border border-black/10">Aucune actualité pour le moment.</div>
        )}
      </div>
    </section>
  );
}
