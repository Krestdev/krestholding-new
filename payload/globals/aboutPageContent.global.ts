import type { GlobalConfig } from 'payload'

export const AboutPageContent: GlobalConfig = {
  slug: 'about-page-content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'historyTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'historyBody',
      type: 'richText',
      localized: true,
    },
    {
      name: 'historyImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'perspectivesTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'perspectivesBody',
      type: 'richText',
      localized: true,
    },
    {
      name: 'perspectivesImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'visionTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'visionBody',
      type: 'richText',
      localized: true,
    },
    {
      name: 'missionTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'missionBody',
      type: 'richText',
      localized: true,
    },
  ],
}
