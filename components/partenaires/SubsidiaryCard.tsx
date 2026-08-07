import { Subsidiary } from "@/hooks/subsidiaries/type";
import { useLocaleStore } from "@/store/localeStore";
import Image from "next/image";

interface SubsidiaryCardProps {
  subsidiary: Subsidiary;
}

export default function SubsidiaryCard({ subsidiary }: SubsidiaryCardProps) {
  const { t } = useLocaleStore();
  const logo = typeof subsidiary.logo === "object" ? subsidiary.logo : undefined;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
            {subsidiary.category}
          </span>
          {logo?.url && (
            <Image
              src={logo.url}
              alt={subsidiary.name}
              width={80}
              height={40}
              className="h-10 w-auto object-contain"
            />
          )}
        </div>
        <h3 className="text-xl font-bold text-white">{subsidiary.name}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          {subsidiary.shortDescription || "Aucune description courte disponible."}
        </p>
      </div>

      {subsidiary.websiteUrl && (
        <div className="pt-6">
          <a
            href={subsidiary.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {t("partenaires.visitOfficialSite")} &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
