import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const intlMiddleware = createMiddleware(routing);

const supaMiddleware = async (req) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  try {
    if (error || !session || !session.user) {
      const locale = req.nextUrl.pathname.split("/")[1] || "fr";
      const loginUrl = new URL(`/${locale}/login`, req.url);
      loginUrl.searchParams.set("message", "auth_required");
      return NextResponse.redirect(loginUrl);
    }
    const pathname = req.nextUrl.pathname;
    const locale = pathname.split("/")[1] || "fr";

    if (pathname === `/${locale}/member` || pathname === `/member`) {
      const accountUrl = new URL(`/${locale}/member/account`, req.url);
      return NextResponse.redirect(accountUrl);
    }
    return res;
  } catch (error) {
    console.error("Auth middleware error:", error);
    const locale = req.nextUrl.pathname.split("/")[1] || "fr";
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("message", "auth_required");
    return NextResponse.redirect(loginUrl);
  }
};

export default function middleWareHandler(req) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const isTestMode =
    process.env.NODE_ENV === "test" ||
    process.env.NEXT_PUBLIC_TEST_MODE === "true" ||
    req.headers.get("x-test-mode") === "true";

  if (isTestMode) {
    if (pathname.includes("/member")) {
      const locale = pathname.split("/")[1] || "fr";
      // Still handle account redirection in test mode
      if (pathname === `/${locale}/member` || pathname === `/member`) {
        const accountUrl = new URL(`/${locale}/member/account`, req.url);
        return NextResponse.redirect(accountUrl);
      }
      return NextResponse.next();
    }
  }

  const skipAuthHeader = req.cookies.get("auth-check");

  const publicPaths = [
    "/auth-pages/auth-confirm",
    "/auth-pages/auth-error",
    "/auth-pages/auth-pwreset",
    "/login",
    "/signup",
    "/loginRecovery",
  ];

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  if (
    pathname.includes("/auth/confirm") ||
    pathname.includes("/auth/callback")
  ) {
    return NextResponse.next();
  }

  const isPublicPath = publicPaths.some((path) => {
    return routing.locales.some(
      (locale) => pathname === `/${locale}${path}` || pathname === path
    );
  });

  if (isPublicPath) {
    return intlMiddleware(req);
  }

  const isMemberPath = pathname.includes("/member");

  if (isMemberPath) {
    if (skipAuthHeader?.value === "true") {
      const response = NextResponse.next();
      req.cookies.delete("auth-check");
      const locale = pathname.split("/")[1] || "fr";
      if (
        pathname === `/${locale}/member` ||
        (pathname === `/member` && !routing.locales.includes(locale))
      ) {
        const properLocale = routing.locales.includes(locale) ? locale : "fr";
        const accountUrl = new URL(`/${properLocale}/member/account`, req.url);
        return NextResponse.redirect(accountUrl);
      }
      if (
        pathname === `/${locale}/auth-confirm/auth-pwreset` ||
        (pathname === `/auth-confirm/auth-pwreset` &&
          !routing.locales.includes(locale))
      ) {
        const properLocale = routing.locales.includes(locale) ? locale : "fr";
        const resetUrl = new URL(
          `/${properLocale}/auth-confirm/auth-pwreset`,
          req.url
        );
        return NextResponse.redirect(resetUrl);
      }
      return response;
    }
    return supaMiddleware(req);
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
