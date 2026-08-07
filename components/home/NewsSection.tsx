import { News } from "@/hooks/news/type";
import { useLocaleStore } from "@/store/localeStore";
import Image from "next/image";
import Link from "next/link";

interface NewsSectionProps {
  news: News[];
  newsCalloutText?: string | null;
}

export default function NewsSection({ news, newsCalloutText }: NewsSectionProps) {
  const { locale, t } = useLocaleStore();

  return (
    <section className="max-w-7xl mx-auto px-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">{t("home.newsTitle")}</h2>
          <p className="text-slate-400 mt-2">
            {newsCalloutText || "Restez informés des dernières nouveautés du groupe."}
          </p>
        </div>
      </div>

      {news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => {
            const image = typeof item.featuredImage === "object" ? item.featuredImage : undefined;
            return (
              <Link
                key={item.id}
                href={`/actualite/${item.slug}`}
                className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all shadow-md flex flex-col"
              >
                {image?.url && (
                  <div className="relative h-48 w-full bg-slate-800">
                    <Image
                      src={image.url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {item.publishedAt && (
                      <span className="text-xs text-slate-500">
                        {new Date(item.publishedAt).toLocaleDateString(locale)}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mt-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-3 mt-2">{item.excerpt}</p>
                  </div>
                  <span className="text-xs font-semibold text-indigo-400 group-hover:underline">
                    {t("home.readArticle")} &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
          {t("home.noNews")}
        </div>
      )}
    </section>
  );
}
