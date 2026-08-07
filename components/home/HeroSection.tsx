import { HomePageContent } from "@/hooks/home/type";
import { useLocaleStore } from "@/store/localeStore";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  homeData?: HomePageContent | null;
}

export default function HeroSection({ homeData }: HeroSectionProps) {
  const { t } = useLocaleStore();
  const bgMedia = typeof homeData?.heroBgMedia === "object" ? homeData.heroBgMedia : undefined;

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-slate-900 px-6">
      {bgMedia?.url && (
        <Image
          src={bgMedia.url}
          alt={bgMedia.alt || "Hero Background"}
          fill
          priority
          className="object-cover opacity-25"
        />
      )}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          {homeData?.heroHeading || "Transformer le futur par l'innovation et l'excellence"}
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          {homeData?.heroSubheading ||
            "Krest Holding fédère des filiales de premier plan dans le digital, la restauration, l'architecture et les infrastructures."}
        </p>
        <div className="pt-4">
          <Link
            href={homeData?.heroCtaUrl || "/partenaires"}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25"
          >
            {homeData?.heroCtaLabel || t("home.discoverSubsidiaries")} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
