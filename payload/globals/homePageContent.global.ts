import type { GlobalConfig } from 'payload'

export const HomePageContent: GlobalConfig = {
  slug: 'home-page-content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'heroSubheading',
      type: 'text',
      localized: true,
    },
    {
      name: 'heroCtaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'heroCtaUrl',
      type: 'text',
    },
    {
      name: 'heroBgMedia',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'aboutIntroHeading',
      type: 'text',
      localized: true,
    },
    {
      name: 'aboutIntroBody',
      type: 'richText',
      localized: true,
    },
    {
      name: 'newsCalloutText',
      type: 'text',
      localized: true,
    },
  ],
}
