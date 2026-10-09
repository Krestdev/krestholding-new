import type { CollectionConfig } from 'payload'
import { ADMIN_GROUPS } from "../adminGroups";

export const DossierDocuments: CollectionConfig = {
  slug: 'dossier-documents',
  labels: { singular: "Document", plural: "Documents des dossiers" },
  access: {
    read: () => true,
    create: () => true,
  },
  admin: {
    group: ADMIN_GROUPS.contact,
    description: "Fichiers joints aux dossiers et aux candidatures.",
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
