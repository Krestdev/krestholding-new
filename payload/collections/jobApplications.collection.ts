import type { CollectionConfig } from 'payload'

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  access: {
    create: () => true,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'desiredRole', 'targetEntityOrSector', 'email', 'createdAt'],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Nom et prénom',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Téléphone',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Courriel',
    },
    {
      name: 'targetEntityOrSector',
      type: 'text',
      required: true,
      label: 'Entité ou secteur visé',
    },
    {
      name: 'desiredRole',
      type: 'text',
      required: true,
      label: 'Métier recherché',
    },
    {
      name: 'targetCity',
      type: 'text',
      required: true,
      label: 'Ville cible',
    },
    {
      name: 'documents',
      type: 'relationship',
      relationTo: 'dossier-documents',
      hasMany: true,
      label: 'Documents joints',
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
