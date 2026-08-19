import Link from "next/link";
import { Subsidiary, SubsidiaryAccentColor } from "@/hooks/subsidiaries/type";
import CtaArrow from "@/components/ui/CtaArrow";
import { getSubsidiarySlug } from "@/lib/subsidiarySlug";

interface SubsidiaryCardProps {
  subsidiary: Subsidiary;
  theme?: "light" | "dark";
}

const ACCENT: Record<SubsidiaryAccentColor, { bar: string; text: string; border: string }> = {
  teal: { bar: "bg-[#218da8]", text: "text-[#218da8]", border: "border-[#218da8]/24" },
  red: { bar: "bg-[#cf2538]", text: "text-[#cf2538]", border: "border-[#cf2538]/24" },
  orange: { bar: "bg-[#f29308]", text: "text-[#f29308]", border: "border-[#f29308]/24" },
  gray: { bar: "bg-[#4d5766]", text: "text-[#4d5766]", border: "border-[#4d5766]/24" },
};

export default function SubsidiaryCard({ subsidiary, theme = "light" }: SubsidiaryCardProps) {
  const accent = ACCENT[subsidiary.accentColor || "teal"];
  const isDark = theme === "dark";
  const titleColor = isDark ? "text-white" : "text-[#111]";
  const bodyColor = isDark ? "text-white/80" : "text-[rgba(17,17,17,0.8)]";
  const dividerColor = isDark ? "border-white/[0.06]" : "border-[rgba(17,17,17,0.06)]";

  return (
    <Link
      href={`/partenaires/${getSubsidiarySlug(subsidiary)}`}
      className={`group border ${accent.border} overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1`}
    >
      <div className={`h-1 w-full ${accent.bar}`} />
      <div className="p-6 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-3">
            <span className={`font-abel text-xs uppercase tracking-[1px] ${accent.text}`}>
              {subsidiary.category}
            </span>
            <h3 className={`font-sans text-xl ${titleColor}`}>{subsidiary.name}</h3>
          </div>
          <div className="h-14 w-[108px] shrink-0 bg-[#d9d9d9]" />
        </div>

        <div className="flex items-center gap-3 text-xs">
          {subsidiary.participationLabel && (
            <span className={bodyColor}>
              Participation : <span className={`${titleColor} font-medium`}>{subsidiary.participationLabel}</span>
            </span>
          )}
          {subsidiary.entryYear && (
            <>
              <span className="text-[#4d5766]">·</span>
              <span className={bodyColor}>
                Entrée <span className={titleColor}>{subsidiary.entryYear}</span>
              </span>
            </>
          )}
        </div>

        <p className={`${bodyColor} text-base leading-relaxed`}>{subsidiary.shortDescription}</p>

        <div className={`flex items-center justify-between pt-4 border-t ${dividerColor}`}>
          <span className={`${bodyColor} text-xs`}>Voir la fiche</span>
          <CtaArrow
            size={14}
            className={`${accent.text} transition-transform duration-300 group-hover:translate-x-1`}
          />
        </div>
      </div>
    </Link>
  );
}
