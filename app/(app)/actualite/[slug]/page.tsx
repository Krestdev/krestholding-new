"use client";

import ArticleHero from "@/components/news/ArticleHero";
import ArticleBody from "@/components/news/ArticleBody";
import RelatedSubsidiaryCard from "@/components/news/RelatedSubsidiaryCard";
import RelatedArticles from "@/components/news/RelatedArticles";
import PressNewsletterBanner from "@/components/news/PressNewsletterBanner";
import FetchError from "@/components/errors";
import { newsQuery } from "@/hooks/news/newsQuery";
import { actualitesQuery } from "@/hooks/actualites/actualitesQuery";
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

  const { data: allNews } = useQuery({
    queryKey: ["news", locale, "all"],
    queryFn: () => newsQuery.get({ locale }),
  });

  const { data: pageData } = useQuery({
    queryKey: ["actualites", locale],
    queryFn: () => actualitesQuery.getBlobal({ locale }),
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
    <div className="bg-white dark:bg-[#0d0d0d] -mt-[81px]">
      <ArticleHero article={article} />
      <ArticleBody article={article} />
      <RelatedSubsidiaryCard article={article} />
      <RelatedArticles current={article} allNews={allNews ?? []} />
      <PressNewsletterBanner pageData={pageData} />
    </div>
  );
}
