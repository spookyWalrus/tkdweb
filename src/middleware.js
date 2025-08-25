import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const intlMiddleware = createMiddleware(routing);

const supaMiddleware = async (req) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  try {
    if (error || !user) {
      const locale = req.nextUrl.pathname.split("/")[1] || "en";
      const loginUrl = new URL(`/${locale}/login`, req.url);
      loginUrl.searchParams.set("message", "auth_required");
      return NextResponse.redirect(loginUrl);
    }
    return res;
  } catch (error) {
    const locale = req.nextUrl.pathname.split("/")[1] || "en";
    const loginUrl = new URL(`/${locale}/login`, req.url);
    loginUrl.searchParams.set("message", "auth_required");
    return NextResponse.redirect(loginUrl);
  }
};

export default function middleWareHandler(req) {
  const pathname = req.nextUrl.pathname;
  // Define public paths that don't need authentication
  const publicPaths = [
    "/auth/confirm",
    "/auth/callback",
    "/login",
    "/signup",
    "/loginRecovery",
  ];

  const isPublicPath = publicPaths.some((path) => {
    return (
      pathname === path ||
      pathname.startsWith(`/${routing.locales[0]}${path}`) ||
      routing.locales.some((locale) => pathname.startsWith(`/${locale}${path}`))
    );
  });

  if (
    pathname.includes("/auth/confirm") ||
    pathname.includes("/auth/callback")
  ) {
    return NextResponse.next();
  }

  if (isPublicPath) {
    return intlMiddleware(req);
  }

  // Check if it's a protected member route
  const isMemberPath = pathname.includes("/member");
  if (isMemberPath) {
    // First apply auth middleware, then intl middleware
    return supaMiddleware(req);
  }
  // For all other routes, apply internationalization middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
