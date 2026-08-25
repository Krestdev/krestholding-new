export interface JobsChartItem {
  id?: string;
  label: string;
  value: number;
}

export interface TagItem {
  id?: string;
  text: string;
}

export interface WhyCard {
  id?: string;
  title: string;
  description: string;
}

export interface ProcessStepItem {
  id?: string;
  title: string;
  description: string;
}

export interface CarrieresPageContent {
  id: number;

  // Hero
  heroHeading?: string | null;

  // Où sont les postes
  jobsKicker?: string | null;
  jobsChartHeading?: string | null;
  jobsChartData?: JobsChartItem[] | null;
  jobsSkillTags?: TagItem[] | null;
  jobsLocationTags?: TagItem[] | null;

  // Pourquoi nous rejoindre
  whyKicker?: string | null;
  whyHeading?: string | null;
  whyCards?: WhyCard[] | null;

  // Nos offres
  offersKicker?: string | null;
  offersIntro?: string | null;
  offersHeading?: string | null;

  // Notre processus
  processKicker?: string | null;
  processIntro?: string | null;
  processHeading?: string | null;
  processSteps?: ProcessStepItem[] | null;

  // Candidature spontanée
  spontaneousKicker?: string | null;
  spontaneousHeadingLine1?: string | null;
  spontaneousHeadingLine2?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
}
