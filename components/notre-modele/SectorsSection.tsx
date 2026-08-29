"use client";

import Image from "next/image";
import { NotreModeleContent } from "@/hooks/notreModele/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface SectorsSectionProps {
  pageData?: NotreModeleContent | null;
}

const DEFAULT_SECTORS = [
  { title: "Restauration, Loisirs & Bien-être", description: "Marques de restauration et d'hôtellerie à fort potentiel de réplication régionale." },
  { title: "BTP & Ingénierie", description: "Bureaux d'études techniques et entreprises de construction certifiées." },
  { title: "Digital", description: "Éditeurs de logiciels et intégrateurs au service des entreprises du groupe et de leurs clients." },
  { title: "Service aux collectivités", description: "Prestataires mandatés par les communes et collectivités territoriales." },
  { title: "Bureau d'études", description: "Ingénierie technique certifiée ISO, au service des projets d'infrastructure." },
];

const DEFAULT_ZONES = ["Douala", "Yaoundé", "CEMAC"];

export default function SectorsSection({ pageData }: SectorsSectionProps) {
  const sectors = pageData?.sectorCards?.length ? pageData.sectorCards : DEFAULT_SECTORS;
  const zones = pageData?.interventionZones?.length
    ? pageData.interventionZones.map((z) => z.label)
    : DEFAULT_ZONES;
  const zonesImage = typeof pageData?.interventionZonesImage === "object" ? pageData.interventionZonesImage : undefined;

  return (
    <section id="secteurs" className="bg-white py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <KickerIcon className="text-black" />
            <span className="font-abel text-black text-xl uppercase tracking-tight">
              {pageData?.sectorsKicker || "Secteurs & géographies"}
            </span>
          </div>
          <p className="text-black/80 text-xl sm:text-2xl leading-relaxed lg:text-right lg:max-w-[566px]">
            {pageData?.sectorsIntro || "Cinq secteurs prioritaires, ancrés dans l'économie réelle camerounaise."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, idx) => (
            <div key={idx} className="border border-black/24 overflow-hidden flex flex-col">
              <div className="h-1 w-full bg-black" />
              <div className="p-6 flex flex-col gap-8">
                <span className="font-abel text-black text-xs uppercase tracking-[1px]">{sector.title}</span>
                <p className="text-black/80 text-base leading-relaxed">{sector.description}</p>
              </div>
            </div>
          ))}

          <div className="relative overflow-hidden flex items-end gap-2.5 p-6 min-h-[240px] sm:min-h-0">
            {zonesImage?.url ? (
              <Image src={zonesImage.url} alt="" fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-[#0d0d0d]" />
            )}
            <span className="absolute top-6 right-6 backdrop-blur-md bg-white/12 border border-white/12 px-4 py-2.5 text-sm font-bold text-white">
              Zone d&apos;intervention
            </span>
            {zones.map((zone) => (
              <span
                key={zone}
                className="relative backdrop-blur-md bg-white/12 border border-white/12 px-4 py-2.5 text-sm font-medium text-white"
              >
                {zone}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
