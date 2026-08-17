import { BaseListQuery } from "../baseListQuery";
import { Certification } from "./type";

class CertificationsQuery extends BaseListQuery<Certification, Certification> {
  constructor() {
    super("/certifications");
  }
}

export const certificationsQuery = new CertificationsQuery();
