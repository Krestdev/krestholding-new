import { BaseQuery } from "../baseQuery";
import { HomePageContent } from "./type";

class HomeQuery extends BaseQuery<HomePageContent, HomePageContent> {
  constructor() {
    super("/globals/home-page-content");
  }
}

export const homeQuery = new HomeQuery();
