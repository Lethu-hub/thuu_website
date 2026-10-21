import "server-only";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminSession, SESSION_COOKIE, sessionSecret } from "@/lib/session";
export { isAdminSession, SESSION_COOKIE };
export async function getAdminSession() { const token = (await cookies()).get(SESSION_COOKIE)?.value; return isAdminSession(token); }
export async function requireAdmin() { if (!(await getAdminSession())) redirect("/login"); }
export async function credentialsAreValid(username: string, password: string) { const expectedUser = process.env.ADMIN_USERNAME; const expectedPassword = process.env.ADMIN_PASSWORD; const passwordHash = process.env.ADMIN_PASSWORD_HASH; if (!expectedUser || (!expectedPassword && !passwordHash)) return false; if (username !== expectedUser) return false; if (passwordHash) return bcrypt.compare(password, passwordHash); return password === expectedPassword; }
export async function beginAdminSession() { const token = await new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(sessionSecret()); (await cookies()).set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 }); }
export async function endAdminSession() { (await cookies()).set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 }); }
