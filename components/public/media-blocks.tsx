import { ExternalLink } from "lucide-react";
import type { CaseStudyBlock } from "@/lib/types";
import type { MediaAsset } from "@/lib/db/data";
import { Markdown } from "./markdown";
import { isSafeEmbed, videoEmbedUrl } from "@/lib/utils";

type Asset = MediaAsset;

export function CaseStudyBlocks({ blocks, media }: { blocks: CaseStudyBlock[]; media: Map<string, Asset> }) {
  return <div className="space-y-9">
    {blocks.map((block) => {
      if (block.type === "markdown") return <Markdown key={block.id}>{block.markdown}</Markdown>;
      if (block.type === "image") {
        const asset = media.get(block.mediaId); if (!asset) return null;
        return <figure key={block.id}><img src={asset.url} alt={asset.altText || block.caption || "Project image"} className="w-full border border-[#d9ddd5] bg-white" />{block.caption && <figcaption className="mt-2 text-sm text-muted">{block.caption}</figcaption>}</figure>;
      }
      if (block.type === "gallery") {
        const assets = block.mediaIds.map((id) => media.get(id)).filter(Boolean) as Asset[];
        if (!assets.length) return null;
        return <figure key={block.id}><div className="grid gap-3 sm:grid-cols-2">{assets.map((asset) => <img key={asset.id} src={asset.url} alt={asset.altText || block.caption || "Project gallery image"} className="aspect-[4/3] w-full border border-[#d9ddd5] object-cover" />)}</div>{block.caption && <figcaption className="mt-2 text-sm text-muted">{block.caption}</figcaption>}</figure>;
      }
      if (block.type === "video") {
        const embed = videoEmbedUrl(block.url);
        if (embed?.includes("youtube")) return <figure key={block.id}><iframe className="video-frame" src={embed} title={block.caption || "Project video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />{block.caption && <figcaption className="mt-2 text-sm text-muted">{block.caption}</figcaption>}</figure>;
        if (embed?.includes("tiktok.com/embed")) return <figure key={block.id} className="max-w-[360px]"><iframe className="w-full aspect-[9/16] border border-[#d9ddd5] bg-white" src={embed} title={block.caption || "Project video"} allowFullScreen />{block.caption && <figcaption className="mt-2 text-sm text-muted">{block.caption}</figcaption>}</figure>;
        return <a key={block.id} href={block.url} target="_blank" rel="noreferrer" className="flex items-center justify-between border border-[#d9ddd5] bg-white p-5 font-semibold text-moss"><span>{block.caption || block.url}</span><ExternalLink size={17} /></a>;
      }
      if (block.type === "embed" && isSafeEmbed(block.url)) return <iframe key={block.id} className="embed-frame" src={block.url} title={block.title || "Embedded report"} loading="lazy" allowFullScreen />;
      return null;
    })}
  </div>;
}
