import { Header } from "./header.global";
import { Footer } from "./footer.global";
import { ContactInfo } from "./contactInfo.global";
import { HomePageContent } from "./homePageContent.global";
import { AboutPageContent } from "./aboutPageContent.global";
import { NotreModeleContent } from "./notreModeleContent.global";
import { ParticipationsPageContent } from "./participationsPageContent.global";
import { ActualitesPageContent } from "./actualitesPageContent.global";
import { ImpactPageContent } from "./impactPageContent.global";
import { CarrieresPageContent } from "./carrieresPageContent.global";

// Order = order inside each admin sidebar section (see payload/adminGroups.ts).
export const globals = [
  HomePageContent,
  AboutPageContent,
  NotreModeleContent,
  ParticipationsPageContent,
  ImpactPageContent,
  ActualitesPageContent,
  CarrieresPageContent,
  ContactInfo,
  Header,
  Footer,
];