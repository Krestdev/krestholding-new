import { CollectionConfig } from "payload";
import { ADMIN_GROUPS } from "../adminGroups";

export const Service: CollectionConfig = {
  slug: "services",
  labels: { singular: "Pôle d'expertise", plural: "Pôles d'expertise" },
  admin: {
    group: ADMIN_GROUPS.modele,
    description: "Les pôles du groupe, affichés sur la page d'accueil et la page Notre modèle.",
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "slug", type: "text" },
    { name: "description", type: "text", localized: true },
    { name: "example", type: "text", localized: true, label: "Exemple concret (ex. \"Ex. Refonte de la marque LE CARINO\")" },
    { name: "icon", type: "upload", relationTo: "media", label: "Icône du pôle" },
    { name: "content", type: "richText", localized: true },
    { name: "headerImage", type: "upload", relationTo: "media" },
    { name: "videoUrl", type: "text" },
    { name: "featuredInHero", type: "checkbox", defaultValue: true, label: "Afficher dans le bandeau du Hero" },
    { name: "order", type: "number", defaultValue: 0 },
    { name: "preview", type: "upload", relationTo: "media" },
  ],
};

