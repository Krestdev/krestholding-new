import { promises as fs } from "fs";
import path from "path";
import type { Payload } from "payload";

export const emailLocales = ["fr", "en", "it"] as const;
export type EmailLocale = (typeof emailLocales)[number];

export interface EmailAttachment {
  filename: string;
  content: Buffer;
}

export interface JobApplicationEmailInput {
  locale: EmailLocale;
  id: number | string;
  name: string;
  email: string;
  phone?: string;
  desiredRole?: string;
  targetEntityOrSector?: string;
  targetCity?: string;
  /** Titre de l'offre en français (notification interne). */
  jobTitleFr?: string;
  /** Titre de l'offre dans la langue du candidat (accusé de réception). */
  jobTitle?: string;
  attachments?: EmailAttachment[];
  /** Fichiers non joints (illisibles ou trop volumineux), consultables dans l'admin. */
  omittedFiles?: string[];
}

const SITE_NAME = "Krest Holding";
// Couleurs du site : fond sombre (le logo est blanc sur fond transparent) et accent orange.
const BRAND_DARK = "#0d0d0d";
const BRAND_ACCENT = "#f29308";
const LOGO_FILE = "krestholding_logo.png";
const LOGO_WIDTH = 140;
const LOGO_HEIGHT = 43;
const FALLBACK_NOTIFY_EMAIL = "contact@krestdev.com";

const t = {
  fr: {
    subject: (job?: string) => (job ? `Candidature reçue - ${job}` : "Nous avons bien reçu votre candidature"),
    greeting: (name: string) => `Bonjour ${name},`,
    received: (job?: string) =>
      job
        ? `Nous vous confirmons la bonne réception de votre candidature pour l'offre « ${job} ».`
        : "Nous vous confirmons la bonne réception de votre candidature.",
    next: "Notre équipe RH revient vers vous si un poste correspond à votre profil.",
    thanks: `Merci de l'intérêt que vous portez à ${SITE_NAME}.`,
    signature: `L'équipe ${SITE_NAME}`,
    automatic: "Cet e-mail a été envoyé automatiquement. Vous pouvez y répondre pour contacter notre équipe.",
  },
  en: {
    subject: (job?: string) => (job ? `Application received - ${job}` : "We have received your application"),
    greeting: (name: string) => `Hello ${name},`,
    received: (job?: string) =>
      job
        ? `We confirm that we have received your application for the position "${job}".`
        : "We confirm that we have received your application.",
    next: "Our HR team will get back to you if a position matches your profile.",
    thanks: `Thank you for your interest in ${SITE_NAME}.`,
    signature: `The ${SITE_NAME} team`,
    automatic: "This is an automated email. You can reply to it to contact our team.",
  },
  it: {
    subject: (job?: string) => (job ? `Candidatura ricevuta - ${job}` : "Abbiamo ricevuto la tua candidatura"),
    greeting: (name: string) => `Buongiorno ${name},`,
    received: (job?: string) =>
      job
        ? `Ti confermiamo di aver ricevuto la tua candidatura per l'offerta "${job}".`
        : "Ti confermiamo di aver ricevuto la tua candidatura.",
    next: "Il nostro team HR ti ricontatterà se una posizione corrisponde al tuo profilo.",
    thanks: `Grazie per l'interesse dimostrato verso ${SITE_NAME}.`,
    signature: `Il team ${SITE_NAME}`,
    automatic: "Questa è un'e-mail automatica. Puoi rispondere per contattare il nostro team.",
  },
} satisfies Record<EmailLocale, unknown>;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const escapeMultiline = (value: string) => escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>");

