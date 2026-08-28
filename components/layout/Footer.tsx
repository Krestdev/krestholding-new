"use client";

import { footerQuery } from "@/hooks/footer/footerQuery";
import { subsidiariesQuery } from "@/hooks/subsidiaries/subsidiariesQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DEFAULT_COLUMNS = [
  {
    columnTitle: "Le Groupe",
    links: [
      { label: "Qui sommes-nous", url: "/a-propos" },
      { label: "Gouvernance", url: "/a-propos" },
      { label: "Histoire", url: "/a-propos" },
      { label: "Charte graphique", url: "/a-propos" },
    ],
  },
  {
    columnTitle: "Notre modèle",
    links: [
      { label: "Thèse d'investissement", url: "/notre-modele#these" },
      { label: "Processus", url: "/notre-modele#processus" },
      { label: "Les 5 pôles", url: "/notre-modele#poles" },
      { label: "Éligibilité", url: "/#soumettre-dossier" },
    ],
  },
  {
    columnTitle: "Groupe",
    links: [
      { label: "Impact", url: "/a-propos" },
      { label: "Actualités", url: "/actualite" },
      { label: "Carrières", url: "/carrieres" },
      { label: "Contact · Presse", url: "/contact" },
      { label: "Mentions légales", url: "/mentions-legales" },
    ],
  },
];

export default function Footer() {
  const { locale } = useLocaleStore();
  const pathname = usePathname();

  const { data: footerData } = useQuery({
    queryKey: ["footer", locale],
    queryFn: () => footerQuery.getBlobal({ locale }),
  });

  const { data: subsidiaries } = useQuery({
    queryKey: ["subsidiaries", locale, "footer"],
    queryFn: () => subsidiariesQuery.get({ locale, limit: 12 }),
  });

  const columns = footerData?.columns?.length
    ? footerData.columns
    : DEFAULT_COLUMNS;

  if (pathname?.startsWith("/contact/soumettre-un-dossier")) return null;

  return (
    // <footer className="bg-[#0d0d0d] text-white">
    //   <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
    //     {columns.map((col, idx) => (
    //       <div key={idx} className="flex flex-col gap-4">
    //         <h4 className="text-lg font-medium uppercase tracking-wide">{col.columnTitle}</h4>
    //         <ul className="flex flex-col gap-2">
    //           {col.links?.map((link, lIdx) => (
    //             <li key={lIdx}>
    //               <Link
    //                 href={link.url ?? "#"}
    //                 className="relative inline-block py-0.5 text-[#4d5766] text-lg transition-colors hover:text-white after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
    //               >
    //                 {link.label}
    //               </Link>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     ))}

    //     <div className="flex flex-col gap-4">
    //       <h4 className="text-lg font-medium uppercase tracking-wide">
    //         {footerData?.participationsColumnTitle || "Participations"}
    <footer className="bg-[#0d0d0d] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {columns.map((col, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            <h4 className="text-lg font-medium uppercase tracking-wide">
              {col.columnTitle}
            </h4>
            <ul className="flex flex-col gap-2">
              {col.links?.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link
                    href={link.url ?? "#"}
                    className="relative inline-block py-0.5 text-[#4d5766] text-lg transition-colors hover:text-white after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-medium uppercase tracking-wide">
            {footerData?.participationsColumnTitle || "Participations"}
          </h4>
          <ul className="flex flex-col gap-2">
            {(subsidiaries ?? []).map((sub) => (
              <li key={sub.id}>
                <span className="text-[#4d5766] hover:text-white transition-colors text-lg cursor-default">
                  {sub.name}
                </span>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2">
            {(subsidiaries ?? []).map((sub) => (
              <li key={sub.id}>
                <span className="text-[#4d5766] hover:text-white transition-colors text-lg cursor-default">
                  {sub.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Image src="/krestholding_logo.png" alt="Krest Holding" width={200} height={42} className="h-9 w-auto object-contain" />
          <p className="text-[#b3b3b3] text-lg">{footerData?.copyrightNotice || "Copyright © Krest Holding 2026"}</p>
        </div> */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Image
            src="/krestholding_logo.png"
            alt="Krest Holding"
            width={200}
            height={42}
            className="h-9 w-auto object-contain"
          />
          <p className="text-[#b3b3b3] text-lg">
            {footerData?.copyrightNotice || "Copyright © Krest Holding 2026"}
          </p>
        </div>
      </div>
    </footer>
  );
}
