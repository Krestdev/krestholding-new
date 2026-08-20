import { RichText } from "../type";

export interface Faq {
  id: number;
  question: string;
  answer: RichText | string;
  category?: string | null;
  order?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
