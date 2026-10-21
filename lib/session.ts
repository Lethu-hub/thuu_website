import { jwtVerify } from "jose";
export const SESSION_COOKIE = "portfolio_admin_session";
const encoder = new TextEncoder();
function secret() { const value = process.env.SESSION_SECRET; if (!value && process.env.NODE_ENV === "production") throw new Error("SESSION_SECRET is required in production."); return encoder.encode(value || "local-development-secret-change-before-deploying"); }
export async function isAdminSession(token?: string) { if (!token) return false; try { const { payload } = await jwtVerify(token, secret()); return payload.role === "admin"; } catch { return false; } }
export function sessionSecret() { return secret(); }
