import Link from "next/link";
import { ArrowUpRight, Plus, Trash2 } from "lucide-react";
import { deleteNote } from "@/app/admin/actions";
import { getAllNotes } from "@/lib/db/data";

export const dynamic = "force-dynamic";

export default async function NotesAdminPage() {
  const notes = await getAllNotes();
  return <><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Notes</p><h1 className="mt-2 font-display text-4xl font-bold tracking-[-.045em]">Your working notebook.</h1></div><Link className="admin-button" href="/admin/notes/new"><Plus size={15} />New note</Link></div><section className="admin-card mt-8 overflow-hidden">{notes.map((note) => <article className="grid gap-4 border-b border-[#e8ece7] p-5 last:border-b-0 md:grid-cols-[1fr_120px_160px] md:items-center" key={note.id}><div><Link href={`/admin/notes/${note.id}`} className="font-display text-xl font-bold tracking-[-.03em] hover:text-moss">{note.title}</Link><p className="mt-1 text-sm text-[#718076]">{note.tags.join(" · ") || "No tags"}</p></div><span className={`w-fit rounded-full px-2.5 py-1 text-[.65rem] font-bold tracking-[.08em] uppercase ${note.status === "published" ? "bg-[#e5f3e7] text-[#21633a]" : "bg-[#f3efe5] text-[#866f34]"}`}>{note.status}</span><div className="flex gap-2"><Link className="admin-button-secondary" href={`/admin/notes/${note.id}`}><ArrowUpRight size={14} />Edit</Link><form action={async () => { "use server"; await deleteNote(note.id); }}><button className="admin-button-danger" aria-label="Delete note"><Trash2 size={14} /></button></form></div></article>)}{!notes.length && <p className="p-10 text-center text-sm text-[#718076]">Your published observations will collect here.</p>}</section></>;
}
