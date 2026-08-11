import { BaseQuery } from "../baseQuery";
import { Footer } from "./type";

class FooterQuery extends BaseQuery<Footer, Footer> {
  constructor() {
    super("/globals/footer");
  }
}

export const footerQuery = new FooterQuery();
