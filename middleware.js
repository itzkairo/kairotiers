import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect admin dashboard
  if (pathname.startsWith("/admin/dashboard")) {
    const adminCookie = request.cookies.get("kairo_admin")?.value;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    // Not logged in
    if (!adminCookie || adminCookie !== expectedPassword) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};