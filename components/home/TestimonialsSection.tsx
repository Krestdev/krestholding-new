"use client";

import { Testimonial } from "@/hooks/testimonials/type";
import { HomePageContent } from "@/hooks/home/type";
import Link from "next/link";
import Image from "next/image";
import { User } from "@phosphor-icons/react";
import KickerIcon from "@/components/ui/KickerIcon";
import CtaArrow from "@/components/ui/CtaArrow";

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  homeData?: HomePageContent | null;
}

const DEFAULT_TESTIMONIALS: Partial<Testimonial>[] = [
  {
    id: 1,
    authorName: "Jean-Marc Koffi",
    authorTitle: "Directeur Général, CREACONSULT",
    quote: "KREST a apporté bien plus que du capital : une vraie méthode et un suivi mensuel exigeant.",
  },
  {
    id: 2,
    authorName: "Aïcha Bamba",
    authorTitle: "Fondatrice, LE CARINO",
    quote: "La mutualisation des pôles marketing et IT a transformé notre façon de vendre.",
  },
  {
    id: 3,
    authorName: "Marc-Antoine Dubois",
    authorTitle: "Directeur, 67 DESIGN & BUILD",
    quote: "Un partenaire actionnaire qui comprend le terrain autant que les chiffres.",
  },
  {
    id: 4,
    authorName: "Solange Ateba",
    authorTitle: "Directrice Financière, BULL SERVICES",
    quote: "Achats groupés, paie structurée : des gains concrets dès la première année.",
  },
];

export default function TestimonialsSection({ testimonials, homeData }: TestimonialsSectionProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <section className="bg-white py-24 lg:py-[120px] px-6 lg:px-10">
      <div className="max-w-[1278px] mx-auto flex flex-col gap-20">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10">
          <div className="flex items-center gap-3 lg:w-[340px] shrink-0">
            <KickerIcon className="text-black" />
            <span className="font-mono text-black text-xl uppercase tracking-tight">
              {homeData?.testimonialsKicker || "Témoignages"}
            </span>
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="font-sans text-black text-3xl sm:text-4xl leading-tight max-w-2xl">
              {homeData?.testimonialsHeading ||
                "Les dirigeants de nos filiales témoignent d'un accompagnement qui va au-delà du capital."}
            </h2>
            <Link
              href={homeData?.testimonialsCtaUrl || "/contact"}
              className="inline-flex items-center gap-2.5 pl-6 pr-3.5 py-3 bg-black text-white text-sm font-medium w-fit"
            >
              <span>{homeData?.testimonialsCtaLabel || "Nous rejoindre"}</span>
              <CtaArrow />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, idx) => {
            const avatarUrl = typeof item.avatar === "object" ? item.avatar?.url : undefined;
            return (
              <div key={item.id ?? idx} className="flex flex-col justify-between gap-10 p-6 min-h-[300px] border border-black/[0.06]">
                <p className="font-inter font-medium text-black text-xl leading-snug">&ldquo;{item.quote}&rdquo;</p>

                <div className="flex items-center gap-4">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt={item.authorName || ""} width={56} height={56} className="rounded-full object-cover size-14" />
                  ) : (
                    <div className="size-14 rounded-full bg-black/5 flex items-center justify-center text-black/40">
                      <User size={22} />
                    </div>
                  )}
                  <div>
                    <p className="font-inter font-medium text-black text-lg">{item.authorName}</p>
                    {item.authorTitle && <p className="font-inter text-[#333] text-sm">{item.authorTitle}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
