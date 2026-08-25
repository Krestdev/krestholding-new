import { BaseListQuery } from "../baseListQuery";
import { JobOpening } from "./type";

class JobOpeningsQuery extends BaseListQuery<JobOpening, JobOpening> {
  constructor() {
    super("/job-openings");
  }
}

export const jobOpeningsQuery = new JobOpeningsQuery();
