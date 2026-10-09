/**
 * Seeds the CMS with sample content in French and English (Italian falls back
 * to English, the default locale). For local investigation only: every company,
 * person and figure is a placeholder marked "Exemple" / "[...]".
 *
 *   npm run seed
 *
 * Refuses to run if subsidiaries already exist, so it never overwrites content.
 */
import { getPayload } from "payload";
import sharp from "sharp";
import config from "../payload.config";

const payload = await getPayload({ config });

// ---------- Bilingual values ----------

/** A localized value: resolved to `fr` on create, then `en` on a second update. */
class T<V = string> {
  constructor(
    public fr: V,
    public en: V,
  ) {}
}
const t = <V>(fr: V, en: V) => new T(fr, en);
type Locale = "fr" | "en";

function resolve(value: unknown, locale: Locale): unknown {
  if (value instanceof T) return value[locale];
  if (Array.isArray(value)) return value.map((v) => resolve(v, locale));
  if (value && typeof value === "object" && !Buffer.isBuffer(value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v, locale)]));
  }
  return value;
}

/** Array rows are shared across locales: reuse the ids created in French. */
function withIds(data: unknown, created: unknown): unknown {
  if (Array.isArray(data)) {
    const rows = Array.isArray(created) ? created : [];
    return data.map((row, i) => {
      const createdRow = rows[i] as Record<string, unknown> | undefined;
      const merged = withIds(row, createdRow);
      return createdRow?.id && merged && typeof merged === "object" ? { ...merged, id: createdRow.id } : merged;
    });
  }
  if (data && typeof data === "object") {
    const c = (created ?? {}) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, withIds(v, c[k])]));
  }
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Data = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createDoc(collection: any, data: Data) {
  const doc = await payload.create({ collection, locale: "fr", data: resolve(data, "fr") as Data, depth: 0 });
  await payload.update({ collection, id: doc.id, locale: "en", data: withIds(resolve(data, "en"), doc) as Data, depth: 0 });
  return doc;
}

async function setGlobal(slug: string, data: Data) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = slug as any;
  const doc = await payload.updateGlobal({ slug: s, locale: "fr", data: resolve(data, "fr") as Data, depth: 0 });
  await payload.updateGlobal({ slug: s, locale: "en", data: withIds(resolve(data, "en"), doc) as Data, depth: 0 });
}

// ---------- Lexical rich text ----------

const block = { format: "" as const, indent: 0, version: 1, direction: "ltr" as const };
const paragraph = (text: string) => ({
  ...block,
  type: "paragraph",
  textFormat: 0,
  textStyle: "",
  children: [{ type: "text", text, format: 0, detail: 0, mode: "normal", style: "", version: 1 }],
});
const doc = (paragraphs: string[]) => ({ root: { ...block, type: "root", children: paragraphs.map(paragraph) } });
const rt = (fr: string[], en: string[]) => t(doc(fr), doc(en));

// ---------- Placeholder images ----------

const palettes = [
  ["#0f3d3e", "#2a9d8f"],
  ["#1d3557", "#457b9d"],
  ["#3d405b", "#e07a5f"],
  ["#264653", "#e9c46a"],
  ["#2b2d42", "#8d99ae"],
  ["#5f0f40", "#fb8b24"],
];
let paletteIndex = 0;

