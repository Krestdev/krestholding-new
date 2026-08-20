import { BaseQuery } from "../baseQuery";
import { ActualitesPageContent } from "./type";

class ActualitesQuery extends BaseQuery<ActualitesPageContent, ActualitesPageContent> {
  constructor() {
    super("/globals/actualites-page-content");
  }
}

export const actualitesQuery = new ActualitesQuery();
