import { Subsidiary } from "../subsidiaries/type";

export type JobContractType = "CDI" | "CDD" | "Stage" | "Freelance";

export interface JobOpening {
  id: number;
  title: string;
  relatedSubsidiary?: Subsidiary | number | null;
  contractType?: JobContractType | null;
  location?: string | null;
  description?: string | null;
  publishedAt?: string | null;
  applicationDeadline?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
