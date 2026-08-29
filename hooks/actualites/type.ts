export interface LabeledLink {
  id?: string;
  label: string;
  url?: string | null;
}

export interface PressLink {
  id?: string;
  label: string;
  url: string;
}

export interface ActualitesPageContent {
  id: number;
  portfolioKicker?: string | null;

  // Bandeau bas — Espace presse
  pressHeading?: string | null;
  pressLinks?: PressLink[] | null;
  pressCtaLabel?: string | null;
  pressCtaUrl?: string | null;

  // Bandeau bas — Rester informé
  newsletterInfoLines?: LabeledLink[] | null;
  newsletterFormLabel?: string | null;
  newsletterPlaceholder?: string | null;
  newsletterButtonLabel?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
}
