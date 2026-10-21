import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getMediaMap, getProjectBySlug, getSettings } from "@/lib/db/data";
import { PublicShell } from "@/components/public/public-shell";
import { CaseStudyBlocks } from "@/components/public/media-blocks";
import { Tag } from "@/components/public/tag";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, project] = await Promise.all([getSettings(), getProjectBySlug(slug)]);
  if (!project) notFound();
  const ids = [project.heroMediaId, ...project.blocks.flatMap((block) => block.type === "image" ? [block.mediaId] : block.type === "gallery" ? block.mediaIds : [])].filter(Boolean) as string[];
  const media = await getMediaMap(ids);
  const hero = project.heroMediaId ? media.get(project.heroMediaId) : undefined;
  const labels = settings.labels.project;
  return <PublicShell settings={settings}><article className="page-shell py-10 sm:py-16"><Link href="/projects" className="inline-flex items-center gap-2 text-[.72rem] font-bold tracking-[.08em] text-moss uppercase"><ArrowLeft size={15} />{labels.back}</Link><header className="mt-12 grid gap-8 lg:grid-cols-[1.45fr_.55fr]"><div><div className="flex flex-wrap gap-1.5">{project.domainTags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div><h1 className="display mt-5 text-[clamp(3rem,6vw,5.9rem)] font-bold leading-[.92]">{project.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{project.summary}</p></div><aside className="border-t border-[#d9ddd5] pt-4 lg:mt-5"><dl className="space-y-5 text-sm"><div><dt className="eyebrow">{labels.date}</dt><dd className="mt-1 font-semibold">{formatDate(project.projectDate)}</dd></div><div><dt className="eyebrow">{labels.domain}</dt><dd className="mt-2 flex flex-wrap gap-1.5">{project.domainTags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</dd></div><div><dt className="eyebrow">{labels.tools}</dt><dd className="mt-2 flex flex-wrap gap-1.5">{project.toolTags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</dd></div></dl></aside></header>{hero && <figure className="mt-12"><img src={hero.url} alt={hero.altText || project.title} className="max-h-[650px] w-full border border-[#d9ddd5] object-cover" /></figure>}<div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]"><CaseStudyBlocks blocks={project.blocks} media={media} />{project.links.length > 0 && <aside className="order-first border-t border-[#d9ddd5] pt-4 lg:order-none"><p className="eyebrow">{labels.links}</p><div className="mt-3 flex flex-col gap-2">{project.links.map((link) => <a key={link.id} className="inline-flex items-center justify-between gap-2 text-sm font-bold text-moss" href={link.url} target="_blank" rel="noreferrer"><span>{link.label}</span><ArrowUpRight size={14} /></a>)}</div></aside>}</div></article></PublicShell>;
}
