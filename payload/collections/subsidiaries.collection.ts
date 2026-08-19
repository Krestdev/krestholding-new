import type { CollectionConfig } from 'payload'

const POLE_OPTIONS = [
  'Growth, Marketing & Brand',
  'Développement informatique',
  'Comptabilité & Fiscalité',
  'Procurement',
  'Ressources Humaines',
]

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Subsidiaries: CollectionConfig = {
  slug: 'subsidiaries',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.name) {
          data.slug = slugify(data.name)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      label: 'Slug (URL de la fiche participation, généré automatiquement si laissé vide)',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        'Solutions Digitales',
        'Restauration',
        'Architecture & Design',
        'Géotechnique & Génie Civil',
        'Loisirs & Bien-Être',
        'Gestion Fourrière',
      ],
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortDescription',
      type: 'text',
      localized: true,
    },
    {
      name: 'fullDescription',
      type: 'richText',
      localized: true,
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'Website URL',
    },
    {
      name: 'featuredInHome',
      type: 'checkbox',
      defaultValue: true,
      label: 'Afficher sur la page d\'accueil',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Ordre d\'affichage',
    },
    {
      name: 'participationLabel',
      type: 'text',
      label: 'Participation (ex. "100%", "91%", "Majoritaire")',
    },
    {
      name: 'entryYear',
      type: 'number',
      label: 'Année d\'entrée au capital',
    },
    {
      name: 'accentColor',
      type: 'select',
      label: 'Couleur d\'accent',
      defaultValue: 'teal',
      options: [
        { label: 'Bleu-vert', value: 'teal' },
        { label: 'Rouge', value: 'red' },
        { label: 'Orange', value: 'orange' },
        { label: 'Gris', value: 'gray' },
      ],
    },
    {
      name: 'detailUrl',
      type: 'text',
      label: '"Voir la fiche" URL (optionnel, sinon /partenaires/[slug])',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistiques clés',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },

    // --- Fiche participation : hero ---
    {
      name: 'city',
      type: 'text',
      label: 'Ville',
    },
    {
      name: 'country',
      type: 'text',
      label: 'Pays',
      defaultValue: 'Cameroun',
    },

    // --- Fiche participation : "En un coup d'œil" ---
    {
      name: 'companyOverviewIntro',
      type: 'text',
      label: 'Coup d\'œil — paragraphe (côté droit)',
      localized: true,
    },
    {
      name: 'legalName',
      type: 'text',
      label: 'Raison sociale',
    },
    {
      name: 'activityLabel',
      type: 'text',
      label: 'Activité',
      localized: true,
    },
    {
      name: 'headcount',
      type: 'text',
      label: 'Effectif',
    },
    {
      name: 'foundedYear',
      type: 'number',
      label: 'Année de création de l\'entreprise',
    },
    {
      name: 'certificationLabel',
      type: 'text',
      label: 'Certification',
    },

    // --- Fiche participation : "Pourquoi avons-nous rejoint X" ---
    {
      name: 'motivationPoints',
      type: 'array',
      label: 'Ce qui a motivé la prise de participation (points)',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'entrySituationPoints',
      type: 'array',
      label: 'La situation à l\'entrée (points)',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },

    // --- Fiche participation : "Ce que KREST a apporté" ---
    {
      name: 'polesActive',
      type: 'select',
      hasMany: true,
      label: 'Pôles mobilisés sur cette participation',
      options: POLE_OPTIONS,
    },
    {
      name: 'startingSituationBody',
      type: 'textarea',
      label: 'Situation de départ',
      localized: true,
    },
    {
      name: 'whatKrestDidBody',
      type: 'textarea',
      label: 'Ce que KREST a fait',
      localized: true,
    },
    {
      name: 'resultBody',
      type: 'textarea',
      label: 'Résultat',
      localized: true,
    },

    // --- Fiche participation : galerie ---
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerie ("Ce que fait" l\'entité)',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },

    // --- Fiche participation : gouvernance & modalités de détention ---
    {
      name: 'governanceIntro',
      type: 'text',
      label: 'Gouvernance — paragraphe',
      localized: true,
    },
    {
      name: 'participationType',
      type: 'text',
      label: 'Type de participation (ex. "Contrôle total")',
    },
    {
      name: 'boardRepresentation',
      type: 'text',
      label: 'Représentation au conseil',
    },
    {
      name: 'reportingFrequency',
      type: 'text',
      label: 'Rythme de reporting',
    },
    {
      name: 'engagementDuration',
      type: 'text',
      label: 'Durée d\'engagement (ex. "5 à 10 ans")',
    },
    {
      name: 'operationalDirection',
      type: 'text',
      label: 'Direction opérationnelle',
    },
    {
      name: 'participationStatus',
      type: 'text',
      label: 'Statut',
      defaultValue: 'Participation active',
    },

    // --- Fiche participation : synergies ---
    {
      name: 'synergiesIntro',
      type: 'text',
      label: 'Synergies — paragraphe',
      localized: true,
    },
  ],
}
