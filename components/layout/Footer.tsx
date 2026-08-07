"use client";

import { footerQuery } from "@/hooks/footer/footerQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Footer() {
  const { locale, t } = useLocaleStore();

  const { data: footerData } = useQuery({
    queryKey: ["footer", locale],
    queryFn: () => footerQuery.getBlobal({ locale }),
  });

  const description =
    typeof footerData?.description === "string"
      ? footerData.description
      : t("footer.defaultDescription");

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-white">Krest Holding</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>

        {footerData?.columns && footerData.columns.length > 0 ? (
          footerData.columns.map((col, idx) => (
            <div key={col.id || idx} className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                {col.columnTitle}
              </h4>
              <ul className="space-y-2 text-sm">
                {col.links?.map((link, lIdx) => (
                  <li key={link.id || lIdx}>
                    <Link href={link.url ?? "#"} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                {t("footer.navigation")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link href="/a-propos" className="hover:text-white">
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/partenaires" className="hover:text-white">
                    {t("nav.partners")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                {t("footer.training")}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/formation/programmes" className="hover:text-white">
                    {t("nav.programs")}
                  </Link>
                </li>
                <li>
                  <Link href="/formation/certifications" className="hover:text-white">
                    {t("nav.certifications")}
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            {t("footer.contact")}
          </h4>
          <Link href="/contact" className="inline-block text-sm text-indigo-400 hover:underline">
            {t("footer.contactCta")} &rarr;
          </Link>

          {footerData?.socialLinks && footerData.socialLinks.length > 0 && (
            <div className="flex items-center gap-4 pt-2">
              {footerData.socialLinks.map((soc, sIdx) => (
                <a
                  key={soc.id || sIdx}
                  href={soc.url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white text-sm"
                >
                  {soc.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        {footerData?.copyrightNotice || `© ${new Date().getFullYear()} Krest Holding. ${t("footer.rightsReserved")}`}
      </div>
    </footer>
  );
}
