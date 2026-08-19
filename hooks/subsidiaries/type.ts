import { Media, RichText } from "../type";

export type SubsidiaryCategory =
  | "Solutions Digitales"
  | "Restauration"
  | "Architecture & Design"
  | "Géotechnique & Génie Civil"
  | "Loisirs & Bien-Être"
  | "Gestion Fourrière";

export type SubsidiaryAccentColor = "teal" | "red" | "orange" | "gray";

export type SubsidiaryPole =
  | "Growth, Marketing & Brand"
  | "Développement informatique"
  | "Comptabilité & Fiscalité"
  | "Procurement"
  | "Ressources Humaines";

export interface SubsidiaryStat {
  id?: string;
  label?: string | null;
  value?: string | null;
}

export interface SubsidiaryTextPoint {
  id?: string;
  text: string;
}

export interface SubsidiaryGalleryItem {
  id?: string;
  image?: Media | number | null;
}

export interface Subsidiary {
  id: number;
  name: string;
  slug?: string | null;
  category: SubsidiaryCategory | string;
  logo?: Media | number | null;
  featuredImage?: Media | number | null;
  shortDescription?: string | null;
  fullDescription?: RichText | null;
  websiteUrl?: string | null;
  featuredInHome?: boolean | null;
  order?: number | null;
  stats?: SubsidiaryStat[] | null;
  participationLabel?: string | null;
  entryYear?: number | null;
  accentColor?: SubsidiaryAccentColor | null;
  detailUrl?: string | null;

  // Fiche participation — hero
  city?: string | null;
  country?: string | null;

  // Fiche participation — "En un coup d'œil"
  companyOverviewIntro?: string | null;
  legalName?: string | null;
  activityLabel?: string | null;
  headcount?: string | null;
  foundedYear?: number | null;
  certificationLabel?: string | null;

  // Fiche participation — "Pourquoi avons-nous rejoint"
  motivationPoints?: SubsidiaryTextPoint[] | null;
  entrySituationPoints?: SubsidiaryTextPoint[] | null;

  // Fiche participation — "Ce que KREST a apporté"
  polesActive?: SubsidiaryPole[] | null;
  startingSituationBody?: string | null;
  whatKrestDidBody?: string | null;
  resultBody?: string | null;

  // Fiche participation — galerie
  gallery?: SubsidiaryGalleryItem[] | null;

  // Fiche participation — gouvernance
  governanceIntro?: string | null;
  participationType?: string | null;
  boardRepresentation?: string | null;
  reportingFrequency?: string | null;
  engagementDuration?: string | null;
  operationalDirection?: string | null;
  participationStatus?: string | null;

  // Fiche participation — synergies
  synergiesIntro?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
}
