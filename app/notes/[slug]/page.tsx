import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getNoteBySlug, getSettings } from "@/lib/db/data";
import { PublicShell } from "@/components/public/public-shell";
import { Markdown } from "@/components/public/markdown";
import { Tag } from "@/components/public/tag";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [settings, note] = await Promise.all([getSettings(), getNoteBySlug(slug)]);
  if (!note) notFound();
  const labels = settings.labels.notes;
  return <PublicShell settings={settings}><article className="page-shell max-w-4xl py-10 sm:py-16"><Link href="/notes" className="inline-flex items-center gap-2 text-[.72rem] font-bold tracking-[.08em] text-moss uppercase"><ArrowLeft size={15} />{settings.labels.nav.notes}</Link><header className="mt-12 border-b border-[#d9ddd5] pb-8"><p className="text-[.7rem] font-bold tracking-[.1em] text-moss uppercase">{formatDate(note.noteDate)}</p><h1 className="display mt-4 text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[.94]">{note.title}</h1><div className="mt-6 flex flex-wrap gap-1.5">{note.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div></header><div className="mt-10"><Markdown>{note.body}</Markdown></div>{note.videoLinks.length > 0 && <section className="mt-12 border-t border-[#d9ddd5] pt-5"><p className="eyebrow">{labels.video}</p><div className="mt-3 flex flex-col gap-2">{note.videoLinks.map((link) => <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-moss"><span>{link.label}</span><ArrowUpRight size={15} /></a>)}</div></section>}</article></PublicShell>;
}
