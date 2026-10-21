import { getSettings } from "@/lib/db/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escape(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&apos;", '"': "&quot;" })[character] || character);
}

export async function GET() {
  const settings = await getSettings();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f7f7f2"/><rect x="70" y="69" width="1060" height="492" fill="#eef0ea" stroke="#d9ddd5"/><text x="120" y="170" fill="#1f3c31" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="3">${escape(settings.tagline).slice(0, 90)}</text><text x="120" y="300" fill="#142018" font-family="Georgia, serif" font-size="76" font-weight="700">${escape(settings.name).slice(0, 55)}</text><foreignObject x="120" y="355" width="850" height="100"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;font-size:28px;line-height:1.3;color:#4c5a51">${escape(settings.heroIntro).slice(0, 150)}</div></foreignObject><rect x="120" y="500" width="180" height="8" fill="#b6e553"/></svg>`;
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=3600" } });
}
