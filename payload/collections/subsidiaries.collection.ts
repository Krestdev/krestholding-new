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
  ],
}
