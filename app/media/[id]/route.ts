import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { mediaAssets } from "@/lib/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [asset] = await db().select({ content: mediaAssets.content, mimeType: mediaAssets.mimeType, filename: mediaAssets.filename }).from(mediaAssets).where(eq(mediaAssets.id, id));
  if (!asset?.content) notFound();
  return new Response(Uint8Array.from(asset.content), {
    headers: {
      "Content-Type": asset.mimeType,
      "Content-Length": String(asset.content.length),
      "Content-Disposition": `inline; filename="${asset.filename.replace(/["\\]/g, "")}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
