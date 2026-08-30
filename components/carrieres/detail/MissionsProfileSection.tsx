import { JobOpening, JobOpeningTextItem } from "@/hooks/jobOpenings/type";
import KickerIcon from "@/components/ui/KickerIcon";

interface MissionsProfileSectionProps {
  job: JobOpening;
}

const DEFAULT_MISSIONS: JobOpeningTextItem[] = [
  { text: "Assurer la mission principale du poste au sein de l'entité." },
  { text: "Collaborer étroitement avec les équipes opérationnelles et la direction." },
  { text: "Contribuer à la qualité et à la fiabilité des livrables du service." },
];

const DEFAULT_PROFILE: JobOpeningTextItem[] = [
  { text: "Formation adaptée au poste recherché." },
  { text: "Expérience minimale pertinente dans un poste similaire." },
  { text: "Compétences techniques liées au secteur d'activité de l'entité." },
];

export default function MissionsProfileSection({ job }: MissionsProfileSectionProps) {
  const missions = job.missions?.length ? job.missions : DEFAULT_MISSIONS;
  const profile = job.profile?.length ? job.profile : DEFAULT_PROFILE;

  return (
    <section className="bg-white dark:bg-[#0d0d0d] px-6 lg:px-10 pb-16 lg:pb-[80px]">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14">
        <div className="flex items-center gap-4">
          <KickerIcon className="text-[#111] dark:text-white" />
          <span className="font-abel text-[#111] dark:text-white text-xl uppercase tracking-tight">Missions & profil</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col gap-4">
            <h4 className="text-[#111] dark:text-white text-lg font-medium">Vos missions</h4>
            <ul className="flex flex-col gap-2 list-disc pl-5">
              {missions.map((item, idx) => (
                <li key={item.id ?? idx} className="text-black/70 dark:text-white/70 text-sm leading-relaxed">
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black/[0.08] dark:bg-white/[0.08] border border-black/30 dark:border-white/30 p-6 flex flex-col gap-4">
            <h4 className="text-[#111] dark:text-white text-lg font-medium">Le profil recherché</h4>
            <ul className="flex flex-col gap-2 list-disc pl-5">
              {profile.map((item, idx) => (
                <li key={item.id ?? idx} className="text-black/70 dark:text-white/70 text-sm leading-relaxed">
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
