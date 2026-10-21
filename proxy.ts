import { NextRequest, NextResponse } from "next/server";
import { isAdminSession, SESSION_COOKIE } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const isProtected = request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/api/admin");
  if (!isProtected) return NextResponse.next();
  const valid = await isAdminSession(request.cookies.get(SESSION_COOKIE)?.value);
  if (valid) return NextResponse.next();

  const login = new URL("/login", request.url);
  login.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(login);
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
