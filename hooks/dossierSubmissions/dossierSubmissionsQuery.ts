import { BaseListQuery } from "../baseListQuery";
import { DossierSubmission, DossierSubmissionInput } from "./type";

class DossierSubmissionsQuery extends BaseListQuery<DossierSubmission, DossierSubmissionInput> {
  constructor() {
    super("/dossier-submissions");
  }
}

export const dossierSubmissionsQuery = new DossierSubmissionsQuery();
