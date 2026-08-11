import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'emails',
      type: 'array',
      label: 'Email Addresses',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      name: 'phones',
      type: 'array',
      label: 'Phone Numbers',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'physicalAddress',
      type: 'text',
    },
    {
      name: 'postalBox',
      type: 'text',
    },
    {
      name: 'mapIframeUrl',
      type: 'text',
      label: 'Map Embed URL / Iframe src',
    },
  ],
}
