import KickerIcon from "@/components/ui/KickerIcon";
import RelatedArticleCard from "@/components/news/RelatedArticleCard";
import { News } from "@/hooks/news/type";

interface RelatedArticlesProps {
  current: News;
  allNews: News[];
}

export default function RelatedArticles({ current, allNews }: RelatedArticlesProps) {
  const related = allNews
    .filter((item) => item.id !== current.id)
    .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="bg-white dark:bg-[#0d0d0d] px-6 lg:px-10 pb-24 lg:pb-[120px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111] dark:text-white" />
          <span className="font-abel text-[#111] dark:text-white text-xl uppercase tracking-tight">A lire egalement</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {related.map((item) => (
            <RelatedArticleCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
