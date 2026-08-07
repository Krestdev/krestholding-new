import { BaseListQuery } from "../baseListQuery";
import { Subsidiary } from "./type";

class SubsidiariesQuery extends BaseListQuery<Subsidiary, Subsidiary> {
  constructor() {
    super("/subsidiaries");
  }
}

export const subsidiariesQuery = new SubsidiariesQuery();
