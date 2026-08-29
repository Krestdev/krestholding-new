import Link from "next/link";
import { Subsidiary } from "@/hooks/subsidiaries/type";
import { getSubsidiarySlug } from "@/lib/subsidiarySlug";

interface LocationsSectionProps {
  subsidiaries: Subsidiary[];
}

const DEFAULT_LOCATIONS: { city: string; names: string[] }[] = [
  { city: "Douala", names: ["Le Carino", "Saga Africa", "Creaconsult", "Krestdev", "67 Design & Build"] },
  { city: "Yaoundé", names: ["Le Carino", "Creaconsult"] },
  { city: "Communes partenaire", names: ["Bull Services"] },
];

const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

export default function LocationsSection({ subsidiaries }: LocationsSectionProps) {
  const realGroups = new Map<string, Subsidiary[]>();
  subsidiaries.forEach((s) => {
    if (!s.city) return;
    const list = realGroups.get(s.city) || [];
    list.push(s);
    realGroups.set(s.city, list);
  });

  const groups =
    realGroups.size > 0
      ? Array.from(realGroups.entries()).map(([city, items]) => ({
          city,
          entries: items.map((s) => ({ name: s.name, subsidiary: s as Subsidiary | undefined })),
        }))
      : DEFAULT_LOCATIONS.map(({ city, names }) => ({
          city,
          entries: names.map((name) => ({
            name,
            subsidiary: subsidiaries.find((s) => sameName(s.name, name)),
          })),
        }));

  return (
    <section className="bg-white dark:bg-[#0d0d0d] py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <h2 className="font-sans text-black dark:text-white text-3xl sm:text-[32px] leading-tight tracking-tight max-w-[512px]">
            Où se trouve nos participations
          </h2>
          <p className="text-black/90 dark:text-white/90 text-lg sm:text-xl leading-snug max-w-[514px]">
            Une phrase sur trois lignes qui donne brièvement l&apos;idée entreprise affiché sur cette page, de
            ce côté.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {groups.map((group) => (
            <div key={group.city} className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col gap-12">
              <span className="font-abel text-[#f29308] text-base tracking-[1px] uppercase">{group.city}</span>
              <div className="flex flex-wrap gap-4">
                {group.entries.map((entry) =>
                  entry.subsidiary ? (
                    <Link
                      key={entry.name}
                      href={`/partenaires/${getSubsidiarySlug(entry.subsidiary)}`}
                      className="text-black dark:text-white text-xl underline hover:text-black/80 dark:hover:text-white/80 transition-colors"
                    >
                      {entry.name.toUpperCase()}
                    </Link>
                  ) : (
                    <span key={entry.name} className="text-black dark:text-white text-xl underline decoration-black/32 dark:decoration-white/32">
                      {entry.name.toUpperCase()}
                    </span>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
