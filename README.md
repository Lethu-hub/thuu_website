# Data Analytics & BI professional platform

A long-lived, editable portfolio and publishing platform built with **Next.js App Router**, **TypeScript**, **PostgreSQL**, and **Drizzle ORM**. It includes a public CV/portfolio, a single-admin publishing studio, Markdown case studies, media uploads, draft/publish controls, a reusable media library, and an editable content model.

## Core guarantees

- **Every public word, link, image, project, note, CV item, and visible public-site label is database content.** Use **Admin → Settings** for identity, homepage copy, links, section visibility, and the full public interface-copy object.
- **PostgreSQL only:** the app speaks standard Postgres through Drizzle and consumes one `DATABASE_URL`. There is no Supabase SDK, Auth, Storage, RPC, or Realtime dependency.
- **Media stays with the database:** uploaded images and CV PDFs are stored as standard Postgres binary data through the isolated `lib/storage` boundary. Move to an S3-compatible provider later without changing upload forms or content models.
- **One admin account:** environment credentials create a signed, httpOnly session cookie. `/admin` and `/api/admin/*` redirect to `/login` until authenticated.

## Fast local start

1. Copy the environment file and set secure values:

   ```bash
   cp .env.example .env.local
   ```

2. Start a local standard PostgreSQL database (Docker is optional):

   ```bash
   docker compose up -d
   ```

3. Install packages and create the schema:

   ```bash
   npm install
   npm run db:push
   npm run db:seed
   npm run dev
   ```

4. Open `http://localhost:3000/login`, sign in with `ADMIN_USERNAME` and `ADMIN_PASSWORD`, and use the content studio.

The seed creates editable placeholder profile and CV content only. It intentionally creates no projects or notes, so you can add your own work from Admin → Projects.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | One standard PostgreSQL connection URL. This is the entire database coupling. |
| `ADMIN_USERNAME` | Yes | The single administrator username. |
| `ADMIN_PASSWORD` | Yes, unless hash is used | Plain admin password. Use a long unique value. |
| `ADMIN_PASSWORD_HASH` | Optional | bcrypt hash alternative to `ADMIN_PASSWORD`. |
| `SESSION_SECRET` | Yes in production | Long random value used to sign the httpOnly session. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical public URL such as `https://preferred-name.vercel.app`. |

## Deploy to Vercel

1. Create a PostgreSQL database (Supabase free tier, Neon, Vercel Postgres, or any Postgres host) and copy its connection string into Vercel as `DATABASE_URL`.
2. Apply the schema once from an environment with that URL:

   ```bash
   npm run db:push
   npm run db:seed
   ```

   For tracked SQL migrations instead, run `npm run db:generate`, commit the generated `drizzle/` migration, then run `npm run db:migrate` against production.

   Database setup is intentionally separate from the Vercel build, so routine content/code deployments stay fast and never wait on a database connection.
3. In Vercel, set the other environment variables from the table. No Blob account, storage token, or second file provider is needed for Phase 1.
4. Import the repository in Vercel. Vercel detects Next.js and runs `npm run build`; it does not run database work on every deployment. Set `NEXT_PUBLIC_SITE_URL=https://preferred-name.vercel.app`.
5. Visit `/login`, publish your first project, and check `/sitemap.xml`.

> Images and CV PDFs are saved to PostgreSQL in Phase 1. If the media library grows substantially, replace `lib/storage/database.ts` with an S3-compatible provider.

## Change Postgres providers

No code changes are required. Create the new database, apply the same Drizzle schema and seed if it is new, then replace **only** `DATABASE_URL` in your host settings. The application uses the ordinary PostgreSQL wire protocol through `postgres` + Drizzle; it has no provider-specific database integration.

## Content workflow

- **Settings:** name, tagline, hero, about narrative, contact email, unlimited social/custom links, homepage visibility, and all public UI copy.
- **Projects:** draft/publish, feature selection, domain/tool tags, links, hero image, and ordered Markdown/image/gallery/video/embed blocks. YouTube and TikTok links embed responsively; Power BI/Tableau embeds are host-allowlisted.
- **Notes:** Markdown journal entries, tags, optional video links, and draft/publish status.
- **CV:** structured experience, education, skill groups, certifications, summary, and a replaceable CV PDF.
- **Media:** upload once; files are saved alongside your site data in PostgreSQL, and can be selected later from the project/CV editor.

## Quality checks

```bash
npm run typecheck
npm run build
```
