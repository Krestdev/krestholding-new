import { promises as fs } from 'fs'
import path from 'path'
import { ValidationError, type CollectionConfig } from 'payload'
import {
  emailLocales,
  sendJobApplicationEmails,
  type EmailAttachment,
  type EmailLocale,
} from '@/lib/jobApplicationEmails'

// Au-delà, les fichiers ne sont pas joints à la notification (limite courante des serveurs SMTP : ~25 Mo).
const MAX_ATTACHMENTS_BYTES = 20 * 1024 * 1024

type RelationValue = number | string | { id: number | string } | null | undefined
type JobOpeningTitles = Record<string, string | null | undefined>

const relationId = (value: RelationValue) => (typeof value === 'object' && value !== null ? value.id : value)

const isEmailLocale = (value: unknown): value is EmailLocale =>
  emailLocales.includes(value as EmailLocale)

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  access: {
    create: () => true,
  },
  hooks: {
    beforeValidate: [
      // Vérifie l'offre visée avant toute écriture, et garde son titre pour les e-mails.
      async ({ data, operation, req }) => {
        if (operation !== 'create' || !data) return data
        const jobId = relationId(data.relatedJobOpening)
        if (jobId === null || jobId === undefined || jobId === '') return data

        const fail = (message: string) =>
          new ValidationError({
            collection: 'job-applications',
            errors: [{ path: 'relatedJobOpening', message }],
            req,
          })

        const job = (await req.payload
          .findByID({ collection: 'job-openings', id: jobId, locale: 'all', depth: 0, disableErrors: true, req })
          .catch(() => null)) as { title?: JobOpeningTitles; applicationDeadline?: string | null } | null
        if (!job) throw fail("Cette offre d'emploi n'existe pas.")

        if (job.applicationDeadline) {
          // La date limite est incluse : l'offre expire à la fin de ce jour.
          const deadline = new Date(job.applicationDeadline)
          deadline.setUTCHours(23, 59, 59, 999)
          if (Date.now() > deadline.getTime()) throw fail("Cette offre d'emploi n'accepte plus de candidatures.")
        }

        req.context.jobOpeningTitles = job.title ?? {}
        return data
      },
    ],
    afterChange: [
      // Attendu avant la réponse 201 : en serverless, un envoi non attendu peut être coupé.
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        try {
          const defaultLocale = req.payload.config.localization ? req.payload.config.localization.defaultLocale : 'fr'
          const locale = isEmailLocale(req.locale) ? req.locale : isEmailLocale(defaultLocale) ? defaultLocale : 'fr'

          const titles = (req.context.jobOpeningTitles ?? {}) as JobOpeningTitles
          const anyTitle = Object.values(titles).find(Boolean) ?? undefined
          const jobTitleFr = titles.fr || anyTitle
          const jobTitle = titles[locale] || anyTitle

          const attachments: EmailAttachment[] = []
          const omittedFiles: string[] = []
          const documentIds = ((doc.documents ?? []) as RelationValue[])
            .map(relationId)
            .filter((id): id is number | string => id !== null && id !== undefined)

          if (documentIds.length) {
            const { docs: files } = await req.payload.find({
              collection: 'dossier-documents',
              where: { id: { in: documentIds } },
              depth: 0,
              pagination: false,
              req,
            })
            const staticDir = req.payload.collections['dossier-documents'].config.upload.staticDir ?? 'dossier-documents'
            let totalBytes = 0
            for (const file of files as { filename?: string | null; filesize?: number | null }[]) {
              if (!file.filename) continue
              if (totalBytes + (file.filesize ?? 0) > MAX_ATTACHMENTS_BYTES) {
                omittedFiles.push(file.filename)
                continue
              }
              try {
                const content = await fs.readFile(path.resolve(process.cwd(), staticDir, file.filename))
                totalBytes += content.length
                attachments.push({ filename: file.filename, content })
              } catch (error) {
                console.error(`[job-applications] Pièce jointe illisible (${file.filename}) :`, error)
                omittedFiles.push(file.filename)
              }
            }
          }

          await sendJobApplicationEmails(req.payload, {
            locale,
            id: doc.id,
            name: doc.fullName,
            email: doc.email,
            phone: doc.phone,
            desiredRole: doc.desiredRole,
            targetEntityOrSector: doc.targetEntityOrSector,
            targetCity: doc.targetCity,
            jobTitleFr,
            jobTitle,
            attachments,
            omittedFiles,
          })
        } catch (error) {
          // La candidature est enregistrée : un échec d'e-mail ne doit jamais faire échouer la soumission.
          console.error(`[job-applications] Échec de préparation des e-mails pour la candidature ${doc.id} :`, error)
        }
      },
    ],
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
      name: 'relatedJobOpening',
      type: 'relationship',
      relationTo: 'job-openings',
      label: "Offre d'emploi visée (si candidature depuis une fiche offre)",
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