async function image(label: string, width = 1600, height = 1000) {
  const [from, to] = palettes[paletteIndex++ % palettes.length];
  const safe = label.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif"
      font-size="${Math.round(Math.min(width, height * 1.6) / 18)}" fill="#fff" fill-opacity="0.85">${safe}</text></svg>`;
  const data = await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toBuffer();
  const name = `seed-${label.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${paletteIndex}.jpg`;
  const created = await payload.create({ collection: "media", data: { alt: label }, file: { data, mimetype: "image/jpeg", name, size: data.length } });
  return created.id;
}

// ---------- Guard ----------

if ((await payload.count({ collection: "subsidiaries" })).totalDocs > 0) {
  payload.logger.warn("Content already exists (subsidiaries is not empty). Nothing seeded.");
  process.exit(0);
}

// ---------- Participations (subsidiaries) ----------

payload.logger.info("Seeding participations...");

const entities = [
  { name: "Exemple Digital", category: "Solutions Digitales", share: "100%", entry: 2018, accent: "teal", city: "Douala", poles: ["Développement informatique", "Growth, Marketing & Brand"], activity: t("solutions digitales", "digital solutions") },
  { name: "Exemple Restauration", category: "Restauration", share: "91%", entry: 2020, accent: "red", city: "Douala", poles: ["Growth, Marketing & Brand", "Procurement"], activity: t("restauration", "food service") },
  { name: "Exemple Architecture", category: "Architecture & Design", share: "Majoritaire", entry: 2021, accent: "orange", city: "Yaoundé", poles: ["Comptabilité & Fiscalité", "Ressources Humaines"], activity: t("architecture et design", "architecture and design") },
  { name: "Exemple Géotechnique", category: "Géotechnique & Génie Civil", share: "75%", entry: 2022, accent: "gray", city: "Douala", poles: ["Procurement", "Comptabilité & Fiscalité"], activity: t("géotechnique et génie civil", "geotechnics and civil engineering") },
  { name: "Exemple Loisirs", category: "Loisirs & Bien-Être", share: "60%", entry: 2023, accent: "teal", city: "Kribi", poles: ["Growth, Marketing & Brand", "Ressources Humaines"], activity: t("loisirs et bien-être", "leisure and wellness") },
  { name: "Exemple Fourrière", category: "Gestion Fourrière", share: "100%", entry: 2024, accent: "orange", city: "Douala", poles: ["Développement informatique", "Procurement"], activity: t("gestion de fourrière", "vehicle impound management") },
];

const subsidiaryIds: number[] = [];
for (const [i, e] of entities.entries()) {
  const a = e.activity;
  const created = await createDoc("subsidiaries", {
    name: e.name,
    category: e.category,
    logo: await image(e.name, 400, 200),
    featuredImage: await image(e.name),
    shortDescription: t(`Participation exemple du groupe dans le secteur ${a.fr}.`, `Sample group holding in the ${a.en} sector.`),
    fullDescription: rt(
      [`${e.name} est une participation fictive utilisée pour tester la fiche participation (secteur ${a.fr}).`, "Ce contenu est un exemple et doit être remplacé par les informations réelles."],
      [`${e.name} is a fictitious holding used to test the participation page (${a.en} sector).`, "This is sample content and must be replaced with the real information."],
    ),
    websiteUrl: "https://example.com",
    featuredInHome: true,
    order: i + 1,
    participationLabel: e.share,
    entryYear: e.entry,
    accentColor: e.accent,
    stats: [
      { label: t("Collaborateurs", "Employees"), value: `${20 + i * 12}` },
      { label: t("Croissance du CA", "Revenue growth"), value: `+${15 + i * 5}%` },
      { label: t("Année d'entrée", "Year of entry"), value: `${e.entry}` },
    ],
    city: e.city,
    country: "Cameroun",
    companyOverviewIntro: t(`Un aperçu de ${e.name}, acteur exemple du secteur ${a.fr}.`, `An overview of ${e.name}, a sample player in ${a.en}.`),
    legalName: `${e.name} SARL`,
    activityLabel: t(a.fr.charAt(0).toUpperCase() + a.fr.slice(1), a.en.charAt(0).toUpperCase() + a.en.slice(1)),
    headcount: `${20 + i * 12}`,
    foundedYear: e.entry - 3,
    certificationLabel: "[Certification]",
    motivationPoints: [
      { text: t("Fort potentiel de croissance sur son marché", "Strong growth potential in its market") },
      { text: t("Équipe dirigeante engagée", "Committed management team") },
      { text: t("Synergies avec les autres entités du groupe", "Synergies with the group's other entities") },
    ],
    entrySituationPoints: [
      { text: t("Organisation à structurer", "Organisation to be structured") },
      { text: t("Outils de gestion limités", "Limited management tools") },
      { text: t("Besoin de financement pour se développer", "Funding needed to grow") },
    ],
    polesActive: e.poles,
    startingSituationBody: t("Situation de départ exemple : une entreprise prometteuse mais encore peu structurée.", "Sample starting point: a promising but still loosely structured company."),
    whatKrestDidBody: t("Exemple : structuration de la gestion, apport des pôles du groupe et accompagnement stratégique.", "Example: management structuring, support from the group's poles and strategic guidance."),
    resultBody: t("Résultat exemple : croissance de l'activité et organisation plus solide.", "Sample result: business growth and a stronger organisation."),
    gallery: [{ image: await image(`${e.name} 1`) }, { image: await image(`${e.name} 2`) }, { image: await image(`${e.name} 3`) }],
    governanceIntro: t("Gouvernance exemple, à remplacer par le dispositif réel.", "Sample governance, to be replaced with the actual arrangements."),
    participationType: e.share === "100%" ? "Contrôle total" : "Participation majoritaire",
    boardRepresentation: "[Représentation au conseil]",
    reportingFrequency: "Mensuel",
    engagementDuration: "5 à 10 ans",
    operationalDirection: "[Direction opérationnelle]",
    participationStatus: "Participation active",
    synergiesIntro: t("Exemples de synergies avec les autres entités du groupe.", "Examples of synergies with the group's other entities."),
  });
  subsidiaryIds.push(created.id);
}

// ---------- Other collections ----------

payload.logger.info("Seeding values, poles, news, jobs, FAQs, testimonials, certifications, pages...");

const values = [
  [t("Excellence", "Excellence"), t("Viser le meilleur niveau dans chaque participation.", "Aim for the highest standard in every holding.")],
  [t("Engagement", "Commitment"), t("Accompagner nos entités sur le long terme.", "Support our entities for the long term.")],
  [t("Transparence", "Transparency"), t("Une gouvernance claire et un reporting régulier.", "Clear governance and regular reporting.")],
  [t("Impact", "Impact"), t("Créer de la valeur et des emplois au Cameroun.", "Create value and jobs in Cameroon.")],
] as const;
for (const [i, [title, description]] of values.entries()) await createDoc("company-values", { title, description, order: i + 1 });

const poles = [
  ["Growth, Marketing & Brand", "Stratégie de marque, marketing et croissance commerciale.", "Brand strategy, marketing and commercial growth."],
  ["Développement informatique", "Outils numériques, sites et applications métiers.", "Digital tools, websites and business applications."],
  ["Comptabilité & Fiscalité", "Tenue comptable, fiscalité et reporting financier.", "Bookkeeping, tax and financial reporting."],
  ["Procurement", "Achats groupés et négociation fournisseurs.", "Group purchasing and supplier negotiation."],
  ["Ressources Humaines", "Recrutement, formation et gestion des talents.", "Recruitment, training and talent management."],
];
for (const [i, [title, fr, en]] of poles.entries()) {
  await createDoc("services", {
    title,
    slug: title.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: t(fr, en),
    example: t("Ex. Projet exemple pour une filiale", "E.g. Sample project for a subsidiary"),
    content: rt([fr], [en]),
    featuredInHero: true,
    order: i + 1,
  });
}

const newsItems = [
  [t("Le groupe annonce une nouvelle participation", "The group announces a new holding"), "nouvelle-participation"],
  [t("Bilan annuel : une année de croissance", "Annual review: a year of growth"), "bilan-annuel"],
  [t("Lancement d'un programme de formation", "Launch of a training programme"), "programme-formation"],
  [t("Visite des sites de nos participations", "Visit to our holdings' sites"), "visite-des-sites"],
  [t("Recrutement : le groupe renforce ses équipes", "Hiring: the group strengthens its teams"), "recrutement-equipes"],
  [t("Nouvelle synergie entre deux entités", "New synergy between two entities"), "nouvelle-synergie"],
] as const;
for (const [i, [title, slug]] of newsItems.entries()) {
  await createDoc("news", {
    title,
    slug: `exemple-${slug}`,
    excerpt: t("Article d'actualité exemple, à remplacer par un vrai communiqué.", "Sample news article, to be replaced with a real announcement."),
    featuredImage: await image(`Actualité ${i + 1}`),
    category: t("Actualité", "News"),
    author: "Équipe Krest",
    content: rt(
      ["Ceci est un article exemple pour vérifier la mise en page de la page Actualités.", "Le contenu réel sera ajouté par l'équipe."],
      ["This is a sample article to check the News page layout.", "The real content will be added by the team."],
    ),
    publishedAt: new Date(Date.now() - (i * 12 + 3) * 86_400_000).toISOString(),
    relatedSubsidiaries: [subsidiaryIds[i % subsidiaryIds.length]],
  });
}

const jobs = [
  [t("Chef de projet digital", "Digital project manager"), "CDI", "Temps plein", "Douala", "3 ans et +"],
  [t("Comptable confirmé", "Senior accountant"), "CDI", "Temps plein", "Douala", "5 ans et +"],
  [t("Architecte d'intérieur", "Interior architect"), "CDD", "Temps plein", "Yaoundé", "2 ans et +"],
  [t("Ingénieur géotechnicien", "Geotechnical engineer"), "CDI", "Temps plein", "Douala", "3 ans et +"],
  [t("Stagiaire marketing", "Marketing intern"), "Stage", "Temps plein", "Douala", "Débutant"],
  [t("Développeur web freelance", "Freelance web developer"), "Freelance", "Temps partiel", "Télétravail", "2 ans et +"],
] as const;
for (const [i, [title, contractType, workTime, location, experienceLevel]] of jobs.entries()) {
  await createDoc("job-openings", {
    title,
    slug: `exemple-offre-${i + 1}`,
    relatedSubsidiary: subsidiaryIds[i % subsidiaryIds.length],
    contractType,
    workTime,
    location,
    experienceLevel,
    compensation: "À définir",
    description: t("Offre d'emploi exemple pour tester les pages Carrières.", "Sample job offer to test the Careers pages."),
    missions: [{ text: t("Mission exemple 1", "Sample responsibility 1") }, { text: t("Mission exemple 2", "Sample responsibility 2") }, { text: t("Mission exemple 3", "Sample responsibility 3") }],
    profile: [{ text: t("Diplôme dans le domaine", "Degree in the field") }, { text: t("Esprit d'équipe", "Team spirit") }],
    whatWeOffer: [{ text: t("Environnement stimulant", "Stimulating environment") }, { text: t("Évolution au sein du groupe", "Career growth within the group") }],
    workEnvironment: t("Équipe exemple au sein d'une filiale du groupe.", "Sample team within one of the group's subsidiaries."),
    recruitmentStepsText: t("Candidature → Échange → Entretien entité → Réponse", "Application → Call → Interview with the entity → Answer"),
    publishedAt: new Date(Date.now() - (i * 5 + 2) * 86_400_000).toISOString(),
    applicationDeadline: new Date(Date.now() + (30 + i * 7) * 86_400_000).toISOString(),
  });
}

const faqs = [
  [t("Qu'est-ce que KREST Holding ?", "What is KREST Holding?"), t("Réponse exemple : un groupe qui prend des participations dans des entreprises et les accompagne.", "Sample answer: a group that takes stakes in companies and supports them.")],
  [t("Comment soumettre un dossier ?", "How do I submit a proposal?"), t("Réponse exemple : via le formulaire « Soumettre un dossier » de la page Contact.", "Sample answer: through the \"Submit a proposal\" form on the Contact page.")],
  [t("Quels secteurs vous intéressent ?", "Which sectors interest you?"), t("Réponse exemple : digital, restauration, architecture, génie civil, loisirs et services.", "Sample answer: digital, food service, architecture, civil engineering, leisure and services.")],
  [t("Combien de temps dure l'étude d'un dossier ?", "How long does a review take?"), t("Réponse exemple : quelques semaines selon la complexité.", "Sample answer: a few weeks depending on complexity.")],
  [t("Accompagnez-vous les entreprises après l'investissement ?", "Do you support companies after investing?"), t("Réponse exemple : oui, grâce aux pôles d'expertise du groupe.", "Sample answer: yes, through the group's expertise poles.")],
] as const;
for (const [i, [question, answer]] of faqs.entries()) {
  await createDoc("faqs", { question, answer: t(doc([answer.fr]), doc([answer.en])), category: t("Général", "General"), order: i + 1 });
}

for (const i of [1, 2, 3]) {
  await createDoc("testimonials", {
    authorName: `[Nom du témoin ${i}]`,
    authorTitle: t(`Dirigeant, ${entities[i].name}`, `Manager, ${entities[i].name}`),
    avatar: await image(`Portrait ${i}`, 600, 600),
    quote: t("Témoignage exemple, à remplacer par une citation réelle.", "Sample testimonial, to be replaced with a real quote."),
    rating: 5,
    order: i,
  });
}

for (const i of [1, 2, 3]) {
  await createDoc("certifications", {
    title: t(`Certification exemple ${i}`, `Sample certification ${i}`),
    code: `EX-00${i}`,
    description: t("Description exemple de la certification.", "Sample certification description."),
    order: i,
  });
}

for (const [slug, fr, en] of [
  ["programmes", "Programmes de formation", "Training programmes"],
  ["certifications", "Certifications", "Certifications"],
] as const) {
  await createDoc("pages", {
    title: t(fr, en),
    slug,
    content: rt([`${fr} — contenu exemple de la page.`], [`${en} — sample page content.`]),
    seo: { metaTitle: t(fr, en), metaDescription: t(`${fr} du groupe (exemple).`, `The group's ${en.toLowerCase()} (sample).`) },
  });
}

