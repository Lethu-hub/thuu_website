import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedNotes, getSettings } from "@/lib/db/data";
import { PublicShell } from "@/components/public/public-shell";
import { Tag } from "@/components/public/tag";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const [settings, notes] = await Promise.all([getSettings(), getPublishedNotes()]);
  const labels = settings.labels.notes;
  return <PublicShell settings={settings}><section className="page-shell py-16 sm:py-24"><p className="eyebrow">{labels.eyebrow}</p><h1 className="display mt-4 text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[.94]">{labels.heading}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{labels.intro}</p><div className="mt-14 border-t border-[#d9ddd5]">{notes.length ? notes.map((note) => <article className="grid gap-5 border-b border-[#d9ddd5] py-7 sm:grid-cols-[150px_1fr_auto] sm:items-start" key={note.id}><p className="pt-1 text-[.7rem] font-bold tracking-[.1em] text-moss uppercase">{formatDate(note.noteDate)}</p><div><h2 className="font-display text-3xl font-bold tracking-[-.04em]">{note.title}</h2><div className="mt-3 flex flex-wrap gap-1.5">{note.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div></div><Link href={`/notes/${note.slug}`} className="inline-flex items-center gap-1 text-[.72rem] font-bold tracking-[.07em] text-moss uppercase sm:pt-2">{labels.read}<ArrowUpRight size={14} /></Link></article>) : <p className="py-10 text-muted">{labels.noResults}</p>}</div></section></PublicShell>;
}
