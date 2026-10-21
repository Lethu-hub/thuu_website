import { getMediaMap, getPublishedProjects, getSettings } from "@/lib/db/data";
import { PublicShell } from "@/components/public/public-shell";
import { ProjectFilter } from "@/components/public/project-filter";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const [settings, projects] = await Promise.all([getSettings(), getPublishedProjects()]);
  const media = await getMediaMap(projects.map((project) => project.heroMediaId).filter(Boolean) as string[]);
  return <PublicShell settings={settings}><section className="page-shell py-16 sm:py-24"><p className="eyebrow">{settings.labels.projects.eyebrow}</p><h1 className="display mt-4 max-w-4xl text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[.94]">{settings.labels.projects.heading}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{settings.labels.projects.intro}</p><div className="mt-14"><ProjectFilter labels={settings.labels.projects} items={projects.map((project) => ({ project, asset: project.heroMediaId ? media.get(project.heroMediaId) : undefined }))} /></div></section></PublicShell>;
}