// ---------- Globals ----------

payload.logger.info("Seeding page content (globals)...");
const [s1, s2, s3, s4, s5, s6] = subsidiaryIds;
const synergies = [
  { entityA: s1, entityB: s2, description: t("Exemple : le digital développe les outils de commande de la restauration.", "Example: digital builds the food-service ordering tools.") },
  { entityA: s3, entityB: s4, description: t("Exemple : architecture et géotechnique mènent des projets communs.", "Example: architecture and geotechnics run joint projects.") },
  { entityA: s1, entityB: s6, description: t("Exemple : une application de suivi pour la gestion de fourrière.", "Example: a tracking app for impound management.") },
];
const stat = (value: string, fr: string, en: string) => ({ value, label: t(fr, en) });
const item = (fr: string, en: string) => ({ text: t(fr, en) });
const card = (frTitle: string, enTitle: string, fr: string, en: string) => ({ title: t(frTitle, enTitle), description: t(fr, en) });

await setGlobal("header", {
  logo: await image("KREST Holding", 560, 172),
  navItems: [
    { label: t("Le groupe", "The group"), url: "/le-groupe" },
    { label: t("Notre modèle", "Our model"), url: "/notre-modele" },
    { label: t("Nos participations", "Our holdings"), url: "/nos-participations" },
    { label: t("Notre impact", "Our impact"), url: "/notre-impact" },
    { label: t("Actualités", "News"), url: "/actualites" },
    { label: t("Carrières", "Careers"), url: "/carrieres" },
    { label: t("Contact", "Contact"), url: "/contact" },
  ],
  ctaLabel: t("Soumettre un dossier", "Submit a proposal"),
  ctaUrl: "/contact/soumettre-un-dossier",
});

