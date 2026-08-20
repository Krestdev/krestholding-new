import Image from "next/image";
import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { DefaultNodeTypes, SerializedUploadNode } from "@payloadcms/richtext-lexical";
import { RichText as RichTextData } from "@/hooks/type";

interface RichTextRendererProps {
  data?: RichTextData | string | null;
  className?: string;
}

const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    if (node.tag === "h2") {
      return <h2 className="font-sans text-[#111] text-[32px] leading-tight">{children}</h2>;
    }
    if (node.tag === "h3") {
      return <h3 className="font-sans text-[#111] text-2xl leading-snug">{children}</h3>;
    }
    const Tag = node.tag;
    return <Tag className="font-sans text-[#111]">{children}</Tag>;
  },
  paragraph: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return <p className="text-[rgba(17,17,17,0.8)] text-base leading-relaxed">{children}</p>;
  },
  quote: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <blockquote className="border-l-2 border-black/20 pl-6 italic text-lg text-[#111]">{children}</blockquote>
    );
  },
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    const Tag = node.tag;
    return (
      <Tag className={`pl-6 space-y-2 text-[rgba(17,17,17,0.8)] text-base ${node.tag === "ol" ? "list-decimal" : "list-disc"}`}>
        {children}
      </Tag>
    );
  },
  upload: ({ node }) => {
    const uploadNode = node as SerializedUploadNode;
    if (typeof uploadNode.value !== "object") return null;
    const doc = uploadNode.value as { url?: string; alt?: string; width?: number; height?: number };
    if (!doc.url) return null;
    return (
      <span className="relative block w-full h-[276px] overflow-hidden">
        <Image src={doc.url} alt={doc.alt || ""} fill className="object-cover" />
      </span>
    );
  },
});

export default function RichTextRenderer({ data, className }: RichTextRendererProps) {
  if (!data || typeof data === "string" || !("root" in data)) return null;

  return (
    <div className={`flex flex-col gap-6 ${className || ""}`}>
      <RichText data={data as never} converters={converters} disableContainer />
    </div>
  );
}
