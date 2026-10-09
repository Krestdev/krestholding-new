import type { CollectionConfig } from 'payload'
import { ADMIN_GROUPS } from "../adminGroups";

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  labels: { singular: "Certification", plural: "Certifications" },
  access: {
    read: () => true,
  },
  admin: {
    group: ADMIN_GROUPS.accueil,
    description: "Affichées sur la page d'accueil (section Formations).",
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
