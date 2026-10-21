import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";
import { getSettings } from "@/lib/db/data";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const [settings, query] = await Promise.all([getSettings(), searchParams]);
  return <main className="grid min-h-screen bg-[#eef0ea] p-4 sm:p-8"><div className="m-auto grid w-full max-w-5xl overflow-hidden border border-[#d9ddd5] bg-[#f7f7f2] shadow-quiet md:grid-cols-[1.05fr_.95fr]"><section className="hidden bg-moss p-10 text-white md:flex md:flex-col"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-lime"><ArrowLeft size={15} />{settings.labels.nav.home}</Link><div className="my-auto"><p className="text-[.68rem] font-bold tracking-[.14em] text-lime uppercase">Private workspace</p><h1 className="mt-5 font-display text-5xl font-bold leading-[.95] tracking-[-.045em]">Keep the work current.</h1><p className="mt-6 max-w-sm text-sm leading-7 text-[#dce8dc]">Publish projects, shape your professional story, and keep your CV ready for the next opportunity.</p></div><p className="text-sm font-semibold text-[#dce8dc]">{settings.name}</p></section><section className="p-7 sm:p-12"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-moss md:hidden"><ArrowLeft size={15} />{settings.labels.nav.home}</Link><p className="eyebrow mt-9 md:mt-0">Administration</p><h2 className="display mt-3 text-4xl font-bold">Welcome back.</h2><p className="mt-3 text-sm leading-6 text-muted">Sign in to update the public site.</p><LoginForm next={query.next} /></section></div></main>;
}
