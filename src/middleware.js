import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const middleware = createMiddleware(routing);

export default function middleWareHandler(req) {
  const response = middleware(req);
  return response;
}

export const config = {
  // matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
  // matcher: ["/", "/(fr|en)/:path*"],
  // };
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(fr|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // "/((?!_next|_vercel|.*\\..*).*)",

    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
