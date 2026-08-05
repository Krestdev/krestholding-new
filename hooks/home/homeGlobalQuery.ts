import { GlobalQuery } from "../globalQuery";
import { HomePageGlobal } from "./type";

class HomeGlobalQuery extends GlobalQuery<HomePageGlobal, HomePageGlobal> {
  constructor() {
    super("/globals/home");
  }
}

export const homeGlobalQuery = new HomeGlobalQuery();