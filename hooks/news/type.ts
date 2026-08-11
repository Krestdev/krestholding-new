import { Media, RichText } from "../type";

export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: Media | number | null;
  content?: RichText | null;
  publishedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
