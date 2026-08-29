import { JobOpening } from "@/hooks/jobOpenings/type";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import KickerIcon from "@/components/ui/KickerIcon";
import SubsidiarySummaryCard from "@/components/ui/SubsidiarySummaryCard";

interface CompanySectionProps {
  job: JobOpening;
}

export default function CompanySection({ job }: CompanySectionProps) {
  const subsidiary = typeof job.relatedSubsidiary === "object" ? (job.relatedSubsidiary as Subsidiary) : undefined;

  if (!subsidiary) return null;

  return (
    <section className="bg-white px-6 lg:px-10 py-16 lg:py-[80px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111]" />
          <span className="font-abel text-[#111] text-xl uppercase tracking-tight">L&apos;entreprise qui recrute</span>
        </div>

        <SubsidiarySummaryCard subsidiary={subsidiary} />
      </div>
    </section>
  );
}
