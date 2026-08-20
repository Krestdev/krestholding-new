"use client";

import Link from "next/link";
import { CaretRight, ArrowRight, ArrowDown, ArrowUpRight } from "@phosphor-icons/react";

interface MotifCard {
  kicker: string;
  heading: string;
  meta: string;
  buttonLabel: string;
  href: string;
  icon: "right" | "down" | "up-right";
}

const MOTIF_CARDS: MotifCard[] = [
  {
    kicker: "Parcours prioritaire",
    heading: "Vous dirigez une entreprise",
    meta: "Réponse sous 15 jours ouvrés",
    buttonLabel: "Soumettre un dossier",
    href: "#formulaire-general",
    icon: "right",
  },
  {
    kicker: "Investisseur · Partenaire",
    heading: "Vous souhaitez échanger sur le modèle de Krest Holding",
    meta: "Réponse sous 5 jours ouvrés",
    buttonLabel: "Remplir le formulaire",
    href: "#formulaire-general",
    icon: "down",
  },
  {
    kicker: "Presse",
    heading: "Vous préparez un article",
    meta: "Contact dédié · réponse sous 48 h",
    buttonLabel: "Remplir le formulaire",
    href: "#formulaire-general",
    icon: "up-right",
  },
  {
    kicker: "Candidat",
    heading: "Vous cherchez un poste",
    meta: "Traité par le pôle RH",
    buttonLabel: "Voir nos offres",
    href: "/carrieres",
    icon: "up-right",
  },
];

const ICONS = { right: ArrowRight, down: ArrowDown, "up-right": ArrowUpRight };

export default function ContactHero() {
  return (
    <section className="relative flex flex-col items-center px-6 lg:px-10 pt-[120px] pb-10 bg-gradient-to-b from-[rgba(13,13,13,0.8)] to-[#0d0d0d]">
      <div className="w-full max-w-[1280px] flex flex-col gap-16">
        <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
          <Link href="/" className="text-white/64 hover:text-white transition-colors">
            Accueil
          </Link>
          <CaretRight size={12} className="text-white/64" />
          <span className="font-bold text-white">Contact</span>
        </div>

        <div className="flex flex-col gap-8 max-w-[624px]">
          <h1 className="font-sans font-medium text-white text-4xl sm:text-[42px]">Nous contacter</h1>
          <p className="text-white/80 text-xl sm:text-2xl leading-relaxed max-w-[566px]">
            Choisissez le motif de votre demande : chaque parcours est traité par l&apos;interlocuteur
            concerné, avec un délai de réponse annoncé.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MOTIF_CARDS.map((card) => {
            const Icon = ICONS[card.icon];
            return (
              <div
                key={card.kicker}
                className="flex flex-col justify-between gap-8 bg-white/[0.08] border border-white/30 p-6"
              >
                <div className="flex flex-col gap-6">
                  <span className="font-abel text-white text-sm tracking-[0.05em] uppercase">
                    {card.kicker}
                  </span>
                  <div className="flex flex-col gap-3">
                    <p className="font-sans font-medium text-white text-xl">{card.heading}</p>
                    <p className="text-white/70 text-base">{card.meta}</p>
                  </div>
                </div>
                <Link
                  href={card.href}
                  className="inline-flex items-center justify-between gap-3 bg-white/24 border border-white/64 px-3 py-2 text-white/90 font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/32"
                >
                  <span>{card.buttonLabel}</span>
                  <Icon size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
