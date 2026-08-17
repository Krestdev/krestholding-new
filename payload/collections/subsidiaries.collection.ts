import type { CollectionConfig } from 'payload'

export const Subsidiaries: CollectionConfig = {
  slug: 'subsidiaries',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
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
      label: '"Voir la fiche" URL',
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
  ],
}