await setGlobal("footer", {
  description: rt(["Groupe multisectoriel au service de la croissance de ses participations (texte exemple)."], ["A multi-sector group supporting the growth of its holdings (sample text)."]),
  columns: [
    {
      columnTitle: t("Le groupe", "The group"),
      links: [
        { label: t("Le groupe", "The group"), url: "/le-groupe" },
        { label: t("Notre modèle", "Our model"), url: "/notre-modele" },
        { label: t("Notre impact", "Our impact"), url: "/notre-impact" },
      ],
    },
    {
      columnTitle: t("Ressources", "Resources"),
      links: [
        { label: t("Actualités", "News"), url: "/actualites" },
        { label: t("Carrières", "Careers"), url: "/carrieres" },
        { label: t("Contact", "Contact"), url: "/contact" },
      ],
    },
  ],
  participationsColumnTitle: t("Nos participations", "Our holdings"),
  copyrightNotice: t("Tous droits réservés.", "All rights reserved."),
});

await setGlobal("contact-info", {
  emails: [{ email: "contact@krestholding.example" }],
  phones: [{ phone: "+237 6XX XX XX XX" }],
  physicalAddress: "Douala, Cameroun",
  postalBox: "[BP]",
  legalName: "[Raison sociale]",
  openingHours: "Lun – Ven : 8h00 – 17h00",
  rccmNumber: "[RCCM]",
  taxpayerNumber: "[N° Contribuable]",
});

