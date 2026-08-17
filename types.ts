/**
 * TypeScript type definitions matching the Payload CMS collections and globals schema.
 */

export interface RichText {
  [key: string]: unknown;
}

export interface Media {
  id: number;
  url: string;
  alt?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    thumbnail?: { url?: string | null; width?: number | null; height?: number | null };
    card?: { url?: string | null; width?: number | null; height?: number | null };
    tablet?: { url?: string | null; width?: number | null; height?: number | null };
  };
  createdAt: string;
  updatedAt: string;
}

/* ==========================================
   COLLECTIONS
   ========================================== */

export interface SubsidiaryStat {
  id?: string;
  label?: string | null;
  value?: string | null;
}

export interface Subsidiary {
  id: number;
  name: string;
  slug?: string | null;
  category: string;
  logo?: Media | number | null;
  featuredImage?: Media | number | null;
  shortDescription?: string | null;
  fullDescription?: RichText | null;
  websiteUrl?: string | null;
  featuredInHome?: boolean | null;
  order?: number | null;
  stats?: SubsidiaryStat[] | null;
  createdAt: string;
  updatedAt: string;
}

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
  createdAt: string;
  updatedAt: string;
}

export interface CompanyValue {
  id: number;
  title: string;
  description?: string | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: number;
  authorName: string;
  authorTitle?: string | null;
  avatar?: Media | number | null;
  quote: string;
  companyLogo?: Media | number | null;
  rating?: number | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: RichText | string;
  category?: string | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: number;
  title: string;
  code: string;
  description?: string | null;
  badgeIcon?: Media | number | null;
  order?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  title: string;
  slug?: string | null;
  description?: string | null;
  content?: RichText | null;
  headerImage?: Media | number | null;
  videoUrl?: string | null;
  featuredInHero?: boolean | null;
  order?: number | null;
  preview?: Media | number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content?: RichText | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: Media | number | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

/* ==========================================
   GLOBALS (Landing / System Configurations)
   ========================================== */

export interface StatItem {
  id?: string;
  label: string;
  value: string;
  description?: string;
}

export interface HomePageContent {
  id: number;
  // Hero
  heroHeading?: string | null;
  heroSubheading?: string | null;
  heroCtaLabel?: string | null;
  heroCtaUrl?: string | null;
  heroSecondaryCtaLabel?: string | null;
  heroSecondaryCtaUrl?: string | null;
  heroBgMedia?: Media | number | null;
  heroStats?: StatItem[] | null;

  // About
  aboutKicker?: string | null;
  aboutIntroHeading?: string | null;
  aboutIntroBody?: RichText | string | null;
  aboutStats?: StatItem[] | null;

  // Subsidiaries
  subsidiariesKicker?: string | null;
  subsidiariesHeading?: string | null;
  subsidiariesSubheading?: string | null;

  // Impact
  impactKicker?: string | null;
  impactHeading?: string | null;
  impactMetrics?: StatItem[] | null;

  // FAQ
  faqKicker?: string | null;
  faqHeading?: string | null;
  faqSubheading?: string | null;

  // Certifications
  certificationsKicker?: string | null;
  certificationsHeading?: string | null;
  certificationsBody?: string | null;

  // Testimonials
  testimonialsKicker?: string | null;
  testimonialsHeading?: string | null;

  // News
  newsKicker?: string | null;
  newsHeading?: string | null;
  newsCalloutText?: string | null;

  // Contact
  contactHeading?: string | null;
  contactSubheading?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface HeaderNavItem {
  id?: string;
  label: string;
  url: string;
  subItems?: { id?: string; label: string; url: string }[] | null;
}

export interface HeaderGlobal {
  id: number;
  logo?: Media | number | null;
  navItems?: HeaderNavItem[] | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface FooterColumnLink {
  id?: string;
  label: string;
  url: string;
}

export interface FooterColumn {
  id?: string;
  columnTitle: string;
  links?: FooterColumnLink[] | null;
}

export interface FooterGlobal {
  id: number;
  description?: RichText | string | null;
  columns?: FooterColumn[] | null;
  socialLinks?: {
    id?: string;
    platform: string;
    url: string;
    icon?: Media | number | null;
  }[] | null;
  copyrightNotice?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ContactInfoGlobal {
  id: number;
  emails?: { id?: string; email: string }[] | null;
  phones?: { id?: string; phone: string }[] | null;
  physicalAddress?: string | null;
  postalBox?: string | null;
  mapIframeUrl?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
