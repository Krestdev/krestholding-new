import { RichText } from "@/hooks/type";

interface LexicalNode {
  text?: string;
  children?: LexicalNode[];
  [key: string]: unknown;
}

function extractText(node: LexicalNode): string {
  if (typeof node.text === "string") return node.text;
  if (Array.isArray(node.children)) return node.children.map(extractText).join(" ");
  return "";
}

const WORDS_PER_MINUTE = 200;

/** Estimates reading time (in whole minutes, minimum 1) from a Lexical richText field. */
export function estimateReadingTime(data?: RichText | string | null): number {
  if (!data || typeof data === "string" || !("root" in data)) return 1;
  const root = (data as { root?: LexicalNode }).root;
  if (!root) return 1;
  const text = extractText(root);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
