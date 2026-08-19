import { Subsidiary } from "@/hooks/subsidiaries/type";

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Falls back to a name-derived slug for subsidiaries saved before the `slug`
 * field existed (or left blank), so "Voir la fiche" links never dead-end.
 */
export function getSubsidiarySlug(subsidiary: Pick<Subsidiary, "slug" | "name">): string {
  return subsidiary.slug || slugify(subsidiary.name);
}
