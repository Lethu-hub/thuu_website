import Link from "next/link";
import { BookOpenText, FileText, FolderKanban, LayoutDashboard, LogOut, Settings2, Image as ImageIcon, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { logout } from "@/app/admin/actions";
import type { AppSettings } from "@/lib/types";

const navigation = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/notes", label: "Notes", icon: BookOpenText },
  { href: "/admin/cv", label: "CV", icon: FileText },
  { href: "/admin/media", label: "Media library", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings2 },
];

export function AdminShell({ settings, children }: { settings: AppSettings; children: ReactNode }) {
  return <div className="min-h-screen bg-[#f5f7f3] text-ink"><aside className="hidden fixed inset-y-0 left-0 w-64 flex-col border-r border-[#dfe4de] bg-white p-5 lg:flex"><Link href="/admin" className="border-b border-[#e3e7e1] pb-5"><p className="font-display text-xl font-bold tracking-[-.04em]">{settings.name}</p><p className="mt-1 truncate text-[.67rem] font-bold tracking-[.1em] text-[#748077] uppercase">Content studio</p></Link><nav className="mt-6 space-y-1">{navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#526057] transition hover:bg-[#eef4ec] hover:text-moss"><Icon size={17} />{label}</Link>)}</nav><div className="mt-auto space-y-3 border-t border-[#e3e7e1] pt-5"><Link href="/" className="flex items-center gap-2 px-3 text-sm font-semibold text-moss"><ExternalLink size={15} />View public site</Link><form action={logout}><button className="flex items-center gap-2 px-3 text-sm font-semibold text-[#9b4742]"><LogOut size={15} />Log out</button></form></div></aside><div className="lg:pl-64"><header className="flex min-h-[64px] items-center justify-between border-b border-[#dfe4de] bg-white px-5 lg:px-9"><Link href="/admin" className="font-display text-xl font-bold tracking-[-.04em] lg:hidden">{settings.name}</Link><p className="hidden text-[.69rem] font-bold tracking-[.12em] text-[#728077] uppercase lg:block">Publishing workspace</p><div className="flex items-center gap-4"><Link href="/" className="text-xs font-bold text-moss hover:underline">View site</Link><form action={logout}><button aria-label="Log out" className="text-xs font-bold text-[#9b4742] hover:underline">Log out</button></form></div></header><main className="mx-auto max-w-7xl px-5 py-8 lg:px-9 lg:py-10"><nav className="mb-7 flex gap-2 overflow-x-auto pb-1 lg:hidden">{navigation.map(({ href, label }) => <Link key={href} href={href} className="shrink-0 rounded-full border border-[#d6ded5] bg-white px-3 py-2 text-xs font-bold text-moss">{label}</Link>)}</nav>{children}</main></div></div>;
}
