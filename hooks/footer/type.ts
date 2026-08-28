import { Media, RichText } from "../type";

export interface FooterLink {
  id?: string | null;
  label: string;
  url: string;
}

export interface FooterColumn {
  id?: string | null;
  columnTitle: string;
  links?: FooterLink[] | null;
}

export interface FooterSocialLink {
  id?: string | null;
  platform: string;
  url: string;
  icon?: Media | number | null;
}

export interface Footer {
  id: number;
  description?: RichText | null;
  columns?: FooterColumn[] | null;
  participationsColumnTitle?: string | null;
  socialLinks?: FooterSocialLink[] | null;
  copyrightNotice?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}


