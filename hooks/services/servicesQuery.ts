import { BaseListQuery } from "../baseListQuery";
import { ServiceItem } from "./type";

class ServicesQuery extends BaseListQuery<ServiceItem, ServiceItem> {
  constructor() {
    super("/services");
  }
}

export const servicesQuery = new ServicesQuery();
