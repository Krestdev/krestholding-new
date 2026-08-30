import { News } from "@/hooks/news/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import KickerIcon from "@/components/ui/KickerIcon";
import SubsidiarySummaryCard from "@/components/ui/SubsidiarySummaryCard";

interface RelatedSubsidiaryCardProps {
  article: News;
}

export default function RelatedSubsidiaryCard({
  article,
}: RelatedSubsidiaryCardProps) {
  const ref = article.relatedSubsidiaries?.[0];
  const subsidiary = typeof ref === "object" ? (ref as Subsidiary) : undefined;

  if (!subsidiary) return null;

  return (
    <section className="bg-white dark:bg-[#0d0d0d] px-6 lg:px-10 pb-24 lg:pb-[120px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111] dark:text-white" />
          <span className="font-abel text-[#111] dark:text-white text-xl uppercase tracking-tight">
            Cette actualité concerne
          </span>
        </div>

        <SubsidiarySummaryCard subsidiary={subsidiary} />
      </div>
    </section>
  );
}