await setGlobal("home-page-content", {
  heroHeading: t("Bâtir des champions locaux", "Building local champions"),
  heroSubheading: t("Un groupe qui investit et accompagne des entreprises au Cameroun (texte exemple).", "A group that invests in and supports companies in Cameroon (sample text)."),
  heroCtaLabel: t("Découvrir nos participations", "Discover our holdings"),
  heroCtaUrl: "/nos-participations",
  heroSecondaryCtaLabel: t("Soumettre un dossier", "Submit a proposal"),
  heroSecondaryCtaUrl: "/contact/soumettre-un-dossier",
  heroBgMedia: await image("Accueil KREST", 1920, 1080),
  aboutKicker: t("Le groupe", "The group"),
  aboutIntroHeading: t("Un investisseur engagé aux côtés des entrepreneurs", "A committed investor alongside entrepreneurs"),
  aboutIntroBody: t("Texte de présentation exemple du groupe.", "Sample introduction text for the group."),
  aboutQuoteAvatar: await image("Portrait dirigeant", 600, 600),
  aboutQuoteAuthorName: "[Nom du dirigeant]",
  aboutQuoteAuthorTitle: t("Président", "Chairman"),
  aboutQuoteText: t("Citation exemple du dirigeant.", "Sample quote from the chairman."),
  aboutTags: [{ label: t("Depuis 2018", "Since 2018") }, { label: t("Multisectoriel", "Multi-sector") }],
  aboutSecondKicker: t("Comment nous créons de la valeur", "How we create value"),
  aboutStatsHeading: t("Le groupe en chiffres", "The group in figures"),
  aboutStatsBody: t("Chiffres exemples, à remplacer.", "Sample figures, to be replaced."),
  aboutStats: [stat("6", "Participations", "Holdings"), stat("150+", "Collaborateurs", "Employees"), stat("5", "Pôles d'expertise", "Expertise poles"), stat("2018", "Création", "Founded"), stat("3", "Villes", "Cities"), stat("+25%", "Croissance moyenne", "Average growth")],
  aboutCtaLabel: t("En savoir plus", "Learn more"),
  aboutCtaUrl: "/le-groupe",
  polesKicker: t("Nos pôles", "Our poles"),
  polesHeading: t("Des expertises partagées entre les entités", "Expertise shared across entities"),
  modelKicker: t("Notre modèle", "Our model"),
  modelHeading: t("Investir, structurer, accélérer", "Invest, structure, accelerate"),
  modelBody: t("Description exemple du modèle d'investissement.", "Sample description of the investment model."),
  modelSteps: [card("Investir", "Invest", "Prise de participation dans des entreprises à potentiel.", "Taking stakes in high-potential companies."), card("Structurer", "Structure", "Mise en place de la gestion et de la gouvernance.", "Setting up management and governance."), card("Accélérer", "Accelerate", "Croissance grâce aux pôles du groupe.", "Growth through the group's poles.")],
  processHeading: t("Notre processus d'investissement", "Our investment process"),
  processSteps: [
    { title: t("Soumission du dossier", "Proposal submission"), duration: t("Jour 1", "Day 1") },
    { title: t("Étude préliminaire", "Preliminary review"), duration: t("2 semaines", "2 weeks") },
    { title: t("Due diligence", "Due diligence"), duration: t("4 semaines", "4 weeks") },
    { title: t("Décision", "Decision"), duration: t("1 semaine", "1 week") },
  ],
  processNoteTitle: t("Bon à savoir", "Good to know"),
  processNoteBody: t("Délais indicatifs (exemple).", "Indicative timelines (sample)."),
  processCtaLabel: t("Soumettre un dossier", "Submit a proposal"),
  processCtaUrl: "/contact/soumettre-un-dossier",
  subsidiariesKicker: t("Nos participations", "Our holdings"),
  subsidiariesHeading: t("Un portefeuille diversifié", "A diversified portfolio"),
  subsidiariesSubheading: t("Découvrez les entités du groupe (exemples).", "Discover the group's entities (samples)."),
  synergiesHeading: t("Des synergies entre nos entités", "Synergies between our entities"),
  synergies,
  faqImage: await image("FAQ"),
  certificationsKicker: t("Formations", "Training"),
  certificationsHeading: t("Nos certifications", "Our certifications"),
  certificationsBody: t("Texte exemple sur les certifications.", "Sample text about certifications."),
  testimonialsKicker: t("Témoignages", "Testimonials"),
  testimonialsHeading: t("Ils nous font confiance", "They trust us"),
  testimonialsCtaLabel: t("Voir nos participations", "See our holdings"),
  testimonialsCtaUrl: "/nos-participations",
  newsKicker: t("Actualités", "News"),
  newsHeading: t("Les dernières nouvelles du groupe", "The latest group news"),
  contactKicker: t("Contact", "Contact"),
  contactHeading: t("Vous avez un projet d'entreprise ?", "Have a business project?"),
  contactConfidentialityTitle: t("Confidentialité", "Confidentiality"),
  contactConfidentialityBody: t("Vos informations sont traitées de manière confidentielle (texte exemple).", "Your information is treated confidentially (sample text)."),
  contactChecklist: [{ item: t("Présentation de l'entreprise", "Company presentation") }, { item: t("États financiers récents", "Recent financial statements") }, { item: t("Besoin de financement", "Funding needs") }],
  contactEmail: "contact@krestholding.example",
  contactAddress: t("Douala, Cameroun", "Douala, Cameroon"),
  newsletterKicker: t("Newsletter", "Newsletter"),
  newsletterHeading: t("Restez informé", "Stay informed"),
  newsletterPlaceholder: t("Votre adresse e-mail", "Your email address"),
  newsletterButtonLabel: t("S'inscrire", "Subscribe"),
});

