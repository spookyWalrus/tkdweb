import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const intlMiddleware = createMiddleware(routing);

const supaMiddleware = async (req) => {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { error } = await supabase.auth.getUser();
  if (error) {
    return NextResponse.redirect(
      new URL(
        `/login?from=${encodeURIComponent(req.nextUrl.pathname)}`,
        req.url
      )
    );
  }

  return res;
};

export default function middleWareHandler(req) {
  const pathname = req.nextUrl.pathname;
  const publicPaths = ["/auth/confirm", "/auth/callback", "/login", "/signup"];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    if (pathname === ("/auth/confirm" || "/auth/callabck")) {
      return NextResponse.next();
    }
    return intlMiddleware(req);
  }
  if (pathname.startsWith("/member")) {
    return supaMiddleware(req);
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
