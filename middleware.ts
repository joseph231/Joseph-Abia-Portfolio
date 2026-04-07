import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow access to the login page itself
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check for valid auth cookie
  const authCookie = request.cookies.get("admin_auth");
  const secret     = process.env.ADMIN_SECRET;

  if (authCookie?.value === secret) {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};