import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "en" | "fr" | "it";

export const locales: Locale[] = ["en", "fr", "it"];

const translations: Record<Locale, Record<string, string>> = {
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À Propos",
    "nav.partners": "Partenaires",
    "nav.training": "Formations",
    "nav.contact": "Contact",
    "nav.programs": "Programmes",
    "nav.certifications": "Certifications",

    "footer.navigation": "Navigation",
    "footer.training": "Formations",
    "footer.contact": "Contact",
    "footer.contactCta": "Prendre contact",
    "footer.rightsReserved": "Tous droits réservés.",
    "footer.defaultDescription":
      "Groupe multisectoriel d'excellence au service de la transformation digitale et des infrastructures.",

    "common.loading": "Chargement...",
    "common.readMore": "En savoir plus",
    "common.visitSite": "Visiter le site",
    "common.backToHome": "Retour à l'accueil",
    "common.noData": "Aucune donnée disponible pour le moment.",

    "home.discoverSubsidiaries": "Découvrir nos filiales",
    "home.subsidiariesTitle": "Nos Filiales",
    "home.subsidiariesSubtitle": "Découvrez les entités qui composent notre écosystème.",
    "home.viewAllPartners": "Voir tous les partenaires",
    "home.noSubsidiaries": "Aucune filiale enregistrée pour le moment.",
    "home.newsTitle": "Actualités",
    "home.noNews": "Aucun article d'actualité publié pour le moment.",
    "home.readArticle": "Lire l'article",
    "home.learnMoreAbout": "En savoir plus sur notre histoire",

    "about.valuesTitle": "Nos Valeurs",
    "about.valuesSubtitle": "Les principes fondamentaux qui guident nos actions au quotidien.",
    "about.noValues": "Aucune valeur d'entreprise définie pour le moment.",
    "about.visionTitleFallback": "Notre Vision",
    "about.missionTitleFallback": "Notre Mission",
    "about.historyTitleFallback": "Notre Histoire",
    "about.perspectivesTitleFallback": "Nos Perspectives",

    "partenaires.title": "Nos Filiales & Partenaires",
    "partenaires.subtitle":
      "Explorez le réseau de filiales spécialisées qui font la force et la diversité de Krest Holding.",
    "partenaires.noResults": "Aucune filiale répertoriée dans le CMS pour le moment.",
    "partenaires.visitOfficialSite": "Visiter le site web officiel",

    "news.noContent": "Aucun contenu additionnel rédigé.",

    "formation.breadcrumbHome": "Accueil",
    "formation.breadcrumbTraining": "Formations",

    "contact.title": "Contactez-nous",
    "contact.subtitle":
      "Nos équipes sont à votre disposition pour toute information ou opportunité de partenariat.",
    "contact.emailsTitle": "Adresses Email",
    "contact.phonesTitle": "Téléphones",
    "contact.addressTitle": "Adresse & Boîte Postale",
    "contact.locationTitle": "Localisation",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.partners": "Partners",
    "nav.training": "Training",
    "nav.contact": "Contact",
    "nav.programs": "Programs",
    "nav.certifications": "Certifications",

    "footer.navigation": "Navigation",
    "footer.training": "Training",
    "footer.contact": "Contact",
    "footer.contactCta": "Get in touch",
    "footer.rightsReserved": "All rights reserved.",
    "footer.defaultDescription":
      "A multi-sector group focused on digital transformation and infrastructure excellence.",

    "common.loading": "Loading...",
    "common.readMore": "Learn more",
    "common.visitSite": "Visit website",
    "common.backToHome": "Back to home",
    "common.noData": "No data available yet.",

    "home.discoverSubsidiaries": "Discover our subsidiaries",
    "home.subsidiariesTitle": "Our Subsidiaries",
    "home.subsidiariesSubtitle": "Discover the entities that make up our ecosystem.",
    "home.viewAllPartners": "View all partners",
    "home.noSubsidiaries": "No subsidiaries registered yet.",
    "home.newsTitle": "News",
    "home.noNews": "No news articles published yet.",
    "home.readArticle": "Read article",
    "home.learnMoreAbout": "Learn more about our history",

    "about.valuesTitle": "Our Values",
    "about.valuesSubtitle": "The core principles that guide our actions every day.",
    "about.noValues": "No company values defined yet.",
    "about.visionTitleFallback": "Our Vision",
    "about.missionTitleFallback": "Our Mission",
    "about.historyTitleFallback": "Our History",
    "about.perspectivesTitleFallback": "Our Perspectives",

    "partenaires.title": "Our Subsidiaries & Partners",
    "partenaires.subtitle":
      "Explore the network of specialized subsidiaries that give Krest Holding its strength and diversity.",
    "partenaires.noResults": "No subsidiaries listed yet.",
    "partenaires.visitOfficialSite": "Visit official website",

    "news.noContent": "No additional content written yet.",

    "formation.breadcrumbHome": "Home",
    "formation.breadcrumbTraining": "Training",

    "contact.title": "Contact Us",
    "contact.subtitle": "Our teams are available for any information or partnership opportunity.",
    "contact.emailsTitle": "Email Addresses",
    "contact.phonesTitle": "Phone Numbers",
    "contact.addressTitle": "Address & PO Box",
    "contact.locationTitle": "Location",
  },
  it: {
    "nav.home": "Home",
    "nav.about": "Chi Siamo",
    "nav.partners": "Partner",
    "nav.training": "Formazione",
    "nav.contact": "Contatto",
    "nav.programs": "Programmi",
    "nav.certifications": "Certificazioni",

    "footer.navigation": "Navigazione",
    "footer.training": "Formazione",
    "footer.contact": "Contatto",
    "footer.contactCta": "Contattaci",
    "footer.rightsReserved": "Tutti i diritti riservati.",
    "footer.defaultDescription":
      "Un gruppo multisettoriale orientato all'eccellenza nella trasformazione digitale e nelle infrastrutture.",

    "common.loading": "Caricamento...",
    "common.readMore": "Scopri di più",
    "common.visitSite": "Visita il sito",
    "common.backToHome": "Torna alla home",
    "common.noData": "Nessun dato disponibile per il momento.",

    "home.discoverSubsidiaries": "Scopri le nostre filiali",
    "home.subsidiariesTitle": "Le Nostre Filiali",
    "home.subsidiariesSubtitle": "Scopri le entità che compongono il nostro ecosistema.",
    "home.viewAllPartners": "Vedi tutti i partner",
    "home.noSubsidiaries": "Nessuna filiale registrata per il momento.",
    "home.newsTitle": "Notizie",
    "home.noNews": "Nessun articolo pubblicato per il momento.",
    "home.readArticle": "Leggi l'articolo",
    "home.learnMoreAbout": "Scopri di più sulla nostra storia",

    "about.valuesTitle": "I Nostri Valori",
    "about.valuesSubtitle": "I principi fondamentali che guidano le nostre azioni quotidiane.",
    "about.noValues": "Nessun valore aziendale definito per il momento.",
    "about.visionTitleFallback": "La Nostra Visione",
    "about.missionTitleFallback": "La Nostra Missione",
    "about.historyTitleFallback": "La Nostra Storia",
    "about.perspectivesTitleFallback": "Le Nostre Prospettive",

    "partenaires.title": "Le Nostre Filiali e Partner",
    "partenaires.subtitle":
      "Esplora la rete di filiali specializzate che rappresentano la forza e la diversità di Krest Holding.",
    "partenaires.noResults": "Nessuna filiale elencata per il momento.",
    "partenaires.visitOfficialSite": "Visita il sito ufficiale",

    "news.noContent": "Nessun contenuto aggiuntivo redatto.",

    "formation.breadcrumbHome": "Home",
    "formation.breadcrumbTraining": "Formazione",

    "contact.title": "Contattaci",
    "contact.subtitle": "I nostri team sono disponibili per qualsiasi informazione o opportunità di partenariato.",
    "contact.emailsTitle": "Indirizzi Email",
    "contact.phonesTitle": "Numeri di Telefono",
    "contact.addressTitle": "Indirizzo e Casella Postale",
    "contact.locationTitle": "Posizione",
  },
};

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: "fr",
      setLocale: (locale) => set({ locale }),
      t: (key) => translations[get().locale]?.[key] ?? key,
    }),
    { name: "krestholding-locale" },
  ),
);
