import Link from "next/link";
import Image from "next/image";
import { News } from "@/hooks/news/type";
import CtaArrow from "@/components/ui/CtaArrow";

interface NewsCardProps {
  item: News;
}

export default function NewsCard({ item }: NewsCardProps) {
  const image = typeof item.featuredImage === "object" ? item.featuredImage : undefined;

  return (
    <Link
      href={`/actualite/${item.slug}`}
      className="group flex flex-col border border-black/10 transition-colors hover:border-black/30"
    >
      <div className="relative h-[369px] w-full bg-black/5 overflow-hidden">
        {image?.url && (
          <Image
            src={image.url}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <div className="flex items-end gap-4 p-6">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase">
            {item.publishedAt && (
              <span className="text-[#218da8] tracking-wide">
                {new Date(item.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            <span className="text-[#878887]">{item.category || "Communiqué"}</span>
          </div>
          <p className="font-inter font-medium text-black text-base leading-snug line-clamp-3">{item.title}</p>
        </div>
        <div className="shrink-0 size-6 flex items-center justify-center border border-black/10 text-black transition-colors group-hover:border-black/30">
          <CtaArrow size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
