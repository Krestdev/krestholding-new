import { CMSPage } from "@/hooks/pages/type";

interface CertificationsContentProps {
  pageData?: CMSPage | null;
}

export default function CertificationsContent({ pageData }: CertificationsContentProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-6">
      {pageData?.content ? (
        typeof pageData.content === "string" ? (
          <p className="text-slate-300 leading-relaxed">{pageData.content}</p>
        ) : (
          <div className="text-slate-300 leading-relaxed space-y-4">
            <p>
              Toutes nos certifications respectent les standards internationaux de qualification
              professionnelle.
            </p>
          </div>
        )
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Parcours de Certification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-fit">
                Niveau Expert
              </div>
              <h3 className="text-xl font-bold text-white">Certification Lead Digital Architect</h3>
              <p className="text-sm text-slate-400">
                Accréditation internationale en conception et gouvernance des systèmes
                d&apos;information.
              </p>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                Niveau Professionnel
              </div>
              <h3 className="text-xl font-bold text-white">Certification Audit & Génie Civil</h3>
              <p className="text-sm text-slate-400">
                Maîtrise des normes de sécurité, d&apos;inspection technique et d&apos;essais
                géotechniques.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
