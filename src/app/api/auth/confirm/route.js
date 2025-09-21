import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const { searchParams, pathname } = requestUrl;
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next");
  const supabase = createRouteHandlerClient({ cookies });

  try {
    // need to revise test mode. Don't need to force cookie setting?
    if (token_hash?.startsWith("mock_") && type === "mock_email") {
      return NextResponse.redirect(
        new URL("/auth-pages/auth-confirm", request.url)
      );
    }
    // for production
    if (token_hash && type) {
      let redirectUrl;
      const acceptLanguage = request.headers.get("accept-language");
      const locale = acceptLanguage?.includes("fr") ? "fr" : "en";

      switch (type) {
        case "recovery":
          redirectUrl = `${requestUrl.origin}/${locale}/auth-pages/auth-pwreset?token_hash=${token_hash}&type=${type}`;
          break;
        case "email_change":
          redirectUrl = `${requestUrl.origin}/${locale}/emailRecovery`;
          break;
        default: // default is sign up confirm
          redirectUrl = `${requestUrl.origin}/${locale}/auth-pages/auth-confirm`;
      }

      if (type === "recovery") {
        // token verification on client-side
        return NextResponse.redirect(redirectUrl);
      } else {
        const { data, error } = await supabase.auth.verifyOtp({
          type: type,
          token_hash,
        });
        if (!error) {
          return NextResponse.redirect(
            new URL("/auth-pages/auth-confirm/", request.url)
          );
        } else {
          console.warn("verification error: ", error);
          throw error;
        }
      }
    }
  } catch (error) {
    return NextResponse.redirect(
      new URL("/auth-pages/auth-error", request.url)
    );
  }
}
