import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { cvProfiles, mediaAssets, notes, projects, siteSettings } from "@/lib/db/schema";
import type { AppSettings } from "@/lib/types";

const mediaFields = {
  id: mediaAssets.id, storageKey: mediaAssets.storageKey, url: mediaAssets.url,
  filename: mediaAssets.filename, mimeType: mediaAssets.mimeType, size: mediaAssets.size,
  altText: mediaAssets.altText, createdAt: mediaAssets.createdAt,
};
export type MediaAsset = { id: string; storageKey: string; url: string; filename: string; mimeType: string; size: number; altText: string; createdAt: Date };

export async function getSettings(): Promise<AppSettings> { const [settings] = await db().select().from(siteSettings).where(eq(siteSettings.id, "site")); if (!settings) throw new Error("Site settings are missing. Run npm run db:seed."); return settings; }
export async function getCV() { const [profile] = await db().select().from(cvProfiles).where(eq(cvProfiles.id, "cv")); if (!profile) throw new Error("CV profile is missing. Run npm run db:seed."); return profile; }
export async function getMedia(): Promise<MediaAsset[]> { return db().select(mediaFields).from(mediaAssets).orderBy(desc(mediaAssets.createdAt)); }
export async function getMediaMap(ids: string[]): Promise<Map<string, MediaAsset>> { if (!ids.length) return new Map(); const assets = await db().select(mediaFields).from(mediaAssets).where(inArray(mediaAssets.id, ids)); return new Map(assets.map((asset) => [asset.id, asset])); }
export async function getPublishedProjects() { return db().select().from(projects).where(eq(projects.status, "published")).orderBy(desc(projects.projectDate), asc(projects.sortOrder)); }
export async function getFeaturedProjects() { return db().select().from(projects).where(and(eq(projects.status, "published"), eq(projects.featured, "true"))).orderBy(asc(projects.sortOrder), desc(projects.projectDate)); }
export async function getProjectBySlug(slug: string, publishedOnly = true) { const where = publishedOnly ? and(eq(projects.slug, slug), eq(projects.status, "published")) : eq(projects.slug, slug); const [project] = await db().select().from(projects).where(where); return project; }
export async function getAllProjects() { return db().select().from(projects).orderBy(asc(projects.sortOrder), desc(projects.updatedAt)); }
export async function getAdminProject(id: string) { const [project] = await db().select().from(projects).where(eq(projects.id, id)); return project; }
export async function getPublishedNotes(limit?: number) { const query = db().select().from(notes).where(eq(notes.status, "published")).orderBy(desc(notes.noteDate)); return limit ? query.limit(limit) : query; }
export async function getAllNotes() { return db().select().from(notes).orderBy(desc(notes.updatedAt)); }
export async function getNoteBySlug(slug: string, publishedOnly = true) { const where = publishedOnly ? and(eq(notes.slug, slug), eq(notes.status, "published")) : eq(notes.slug, slug); const [note] = await db().select().from(notes).where(where); return note; }
export async function getAdminNote(id: string) { const [note] = await db().select().from(notes).where(eq(notes.id, id)); return note; }
