"use server";

import { redirect } from "next/navigation";
import { beginAdminSession, credentialsAreValid } from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  if (!(await credentialsAreValid(username, password))) return { error: "Those credentials did not work. Please try again." };
  await beginAdminSession();
  const next = String(formData.get("next") || "/admin");
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/admin");
}
