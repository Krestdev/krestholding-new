import { Media } from "../type";

export interface HeaderNavSubItem {
  id?: string | null;
  label?: string | null;
  url?: string | null;
}

export interface HeaderNavItem {
  id?: string | null;
  label?: string | null;
  url?: string | null;
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

