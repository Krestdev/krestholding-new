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

    // --- Page contact : siège & réseaux ---
    {
      name: 'legalName',
      type: 'text',
      defaultValue: 'KREST HOLDING',
      label: 'Raison sociale (adresse)',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
    },
    {
      name: 'twitterUrl',
      type: 'text',
      label: 'X / Twitter URL',
    },
    {
      name: 'openingHours',
      type: 'text',
      defaultValue: 'Lun — Ven, 8h — 17h (WAT)',
    },
    {
      name: 'directionsUrl',
      type: 'text',
      label: '"Itinéraire" URL (Google Maps, etc.)',
    },

    // --- Page contact : identification légale ---
    {
      name: 'rccmNumber',
      type: 'text',
      label: 'RCCM',
    },
    {
      name: 'taxpayerNumber',
      type: 'text',
      label: 'N° Contribuable',
    },
    {
      name: 'legalNoticeUrl',
      type: 'text',
      label: '"Mentions légales" URL',
      defaultValue: '/mentions-legales',
    },
  ],
}
