import type { GlobalConfig } from 'payload'

export const NotreModeleContent: GlobalConfig = {
  slug: 'notre-modele-content',
  access: {
    read: () => true,
  },
  fields: [
    // --- Header ---
    {
      name: 'heroHeading',
      type: 'text',
      localized: true,
    },

    // --- Thèse d'investissement ---
    {
      name: 'thesisKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'thesisIntro',
      type: 'text',
      label: 'Intro courte (alignée à droite)',
      localized: true,
    },
    {
      name: 'thesisBody',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'thesisQuote',
      type: 'textarea',
      label: 'Citation / synthèse du modèle',
      localized: true,
    },

    // --- Secteurs & géographies ---
    {
      name: 'sectorsKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'sectorsIntro',
      type: 'text',
      label: 'Intro courte (alignée à droite)',
      localized: true,
    },
    {
      name: 'sectorCards',
      type: 'array',
      label: 'Secteurs cibles (5 attendus)',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'interventionZones',
      type: 'array',
      label: "Zone d'intervention (villes/zones)",
      fields: [{ name: 'label', type: 'text', required: true, localized: true }],
    },
    {
      name: 'interventionZonesImage',
      type: 'upload',
      relationTo: 'media',
      label: "Visuel du panneau Zone d'intervention",
    },

    // --- Les 5 pôles d'expertise ---
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
    {
      name: 'polesIntro',
      type: 'text',
      localized: true,
    },
    {
      name: 'poleCards',
      type: 'array',
      label: "Pôles d'expertise (5 attendus)",
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        {
          name: 'examples',
          type: 'array',
          label: 'Exemples de participation',
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
      ],
    },

    // --- Un accompagnement, raconté (case study) ---
    {
      name: 'caseStudyKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'caseStudyHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'caseStudyIntro',
      type: 'text',
      localized: true,
    },
    {
      name: 'caseStudySituationTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'caseStudySituationBody',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'caseStudyActionTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'caseStudyActionBody',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'caseStudyResultTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'caseStudyResultBody',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'caseStudyCtaTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'caseStudyCtaBody',
      type: 'text',
      localized: true,
    },
    {
      name: 'caseStudyCtaPrimaryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'caseStudyCtaPrimaryUrl',
      type: 'text',
    },
    {
      name: 'caseStudyCtaSecondaryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'caseStudyCtaSecondaryUrl',
      type: 'text',
    },

    // --- Notre impact ---
    {
      name: 'impactKicker',
      type: 'text',
      localized: true,
    },
    {
      name: 'impactHeading',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'impactStats',
      type: 'array',
      label: 'Statistiques impact (5 attendues)',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'impactCtaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'impactCtaUrl',
      type: 'text',
    },
  ],
}
