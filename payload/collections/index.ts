import { Media } from "./media.collection";
import { Subsidiaries } from "./subsidiaries.collection";
import { CompanyValues } from "./companyValues.collection";
import { News } from "./news.collection";
import { Pages } from "./pages.collection";
import { Testimonials } from "./testimonials.collection";
import { Faqs } from "./faqs.collection";
import { Certifications } from "./certifications.collection";
import { Service } from "./service.collection";
import { ContactSubmissions } from "./contactSubmissions.collection";
import { DossierDocuments } from "./dossierDocuments.collection";
import { DossierSubmissions } from "./dossierSubmissions.collection";
import { JobOpenings } from "./jobOpenings.collection";
import { JobApplications } from "./jobApplications.collection";

// Order = admin sidebar order (see payload/adminGroups.ts): it follows the site menu.
export const collections = [
  Testimonials,
  Faqs,
  Certifications,
  CompanyValues,
  Service,
  Subsidiaries,
  News,
  JobOpenings,
  JobApplications,
  ContactSubmissions,
  DossierSubmissions,
  DossierDocuments,
  Pages,
  Media,
];