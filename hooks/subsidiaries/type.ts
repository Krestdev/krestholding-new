import { Media, RichText } from "../type";

export type SubsidiaryCategory =
  | "Solutions Digitales"
  | "Restauration"
  | "Architecture & Design"
  | "Géotechnique & Génie Civil"
  | "Loisirs & Bien-Être"
  | "Gestion Fourrière";

export type SubsidiaryAccentColor = "teal" | "red" | "orange" | "gray";

export interface SubsidiaryStat {
  id?: string;
  label?: string | null;
  value?: string | null;
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
  createdAt?: string | null;
  updatedAt?: string | null;
}
