import { BaseListQuery } from "../baseListQuery";
import { CompanyValue } from "./type";

class CompanyValuesQuery extends BaseListQuery<CompanyValue, CompanyValue> {
  constructor() {
    super("/company-values");
  }
}

export const companyValuesQuery = new CompanyValuesQuery();
