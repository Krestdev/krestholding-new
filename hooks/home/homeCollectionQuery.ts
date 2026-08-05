import { CollectionQuery } from "../collectionQuery";
import { HomePageCollection } from "./type";

class HomeCollectionQuery extends CollectionQuery<HomePageCollection, HomePageCollection> {
  constructor() {
    super("/home");
  }
}

export const homeCollectionQuery = new HomeCollectionQuery();