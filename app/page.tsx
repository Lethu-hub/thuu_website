import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { getCV, getFeaturedProjects, getMediaMap, getPublishedNotes, getSettings } from "@/lib/db/data";
import { PublicShell } from "@/components/public/public-shell";
import { Markdown } from "@/components/public/markdown";
import { ProjectCard } from "@/components/public/project-card";
import { Tag } from "@/components/public/tag";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, cv, featured, latestNotes] = await Promise.all([getSettings(), getCV(), getFeaturedProjects(), getPublishedNotes(3)]);
  const media = await getMediaMap(featured.map((project) => project.heroMediaId).filter(Boolean) as string[]);
  const pdf = cv.pdfMediaId ? (await getMediaMap([cv.pdfMediaId])).get(cv.pdfMediaId) : undefined;
  const { labels, sectionVisibility } = settings;
  return <PublicShell settings={settings}>
    <section className="page-shell grid min-h-[calc(100vh-74px)] content-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.5fr_.75fr] lg:gap-20">
      <div><p className="eyebrow">{labels.hero.availability}</p><h1 className="display mt-5 max-w-4xl text-[clamp(3.1rem,7vw,6.8rem)] font-bold leading-[.93] text-ink">{settings.heroHeading}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">{settings.heroIntro}</p><div className="mt-9 flex flex-wrap gap-3"><Link href="#work" className="button-primary">{labels.hero.workCta}<ArrowDownRight size={16} /></Link>{pdf && <a href={pdf.url} className="button-secondary" target="_blank" rel="noreferrer">{labels.hero.cvCta}<Download size={15} /></a>}</div></div>
      <aside className="border-l-0 border-[#d9ddd5] pt-2 lg:border-l lg:pl-8"><p className="text-[.68rem] font-bold tracking-[.12em] text-moss uppercase">{settings.tagline}</p><div className="mt-8 space-y-3">{settings.socialLinks.map((link) => <a className="group flex items-center justify-between border-b border-[#d9ddd5] py-3 text-sm font-semibold" href={link.url} target="_blank" rel="noreferrer" key={link.id}><span>{link.label}</span><ArrowUpRight size={15} className="text-moss transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>)}</div></aside>
    </section>

    {sectionVisibility.about && <section className="border-y border-[#d9ddd5] bg-[#eef0ea] py-16 sm:py-24"><div className="page-shell grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><p className="eyebrow">{labels.home.about}</p><Markdown>{settings.aboutMarkdown}</Markdown></div></section>}

    {sectionVisibility.skills && <section className="page-shell py-16 sm:py-24"><div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><p className="eyebrow">{labels.home.skills}</p><div className="grid gap-6 sm:grid-cols-2">{cv.skills.map((group) => <div className="border-t border-[#d9ddd5] pt-4" key={group.id}><h2 className="font-display text-2xl font-bold tracking-[-.03em]">{group.category}</h2><div className="mt-4 flex flex-wrap gap-1.5">{group.items.map((item) => <Tag key={item}>{item}</Tag>)}</div></div>)}</div></div></section>}

    {sectionVisibility.timeline && <section className="border-y border-[#d9ddd5] py-16 sm:py-24"><div className="page-shell grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><p className="eyebrow">{labels.home.timeline}</p><div>{cv.experience.map((item) => <article className="grid gap-3 border-t border-[#d9ddd5] py-5 sm:grid-cols-[150px_1fr]" key={item.id}><p className="text-sm font-semibold text-moss">{item.dates}</p><div><h2 className="font-display text-2xl font-bold tracking-[-.03em]">{item.role}</h2><p className="mt-1 text-sm font-semibold text-muted">{item.organisation}</p><p className="mt-3 text-sm leading-6 text-[#526057]">{item.summary}</p></div></article>)}</div></div></section>}

    {sectionVisibility.projects && <section id="work" className="page-shell scroll-mt-8 py-16 sm:py-24"><div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">{labels.home.featuredProjects}</p><h2 className="display mt-3 text-4xl font-bold sm:text-5xl">{labels.home.featuredHeading}</h2></div><Link href="/projects" className="button-secondary">{labels.home.viewAllProjects}<ArrowUpRight size={15} /></Link></div>{featured.length ? <div className="grid gap-5 md:grid-cols-2">{featured.slice(0, 4).map((project) => <ProjectCard project={project} asset={project.heroMediaId ? media.get(project.heroMediaId) : undefined} actionLabel={labels.projects.viewProject} cardLabel={labels.projects.cardLabel} selectedLabel={labels.projects.selected} key={project.id} />)}</div> : <p className="border border-dashed border-[#cbd5cb] px-6 py-12 text-center text-muted">{labels.home.emptyProjects}</p>}</section>}

    {sectionVisibility.notes && <section className="border-y border-[#d9ddd5] bg-white py-16 sm:py-24"><div className="page-shell"><div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">{labels.home.latestNotes}</p><h2 className="display mt-3 text-4xl font-bold sm:text-5xl">{labels.home.notesHeading}</h2></div><Link href="/notes" className="button-secondary">{labels.home.viewAllNotes}<ArrowUpRight size={15} /></Link></div>{latestNotes.length ? <div className="grid gap-x-9 md:grid-cols-3">{latestNotes.map((note) => <article className="border-t border-[#d9ddd5] py-5" key={note.id}><p className="text-[.68rem] font-bold tracking-[.1em] text-moss uppercase">{formatDate(note.noteDate)}</p><h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-[-.03em]">{note.title}</h3><div className="mt-4 flex flex-wrap gap-1.5">{note.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div><Link href={`/notes/${note.slug}`} className="mt-6 inline-flex items-center gap-1 text-[.72rem] font-bold tracking-[.07em] text-moss uppercase">{labels.notes.read}<ArrowUpRight size={14} /></Link></article>)}</div> : <p className="border border-dashed border-[#cbd5cb] px-6 py-12 text-center text-muted">{labels.home.emptyNotes}</p>}</div></section>}

    {sectionVisibility.contact && <section className="page-shell py-20 sm:py-28"><div className="max-w-3xl"><p className="eyebrow">{labels.contact.eyebrow}</p><h2 className="display mt-4 text-[clamp(2.8rem,6vw,5.2rem)] font-bold leading-[.95]">{labels.contact.heading}</h2><p className="mt-6 max-w-xl text-lg leading-8 text-muted">{labels.contact.intro}</p><a className="mt-8 inline-flex items-center gap-2 border-b-2 border-lime pb-1 text-lg font-bold text-moss" href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}<ArrowUpRight size={17} /></a></div></section>}
  </PublicShell>;
}
