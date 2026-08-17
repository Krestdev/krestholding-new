import { Media } from "../type";

export interface ServiceItem {
  id: number;
  title: string;
  slug?: string | null;
  description?: string | null;
  example?: string | null;
  icon?: Media | number | null;
  content?: unknown;
  headerImage?: Media | number | null;
  videoUrl?: string | null;
  featuredInHero?: boolean | null;
  order?: number | null;
  preview?: Media | number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
