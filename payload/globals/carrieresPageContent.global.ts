import type { GlobalConfig } from 'payload'

export const CarrieresPageContent: GlobalConfig = {
  slug: 'carrieres-page-content',
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

    // --- Où sont les postes ---
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
      name: 'jobsSkillTags',
      type: 'array',
      label: 'Métiers représentés',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'jobsLocationTags',
      type: 'array',
      label: 'Lieu',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },

    // --- Pourquoi nous rejoindre ---
    {
      name: 'whyKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'whyHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'whyCards',
      type: 'array',
      label: 'Cartes (4 attendues)',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'text', required: true, localized: true },
      ],
    },

    // --- Nos offres ---
    {
      name: 'offersKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'offersIntro',
      type: 'text',
      localized: true,
    },
    {
      name: 'offersHeading',
      type: 'text',
      localized: true,
    },

    // --- Notre processus ---
    {
      name: 'processKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'processIntro',
      type: 'text',
      localized: true,
    },
    {
      name: 'processHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'processSteps',
      type: 'array',
      label: 'Étapes (4 attendues)',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'text', required: true, localized: true },
      ],
    },

    // --- Candidature spontanée ---
    {
      name: 'spontaneousKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'spontaneousHeadingLine1',
      type: 'text',
      localized: true,
    },
    {
      name: 'spontaneousHeadingLine2',
      type: 'text',
      localized: true,
    },
  ],
}
