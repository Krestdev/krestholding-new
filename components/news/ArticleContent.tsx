import { News } from "@/hooks/news/type";
import Image from "next/image";

interface ArticleContentProps {
  article: News;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const featuredImage = typeof article.featuredImage === "object" ? article.featuredImage : undefined;

  return (
    <>
      {featuredImage?.url && (
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || article.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-invert prose-indigo max-w-none text-slate-300 leading-relaxed">
        {article.content ? (
          typeof article.content === "string" ? (
            <p>{article.content}</p>
          ) : (
            <p>Contenu de l&apos;article chargé dynamiquement depuis Payload CMS.</p>
          )
        ) : (
          <p>Aucun contenu additionnel rédigé.</p>
        )}
      </div>
    </>
  );
}
