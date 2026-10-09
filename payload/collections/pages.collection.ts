import type { CollectionConfig } from 'payload'
import { ADMIN_GROUPS } from "../adminGroups";

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: "Page Formation", plural: "Pages Formation" },
  access: {
    read: () => true,
  },
  admin: {
    group: ADMIN_GROUPS.formation,
    description: "Pages /formation/programmes et /formation/certifications. Ne font pas partie de l'arborescence principale.",
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'text',
          localized: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
