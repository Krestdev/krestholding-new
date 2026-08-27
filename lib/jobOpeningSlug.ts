import { JobOpening } from "@/hooks/jobOpenings/type";
import { slugify } from "./subsidiarySlug";

/**
 * Falls back to a title-derived slug for job openings saved before the `slug`
 * field existed (or left blank), so job-card links never dead-end.
 */
export function getJobOpeningSlug(job: Pick<JobOpening, "slug" | "title">): string {
  return job.slug || slugify(job.title);
}
