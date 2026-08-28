import { BaseListQuery } from "../baseListQuery";
import { ContactSubmission, ContactSubmissionInput } from "./type";

class ContactSubmissionsQuery extends BaseListQuery<ContactSubmission, ContactSubmissionInput> {
  constructor() {
    super("/contact-submissions");
  }
}

export const contactSubmissionsQuery = new ContactSubmissionsQuery();
