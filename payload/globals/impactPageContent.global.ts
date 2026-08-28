import type { GlobalConfig } from 'payload'

export const ImpactPageContent: GlobalConfig = {
  slug: 'impact-page-content',
  access: {
    read: () => true,
  },
  fields: [
    // --- Hero ---
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

    // --- Impact en chiffres ---
    {
      name: 'statsKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'statsHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'statsIntro',
      type: 'text',
      localized: true,
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistiques (6 attendues)',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },

    // --- Emplois & compétences ---
    {
      name: 'jobsKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'jobsChartHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'jobsChartData',
      type: 'array',
      label: "Répartition des offres ouvertes par entité",
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'number', required: true },
      ],
    },
    {
      name: 'jobsInfoCards',
      type: 'array',
      label: "Cartes d'information (3 attendues)",
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'text', required: true, localized: true },
      ],
    },

    // --- Un impact raconté ---
    {
      name: 'storyKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'storyHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'storyIntro',
      type: 'text',
      localized: true,
    },
    {
      name: 'storySituationTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'storySituationBody',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'storyActionTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'storyActionBody',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'storyResultTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'storyResultBody',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'storyCtaTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'storyCtaBody',
      type: 'text',
      localized: true,
    },
    {
      name: 'storyCtaPrimaryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'storyCtaPrimaryUrl',
      type: 'text',
    },
    {
      name: 'storyCtaSecondaryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'storyCtaSecondaryUrl',
      type: 'text',
    },

    // --- Démarche extra-financière ---
    {
      name: 'esgKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'esgHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'esgCert1Title',
      type: 'text',
      localized: true,
    },
    {
      name: 'esgCert1Scope',
      type: 'text',
      label: 'Portée (ex. "Creaconsult, LE CARINO, KrestDev")',
    },
    {
      name: 'esgCert2Title',
      type: 'text',
      localized: true,
    },
    {
      name: 'esgCert2Scope',
      type: 'text',
      label: 'Portée',
    },
    {
      name: 'esgEngagementTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'esgEngagementItems',
      type: 'array',
      label: 'Engagements (3 attendus)',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
  ],
}
