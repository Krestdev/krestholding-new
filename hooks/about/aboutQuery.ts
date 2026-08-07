import { BaseQuery } from "../baseQuery";
import { AboutPageContent } from "./type";

class AboutQuery extends BaseQuery<AboutPageContent, AboutPageContent> {
  constructor() {
    super("/globals/about-page-content");
  }
}

export const aboutQuery = new AboutQuery();
