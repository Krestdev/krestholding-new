import { BaseQuery } from "../baseQuery";
import { ImpactPageContent } from "./type";

class ImpactQuery extends BaseQuery<ImpactPageContent, ImpactPageContent> {
  constructor() {
    super("/globals/impact-page-content");
  }
}

export const impactQuery = new ImpactQuery();
