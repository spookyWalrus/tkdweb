import { i18nRouter } from "next-i18n-router";
import i18nConfig from "i18nConfig";
import { NextResponse } from "next/server";

export function middleware(request) {
  let thePath = request.nextUrl.pathname;

  if (thePath === "/favicon.ico") {
    return NextResponse.next();
  }
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next|images|favicon.ico|logos|public).*)",
};
