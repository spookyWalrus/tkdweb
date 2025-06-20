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
  const publicMemberPaths = ["/member"];

  if (
    ["member"].some((path) => pathname.startsWith(path)) &&
    !publicMemberPaths.includes(pathname)
  ) {
    return supaMiddleware(req);
  }
  // const supaResponse = supaMiddleware(req);
  // if (supaResponse?.status === 403) return supaResponse;

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
