import { Media, RichText } from "../type";
import { Subsidiary } from "../subsidiaries/type";

export interface News {
  id: number;
  title: string;
  slug: string;
  category?: string | null;
  author?: string | null;
  excerpt?: string | null;
  featuredImage?: Media | number | null;
  content?: RichText | null;
  publishedAt?: string | null;
  relatedSubsidiaries?: (Subsidiary | number)[] | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
