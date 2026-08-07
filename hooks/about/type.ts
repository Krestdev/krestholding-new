import { Media, RichText } from "../type";

export interface AboutPageContent {
  id: number;
  pageTitle?: string | null;
  historyTitle?: string | null;
  historyBody?: RichText | null;
  historyImage?: Media | number | null;
  perspectivesTitle?: string | null;
  perspectivesBody?: RichText | null;
  perspectivesImage?: Media | number | null;
  visionTitle?: string | null;
  visionBody?: RichText | null;
  missionTitle?: string | null;
  missionBody?: RichText | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
