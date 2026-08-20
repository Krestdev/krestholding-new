import type { GlobalConfig } from 'payload'

export const ParticipationsPageContent: GlobalConfig = {
  slug: 'participations-page-content',
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
    {
      name: 'heroStats',
      type: 'array',
      label: 'Statistiques du hero (4 attendues)',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },

    // --- Portfolio (grille des participations) ---
    {
      name: 'portfolioKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'portfolioHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'portfolioSubheading',
      type: 'text',
      localized: true,
    },

    // --- Synergies entre entités ---
    {
      name: 'synergiesKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'synergiesHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'synergiesSubheading',
      type: 'text',
      localized: true,
    },
    {
      name: 'synergies',
      type: 'array',
      label: 'Synergies entre entités (6 attendues)',
      fields: [
        { name: 'entityA', type: 'relationship', relationTo: 'subsidiaries', required: true },
        { name: 'entityB', type: 'relationship', relationTo: 'subsidiaries', required: true },
        { name: 'description', type: 'text', required: true, localized: true },
      ],
    },

    // --- Composition du portefeuille ---
    {
      name: 'compositionKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'compositionSubheading',
      type: 'text',
      localized: true,
    },
    {
      name: 'sectorBreakdown',
      type: 'array',
      label: 'Répartition par secteur (5 attendues)',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'percentage', type: 'number', required: true, min: 0, max: 100 },
      ],
    },
    {
      name: 'ownershipBreakdown',
      type: 'array',
      label: 'Répartition par niveau de détention (3 attendues)',
      fields: [
        { name: 'rank', type: 'text', required: true, label: 'Rang (ex. "1", "2")' },
        {
          name: 'rankColor',
          type: 'select',
          defaultValue: 'orange',
          options: [
            { label: 'Orange', value: 'orange' },
            { label: 'Bleu-vert', value: 'teal' },
          ],
        },
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'percentage', type: 'number', required: true, min: 0, max: 100 },
        {
          name: 'barColor',
          type: 'select',
          defaultValue: 'orange',
          options: [
            { label: 'Orange', value: 'orange' },
            { label: 'Gris', value: 'gray' },
          ],
        },
      ],
    },

    // --- Historique / timeline ---
    {
      name: 'timelineKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'timelineSubheading',
      type: 'text',
      localized: true,
    },
    {
      name: 'foundingYear',
      type: 'number',
      defaultValue: 2018,
    },
    {
      name: 'foundingLabel',
      type: 'text',
      localized: true,
    },

    // --- Bandeau CTA (deux colonnes) ---
    {
      name: 'ctaLeftHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaLeftBody',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaLeftPrimaryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaLeftPrimaryUrl',
      type: 'text',
    },
    {
      name: 'ctaLeftSecondaryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaLeftSecondaryUrl',
      type: 'text',
    },
    {
      name: 'ctaRightHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaRightBody',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaRightPrimaryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaRightPrimaryUrl',
      type: 'text',
    },
    {
      name: 'ctaRightSecondaryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaRightSecondaryUrl',
      type: 'text',
    },
  ],
}
