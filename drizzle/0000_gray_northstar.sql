CREATE TABLE "cv_profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"summary" text NOT NULL,
	"experience" jsonb NOT NULL,
	"education" jsonb NOT NULL,
	"skills" jsonb NOT NULL,
	"certifications" jsonb NOT NULL,
	"pdf_media_id" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" text PRIMARY KEY NOT NULL,
	"storage_key" text NOT NULL,
	"url" text NOT NULL,
	"filename" text NOT NULL,
	"mime_type" text NOT NULL,
	"size" integer NOT NULL,
	"alt_text" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_assets_storage_key_unique" UNIQUE("storage_key")
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"note_date" date NOT NULL,
	"tags" jsonb NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"body" text NOT NULL,
	"video_links" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "notes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"summary" text NOT NULL,
	"domain_tags" jsonb NOT NULL,
	"tool_tags" jsonb NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"featured" text DEFAULT 'false' NOT NULL,
	"project_date" date NOT NULL,
	"hero_media_id" text,
	"links" jsonb NOT NULL,
	"blocks" jsonb NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"tagline" text NOT NULL,
	"hero_heading" text NOT NULL,
	"hero_intro" text NOT NULL,
	"about_markdown" text NOT NULL,
	"contact_email" text NOT NULL,
	"social_links" jsonb NOT NULL,
	"section_visibility" jsonb NOT NULL,
	"labels" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
