"use client";

import ArticleHeader from "@/components/news/ArticleHeader";
import ArticleContent from "@/components/news/ArticleContent";
import FetchError from "@/components/errors";
import { newsQuery } from "@/hooks/news/newsQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function NewsArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLocaleStore();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", locale, slug],
    queryFn: () => newsQuery.getBySlug(slug, { locale }),
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[50vh] text-slate-400">
        {t("common.loading")}
      </div>
    );
  }

  if (error || !article) {
    return <FetchError error={error} data={article === null || article === undefined} />;
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <ArticleHeader article={article} />
      <ArticleContent article={article} />
    </article>
  );
}
