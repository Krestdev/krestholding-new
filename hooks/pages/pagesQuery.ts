import { BaseListQuery } from "../baseListQuery";
import { CMSPage } from "./type";

class PagesQuery extends BaseListQuery<CMSPage, CMSPage> {
  constructor() {
    super("/pages");
  }
}

export const pagesQuery = new PagesQuery();
