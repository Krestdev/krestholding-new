import type { CollectionConfig } from 'payload'

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const JobOpenings: CollectionConfig = {
  slug: 'job-openings',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'relatedSubsidiary', 'contractType', 'location', 'publishedAt'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      label: 'Slug (URL de la fiche offre, généré automatiquement si laissé vide)',
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
      name: 'workTime',
      type: 'select',
      label: 'Temps de travail',
      options: ['Temps plein', 'Temps partiel'],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lieu',
    },
    {
      name: 'experienceLevel',
      type: 'text',
      label: 'Expérience requise (ex. "3 ans et +")',
    },
    {
      name: 'compensation',
      type: 'text',
      label: 'Rémunération (ex. "À trancher")',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'missions',
      type: 'array',
      label: 'Vos missions',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'profile',
      type: 'array',
      label: 'Le profil recherché',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'whatWeOffer',
      type: 'array',
      label: 'Ce que nous offrons',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'workEnvironment',
      type: 'text',
      label: 'Environnement de travail',
      localized: true,
    },
    {
      name: 'recruitmentStepsText',
      type: 'text',
      label: 'Étapes du recrutement (ex. "Candidature → Échange → Entretien entité → Réponse")',
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
