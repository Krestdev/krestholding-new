/**
 * Admin sidebar sections, matching the site's navigation tree.
 *
 * Payload orders sidebar groups by the first entry it meets, collections
 * before globals, so the order of `collections` and `globals` in their
 * index files decides the order shown here.
 */
export const ADMIN_GROUPS = {
  accueil: "Accueil",
  groupe: "Le groupe",
  modele: "Notre modèle",
  participations: "Nos participations",
  impact: "Notre impact",
  actualites: "Actualités",
  carrieres: "Carrières",
  contact: "Contact",
  navigation: "Menu & pied de page",
  formation: "Formation (hors arborescence)",
  medias: "Médiathèque",
} as const;
