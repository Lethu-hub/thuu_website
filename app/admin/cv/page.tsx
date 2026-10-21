import { CVEditor } from "@/components/admin/cv-editor";
import { saveCV } from "@/app/admin/actions";
import { getCV, getMedia } from "@/lib/db/data";

export const dynamic = "force-dynamic";

export default async function CVAdminPage() {
  const [profile, media] = await Promise.all([getCV(), getMedia()]);
  return <CVEditor profile={profile} assets={media} action={saveCV} />;
}
