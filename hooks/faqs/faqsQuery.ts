import { BaseListQuery } from "../baseListQuery";
import { Faq } from "./type";

class FaqsQuery extends BaseListQuery<Faq, Faq> {
  constructor() {
    super("/faqs");
  }
}

export const faqsQuery = new FaqsQuery();
