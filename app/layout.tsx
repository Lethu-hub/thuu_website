import type { Metadata } from "next";
import "./globals.css";
import { getSettings } from "@/lib/db/data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: { default: settings.name, template: `%s · ${settings.name}` },
    description: settings.tagline,
    metadataBase: new URL(siteUrl),
    openGraph: { type: "website", title: settings.name, description: settings.heroIntro, images: ["/og"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
