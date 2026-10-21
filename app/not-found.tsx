import Link from "next/link";
import { getSettings } from "@/lib/db/data";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  const settings = await getSettings();
  const labels = settings.labels.notFound;
  return <main className="grid min-h-screen place-items-center bg-paper px-6"><div className="max-w-md text-center"><p className="eyebrow">{labels.eyebrow}</p><h1 className="display mt-4 text-6xl font-bold">{labels.heading}</h1><Link href="/" className="button-primary mt-8">{labels.action}</Link></div></main>;
}
