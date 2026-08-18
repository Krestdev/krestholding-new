import type { GlobalConfig } from 'payload'

export const HomePageContent: GlobalConfig = {
  slug: 'home-page-content',
  access: {
    read: () => true,
  },
  fields: [
    // --- Hero Section ---
    {
      name: 'heroHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'heroSubheading',
      type: 'text',
      localized: true,
    },
    {
      name: 'heroCtaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'heroCtaUrl',
      type: 'text',
    },
    {
      name: 'heroSecondaryCtaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'heroSecondaryCtaUrl',
      type: 'text',
    },
    {
      name: 'heroBgMedia',
      type: 'upload',
      relationTo: 'media',
    },

    // --- About Section ---
    {
      name: 'aboutKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'aboutIntroHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'aboutIntroBody',
      type: 'text',
      localized: true,
    },
    {
      name: 'aboutQuoteAvatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Portrait (encart citation)',
    },
    {
      name: 'aboutQuoteAuthorName',
      type: 'text',
      label: 'Nom (encart citation)',
    },
    {
      name: 'aboutQuoteAuthorTitle',
      type: 'text',
      label: 'Fonction (encart citation)',
      localized: true,
    },
    {
      name: 'aboutQuoteText',
      type: 'text',
      label: 'Citation',
      localized: true,
    },
    {
      name: 'aboutTags',
      type: 'array',
      label: 'Badges (ex. ISO 9001, Depuis 2018)',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'aboutSecondKicker',
      type: 'text',
      label: 'Kicker 2 (ex. "Comment nous créons de la valeur")',
      localized: true,
    },
    {
      name: 'aboutStatsHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'aboutStatsBody',
      type: 'text',
      localized: true,
    },
    {
      name: 'aboutStats',
      type: 'array',
      label: 'Statistiques À Propos (6 attendues)',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'aboutCtaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'aboutCtaUrl',
      type: 'text',
    },

    // --- Poles Section ("Les 5 pôles d'accompagnement") ---
    {
      name: 'polesKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'polesHeading',
      type: 'text',
      localized: true,
    },

    // --- Investment Model Section ("Notre modèle en 3 temps") ---
    {
      name: 'modelKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'modelHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'modelBody',
      type: 'text',
      localized: true,
    },
    {
      name: 'modelSteps',
      type: 'array',
      label: 'Étapes du modèle (3 attendues)',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'processHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'processSteps',
      type: 'array',
      label: 'Étapes du processus (4 attendues)',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'duration', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'processNoteTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'processNoteBody',
      type: 'text',
      localized: true,
    },
    {
      name: 'processCtaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'processCtaUrl',
      type: 'text',
    },

    // --- Portfolio / Capabilities Section (subsidiaries) ---
    {
      name: 'subsidiariesKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'subsidiariesHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'subsidiariesSubheading',
      type: 'text',
      localized: true,
    },
    {
      name: 'synergiesHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'synergies',
      type: 'array',
      label: 'Synergies entre entités',
      fields: [
        { name: 'entityA', type: 'relationship', relationTo: 'subsidiaries', required: true },
        { name: 'entityB', type: 'relationship', relationTo: 'subsidiaries', required: true },
        { name: 'description', type: 'text', required: true, localized: true },
      ],
    },

    // --- FAQ Section ---
    {
      name: 'faqImage',
      type: 'upload',
      relationTo: 'media',
    },

    // --- Security & Certifications Section ---
    {
      name: 'certificationsKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'certificationsHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'certificationsBody',
      type: 'text',
      localized: true,
    },

    // --- Testimonials Section ---
    {
      name: 'testimonialsKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'testimonialsHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'testimonialsCtaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'testimonialsCtaUrl',
      type: 'text',
    },

    // --- News Section ---
    {
      name: 'newsKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'newsHeading',
      type: 'text',
      localized: true,
    },

    // --- Application / Contact Section ("Soumettre un dossier") ---
    {
      name: 'contactKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'contactHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'contactConfidentialityTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'contactConfidentialityBody',
      type: 'text',
      localized: true,
    },
    {
      name: 'contactChecklist',
      type: 'array',
      label: '"Avant de commencer" checklist',
      fields: [
        { name: 'item', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'contactEmail',
      type: 'text',
    },
    {
      name: 'contactAddress',
      type: 'text',
      localized: true,
    },

    // --- Newsletter Band ---
    {
      name: 'newsletterKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'newsletterHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'newsletterPlaceholder',
      type: 'text',
      localized: true,
    },
    {
      name: 'newsletterButtonLabel',
      type: 'text',
      localized: true,
    },
  ],
}
