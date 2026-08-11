import { Media, RichText } from "../type";

export interface HomePageContent {
  id: number;
  heroHeading?: string | null;
  heroSubheading?: string | null;
  heroCtaLabel?: string | null;
  heroCtaUrl?: string | null;
  heroBgMedia?: Media | number | null;
  aboutIntroHeading?: string | null;
  aboutIntroBody?: RichText | null;
  newsCalloutText?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
