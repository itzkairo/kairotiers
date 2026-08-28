import { NextResponse } from "next/server";
import crypto from "crypto";

export function proxy(request) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin/dashboard")) {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  const expectedToken = crypto
    .createHash("sha256")
    .update(adminPassword)
    .digest("hex");

  const adminCookie = request.cookies.get("kairo_admin")?.value;

  if (adminCookie !== expectedToken) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};