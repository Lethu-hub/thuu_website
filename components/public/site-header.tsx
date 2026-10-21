import Link from "next/link";
import { Menu } from "lucide-react";
import type { AppSettings } from "@/lib/types";

export function SiteHeader({ settings }: { settings: AppSettings }) {
  const { nav } = settings.labels;
  return (
    <header className="border-b border-[#d9ddd5] bg-[#f7f7f2]/95 backdrop-blur">
      <div className="page-shell flex min-h-[74px] items-center justify-between gap-5">
        <Link href="/" className="max-w-[210px] font-display text-[1.28rem] font-bold tracking-[-.04em] text-ink sm:text-[1.45rem]">{settings.name}</Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-[.76rem] font-bold text-[#4a574e] md:flex">
          <Link className="site-link" href="/">{nav.home}</Link>
          <Link className="site-link" href="/projects">{nav.projects}</Link>
          <Link className="site-link" href="/notes">{nav.notes}</Link>
          <Link className="site-link" href="/cv">{nav.cv}</Link>
        </nav>
        <details className="relative md:hidden">
          <summary aria-label="Open navigation" className="flex h-10 w-10 list-none items-center justify-center border border-[#d9ddd5] bg-white text-moss [&::-webkit-details-marker]:hidden"><Menu size={18} /></summary>
          <nav className="absolute right-0 top-12 z-20 flex w-44 flex-col border border-[#d9ddd5] bg-white p-3 text-sm font-semibold shadow-quiet">
            <Link className="px-3 py-2" href="/">{nav.home}</Link><Link className="px-3 py-2" href="/projects">{nav.projects}</Link><Link className="px-3 py-2" href="/notes">{nav.notes}</Link><Link className="px-3 py-2" href="/cv">{nav.cv}</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
