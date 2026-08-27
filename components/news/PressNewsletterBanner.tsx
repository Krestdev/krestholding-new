"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "@phosphor-icons/react";
import { ActualitesPageContent, LabeledLink } from "@/hooks/actualites/type";

interface PressNewsletterBannerProps {
  pageData?: ActualitesPageContent | null;
}

const DEFAULT_PRESS_LINKS: LabeledLink[] = [
  { label: "Dossier de presse et éléments de marque", url: "#" },
  { label: "Contact presse dédié", url: "#" },
  { label: "Photos hautes résolutions", url: "#" },
];

const DEFAULT_NEWSLETTER_INFO: LabeledLink[] = [
  { label: "Inscription à la lettre d'information du groupe" },
  { label: "Flux RSS", url: "/actualite/rss.xml" },
];

export default function PressNewsletterBanner({ pageData }: PressNewsletterBannerProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const pressLinks = pageData?.pressLinks?.length ? pageData.pressLinks : DEFAULT_PRESS_LINKS;
  const newsletterInfo = pageData?.newsletterInfoLines?.length
    ? pageData.newsletterInfoLines
    : DEFAULT_NEWSLETTER_INFO;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="bg-[#0d0d0d] border-y border-white/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-end gap-9 p-10 lg:p-20">
          <h3 className="font-sans text-white text-3xl sm:text-4xl tracking-tight">
            {pageData?.pressHeading || "Espace presse"}
          </h3>
          <div className="flex flex-col gap-4">
            {pressLinks.map((link, idx) => (
              <a
                key={link.id ?? idx}
                href={link.url || "#"}
                className="text-white/80 text-xl sm:text-2xl underline hover:text-white transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Link
            href={pageData?.pressCtaUrl || "/contact"}
            className="inline-flex items-center justify-center px-6 py-4 bg-[#f29308] text-[#010101] font-mono text-sm uppercase tracking-wide transition-colors hover:bg-[#f29308]/85 w-fit"
          >
            {pageData?.pressCtaLabel || "Contact presse"}
          </Link>
        </div>

        <div className="flex flex-col justify-end gap-9 p-10 lg:p-20 bg-[#f29308]/10">
          <h3 className="font-sans text-white text-3xl sm:text-4xl tracking-tight">Rester informé</h3>
          <div className="flex flex-col gap-4">
            {newsletterInfo.map((line, idx) =>
              line.url ? (
                <a
                  key={line.id ?? idx}
                  href={line.url}
                  className="text-white/80 text-xl sm:text-2xl hover:text-white transition-colors w-fit"
                >
                  {line.label}
                </a>
              ) : (
                <p key={line.id ?? idx} className="text-white/80 text-xl sm:text-2xl">
                  {line.label}
                </p>
              ),
            )}
            <p className="text-white/80 font-bold text-xl sm:text-2xl">
              {pageData?.newsletterFormLabel || "Rejoignez notre newsletter"}
            </p>
          </div>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 border border-white/32 px-4 py-3 text-white text-sm w-fit">
              <Check size={16} />
              <span>Merci, vous êtes inscrit.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-stretch w-full max-w-[560px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={pageData?.newsletterPlaceholder || "Entrer votre email"}
                className="flex-1 px-6 py-4 bg-transparent border border-[#f29308] text-white placeholder:text-white font-mono text-sm uppercase tracking-wide focus:outline-none min-w-0"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#f29308] text-black font-mono text-sm uppercase px-6 py-4 tracking-wide transition-colors hover:bg-[#f29308]/85"
              >
                {pageData?.newsletterButtonLabel || "Rejoindre"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