/** Supprime les retours à la ligne de tout ce qui va dans un sujet ou un en-tête. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

// Logo lu une seule fois par process ; en cas d'échec on retombe sur le nom du site en texte.
let logoPromise: Promise<Buffer | null> | null = null;
function loadLogo(): Promise<Buffer | null> {
  if (!logoPromise) {
    logoPromise = fs.readFile(path.join(process.cwd(), "public", LOGO_FILE)).catch((error) => {
      console.error("[jobApplicationEmails] Logo illisible, repli sur le texte :", error);
      logoPromise = null;
      return null;
    });
  }
  return logoPromise;
}

function layout({ title, body, hasLogo, lang }: { title: string; body: string; hasLogo: boolean; lang: string }) {
  const brand = hasLogo
    ? `<img src="cid:logo" width="${LOGO_WIDTH}" height="${LOGO_HEIGHT}" alt="${SITE_NAME}" style="display:block;border:0;outline:none;text-decoration:none;">`
    : `<span style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#ffffff;">${SITE_NAME}</span>`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background-color:#f4f4f4;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;">
      <tr><td style="background-color:${BRAND_DARK};padding:24px 32px;">${brand}</td></tr>
      <tr><td style="background-color:${BRAND_ACCENT};height:4px;line-height:4px;font-size:0;">&nbsp;</td></tr>
      <tr><td style="padding:32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;">${body}</td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildNotification(input: JobApplicationEmailInput, hasLogo: boolean) {
  const poste = input.jobTitleFr || input.desiredRole || "Candidature spontanée";
  const subject = oneLine(`Nouvelle candidature - ${poste} - ${input.name}`);

  const rows: [string, string | undefined][] = [
    ["Offre", input.jobTitleFr || "Candidature spontanée"],
    ["Métier recherché", input.desiredRole],
    ["Entité ou secteur visé", input.targetEntityOrSector],
    ["Ville cible", input.targetCity],
    ["Nom", input.name],
    ["E-mail", input.email],
    ["Téléphone", input.phone],
  ];
  const filledRows = rows.filter((row): row is [string, string] => Boolean(row[1]));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const adminUrl = siteUrl ? `${siteUrl}/admin/collections/job-applications/${input.id}` : undefined;
  const fileNames = (input.attachments ?? []).map((a) => a.filename);
  const omitted = input.omittedFiles ?? [];

  const text = [
    `Nouvelle candidature reçue sur le site ${SITE_NAME}.`,
    "",
    ...filledRows.map(([label, value]) => `${label} : ${value}`),
    "",
    fileNames.length ? `Pièces jointes : ${fileNames.join(", ")}` : "Aucune pièce jointe.",
    ...(omitted.length ? [`Non joints (à consulter dans l'admin) : ${omitted.join(", ")}`] : []),
    ...(adminUrl ? [`Voir dans l'admin : ${adminUrl}`] : []),
  ].join("\n");

  const tableRows = filledRows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #eeeeee;color:#666666;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 0;border-bottom:1px solid #eeeeee;vertical-align:top;">${escapeMultiline(value)}</td></tr>`,
    )
    .join("");

  const body = `
<h1 style="margin:0 0 16px;font-size:20px;color:${BRAND_DARK};">Nouvelle candidature</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;">${tableRows}</table>
<p style="margin:24px 0 0;">${
    fileNames.length
      ? `<strong>Pièces jointes :</strong> ${fileNames.map(escapeHtml).join(", ")}`
      : "Aucune pièce jointe."
  }</p>
${omitted.length ? `<p style="margin:8px 0 0;color:#cf2538;">Non joints (à consulter dans l'admin) : ${omitted.map(escapeHtml).join(", ")}</p>` : ""}
${
  adminUrl
    ? `<p style="margin:24px 0 0;"><a href="${escapeHtml(adminUrl)}" style="display:inline-block;background-color:${BRAND_ACCENT};color:#000000;text-decoration:none;padding:10px 18px;font-weight:bold;">Voir dans l'admin</a></p>`
    : ""
}`;

  return { subject, text, html: layout({ title: subject, body, hasLogo, lang: "fr" }) };
}

function buildAcknowledgement(input: JobApplicationEmailInput, hasLogo: boolean) {
  const dict = t[input.locale];
  const subject = oneLine(dict.subject(input.jobTitle));

  const text = [
    dict.greeting(input.name),
    "",
    dict.received(input.jobTitle),
    dict.next,
    "",
    dict.thanks,
    "",
    dict.signature,
    "",
    "--",
    dict.automatic,
  ].join("\n");

  const p = (content: string, style = "") => `<p style="margin:0 0 16px;${style}">${content}</p>`;
  const body = [
    p(escapeHtml(dict.greeting(input.name))),
    p(escapeHtml(dict.received(input.jobTitle))),
    p(escapeHtml(dict.next)),
    p(escapeHtml(dict.thanks)),
    p(`<strong>${escapeHtml(dict.signature)}</strong>`, "margin-bottom:0;"),
    `<p style="margin:32px 0 0;padding-top:16px;border-top:1px solid #eeeeee;font-size:12px;color:#888888;">${escapeHtml(dict.automatic)}</p>`,
  ].join("\n");

  return { subject, text, html: layout({ title: subject, body, hasLogo, lang: input.locale }) };
}

/**
 * Envoie la notification interne et l'accusé de réception d'une candidature.
 * Ne lève jamais d'erreur : la candidature est déjà enregistrée, un échec d'e-mail est seulement journalisé.
 */
export async function sendJobApplicationEmails(payload: Payload, input: JobApplicationEmailInput): Promise<void> {
  const notifyTo = process.env.APPLICATIONS_NOTIFY_EMAIL || FALLBACK_NOTIFY_EMAIL;
  const logo = await loadLogo();
  const logoAttachment = logo
    ? [{ filename: LOGO_FILE, content: logo, cid: "logo", contentDisposition: "inline" as const }]
    : [];

  const notification = buildNotification(input, Boolean(logo));
  const acknowledgement = buildAcknowledgement(input, Boolean(logo));
  const applicantEmail = oneLine(input.email);

  const results = await Promise.allSettled([
    payload.sendEmail({
      to: notifyTo,
      replyTo: applicantEmail,
      subject: notification.subject,
      text: notification.text,
      html: notification.html,
      attachments: [
        ...logoAttachment,
        ...(input.attachments ?? []).map((a) => ({ filename: oneLine(a.filename), content: a.content })),
      ],
    }),
    payload.sendEmail({
      to: applicantEmail,
      replyTo: notifyTo,
      subject: acknowledgement.subject,
      text: acknowledgement.text,
      html: acknowledgement.html,
      attachments: logoAttachment,
    }),
  ]);

  const labels = ["notification interne", "accusé de réception"];
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`[jobApplicationEmails] Échec de l'envoi (${labels[i]}) pour la candidature ${input.id} :`, result.reason);
    }
  });
}
