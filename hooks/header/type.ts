import { Media } from "../type";

export interface HeaderNavSubItem {
  id?: string | null;
  label: string;
  url: string;
}

export interface HeaderNavItem {
  id?: string | null;
  label: string;
  url: string;
  subItems?: HeaderNavSubItem[] | null;
}

export interface Header {
  id: number;
  logo?: Media | number | null;
  navItems?: HeaderNavItem[] | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

