import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/dashboard") &&
    !pathname.startsWith("/dashboard/signIn") &&
    !pathname.startsWith("/dashboard/signUp")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/dashboard/signIn", request.url));
    }
    if (session.user.role !== "admin" && session.user.role !== "manager") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/profile") || pathname.startsWith("/checkout")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/checkout"],
};
