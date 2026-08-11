import { CMSPage } from "@/hooks/pages/type";

interface ProgrammesContentProps {
  pageData?: CMSPage | null;
}

export default function ProgrammesContent({ pageData }: ProgrammesContentProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-6">
      {pageData?.content ? (
        typeof pageData.content === "string" ? (
          <p className="text-slate-300 leading-relaxed">{pageData.content}</p>
        ) : (
          <div className="text-slate-300 leading-relaxed space-y-4">
            <p>
              Nos programmes couvrent les piliers du développement technologique, du management
              stratégique et du génie civil.
            </p>
          </div>
        )
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Nos Offres de Formations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xl font-bold text-indigo-400">Transformation Digitale & Tech</h3>
              <p className="text-sm text-slate-400">
                Ingénierie logicielle, cybersécurité, intelligence artificielle et gestion de
                projets agiles.
              </p>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xl font-bold text-emerald-400">Génie Civil & Infrastructure</h3>
              <p className="text-sm text-slate-400">
                BTP moderne, géotechnique, architecture durable et normes environnementales.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
