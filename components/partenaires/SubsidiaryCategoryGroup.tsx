import { Subsidiary } from "@/hooks/subsidiaries/type";
import SubsidiaryCard from "./SubsidiaryCard";

interface SubsidiaryCategoryGroupProps {
  category: string;
  subsidiaries: Subsidiary[];
}

export default function SubsidiaryCategoryGroup({ category, subsidiaries }: SubsidiaryCategoryGroupProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-indigo-400">{category}</h2>
        <div className="flex-1 h-px bg-slate-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subsidiaries.map((sub) => (
          <SubsidiaryCard key={sub.id} subsidiary={sub} />
        ))}
      </div>
    </section>
  );
}
