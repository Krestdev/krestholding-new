import { BaseQuery } from "../baseQuery";
import { Header } from "./type";

class HeaderQuery extends BaseQuery<Header, Header> {
  constructor() {
    super("/globals/header");
  }
}

export const headerQuery = new HeaderQuery();
