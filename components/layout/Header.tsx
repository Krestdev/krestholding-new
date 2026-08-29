"use client";

import { headerQuery } from "@/hooks/header/headerQuery";
import { HeaderNavItem } from "@/hooks/header/type";
import { useLocaleStore } from "@/store/localeStore";
import { useThemeStore } from "@/store/themeStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CaretUpDown, List, Moon, Sun, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const DEFAULT_NAV_ITEMS: HeaderNavItem[] = [
  { id: "1", label: "Le groupe", url: "/" },
  { id: "2", label: "Notre modèle", url: "/notre-modele" },
  { id: "3", label: "Participation", url: "/partenaires" },
  { id: "4", label: "Impact", url: "/impact" },
  { id: "4", label: "Impact", url: "/impact" },
  { id: "5", label: "Actualité", url: "/actualite" },
  { id: "6", label: "Carrières", url: "/carrieres" },
  { id: "7", label: "Contact", url: "/contact" },
];

const LANGUAGES = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
];

export default function Header() {
  const { locale, setLocale } = useLocaleStore();
  const { theme, toggleTheme } = useThemeStore();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { data: headerData } = useQuery({
    queryKey: ["header", locale],
    queryFn: () => headerQuery.getBlobal({ locale }),
  });

  const logo =
    typeof headerData?.logo === "object" ? headerData.logo : undefined;
  const logoUrl = logo?.url?.trim() || "/krestholding_logo.png";
  const logoAlt = logo?.alt || "Krest Holding";

  const navItems: HeaderNavItem[] =
    headerData?.navItems && headerData.navItems.length > 0
      ? headerData.navItems
      : DEFAULT_NAV_ITEMS;

  const currentLangLabel = locale?.toUpperCase() || "FR";

  if (pathname?.startsWith("/contact/soumettre-un-dossier")) return null;

  // Every page's hero sits behind the header in a fixed dark style, so while
  // the header is transparent (not yet scrolled) its chrome must stay white
  // to stay legible — only once it gets an opaque background (isScrolled)
  // can it follow the light/dark toggle without going invisible.
  const topBarText = isScrolled ? "text-black dark:text-white" : "text-white";
  const topBarHoverText = isScrolled
    ? "hover:text-black/70 dark:hover:text-white/70"
    : "hover:text-white/70";
  const topBarUnderline = isScrolled
    ? "after:bg-black dark:after:bg-white"
    : "after:bg-white";
  const topBarBorder = isScrolled
    ? "border-black/16 dark:border-white/16"
    : "border-white/16";
  const topBarBorderHover = isScrolled
    ? "hover:border-black/30 dark:hover:border-white/30"
    : "hover:border-white/30";

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        isScrolled && "bg-white/90 dark:bg-[#0d0d0d]/90 backdrop-blur-sm",
        isScrolled && "bg-white/90 dark:bg-[#0d0d0d]/90 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "border-b transition-colors duration-300",
          isScrolled
            ? "border-black/20 dark:border-white/20"
            : "border-white/20",
        )}
      >
        <div className="flex items-center justify-between px-6 lg:px-10 py-5">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={140}
              height={43}
              priority
              className={cn(
                "h-10 w-auto object-contain",
                isScrolled && theme === "light" && "invert",
              )}
            />
          </Link>

          <nav
            className={cn(
              "hidden lg:flex items-center gap-6 text-[15px] font-medium transition-colors",
              topBarText,
            )}
          >
            {navItems.map((item, idx) => (
              <Link
                key={item.id || idx}
                href={item.url ?? "#"}
                className={cn(
                  "relative py-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:transition-all after:duration-300 hover:after:w-full",
                  topBarHoverText,
                  topBarUnderline,
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Passer au thème clair"
                  : "Passer au thème sombre"
              }
              className={cn(
                "flex items-center justify-center w-12 h-12 border transition-colors",
                topBarText,
                topBarBorder,
                topBarBorderHover,
              )}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen((v) => !v)}
                onBlur={() => setTimeout(() => setLangDropdownOpen(false), 150)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-3 text-[15px] font-medium border transition-colors",
                  topBarText,
                  topBarBorder,
                  topBarBorderHover,
                )}
              >
                <span>{currentLangLabel}</span>
                <CaretUpDown size={16} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-28 bg-white dark:bg-[#141414] border border-black/10 dark:border-white/10 py-1 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code as "fr" | "en" | "it");
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        locale === lang.code
                          ? "text-white font-semibold"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={headerData?.ctaUrl || "/contact"}
              className="inline-flex items-center justify-center px-4 py-3 text-[15px] font-medium bg-black text-white dark:bg-white dark:text-black hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              {headerData?.ctaLabel || "Soumettre"}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Passer au thème clair"
                  : "Passer au thème sombre"
              }
              className={cn(
                "p-2 transition-colors",
                topBarText,
                topBarHoverText,
              )}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className={cn(
                "p-2 transition-colors",
                topBarText,
                topBarHoverText,
              )}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#0d0d0d] px-6 py-6 space-y-4">
          <nav className="flex flex-col gap-4">
            {navItems.map((item, idx) => (
              <Link
                key={item.id || idx}
                href={item.url ?? "#"}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[15px] text-black dark:text-white transition-colors active:text-black/60 dark:active:text-white/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code as "fr" | "en" | "it")}
                className={`px-3 py-2 text-[15px] font-medium border border-black/16 dark:border-white/16 transition-colors ${
                  locale === lang.code
                    ? "text-black dark:text-white border-black/40 dark:border-white/40"
                    : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <Link
            href={headerData?.ctaUrl || "/contact"}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center px-4 py-3 bg-black text-white dark:bg-white dark:text-black text-[15px] font-medium transition-colors active:opacity-80"
          >
            {headerData?.ctaLabel || "Soumettre"}
          </Link>
        </div>
      )}
    </header>
  );
}
