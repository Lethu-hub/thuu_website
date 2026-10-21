import clsx, { type ClassValue } from "clsx";
export function cn(...values: ClassValue[]) { return clsx(values); }
export function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "untitled"; }
export function splitTags(value: string) { return value.split(",").map((item) => item.trim()).filter(Boolean); }
export function formatDate(value: string) { return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00Z`)); }
export function embedSource(value: string) { const match = value.match(/<iframe[^>]+src=["']([^"']+)["']/i); return (match?.[1] || value).trim(); }
export function isSafeEmbed(url: string) { try { const host = new URL(url).hostname.toLowerCase(); return ["youtube.com", "www.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com", "tiktok.com", "www.tiktok.com", "app.powerbi.com", "public.tableau.com"].includes(host); } catch { return false; } }
export function videoEmbedUrl(url: string) { try { const parsed = new URL(url); if (parsed.hostname.includes("youtu")) { const id = parsed.hostname === "youtu.be" ? parsed.pathname.slice(1) : parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop(); return id ? `https://www.youtube-nocookie.com/embed/${id}` : null; } if (parsed.hostname.includes("tiktok.com")) { const id = parsed.pathname.match(/\/video\/(\d+)/)?.[1]; return id ? `https://www.tiktok.com/embed/v2/${id}` : url; } } catch { /* invalid URL */ } return null; }