await setGlobal("about-page-content", {
  pageTitle: t("Le groupe", "The group"),
  historyTitle: t("Notre histoire", "Our history"),
  historyBody: rt(["Texte exemple sur l'histoire du groupe."], ["Sample text about the group's history."]),
  historyImage: await image("Notre histoire"),
  perspectivesTitle: t("Nos perspectives", "Our outlook"),
  perspectivesBody: rt(["Texte exemple sur les perspectives."], ["Sample text about the outlook."]),
  perspectivesImage: await image("Perspectives"),
  visionTitle: t("Notre vision", "Our vision"),
  visionBody: rt(["Texte exemple sur la vision."], ["Sample text about the vision."]),
  missionTitle: t("Notre mission", "Our mission"),
  missionBody: rt(["Texte exemple sur la mission."], ["Sample text about the mission."]),
});

await setGlobal("notre-modele-content", {
  heroHeading: t("Notre modèle", "Our model"),
  thesisKicker: t("Notre thèse", "Our thesis"),
  thesisIntro: t("Introduction exemple de la thèse d'investissement.", "Sample introduction to the investment thesis."),
  thesisBody: t("Texte exemple détaillant la thèse d'investissement du groupe.", "Sample text detailing the group's investment thesis."),
  thesisQuote: t("Citation exemple résumant le modèle.", "Sample quote summarising the model."),
  sectorsKicker: t("Secteurs", "Sectors"),
  sectorsIntro: t("Les secteurs ciblés (exemple).", "Target sectors (sample)."),
  sectorCards: [card("Digital", "Digital", "Solutions et services numériques.", "Digital solutions and services."), card("Restauration", "Food service", "Restaurants et services alimentaires.", "Restaurants and food services."), card("Construction", "Construction", "Architecture et génie civil.", "Architecture and civil engineering."), card("Services", "Services", "Loisirs et services spécialisés.", "Leisure and specialised services.")],
  interventionZones: [{ label: t("Douala", "Douala") }, { label: t("Yaoundé", "Yaoundé") }, { label: t("Kribi", "Kribi") }],
  interventionZonesImage: await image("Zones d'intervention"),
  polesKicker: t("Nos pôles", "Our poles"),
  polesHeading: t("Des expertises mutualisées", "Pooled expertise"),
  polesIntro: t("Les pôles accompagnent chaque participation (exemple).", "The poles support each holding (sample)."),
  poleCards: poles.map(([title, fr, en]) => ({ title: t(title, title), examples: [item(fr, en), item("Exemple d'intervention", "Sample engagement")] })),
  caseStudyKicker: t("Cas concret", "Case study"),
  caseStudyHeading: t("Une participation accompagnée", "A supported holding"),
  caseStudyIntro: t("Cas exemple, à remplacer.", "Sample case, to be replaced."),
  caseStudySituationTitle: t("La situation", "The situation"),
  caseStudySituationBody: t("Situation exemple.", "Sample situation."),
  caseStudyActionTitle: t("Notre action", "Our action"),
  caseStudyActionBody: t("Action exemple.", "Sample action."),
  caseStudyResultTitle: t("Le résultat", "The result"),
  caseStudyResultBody: t("Résultat exemple.", "Sample result."),
  caseStudyCtaTitle: t("Votre entreprise a ce potentiel ?", "Does your company have this potential?"),
  caseStudyCtaBody: t("Parlons-en.", "Let's talk."),
  caseStudyCtaPrimaryLabel: t("Soumettre un dossier", "Submit a proposal"),
  caseStudyCtaPrimaryUrl: "/contact/soumettre-un-dossier",
  caseStudyCtaSecondaryLabel: t("Nos participations", "Our holdings"),
  caseStudyCtaSecondaryUrl: "/nos-participations",
  impactKicker: t("Notre impact", "Our impact"),
  impactHeading: t("Un impact mesurable (exemple)", "A measurable impact (sample)"),
  impactStats: [stat("150+", "Emplois", "Jobs"), stat("6", "Entreprises", "Companies"), stat("+25%", "Croissance", "Growth")],
  impactCtaLabel: t("Voir notre impact", "See our impact"),
  impactCtaUrl: "/notre-impact",
});

