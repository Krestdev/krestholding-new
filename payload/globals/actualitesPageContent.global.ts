import type { GlobalConfig } from 'payload'

export const ActualitesPageContent: GlobalConfig = {
  slug: 'actualites-page-content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'portfolioKicker',
      type: 'text',
      localized: true,
    },

    // --- Bandeau bas : Espace presse ---
    {
      name: 'pressHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'pressLinks',
      type: 'array',
      label: 'Liens espace presse (3 attendus)',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'pressCtaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'pressCtaUrl',
      type: 'text',
    },

    // --- Bandeau bas : Rester informé ---
    {
      name: 'newsletterInfoLines',
      type: 'array',
      label: 'Lignes d\'info newsletter (2 attendues)',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'newsletterFormLabel',
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
