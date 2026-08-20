import { Media } from "../type";

export interface Certification {
  id: number;
  title: string;
  code: string;
  description?: string | null;
  badgeIcon?: Media | number | null;
  order?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
