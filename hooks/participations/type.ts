import { Subsidiary } from "../subsidiaries/type";

export interface StatItem {
  id?: string;
  value: string;
  label: string;
}

export interface SynergyItem {
  id?: string;
  entityA: Subsidiary | number;
  entityB: Subsidiary | number;
  description: string;
}

export interface SectorBreakdownItem {
  id?: string;
  label: string;
  percentage: number;
}

export type OwnershipBarColor = "orange" | "gray";
export type OwnershipRankColor = "orange" | "teal";

export interface OwnershipBreakdownItem {
  id?: string;
  rank: string;
  rankColor?: OwnershipRankColor | null;
  label: string;
  percentage: number;
  barColor?: OwnershipBarColor | null;
}

export interface ParticipationsPageContent {
  id: number;
  // Hero
  heroHeading?: string | null;
  heroSubheading?: string | null;
  heroStats?: StatItem[] | null;

  // Portfolio grid
  portfolioKicker?: string | null;
  portfolioHeading?: string | null;
  portfolioSubheading?: string | null;

  // Synergies
  synergiesKicker?: string | null;
  synergiesHeading?: string | null;
  synergiesSubheading?: string | null;
  synergies?: SynergyItem[] | null;

  // Composition
  compositionKicker?: string | null;
  compositionSubheading?: string | null;
  sectorBreakdown?: SectorBreakdownItem[] | null;
  ownershipBreakdown?: OwnershipBreakdownItem[] | null;

  // Timeline
  timelineKicker?: string | null;
  timelineSubheading?: string | null;
  foundingYear?: number | null;
  foundingLabel?: string | null;

  // CTA banner
  ctaLeftHeading?: string | null;
  ctaLeftBody?: string | null;
  ctaLeftPrimaryLabel?: string | null;
  ctaLeftPrimaryUrl?: string | null;
  ctaLeftSecondaryLabel?: string | null;
  ctaLeftSecondaryUrl?: string | null;
  ctaRightHeading?: string | null;
  ctaRightBody?: string | null;
  ctaRightPrimaryLabel?: string | null;
  ctaRightPrimaryUrl?: string | null;
  ctaRightSecondaryLabel?: string | null;
  ctaRightSecondaryUrl?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
}
