import type { CollectionConfig } from 'payload'
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
import { ADMIN_GROUPS } from "../adminGroups";

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: "Article", plural: "Articles" },
  access: {
    read: () => true,
  },
  admin: {
    group: ADMIN_GROUPS.actualites,
    description: "Articles de la page Actualités.",
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt'],
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
      name: 'excerpt',
      type: 'text',
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'Actualité',
      localized: true,
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Équipe Krest',
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, UploadFeature()],
      }),
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'relatedSubsidiaries',
      type: 'relationship',
      relationTo: 'subsidiaries',
      hasMany: true,
      label: 'Participations concernées',
    },
  ],
}
