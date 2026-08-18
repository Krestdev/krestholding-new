import { Media } from "../type";
import { Subsidiary } from "../subsidiaries/type";

export interface StatItem {
  id?: string;
  label: string;
  value: string;
}

export interface TagItem {
  id?: string;
  label: string;
}

export interface ModelStep {
  id?: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  id?: string;
  title: string;
  duration: string;
}

export interface ChecklistItem {
  id?: string;
  item: string;
}

export interface SynergyItem {
  id?: string;
  entityA: Subsidiary | number;
  entityB: Subsidiary | number;
  description: string;
}

export interface HomePageContent {
  id: number;
  // Hero
  heroHeading?: string | null;
  heroSubheading?: string | null;
  heroCtaLabel?: string | null;
  heroCtaUrl?: string | null;
  heroSecondaryCtaLabel?: string | null;
  heroSecondaryCtaUrl?: string | null;
  heroBgMedia?: Media | number | null;

  // About
  aboutKicker?: string | null;
  aboutIntroHeading?: string | null;
  aboutIntroBody?: string | null;
  aboutQuoteAvatar?: Media | number | null;
  aboutQuoteAuthorName?: string | null;
  aboutQuoteAuthorTitle?: string | null;
  aboutQuoteText?: string | null;
  aboutTags?: TagItem[] | null;
  aboutSecondKicker?: string | null;
  aboutStatsHeading?: string | null;
  aboutStatsBody?: string | null;
  aboutStats?: StatItem[] | null;
  aboutCtaLabel?: string | null;
  aboutCtaUrl?: string | null;

  // Poles (5 pôles d'accompagnement)
  polesKicker?: string | null;
  polesHeading?: string | null;

  // Investment model
  modelKicker?: string | null;
  modelHeading?: string | null;
  modelBody?: string | null;
  modelSteps?: ModelStep[] | null;
  processHeading?: string | null;
  processSteps?: ProcessStep[] | null;
  processNoteTitle?: string | null;
  processNoteBody?: string | null;
  processCtaLabel?: string | null;
  processCtaUrl?: string | null;

  // Portfolio / subsidiaries
  subsidiariesKicker?: string | null;
  subsidiariesHeading?: string | null;
  subsidiariesSubheading?: string | null;
  synergiesHeading?: string | null;
  synergies?: SynergyItem[] | null;

  // FAQ
  faqImage?: Media | number | null;

  // Certifications
  certificationsKicker?: string | null;
  certificationsHeading?: string | null;
  certificationsBody?: string | null;

  // Testimonials
  testimonialsKicker?: string | null;
  testimonialsHeading?: string | null;
  testimonialsCtaLabel?: string | null;
  testimonialsCtaUrl?: string | null;

  // News
  newsKicker?: string | null;
  newsHeading?: string | null;

  // Application / contact
  contactKicker?: string | null;
  contactHeading?: string | null;
  contactConfidentialityTitle?: string | null;
  contactConfidentialityBody?: string | null;
  contactChecklist?: ChecklistItem[] | null;
  contactEmail?: string | null;
  contactAddress?: string | null;

  // Newsletter
  newsletterKicker?: string | null;
  newsletterHeading?: string | null;
  newsletterPlaceholder?: string | null;
  newsletterButtonLabel?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
}
