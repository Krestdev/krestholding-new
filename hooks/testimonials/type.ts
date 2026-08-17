import { Media } from "../type";

export interface Testimonial {
  id: number;
  authorName: string;
  authorTitle?: string | null;
  avatar?: Media | number | null;
  quote: string;
  companyLogo?: Media | number | null;
  rating?: number | null;
  order?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
