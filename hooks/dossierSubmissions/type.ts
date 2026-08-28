export type DossierNeedType = "Capital" | "Structuration" | "Accès au marché" | "Autre";

export type DossierAmountRange = "lt-10m" | "10m-50m" | "50m-200m" | "gt-200m" | "non-determine";

export interface DossierDocument {
  id: number;
  filename?: string | null;
  url?: string | null;
  filesize?: number | null;
  mimeType?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface DossierSubmission {
  id: number;
  reference?: string | null;

  // Étape 1 — Votre entreprise
  companyName: string;
  industry: string;
  foundedYear: number;
  headcount: string;
  cityCountry: string;
  websiteUrl?: string | null;

  // Étape 2 — Votre projet
  needType?: DossierNeedType | null;
  amountRange?: DossierAmountRange | null;
  projectDescription: string;

  // Étape 3 — Vos documents
  documents?: (DossierDocument | number)[] | null;
  consentAccepted: boolean;

  createdAt?: string | null;
  updatedAt?: string | null;
}

export type DossierSubmissionInput = Omit<
  DossierSubmission,
  "id" | "reference" | "createdAt" | "updatedAt" | "documents"
> & {
  documents?: number[];
};