await setGlobal("participations-page-content", {
  heroHeading: t("Nos participations", "Our holdings"),
  heroSubheading: t("Un portefeuille d'entreprises accompagnées (exemples).", "A portfolio of supported companies (samples)."),
  heroStats: [stat("6", "Participations", "Holdings"), stat("6", "Secteurs", "Sectors"), stat("150+", "Collaborateurs", "Employees"), stat("2018", "Première participation", "First holding")],
  portfolioKicker: t("Portefeuille", "Portfolio"),
  portfolioHeading: t("Les entités du groupe", "The group's entities"),
  portfolioSubheading: t("Fiches exemples.", "Sample profiles."),
  synergiesKicker: t("Synergies", "Synergies"),
  synergiesHeading: t("Des entités qui travaillent ensemble", "Entities that work together"),
  synergiesSubheading: t("Exemples de collaborations.", "Sample collaborations."),
  synergies,
  compositionKicker: t("Composition", "Composition"),
  compositionSubheading: t("Répartition du portefeuille (exemple).", "Portfolio breakdown (sample)."),
  sectorBreakdown: [
    { label: t("Digital", "Digital"), percentage: 30 },
    { label: t("Restauration", "Food service"), percentage: 20 },
    { label: t("Construction", "Construction"), percentage: 30 },
    { label: t("Services", "Services"), percentage: 20 },
  ],
  ownershipBreakdown: [
    { rank: "1", rankColor: "orange", label: t("Contrôle total", "Full control"), percentage: 50, barColor: "orange" },
    { rank: "2", rankColor: "teal", label: t("Majoritaire", "Majority"), percentage: 50, barColor: "gray" },
  ],
  timelineKicker: t("Historique", "Timeline"),
  timelineSubheading: t("Les entrées au capital (exemple).", "Entries into the capital (sample)."),
  foundingYear: 2018,
  foundingLabel: t("Création du groupe", "Group founded"),
  ctaLeftHeading: t("Vous êtes entrepreneur ?", "Are you an entrepreneur?"),
  ctaLeftBody: t("Soumettez votre projet.", "Submit your project."),
  ctaLeftPrimaryLabel: t("Soumettre un dossier", "Submit a proposal"),
  ctaLeftPrimaryUrl: "/contact/soumettre-un-dossier",
  ctaLeftSecondaryLabel: t("Notre modèle", "Our model"),
  ctaLeftSecondaryUrl: "/notre-modele",
  ctaRightHeading: t("Vous cherchez un emploi ?", "Looking for a job?"),
  ctaRightBody: t("Rejoignez une de nos entités.", "Join one of our entities."),
  ctaRightPrimaryLabel: t("Voir les offres", "See job offers"),
  ctaRightPrimaryUrl: "/carrieres",
  ctaRightSecondaryLabel: t("Contact", "Contact"),
  ctaRightSecondaryUrl: "/contact",
});

const jobsChartData = entities.map((e, i) => ({ label: t(e.name, e.name), value: 2 + (i % 3) }));

