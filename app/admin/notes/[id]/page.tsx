import { notFound } from "next/navigation";
import { NotesEditor } from "@/components/admin/notes-editor";
import { saveNote } from "@/app/admin/actions";
import { getAdminNote } from "@/lib/db/data";

export const dynamic = "force-dynamic";

export default async function NoteEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = id === "new" ? undefined : await getAdminNote(id);
  if (id !== "new" && !note) notFound();
  return <NotesEditor note={note} action={saveNote} />;
}
