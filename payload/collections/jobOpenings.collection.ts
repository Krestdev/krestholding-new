import type { CollectionConfig } from 'payload'

export const JobOpenings: CollectionConfig = {
  slug: 'job-openings',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'relatedSubsidiary', 'contractType', 'location', 'publishedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'relatedSubsidiary',
      type: 'relationship',
      relationTo: 'subsidiaries',
      label: 'Entité',
    },
    {
      name: 'contractType',
      type: 'select',
      label: 'Type de contrat',
      options: ['CDI', 'CDD', 'Stage', 'Freelance'],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lieu',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publiée le',
    },
    {
      name: 'applicationDeadline',
      type: 'date',
      label: 'Date limite',
    },
  ],
}
