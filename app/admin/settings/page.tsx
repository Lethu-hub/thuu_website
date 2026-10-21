import { SettingsEditor } from "@/components/admin/settings-editor";
import { saveSettings } from "@/app/admin/actions";
import { getSettings } from "@/lib/db/data";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return <SettingsEditor settings={settings} action={saveSettings} />;
}
