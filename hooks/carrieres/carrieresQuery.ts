import { BaseQuery } from "../baseQuery";
import { CarrieresPageContent } from "./type";

class CarrieresQuery extends BaseQuery<CarrieresPageContent, CarrieresPageContent> {
  constructor() {
    super("/globals/carrieres-page-content");
  }
}

export const carrieresQuery = new CarrieresQuery();
