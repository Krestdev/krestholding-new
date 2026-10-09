import type { CollectionConfig } from 'payload'
import { ADMIN_GROUPS } from "../adminGroups";

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: "Question", plural: "FAQ" },
  access: {
    read: () => true,
  },
  admin: {
    group: ADMIN_GROUPS.accueil,
    description: "Questions fréquentes affichées sur la page d'accueil.",
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
