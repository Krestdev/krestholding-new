import Image from "next/image";
import { LinkedinLogo, XLogo, ArrowUpRight } from "@phosphor-icons/react";
import { ContactInfo } from "@/hooks/contact/type";
import { NotreModeleContent } from "@/hooks/notreModele/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface HeadquartersSectionProps {
  contactData?: ContactInfo | null;
  notreModeleData?: NotreModeleContent | null;
}

const DEFAULT_ZONES = ["Douala", "Yaoundé", "CEMAC"];

export default function HeadquartersSection({ contactData, notreModeleData }: HeadquartersSectionProps) {
  const address = contactData?.legalName || contactData?.physicalAddress || "à compléter";
  const phone = contactData?.phones?.[0]?.phone || "à compléter";
  const email = contactData?.emails?.[0]?.email || "hello@krestholding.com";
  const hours = contactData?.openingHours || "Lun — Ven, 8h — 17h (WAT)";

  const rows = [
    { label: "Adresse", value: address },
    { label: "Téléphone", value: phone },
    { label: "Courriel général", value: email },
  ];

  const zonesImage =
    typeof notreModeleData?.interventionZonesImage === "object" ? notreModeleData.interventionZonesImage : undefined;
  const zones = notreModeleData?.interventionZones?.length
    ? notreModeleData.interventionZones.map((z) => z.label)
    : DEFAULT_ZONES;

  return (
    <section className="bg-white dark:bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-black dark:text-white" />
          <span className="font-abel text-black dark:text-white text-xl uppercase tracking-tight">Coordonnées & siège</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <h2 className="font-sans text-black dark:text-white text-3xl sm:text-[32px] leading-tight tracking-tight max-w-[512px]">
            Notre siège social
          </h2>
          <p className="text-black/90 dark:text-white/90 text-lg sm:text-xl leading-snug max-w-[514px]">
            Une phrase sur trois lignes qui donne brièvement l&apos;idée entreprise affiché sur cette page, de
            ce côté.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="border border-black/24 dark:border-white/24 flex flex-col">
            {rows.map((row, idx) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-4 p-6 ${idx % 2 === 0 ? "bg-black/[0.12] dark:bg-white/[0.12]" : ""}`}
              >
                <span className="text-black/64 dark:text-white/64 text-base">{row.label}</span>
                <span className="text-black dark:text-white text-base text-right">{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 p-6 bg-black/[0.12] dark:bg-white/[0.12]">
              <span className="text-black/64 dark:text-white/64 text-base">Nos réseaux sociaux</span>
              <div className="flex items-center gap-4">
                {contactData?.linkedinUrl && (
                  <a href={contactData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white">
                    <LinkedinLogo size={24} />
                  </a>
                )}
                {contactData?.twitterUrl && (
                  <a href={contactData.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-black dark:text-white">
                    <XLogo size={24} />
                  </a>
                )}
                {!contactData?.linkedinUrl && !contactData?.twitterUrl && (
                  <>
                    <LinkedinLogo size={24} className="text-black/32 dark:text-white/32" />
                    <XLogo size={24} className="text-black/32 dark:text-white/32" />
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 p-6">
              <span className="text-black/64 dark:text-white/64 text-base">Horaires</span>
              <span className="text-black dark:text-white text-base text-right">{hours}</span>
            </div>
          </div>

          <div className="relative min-h-[320px] flex flex-col justify-end gap-4 p-6 overflow-hidden">
            {zonesImage?.url ? (
              <Image src={zonesImage.url} alt="" fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-black/[0.04] dark:bg-white/[0.04]" />
            )}
            <span className="absolute top-6 right-6 backdrop-blur-md bg-black/32 border border-black/12 dark:border-white/12 px-4 py-2.5 text-sm font-medium text-black dark:text-white">
              Zone d&apos;intervention
            </span>
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2.5">
                {zones.map((zone) => (
                  <span
                    key={zone}
                    className="backdrop-blur-md bg-black/32 border border-black/12 dark:border-white/12 px-4 py-2.5 text-sm font-medium text-black dark:text-white uppercase tracking-wide"
                  >
                    {zone}
                  </span>
                ))}
              </div>
              {contactData?.directionsUrl && (
                <a
                  href={contactData.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 backdrop-blur-md bg-black/32 border border-black/12 dark:border-white/12 px-4 py-2.5 text-sm font-medium text-black dark:text-white uppercase tracking-wide shrink-0"
                >
                  <span>Itinéraire</span>
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
