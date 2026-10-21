import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaAssets } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth";
import { storage } from "@/lib/storage";
import { newId } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  await requireAdmin();
  const form = await request.formData();
  const file = form.get("file");
  const altText = String(form.get("altText") || "");
  if (!(file instanceof File) || !file.size) return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Files must be 10 MB or smaller." }, { status: 400 });
  const id = newId("media");
  const stored = await storage().put(file, id);
  const asset = { id, storageKey: stored.key, url: stored.url, filename: file.name, mimeType: file.type || "application/octet-stream", size: file.size, altText, content: stored.content };
  await db().insert(mediaAssets).values(asset);
  // Do not send database bytes back to the browser; the public /media/:id route serves them.
  return NextResponse.json({ id, storageKey: stored.key, url: stored.url, filename: file.name, mimeType: file.type || "application/octet-stream", size: file.size, altText }, { status: 201 });
}
