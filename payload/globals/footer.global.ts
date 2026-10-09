import type { GlobalConfig } from 'payload'
import { ADMIN_GROUPS } from "../adminGroups";

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: "Pied de page",
  admin: {
    group: ADMIN_GROUPS.navigation,
    description: "Colonnes de liens, réseaux sociaux et mentions du bas de page.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      fields: [
        {
          name: 'columnTitle',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'participationsColumnTitle',
      type: 'text',
      label: 'Titre de la colonne "Participations" (liste générée automatiquement depuis les filiales)',
      localized: true,
      defaultValue: 'Participations',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'copyrightNotice',
      type: 'text',
      localized: true,
    },
  ],
}
