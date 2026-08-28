export type ContactMotif =
  | "parcours-prioritaire"
  | "investisseur-partenaire"
  | "presse"
  | "candidat"
  | "autre";

export interface ContactSubmission {
  id: number;
  fullName: string;
  motif: ContactMotif;
  email: string;
  phoneCountryCode?: string | null;
  phoneNumber: string;
  organization: string;
  country: string;
  projectDescription: string;
  consentAccepted: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type ContactSubmissionInput = Omit<ContactSubmission, "id" | "createdAt" | "updatedAt">;
