import { News } from "@/hooks/news/type";
import { useLocaleStore } from "@/store/localeStore";
import Link from "next/link";

interface ArticleHeaderProps {
  article: News;
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  const { locale } = useLocaleStore();

  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        &larr; Retour à l&apos;accueil
      </Link>

      <header className="space-y-4">
        {article.publishedAt && (
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            {new Date(article.publishedAt).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">{article.title}</h1>
        {article.excerpt && (
          <p className="text-lg text-slate-300 leading-relaxed italic border-l-4 border-indigo-500 pl-4">
            {article.excerpt}
          </p>
        )}
      </header>
    </>
  );
}
