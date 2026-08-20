import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'code', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'code',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'badgeIcon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
