import type { ReactNode } from "react";
import type { AppSettings } from "@/lib/types";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PublicShell({ settings, children }: { settings: AppSettings; children: ReactNode }) {
  return <><SiteHeader settings={settings} /><main>{children}</main><SiteFooter settings={settings} /></>;
}
