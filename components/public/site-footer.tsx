import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AppSettings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: AppSettings }) {
  return <footer className="mt-20 border-t border-[#d9ddd5] py-10 sm:mt-28">
    <div className="page-shell grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
      <div><p className="font-display text-xl font-bold tracking-[-.035em]">{settings.name}</p><p className="mt-2 max-w-sm text-sm leading-6 text-muted">{settings.labels.footer.note}</p></div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-moss">
        {settings.socialLinks.map((link) => <a className="site-link inline-flex items-center gap-1" href={link.url} target="_blank" rel="noreferrer" key={link.id}>{link.label}<ArrowUpRight size={13} /></a>)}
        <Link className="site-link" href="/login">{settings.labels.footer.admin}</Link>
      </div>
    </div>
  </footer>;
}
