import { BaseListQuery } from "../baseListQuery";
import { Testimonial } from "./type";

class TestimonialsQuery extends BaseListQuery<Testimonial, Testimonial> {
  constructor() {
    super("/testimonials");
  }
}

export const testimonialsQuery = new TestimonialsQuery();
