import { BaseQuery } from "../baseQuery";
import { ParticipationsPageContent } from "./type";

class ParticipationsQuery extends BaseQuery<ParticipationsPageContent, ParticipationsPageContent> {
  constructor() {
    super("/globals/participations-page-content");
  }
}

export const participationsQuery = new ParticipationsQuery();
