import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import { getSubsidiarySlug } from "@/lib/subsidiarySlug";

interface SubsidiarySummaryCardProps {
  subsidiary: Subsidiary;
}

export default function SubsidiarySummaryCard({ subsidiary }: SubsidiarySummaryCardProps) {
  const logo = typeof subsidiary.logo === "object" ? subsidiary.logo : undefined;

  return (
    <div className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
      <div className="flex items-center gap-6">
        <div className="h-[92px] w-[166px] bg-[#d9d9d9] flex items-center justify-center shrink-0">
          {logo?.url ? (
            <Image
              src={logo.url}
              alt={subsidiary.name}
              width={166}
              height={92}
              className="h-full w-full object-contain p-3"
            />
          ) : (
            <span className="font-abel text-black dark:text-white text-xl uppercase">Logo</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-abel text-black dark:text-white text-base tracking-[1px] uppercase">{subsidiary.category}</span>
          <span className="font-sans font-bold text-black dark:text-white text-xl">{subsidiary.name}</span>
          {subsidiary.shortDescription && (
            <p className="text-black/80 dark:text-white/80 text-base leading-relaxed max-w-[407px]">{subsidiary.shortDescription}</p>
          )}
        </div>
      </div>

      <Link
        href={`/partenaires/${getSubsidiarySlug(subsidiary)}`}
        className="inline-flex items-center gap-2 bg-black/24 dark:bg-white/24 border border-black/64 dark:border-white/64 px-3 py-2 text-black/90 dark:text-white/90 font-mono text-sm uppercase tracking-wide transition-colors hover:bg-black/32 dark:hover:bg-white/32 shrink-0"
      >
        <span>Voir la fiche</span>
        <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}
