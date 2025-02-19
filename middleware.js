import { NextResponse } from "next/server";

export function middleware(req) {
  const defaultLocale = "en"; // Set a default fallback
  const supportedLocales = ["en", "fr"];

  const acceptLanguage = req.headers.get("accept-language") || "";
  const detectedLocale =
    supportedLocales.find((lang) => acceptLanguage.includes(lang)) ||
    defaultLocale;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", detectedLocale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// import { match } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// let locales = ["en", "fr"];
// let defaultLocale = "en";

// function getLocale(request) {
//   const headers = {
//     "accept-lanuage": request.headers.get("accept-language") || "en",
//   };
//   const languages = new Negotiator({ headers }).languages();

//   match(languages, locales, defaultLocale);
// }

// export function middleware(request) {
//   const { pathname } = request.nextUrl;
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   if (pathnameHasLocale) return;

//   const locale = getLocale(request);

//   request.nextUrl.pathname = `/${locale}${pathname}`;
//   return Response.redirect(request.nextUrl);
// }

// export const config = {
//   matcher: [
//     "/((?!_next).*)",
//   ],
// };
