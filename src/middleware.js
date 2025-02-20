import { i18nRouter } from "next-i18n-router";
import i18nConfig from "i18nConfig";

export function middleware(request) {
  console.log("Current Path:", request.nextUrl.pathname);
  console.log("Current Locale:", request.nextUrl.locale);
  let thePath = request.nextUrl.pathname;

  if (thePath === "/favicon.ico") {
    return;
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: `/((?!api|static|.*//..*|_next|images|favicon.icon|logos|public).*)`,
};
