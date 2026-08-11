"use client";

import { headerQuery } from "@/hooks/header/headerQuery";
import { useLocaleStore } from "@/store/localeStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { locale } = useLocaleStore();

  const { data: headerData } = useQuery({
    queryKey: ["header", locale],
    queryFn: () => headerQuery.getBlobal({ locale }),
  });

  const logoUrl = typeof headerData?.logo === "object" ? headerData.logo?.url : undefined;
  const logoAlt = typeof headerData?.logo === "object" ? headerData.logo?.alt : undefined;

  const navItems = headerData?.navItems?.length
    ? headerData.navItems
    : [
        { label: "Accueil", url: "/" },
        { label: "À Propos", url: "/a-propos" },
        { label: "Partenaires", url: "/partenaires" },
        { label: "Formations", url: "/formation/programmes" },
        { label: "Contact", url: "/contact" },
      ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoAlt || "Logo"}
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Krest Holding
            </span>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navItems.map((item, idx) => (
            <div key={item.id || idx} className="relative group">
              <Link href={item.url ?? "#"} className="hover:text-white transition-colors py-2 block">
                {item.label}
              </Link>

              {item.subItems && item.subItems.length > 0 && (
                <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-slate-900 border border-slate-800 rounded-lg p-2 min-w-[180px] shadow-xl">
                  {item.subItems.map((sub, sIdx) => (
                    <Link
                      key={sub.id || sIdx}
                      href={sub.url ?? "#"}
                      className="px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
