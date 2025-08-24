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
    if (!session) {
      const locale = req.nextUrl.pathname.split("/")[1] || "en";
      const loginUrl = new URL(`/${locale}/login`, req.url);
      // loginUrl.searchParams.set("from", req.nextUrl.pathname);

      return NextResponse.redirect(loginUrl);
    }
    // if (error) {
    //   return NextResponse.redirect(
    //     new URL(
    //       `/login?from=${encodeURIComponent(req.nextUrl.pathname)}`,
    //       req.url
    //     )
    //   );
    // }

    return res;
  } catch (error) {
    const locale = req.nextUrl.pathname.split("/")[1] || "en";
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
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

  // Check if it's a localized public path (e.g., /en/login, /es/login)
  const isPublicPath = publicPaths.some((path) => {
    return (
      pathname === path || // Direct path
      pathname.startsWith(`/${routing.locales[0]}${path}`) || // Default locale
      routing.locales.some((locale) => pathname.startsWith(`/${locale}${path}`))
    ); // Any locale
  });

  // Handle auth callback and confirmation routes - these should bypass normal middleware
  if (
    pathname.includes("/auth/confirm") ||
    pathname.includes("/auth/callback")
  ) {
    return NextResponse.next();
  }

  // If it's a public path, just apply internationalization
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
//   }

//   const pathname = req.nextUrl.pathname;
//   const publicPaths = ["/auth/confirm", "/auth/callback", "/login", "/signup"];

//   if (publicPaths.some((path) => pathname.startsWith(path))) {
//     if (pathname === ("/auth/confirm" || "/auth/callback")) {
//       return NextResponse.next();
//     }
//     return intlMiddleware(req);
//   }
//   if (pathname.startsWith("/member")) {
//     return supaMiddleware(req);
//   }
//   return intlMiddleware(req);
// }

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
