import { ArrowUpRight } from "@phosphor-icons/react";
import { ContactInfo } from "@/hooks/contact/type";

interface LegalSectionProps {
  contactData?: ContactInfo | null;
}

export default function LegalSection({ contactData }: LegalSectionProps) {
  const legalName = contactData?.legalName || "KREST HOLDING";
  const rccm = contactData?.rccmNumber;
  const taxpayerNumber = contactData?.taxpayerNumber;
  const legalNoticeUrl = contactData?.legalNoticeUrl || "/mentions-legales";

  return (
    <section className="bg-white dark:bg-[#0d0d0d] pb-24 lg:pb-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <h2 className="font-sans text-black dark:text-white text-3xl sm:text-[32px] leading-tight tracking-tight">
          Identification légale
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col gap-12">
            <span className="font-abel text-[#f29308] text-base tracking-[1px] uppercase">Raison sociale</span>
            <span className="text-black dark:text-white text-xl underline">{legalName}</span>
          </div>

          <div className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col gap-12">
            <span className="font-abel text-[#f29308] text-base tracking-[1px] uppercase">RCCM</span>
            <span className={rccm ? "text-black dark:text-white text-xl" : "italic text-black/64 dark:text-white/64 text-xl"}>
              {rccm || "À compléter"}
            </span>
          </div>

          <div className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col gap-12">
            <span className="font-abel text-[#f29308] text-base tracking-[1px] uppercase">N° Contribuable</span>
            <span className={taxpayerNumber ? "text-black dark:text-white text-xl" : "italic text-black/64 dark:text-white/64 text-xl"}>
              {taxpayerNumber || "À compléter"}
            </span>
          </div>

          <div className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col justify-between gap-12">
            <span className="font-abel text-[#f29308] text-base tracking-[1px] uppercase">Mentions légales</span>
            <a
              href={legalNoticeUrl}
              className="inline-flex items-center justify-between gap-3 bg-black/24 dark:bg-white/24 border border-black/64 dark:border-white/64 px-3 py-2 text-black/90 dark:text-white/90 font-mono text-sm uppercase tracking-wide transition-colors hover:bg-black/32 dark:hover:bg-white/32 w-fit"
            >
              <span>Consulter</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
