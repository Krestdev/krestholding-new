"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CaretRight } from "@phosphor-icons/react";

interface WizardChromeProps {
  children: ReactNode;
}

export default function WizardChrome({ children }: WizardChromeProps) {
  return (
    <div className="relative min-h-screen bg-[#0d0d0d]">
      <Link
        href="/contact"
        className="fixed top-[27px] left-[21px] lg:left-[83px] z-10 inline-flex items-center gap-2.5 bg-white px-4 py-3 text-black font-mono text-sm uppercase tracking-wide transition-colors hover:bg-white/90"
      >
        <ArrowLeft size={20} />
        <span>Retour</span>
      </Link>

      <div className="flex justify-center pt-[27px]">
        <Link href="/">
          <Image
            src="/krestholding_logo.png"
            alt="Krest Holding"
            width={112}
            height={34}
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>

      <div className="px-6 lg:px-10 pt-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
          <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-2 w-fit text-xs">
            <Link href="/" className="text-white/64 hover:text-white transition-colors">
              Accueil
            </Link>
            <CaretRight size={12} className="text-white/64" />
            <Link href="/contact" className="text-white hover:text-white/70 transition-colors">
              Contact
            </Link>
            <CaretRight size={12} className="text-white/64" />
            <span className="font-bold text-white">Soumettre un dossier</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
