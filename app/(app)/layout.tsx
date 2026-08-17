import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Abel, DM_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/queryProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Plus Jakarta Sans stands in for the Figma design's "Neue Montreal" / "PP Neue Montreal",
// a paid Pangram Pangram font not available via next/font/google. Swap in real font files
// (next/font/local) later for exact typographic fidelity.
const displaySans = Plus_Jakarta_Sans({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const abel = Abel({ variable: "--font-abel", weight: "400", subsets: ["latin"] });
const dmMono = DM_Mono({ variable: "--font-dm-mono", weight: ["400", "500"], subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krest Holding",
  description: "Dynamic Corporate Portal powered by Payload CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(
        "h-full",
        "antialiased",
        displaySans.variable,
        geistMono.variable,
        abel.variable,
        dmMono.variable,
        inter.variable,
        "font-sans",
      )}
    >
      <QueryProvider>
        <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
          <Header />
          {/* Header floats over content (fixed, transparent) to match Figma, where the
              nav overlays the hero background instead of sitting above it. This padding
              reserves the header's height so non-homepage content isn't hidden under it;
              the homepage cancels it with a negative margin so its hero still starts at
              the very top, visible behind the nav. */}
          <main className="flex-1 pt-[81px]">{children}</main>
          <Footer />
        </body>
      </QueryProvider>
    </html>
  );
}
