import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'Général',
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
