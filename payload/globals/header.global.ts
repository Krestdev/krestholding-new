import type { GlobalConfig } from 'payload'
import { ADMIN_GROUPS } from "../adminGroups";

export const Header: GlobalConfig = {
  slug: 'header',
  label: "Menu principal",
  admin: {
    group: ADMIN_GROUPS.navigation,
    description: "Menu en haut du site : une entrée par rubrique (Le groupe, Notre modèle, Nos participations, Notre impact, Actualités, Carrières, Contact).",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
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
        {
          name: 'subItems',
          type: 'array',
          label: 'Sub Navigation Items',
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
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Soumettre',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      defaultValue: '/contact',
    },
  ],
}
