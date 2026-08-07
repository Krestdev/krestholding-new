import { BaseListQuery } from "../baseListQuery";
import { News } from "./type";

class NewsQuery extends BaseListQuery<News, News> {
  constructor() {
    super("/news");
  }
}

export const newsQuery = new NewsQuery();
