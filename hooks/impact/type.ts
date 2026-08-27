export interface ImpactStatItem {
  id?: string;
  value: string;
  label: string;
}

export interface JobsChartItem {
  id?: string;
  label: string;
  value: number;
}

export interface JobsInfoCard {
  id?: string;
  title: string;
  description: string;
}

export interface EsgEngagementItem {
  id?: string;
  text: string;
}

export interface ImpactPageContent {
  id: number;

  // Hero
  heroHeading?: string | null;
  heroSubheading?: string | null;

  // Impact en chiffres
  statsKicker?: string | null;
  statsHeading?: string | null;
  statsIntro?: string | null;
  stats?: ImpactStatItem[] | null;

  // Emplois & compétences
  jobsKicker?: string | null;
  jobsChartHeading?: string | null;
  jobsChartData?: JobsChartItem[] | null;
  jobsInfoCards?: JobsInfoCard[] | null;

  // Un impact raconté
  storyKicker?: string | null;
  storyHeading?: string | null;
  storyIntro?: string | null;
  storySituationTitle?: string | null;
  storySituationBody?: string | null;
  storyActionTitle?: string | null;
  storyActionBody?: string | null;
  storyResultTitle?: string | null;
  storyResultBody?: string | null;
  storyCtaTitle?: string | null;
  storyCtaBody?: string | null;
  storyCtaPrimaryLabel?: string | null;
  storyCtaPrimaryUrl?: string | null;
  storyCtaSecondaryLabel?: string | null;
  storyCtaSecondaryUrl?: string | null;

  // Démarche extra-financière
  esgKicker?: string | null;
  esgHeading?: string | null;
  esgCert1Title?: string | null;
  esgCert1Scope?: string | null;
  esgCert2Title?: string | null;
  esgCert2Scope?: string | null;
  esgEngagementTitle?: string | null;
  esgEngagementItems?: EsgEngagementItem[] | null;

  createdAt?: string | null;
  updatedAt?: string | null;
}
