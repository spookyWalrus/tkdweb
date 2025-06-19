import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import cookie from "cookie";

const intlMiddleware = createMiddleware(routing);

const csrfMiddleware = (req) => {
  const pathname = req.nextUrl.pathname;
  const cookies = cookie.parse(req.headers.get("cookie") || "");

  if (
    !["POST", "PUT", "DELETE", "PATCH"].includes(req.method) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/public/")
  ) {
    return NextResponse.next();
  }

  const csrfToken =
    req.headers.get("x-csrf-token") || req.nextUrl.searchParams.get("csrf");
  if (!csrfToken || csrfToken !== cookies["csrf-token"]) {
    return new NextResponse("Invalid CSRF token", { status: 403 });
  }

  return NextResponse.next();
};

export default function middleWareHandler(req) {
  const csrfResponse = csrfMiddleware(req);
  if (csrfResponse?.status === 403) return csrfResponse;

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
