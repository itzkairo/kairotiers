import { NextResponse } from "next/server";

export function middleware(request) {
  if (!request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    return NextResponse.next();
  }

  const adminCookie = request.cookies.get("kairo_admin")?.value;
  const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  if (adminCookie !== expectedPassword) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
