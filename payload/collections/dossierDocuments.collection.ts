import type { CollectionConfig } from 'payload'

export const DossierDocuments: CollectionConfig = {
  slug: 'dossier-documents',
  access: {
    read: () => true,
    create: () => true,
  },
  admin: {
    useAsTitle: 'filename',
  },
  upload: {
    staticDir: 'dossier-documents',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/zip',
      'application/x-zip-compressed',
    ],
  },
  fields: [],
}
