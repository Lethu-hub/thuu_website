import { customType, jsonb, pgTable, text, timestamp, integer, date } from "drizzle-orm/pg-core";
import type { CaseStudyBlock, CertificationItem, EducationItem, ExperienceItem, ExternalLink, ProjectStatus, SectionVisibility, SiteLabels, SkillGroup, SocialLink } from "@/lib/types";

const pgBytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() { return "bytea"; },
});

export const siteSettings = pgTable("site_settings", {
  id: text("id").primaryKey(), name: text("name").notNull(), tagline: text("tagline").notNull(), heroHeading: text("hero_heading").notNull(), heroIntro: text("hero_intro").notNull(), aboutMarkdown: text("about_markdown").notNull(), contactEmail: text("contact_email").notNull(), socialLinks: jsonb("social_links").$type<SocialLink[]>().notNull(), sectionVisibility: jsonb("section_visibility").$type<SectionVisibility>().notNull(), labels: jsonb("labels").$type<SiteLabels>().notNull(), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
export const mediaAssets = pgTable("media_assets", {
  id: text("id").primaryKey(), storageKey: text("storage_key").notNull().unique(), url: text("url").notNull(), filename: text("filename").notNull(), mimeType: text("mime_type").notNull(), size: integer("size").notNull(), altText: text("alt_text").notNull().default(""), content: pgBytea("content"), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
export const projects = pgTable("projects", {
  id: text("id").primaryKey(), title: text("title").notNull(), slug: text("slug").notNull().unique(), summary: text("summary").notNull(), domainTags: jsonb("domain_tags").$type<string[]>().notNull(), toolTags: jsonb("tool_tags").$type<string[]>().notNull(), status: text("status").$type<ProjectStatus>().notNull().default("draft"), featured: text("featured").notNull().default("false"), projectDate: date("project_date", { mode: "string" }).notNull(), heroMediaId: text("hero_media_id"), links: jsonb("links").$type<ExternalLink[]>().notNull(), blocks: jsonb("blocks").$type<CaseStudyBlock[]>().notNull(), sortOrder: integer("sort_order").notNull().default(0), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
export const notes = pgTable("notes", {
  id: text("id").primaryKey(), title: text("title").notNull(), slug: text("slug").notNull().unique(), noteDate: date("note_date", { mode: "string" }).notNull(), tags: jsonb("tags").$type<string[]>().notNull(), status: text("status").$type<ProjectStatus>().notNull().default("draft"), body: text("body").notNull(), videoLinks: jsonb("video_links").$type<ExternalLink[]>().notNull(), createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
export const cvProfiles = pgTable("cv_profiles", {
  id: text("id").primaryKey(), summary: text("summary").notNull(), experience: jsonb("experience").$type<ExperienceItem[]>().notNull(), education: jsonb("education").$type<EducationItem[]>().notNull(), skills: jsonb("skills").$type<SkillGroup[]>().notNull(), certifications: jsonb("certifications").$type<CertificationItem[]>().notNull(), pdfMediaId: text("pdf_media_id"), updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
