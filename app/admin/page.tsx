import Link from "next/link";
import { ArrowUpRight, BookOpenText, FileText, FolderKanban, Image as ImageIcon, Settings2 } from "lucide-react";
import { getAllNotes, getAllProjects, getMedia, getSettings } from "@/lib/db/data";

export const dynamic = "force-dynamic";

const cards = [
  { href: "/admin/projects", title: "Projects", detail: "Build and publish case studies", icon: FolderKanban, key: "projects" },
  { href: "/admin/notes", title: "Notes", detail: "Journal entries and research", icon: BookOpenText, key: "notes" },
  { href: "/admin/cv", title: "CV", detail: "Experience, skills, and PDF", icon: FileText, key: "cv" },
  { href: "/admin/media", title: "Media library", detail: "Images and document files", icon: ImageIcon, key: "media" },
  { href: "/admin/settings", title: "Settings", detail: "Homepage, links, and site copy", icon: Settings2, key: "settings" },
];

export default async function AdminDashboard() {
  const [projects, notes, media, settings] = await Promise.all([getAllProjects(), getAllNotes(), getMedia(), getSettings()]);
  const counts: Record<string, string> = { projects: `${projects.filter((item) => item.status === "published").length} published · ${projects.length} total`, notes: `${notes.filter((item) => item.status === "published").length} published · ${notes.length} total`, cv: settings.name, media: `${media.length} uploaded files`, settings: "Homepage and public language" };
  return <><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Overview</p><h1 className="mt-2 font-display text-4xl font-bold tracking-[-.045em]">A calm place to keep it current.</h1></div><Link className="admin-button" href="/admin/projects/new">New project <ArrowUpRight size={15} /></Link></div><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{cards.map(({ href, title, detail, icon: Icon, key }) => <Link key={key} href={href} className="admin-card group p-5 transition hover:-translate-y-0.5 hover:border-[#aac1ae]"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[#eef4ec] text-moss"><Icon size={18} /></span><ArrowUpRight size={16} className="text-[#7c887f] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><h2 className="mt-6 font-display text-2xl font-bold tracking-[-.035em]">{title}</h2><p className="mt-2 text-sm text-[#657168]">{detail}</p><p className="mt-5 text-xs font-bold text-moss">{counts[key]}</p></Link>)}</div><section className="admin-card mt-7 p-5 sm:p-6"><p className="eyebrow">Publishing rhythm</p><p className="mt-2 max-w-3xl text-sm leading-6 text-[#58655c]">Start a project, drop in screenshots from its editor, add the problem-to-impact story blocks, then switch its status to published. Changes are live as soon as you save.</p></section></>;
}
