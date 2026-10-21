import { notFound } from "next/navigation";
import { ProjectEditor } from "@/components/admin/project-editor";
import { saveProject } from "@/app/admin/actions";
import { getAdminProject, getMedia } from "@/lib/db/data";

export const dynamic = "force-dynamic";

export default async function ProjectEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, media] = await Promise.all([id === "new" ? Promise.resolve(undefined) : getAdminProject(id), getMedia()]);
  if (id !== "new" && !project) notFound();
  return <ProjectEditor project={project} assets={media} action={saveProject} />;
}
