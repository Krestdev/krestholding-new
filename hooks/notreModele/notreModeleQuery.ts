import { BaseQuery } from "../baseQuery";
import { NotreModeleContent } from "./type";

class NotreModeleQuery extends BaseQuery<NotreModeleContent, NotreModeleContent> {
  constructor() {
    super("/globals/notre-modele-content");
  }
}

export const notreModeleQuery = new NotreModeleQuery();
