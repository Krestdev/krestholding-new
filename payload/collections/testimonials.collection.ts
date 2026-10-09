import type { CollectionConfig } from 'payload'
import { ADMIN_GROUPS } from "../adminGroups";

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: "Témoignage", plural: "Témoignages" },
  access: {
    read: () => true,
  },
  admin: {
    group: ADMIN_GROUPS.accueil,
    description: "Affichés sur la page d'accueil.",
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'authorTitle', 'order'],
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'authorTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'quote',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
