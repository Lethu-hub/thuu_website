import { MediaLibrary } from "@/components/admin/media-library";
import { deleteMedia, updateMediaAlt } from "@/app/admin/actions";
import { getMedia } from "@/lib/db/data";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const media = await getMedia();
  return <MediaLibrary initialAssets={media} updateAlt={updateMediaAlt} remove={deleteMedia} />;
}
