import { Media, RichText } from "../type";

export interface CMSPageSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: Media | number | null;
}

export interface CMSPage {
  id: number;
  title: string;
  slug: string;
  content?: RichText | null;
  seo?: CMSPageSeo | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