await setGlobal("impact-page-content", {
  heroHeading: t("Notre impact", "Our impact"),
  heroSubheading: t("Mesurer la valeur créée (exemple).", "Measuring the value created (sample)."),
  statsKicker: t("En chiffres", "In figures"),
  statsHeading: t("L'impact du groupe", "The group's impact"),
  statsIntro: t("Chiffres exemples.", "Sample figures."),
  stats: [stat("150+", "Emplois", "Jobs"), stat("6", "Entreprises", "Companies"), stat("+25%", "Croissance", "Growth"), stat("3", "Villes", "Cities"), stat("40%", "Femmes", "Women"), stat("100+", "Formations", "Trainings")],
  jobsKicker: t("Emploi", "Employment"),
  jobsChartHeading: t("Offres ouvertes par entité", "Open positions by entity"),
  jobsChartData,
  jobsInfoCards: [card("Emplois locaux", "Local jobs", "Recrutement local en priorité (exemple).", "Local hiring first (sample)."), card("Formation", "Training", "Programmes de montée en compétences.", "Upskilling programmes.")],
  storyKicker: t("Histoire d'impact", "Impact story"),
  storyHeading: t("Une transformation exemple", "A sample transformation"),
  storyIntro: t("Récit exemple.", "Sample story."),
  storySituationTitle: t("La situation", "The situation"),
  storySituationBody: t("Situation exemple.", "Sample situation."),
  storyActionTitle: t("L'action", "The action"),
  storyActionBody: t("Action exemple.", "Sample action."),
  storyResultTitle: t("Le résultat", "The result"),
  storyResultBody: t("Résultat exemple.", "Sample result."),
  storyCtaTitle: t("Rejoindre l'aventure", "Join the journey"),
  storyCtaBody: t("Découvrez nos participations.", "Discover our holdings."),
  storyCtaPrimaryLabel: t("Nos participations", "Our holdings"),
  storyCtaPrimaryUrl: "/nos-participations",
  storyCtaSecondaryLabel: t("Carrières", "Careers"),
  storyCtaSecondaryUrl: "/carrieres",
  esgKicker: t("ESG", "ESG"),
  esgHeading: t("Nos engagements responsables", "Our responsible commitments"),
  esgCert1Title: t("Certification exemple 1", "Sample certification 1"),
  esgCert1Scope: "[Périmètre]",
  esgCert2Title: t("Certification exemple 2", "Sample certification 2"),
  esgCert2Scope: "[Périmètre]",
  esgEngagementTitle: t("Nos engagements", "Our commitments"),
  esgEngagementItems: [item("Gouvernance transparente", "Transparent governance"), item("Emploi local", "Local employment"), item("Formation continue", "Continuous training")],
});

await setGlobal("actualites-page-content", {
  portfolioKicker: t("Actualités", "News"),
  pressHeading: t("Espace presse", "Press area"),
  pressLinks: [
    { label: t("Dossier de presse", "Press kit"), url: "#" },
    { label: t("Communiqués", "Press releases"), url: "#" },
    { label: t("Contact presse", "Press contact"), url: "/contact" },
  ],
  pressCtaLabel: t("Nous contacter", "Contact us"),
  pressCtaUrl: "/contact",
  newsletterInfoLines: [{ label: t("Une lettre par mois", "One newsletter a month") }, { label: t("Désinscription à tout moment", "Unsubscribe anytime") }],
  newsletterFormLabel: t("Recevoir la newsletter", "Get the newsletter"),
  newsletterPlaceholder: t("Votre adresse e-mail", "Your email address"),
  newsletterButtonLabel: t("S'inscrire", "Subscribe"),
});

await setGlobal("carrieres-page-content", {
  heroHeading: t("Carrières", "Careers"),
  jobsKicker: t("Nos offres", "Our openings"),
  jobsChartHeading: t("Offres ouvertes par entité", "Open positions by entity"),
  jobsChartData,
  jobsSkillTags: [item("Digital", "Digital"), item("Finance", "Finance"), item("Ingénierie", "Engineering"), item("Marketing", "Marketing")],
  jobsLocationTags: [item("Douala", "Douala"), item("Yaoundé", "Yaoundé"), item("Télétravail", "Remote")],
  whyKicker: t("Pourquoi nous rejoindre", "Why join us"),
  whyHeading: t("Grandir au sein d'un groupe", "Grow within a group"),
  whyCards: [card("Diversité des métiers", "Diverse roles", "Plusieurs secteurs, de nombreux métiers.", "Several sectors, many roles."), card("Évolution", "Career growth", "Mobilité entre les entités.", "Mobility between entities."), card("Formation", "Training", "Programmes de formation continue.", "Continuous training programmes.")],
  offersKicker: t("Offres", "Openings"),
  offersIntro: t("Toutes nos offres (exemples).", "All our openings (samples)."),
  offersHeading: t("Postes ouverts", "Open positions"),
  processKicker: t("Recrutement", "Recruitment"),
  processIntro: t("Notre processus (exemple).", "Our process (sample)."),
  processHeading: t("Comment se passe le recrutement ?", "How does recruitment work?"),
  processSteps: [card("Candidature", "Application", "Envoi du CV en ligne.", "Send your CV online."), card("Échange", "Call", "Premier échange téléphonique.", "First phone call."), card("Entretien", "Interview", "Rencontre avec l'entité.", "Meeting with the entity."), card("Réponse", "Answer", "Décision sous deux semaines.", "Decision within two weeks.")],
  spontaneousKicker: t("Candidature spontanée", "Speculative application"),
  spontaneousHeadingLine1: t("Vous ne trouvez pas", "Can't find"),
  spontaneousHeadingLine2: t("le poste idéal ?", "the right role?"),
});

payload.logger.info("Done.");
process.exit(0);
