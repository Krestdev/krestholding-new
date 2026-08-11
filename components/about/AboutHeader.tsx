import { AboutPageContent } from "@/hooks/about/type";

interface AboutHeaderProps {
  aboutData?: AboutPageContent | null;
}

export default function AboutHeader({ aboutData }: AboutHeaderProps) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
        {aboutData?.pageTitle || "À Propos de Krest Holding"}
      </h1>
      <p className="text-slate-400 max-w-2xl mx-auto text-lg">
        Un groupe axé sur l&apos;innovation, le professionnalisme et l&apos;expansion stratégique.
      </p>
    </div>
  );
}
