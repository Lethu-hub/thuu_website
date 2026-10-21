"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { cvProfiles, mediaAssets, notes, projects, siteSettings } from "@/lib/db/schema";
import { requireAdmin, endAdminSession } from "@/lib/auth";
import { storage } from "@/lib/storage";
import { DEFAULT_LABELS, DEFAULT_VISIBILITY, newId, type CaseStudyBlock, type CertificationItem, type EducationItem, type ExperienceItem, type ExternalLink, type SectionVisibility, type SiteLabels, type SkillGroup, type SocialLink } from "@/lib/types";
import { embedSource, slugify, splitTags } from "@/lib/utils";

const invalidatePublic = () => {
  revalidatePath("/", "layout");
  revalidatePath("/projects");
  revalidatePath("/notes");
  revalidatePath("/cv");
  revalidatePath("/sitemap.xml");
};

function json<T>(value: FormDataEntryValue | null, fallback: T): T {
  try { return value ? JSON.parse(String(value)) as T : fallback; } catch { return fallback; }
}

function text(value: FormDataEntryValue | null) { return String(value || "").trim(); }

export async function logout() {
  await endAdminSession();
  redirect("/login");
}

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const socialLinks = json<SocialLink[]>(formData.get("socialLinks"), []);
  const labels = json<SiteLabels>(formData.get("labels"), DEFAULT_LABELS);
  const sectionVisibility: SectionVisibility = {
    about: formData.get("about") === "on",
    skills: formData.get("skills") === "on",
    timeline: formData.get("timeline") === "on",
    projects: formData.get("projects") === "on",
    notes: formData.get("notes") === "on",
    contact: formData.get("contact") === "on",
  };
  await db().insert(siteSettings).values({
    id: "site", name: text(formData.get("name")), tagline: text(formData.get("tagline")), heroHeading: text(formData.get("heroHeading")), heroIntro: text(formData.get("heroIntro")), aboutMarkdown: text(formData.get("aboutMarkdown")), contactEmail: text(formData.get("contactEmail")), socialLinks, sectionVisibility, labels, updatedAt: new Date(),
  }).onConflictDoUpdate({ target: siteSettings.id, set: { name: text(formData.get("name")), tagline: text(formData.get("tagline")), heroHeading: text(formData.get("heroHeading")), heroIntro: text(formData.get("heroIntro")), aboutMarkdown: text(formData.get("aboutMarkdown")), contactEmail: text(formData.get("contactEmail")), socialLinks, sectionVisibility, labels, updatedAt: new Date() } });
  invalidatePublic();
  revalidatePath("/admin/settings");
}

export async function saveProject(formData: FormData) {
  await requireAdmin();
  const incomingId = text(formData.get("id"));
  const id = incomingId || newId("project");
  const title = text(formData.get("title"));
  const data = {
    title,
    slug: slugify(text(formData.get("slug")) || title),
    summary: text(formData.get("summary")),
    domainTags: splitTags(text(formData.get("domainTags"))),
    toolTags: splitTags(text(formData.get("toolTags"))),
    status: text(formData.get("status")) === "published" ? "published" as const : "draft" as const,
    featured: formData.get("featured") === "on" ? "true" : "false",
    projectDate: text(formData.get("projectDate")) || new Date().toISOString().slice(0, 10),
    heroMediaId: text(formData.get("heroMediaId")) || null,
    links: json<ExternalLink[]>(formData.get("links"), []),
    blocks: json<CaseStudyBlock[]>(formData.get("blocks"), []).map((block) => block.type === "embed" ? { ...block, url: embedSource(block.url) } : block),
    updatedAt: new Date(),
  };
  if (incomingId) await db().update(projects).set(data).where(eq(projects.id, id));
  else await db().insert(projects).values({ id, ...data, sortOrder: 0 });
  invalidatePublic();
  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${id}`);
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await db().delete(projects).where(eq(projects.id, id));
  invalidatePublic();
  revalidatePath("/admin/projects");
}

export async function reorderProject(id: string, direction: "up" | "down") {
  await requireAdmin();
  const ordered = await db().select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.createdAt));
  const index = ordered.findIndex((project) => project.id === id);
  const targetIndex = index + (direction === "up" ? -1 : 1);
  if (index < 0 || targetIndex < 0 || targetIndex >= ordered.length) return;
  [ordered[index], ordered[targetIndex]] = [ordered[targetIndex], ordered[index]];
  // Normalize every rank. This also repairs older projects that were created before ordering was changed.
  await db().transaction(async (tx) => {
    for (const [rank, project] of ordered.entries()) {
      await tx.update(projects).set({ sortOrder: rank, updatedAt: new Date() }).where(eq(projects.id, project.id));
    }
  });
  invalidatePublic();
  revalidatePath("/admin/projects");
}

export async function saveNote(formData: FormData) {
  await requireAdmin();
  const incomingId = text(formData.get("id"));
  const id = incomingId || newId("note");
  const title = text(formData.get("title"));
  const data = {
    title, slug: slugify(text(formData.get("slug")) || title), noteDate: text(formData.get("noteDate")) || new Date().toISOString().slice(0, 10), tags: splitTags(text(formData.get("tags"))), status: text(formData.get("status")) === "published" ? "published" as const : "draft" as const, body: text(formData.get("body")), videoLinks: json<ExternalLink[]>(formData.get("videoLinks"), []), updatedAt: new Date(),
  };
  if (incomingId) await db().update(notes).set(data).where(eq(notes.id, id));
  else await db().insert(notes).values({ id, ...data });
  invalidatePublic();
  revalidatePath("/admin/notes");
  redirect(`/admin/notes/${id}`);
}

export async function deleteNote(id: string) {
  await requireAdmin();
  await db().delete(notes).where(eq(notes.id, id));
  invalidatePublic();
  revalidatePath("/admin/notes");
}

export async function saveCV(formData: FormData) {
  await requireAdmin();
  const data = {
    summary: text(formData.get("summary")),
    experience: json<ExperienceItem[]>(formData.get("experience"), []),
    education: json<EducationItem[]>(formData.get("education"), []),
    skills: json<SkillGroup[]>(formData.get("skills"), []),
    certifications: json<CertificationItem[]>(formData.get("certifications"), []),
    pdfMediaId: text(formData.get("pdfMediaId")) || null,
    updatedAt: new Date(),
  };
  await db().insert(cvProfiles).values({ id: "cv", ...data }).onConflictDoUpdate({ target: cvProfiles.id, set: data });
  invalidatePublic();
  revalidatePath("/admin/cv");
}

export async function updateMediaAlt(id: string, formData: FormData) {
  await requireAdmin();
  await db().update(mediaAssets).set({ altText: text(formData.get("altText")) }).where(eq(mediaAssets.id, id));
  invalidatePublic();
  revalidatePath("/admin/media");
}

export async function deleteMedia(id: string) {
  await requireAdmin();
  const [asset] = await db().select().from(mediaAssets).where(eq(mediaAssets.id, id));
  if (!asset) return;
  await storage().remove(asset.storageKey);
  await db().delete(mediaAssets).where(eq(mediaAssets.id, id));
  invalidatePublic();
  revalidatePath("/admin/media");
}
