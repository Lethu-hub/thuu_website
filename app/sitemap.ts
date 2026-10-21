import type { MetadataRoute } from "next";
import { getPublishedNotes, getPublishedProjects } from "@/lib/db/data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [projects, notes] = await Promise.all([getPublishedProjects(), getPublishedNotes()]);
  return [
    { url: `${site}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site}/notes`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site}/cv`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({ url: `${site}/projects/${project.slug}`, lastModified: project.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...notes.map((note) => ({ url: `${site}/notes/${note.slug}`, lastModified: note.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
