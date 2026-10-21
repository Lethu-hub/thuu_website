import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { projects } from "@/lib/db/schema";
import type { MediaAsset } from "@/lib/db/data";
import { Tag } from "./tag";
import { formatDate } from "@/lib/utils";

type Project = typeof projects.$inferSelect;
type Asset = MediaAsset;

export function ProjectCard({ project, asset, actionLabel, cardLabel, selectedLabel }: { project: Project; asset?: Asset; actionLabel: string; cardLabel: string; selectedLabel: string }) {
  return <article className="card-rise group overflow-hidden border border-[#d9ddd5] bg-white">
    <Link href={`/projects/${project.slug}`} className="block">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#e9eee8]">
        {asset ? <img src={asset.url} alt={asset.altText || project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" /> : <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#eaf0e8_25%,transparent_25%,transparent_50%,#eaf0e8_50%,#eaf0e8_75%,transparent_75%)] bg-[length:22px_22px]"><span className="border border-[#cbd5cb] bg-[#f7f7f2] px-3 py-1.5 text-[.67rem] font-bold tracking-[.12em] text-moss uppercase">{cardLabel}</span></div>}
      </div>
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3 text-[.68rem] font-bold tracking-[.1em] text-[#778177] uppercase"><span>{formatDate(project.projectDate)}</span>{project.featured === "true" && <span className="text-moss">{selectedLabel}</span>}</div>
        <h3 className="font-display text-[1.65rem] font-bold leading-[1.06] tracking-[-.04em] text-ink">{project.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">{project.domainTags.slice(0, 2).map((tag) => <Tag key={tag}>{tag}</Tag>)}{project.toolTags.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
        <span className="mt-6 inline-flex items-center gap-1 text-[.74rem] font-bold tracking-[.05em] text-moss uppercase">{actionLabel}<ArrowUpRight size={15} /></span>
      </div>
    </Link>
  </article>;
}
