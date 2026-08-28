import { Subsidiary } from "../subsidiaries/type";

export type JobContractType = "CDI" | "CDD" | "Stage" | "Freelance";
export type JobWorkTime = "Temps plein" | "Temps partiel";

export interface JobOpeningTextItem {
  id?: string;
  text: string;
}

export interface JobOpening {
  id: number;
  title: string;
  slug?: string | null;
  relatedSubsidiary?: Subsidiary | number | null;
  contractType?: JobContractType | null;
  workTime?: JobWorkTime | null;
  location?: string | null;
  experienceLevel?: string | null;
  compensation?: string | null;
  description?: string | null;
  missions?: JobOpeningTextItem[] | null;
  profile?: JobOpeningTextItem[] | null;
  whatWeOffer?: JobOpeningTextItem[] | null;
  workEnvironment?: string | null;
  recruitmentStepsText?: string | null;
  publishedAt?: string | null;
  applicationDeadline?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
