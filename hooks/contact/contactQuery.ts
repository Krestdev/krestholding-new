import { BaseQuery } from "../baseQuery";
import { ContactInfo } from "./type";

class ContactQuery extends BaseQuery<ContactInfo, ContactInfo> {
  constructor() {
    super("/globals/contact-info");
  }
}

export const contactQuery = new ContactQuery();
