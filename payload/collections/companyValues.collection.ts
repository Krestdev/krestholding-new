import type { CollectionConfig } from 'payload'
import { ADMIN_GROUPS } from "../adminGroups";

export const CompanyValues: CollectionConfig = {
  slug: 'company-values',
  labels: { singular: "Valeur", plural: "Valeurs du groupe" },
  access: {
    read: () => true,
  },
  admin: {
    group: ADMIN_GROUPS.groupe,
    description: "Affichées sur la page Le groupe.",
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 0,
    },
  ],
}
