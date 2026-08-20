export interface SectorCard {
  id?: string;
  title: string;
  description: string;
}

export interface InterventionZone {
  id?: string;
  label: string;
}

export interface PoleExample {
  id?: string;
  text: string;
}

export interface PoleCard {
  id?: string;
  title: string;
  examples?: PoleExample[] | null;
}

export interface ImpactStat {
  id?: string;
  value: string;
  label: string;
}

import { Media } from "../type";

export interface NotreModeleContent {
  id: number;

  // Header
  heroHeading?: string | null;

  // Thèse
  thesisKicker?: string | null;
  thesisIntro?: string | null;
  thesisBody?: string | null;
  thesisQuote?: string | null;

  // Secteurs & géographies
  sectorsKicker?: string | null;
  sectorsIntro?: string | null;
  sectorCards?: SectorCard[] | null;
  interventionZones?: InterventionZone[] | null;
  interventionZonesImage?: Media | number | null;

  // Les 5 pôles
  polesKicker?: string | null;
  polesHeading?: string | null;
  polesIntro?: string | null;
  poleCards?: PoleCard[] | null;

  // Case study
  caseStudyKicker?: string | null;
  caseStudyHeading?: string | null;
  caseStudyIntro?: string | null;
  caseStudySituationTitle?: string | null;
  caseStudySituationBody?: string | null;
  caseStudyActionTitle?: string | null;
  caseStudyActionBody?: string | null;
  caseStudyResultTitle?: string | null;
  caseStudyResultBody?: string | null;
  caseStudyCtaTitle?: string | null;
  caseStudyCtaBody?: string | null;
  caseStudyCtaPrimaryLabel?: string | null;
  caseStudyCtaPrimaryUrl?: string | null;
  caseStudyCtaSecondaryLabel?: string | null;
  caseStudyCtaSecondaryUrl?: string | null;

  // Impact
  impactKicker?: string | null;
  impactHeading?: string | null;
  impactStats?: ImpactStat[] | null;
  impactCtaLabel?: string | null;
  impactCtaUrl?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
}
