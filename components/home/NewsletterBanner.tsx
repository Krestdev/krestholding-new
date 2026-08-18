"use client";

import { useState } from "react";
import { HomePageContent } from "@/hooks/home/type";
import { Check } from "@phosphor-icons/react";
import KickerIcon from "@/components/ui/KickerIcon";

interface NewsletterBannerProps {
  homeData?: HomePageContent | null;
}

export default function NewsletterBanner({ homeData }: NewsletterBannerProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="bg-[#0d0d0d] border-y border-white/10 py-16 px-6 lg:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
        <div className="flex items-center gap-3">
          <KickerIcon className="text-white" />
          <span className="font-mono text-white text-xl uppercase tracking-tight">
            {homeData?.newsletterKicker || "Notre newsletter"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
          <h3 className="font-sans text-white text-3xl sm:text-4xl leading-tight">
            {homeData?.newsletterHeading || "Parlez à un expert ou soyez les premiers au courant"}
          </h3>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 border border-white/32 px-4 py-3 text-white text-sm">
              <Check size={16} />
              <span>Merci, vous êtes inscrit.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center border border-white/32 w-full sm:w-[469px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={homeData?.newsletterPlaceholder || "Votre adresse email"}
                className="flex-1 px-4 py-3 bg-transparent text-white/64 placeholder:text-white/64 text-lg focus:outline-none min-w-0"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#f29308] text-white font-mono text-lg uppercase px-4 py-3 tracking-tight"
              >
                {homeData?.newsletterButtonLabel || "Rejoindre"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
