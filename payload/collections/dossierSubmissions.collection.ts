import type { CollectionConfig } from 'payload'

export const DossierSubmissions: CollectionConfig = {
  slug: 'dossier-submissions',
  access: {
    create: () => true,
  },
  admin: {
    useAsTitle: 'reference',
    defaultColumns: ['reference', 'companyName', 'needType', 'createdAt'],
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create' && data && !data.reference) {
          const year = new Date().getFullYear()
          const yearStart = new Date(`${year}-01-01T00:00:00.000Z`).toISOString()
          const yearEnd = new Date(`${year + 1}-01-01T00:00:00.000Z`).toISOString()
          const { totalDocs } = await req.payload.count({
            collection: 'dossier-submissions',
            where: {
              createdAt: {
                greater_than_equal: yearStart,
                less_than: yearEnd,
              },
            },
          })
          data.reference = `KH-${year}-${String(totalDocs + 1).padStart(4, '0')}`
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'reference',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
      },
    },

    // --- Étape 1 : Votre entreprise ---
    { name: 'companyName', type: 'text', required: true, label: 'Raison sociale' },
    { name: 'industry', type: 'text', required: true, label: "Secteur d'activité" },
    { name: 'foundedYear', type: 'number', required: true, label: 'Année de création' },
    { name: 'headcount', type: 'text', required: true, label: 'Effectif' },
    { name: 'cityCountry', type: 'text', required: true, label: 'Ville / Pays' },
    { name: 'websiteUrl', type: 'text', label: 'Site web' },

    // --- Étape 2 : Votre projet ---
    {
      name: 'needType',
      type: 'select',
      label: 'Nature du besoin',
      options: ['Capital', 'Structuration', 'Accès au marché', 'Autre'],
    },
    {
      name: 'amountRange',
      type: 'select',
      label: 'Montant recherché (fourchette)',
      options: [
        { label: '< 10M FCFA', value: 'lt-10m' },
        { label: '10M - 50M FCFA', value: '10m-50m' },
        { label: '50M - 200M FCFA', value: '50m-200m' },
        { label: '> 200M FCFA', value: 'gt-200m' },
        { label: 'Non déterminé', value: 'non-determine' },
      ],
    },
    {
      name: 'projectDescription',
      type: 'textarea',
      required: true,
      label: 'Votre projet en quelques lignes',
    },

    // --- Étape 3 : Vos documents ---
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
