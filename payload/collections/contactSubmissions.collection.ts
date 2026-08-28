import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    create: () => true,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'motif', 'email', 'createdAt'],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Nom et prénom',
    },
    {
      name: 'motif',
      type: 'select',
      required: true,
      label: 'Motif de la demande',
      options: [
        { label: 'Parcours prioritaire', value: 'parcours-prioritaire' },
        { label: 'Investisseur · Partenaire', value: 'investisseur-partenaire' },
        { label: 'Presse', value: 'presse' },
        { label: 'Candidat', value: 'candidat' },
        { label: 'Autre', value: 'autre' },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Courriel',
    },
    {
      name: 'phoneCountryCode',
      type: 'text',
      defaultValue: '237',
      label: 'Indicatif téléphonique',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      label: 'Téléphone',
    },
    {
      name: 'organization',
      type: 'text',
      required: true,
      label: 'Organisation',
    },
    {
      name: 'country',
      type: 'text',
      defaultValue: 'Cameroun',
      required: true,
      label: 'Pays',
    },
    {
      name: 'projectDescription',
      type: 'textarea',
      required: true,
      label: 'Votre projet en quelques lignes',
    },
    {
      name: 'consentAccepted',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      label: 'Consentement au traitement des données',
    },
  ],
}
