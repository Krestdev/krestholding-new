import { BaseListQuery } from "../baseListQuery";
import { JobApplication, JobApplicationInput } from "./type";

class JobApplicationsQuery extends BaseListQuery<JobApplication, JobApplicationInput> {
  constructor() {
    super("/job-applications");
  }
}

export const jobApplicationsQuery = new JobApplicationsQuery();
