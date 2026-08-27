export interface JobApplication {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  targetEntityOrSector: string;
  relatedJobOpening?: number | null;
  desiredRole: string;
  targetCity: string;
  documents?: number[] | null;
  consentAccepted: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type JobApplicationInput = Omit<JobApplication, "id" | "createdAt" | "updatedAt">;
