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

    if (!token_hash) {
      return NextResponse.redirect(
        new URL("/auth-pages/auth-error", request.url)
      );
    }
    if (token_hash && type) {
      let redirectUrl;
      const acceptLanguage = request.headers.get("accept-language");
      const locale = acceptLanguage?.includes("fr") ? "fr" : "en";

      if (type === "recovery") {
        redirectUrl = `${requestUrl.origin}/${locale}/auth-pages/auth-pwreset?token_hash=${token_hash}&type=${type}`;
        return NextResponse.redirect(redirectUrl);
      } else if (type === "email_change") {
        const { error } = await supabase.auth.verifyOtp({
          type: "email_change",
          token_hash,
        });
        if (error) {
          const errorReason = error.message.includes("expired")
            ? "expired"
            : "invalid";
          redirectUrl = `${requestUrl.origin}/${locale}/member/account?message=email_update_fail&reason=${errorReason}`;
          return NextResponse.redirect(redirectUrl);
        }
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.new_email) {
          redirectUrl = `${requestUrl.origin}/${locale}/member/account?message=partial_confirm&pending_email=${user.new_email}`;
        } else {
          redirectUrl = `${requestUrl.origin}/${locale}/member/account?message=email_both_confirmed`;
        }
        return NextResponse.redirect(redirectUrl);
      } else if (type === "signup") {
        const { data, error } = await supabase.auth.verifyOtp({
          type: type,
          token_hash,
        });
        if (!error) {
          return NextResponse.redirect(
            new URL("/auth-pages/auth-confirm/", request.url)
          );
        } else {
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
