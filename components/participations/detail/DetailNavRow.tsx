import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import { getSubsidiarySlug } from "@/lib/subsidiarySlug";

interface DetailNavRowProps {
  subsidiary: Subsidiary;
  allSubsidiaries: Subsidiary[];
}

export default function DetailNavRow({ subsidiary, allSubsidiaries }: DetailNavRowProps) {
  const ordered = [...allSubsidiaries].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.id - b.id,
  );
  const currentIndex = ordered.findIndex((s) => s.id === subsidiary.id);
  const previous = currentIndex > 0 ? ordered[currentIndex - 1] : ordered[ordered.length - 1];
  const next = currentIndex >= 0 && currentIndex < ordered.length - 1 ? ordered[currentIndex + 1] : ordered[0];
  const hasOthers = ordered.length > 1;

  return (
    <section className="bg-[#218da8] dark:bg-white/10">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-stretch justify-between gap-4 px-6 lg:px-10 py-10 lg:py-20">
        {hasOthers && previous ? (
          <Link
            href={`/partenaires/${getSubsidiarySlug(previous)}`}
            className="flex-1 inline-flex items-center justify-center gap-3 border border-white/32 px-8 py-8 text-white font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/10"
          >
            <CaretLeft size={20} />
            <span>{previous.name}</span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        <Link
          href="/partenaires"
          className="flex-1 inline-flex items-center justify-center bg-[#f29308] px-8 py-8 text-[#010101] font-mono text-sm uppercase tracking-wide transition-colors hover:bg-[#f29308]/85"
        >
          Retour au portefeuille
        </Link>

        {hasOthers && next ? (
          <Link
            href={`/partenaires/${getSubsidiarySlug(next)}`}
            className="flex-1 inline-flex items-center justify-center gap-3 border border-white/32 px-8 py-8 text-white font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/10"
          >
            <span>{next.name}</span>
            <CaretRight size={20} />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </section>
  );
}
