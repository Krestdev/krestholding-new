import { Media, RichText } from "../type";

export type SubsidiaryCategory =
  | "Solutions Digitales"
  | "Restauration"
  | "Architecture & Design"
  | "Géotechnique & Génie Civil"
  | "Loisirs & Bien-Être"
  | "Gestion Fourrière";

export interface Subsidiary {
  id: number;
  name: string;
  category: SubsidiaryCategory;
  logo?: Media | number | null;
  shortDescription?: string | null;
  fullDescription?: RichText | null;
  websiteUrl?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
