import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// route when user clicks on email change or password reset confirmation link
export async function GET(request) {
  const requestUrl = new URL(request.url);
  const { searchParams } = requestUrl;
  const token_hash = searchParams.get("token_hash");
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const message = searchParams.get("message");
  const supabase = createRouteHandlerClient({ cookies });

  try {
    if (!token_hash && !code) {
      return NextResponse.redirect(
        new URL("/auth-pages/auth-error", request.url)
      );
    }
    let redirectUrl;
    const acceptLanguage = request.headers.get("accept-language");
    const locale = acceptLanguage?.includes("fr") ? "fr" : "en";

    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        const errorReason = error.message.includes("expired")
          ? "expired"
          : "invalid";
        redirectUrl = `${requestUrl.origin}/${locale}/member/account?message=email_update_fail&reason=${errorReason}`;
        return NextResponse.redirect(redirectUrl);
      }
      const user = data.user;

      if (user?.new_email) {
        redirectUrl = `${requestUrl.origin}/${locale}/member/account?message=partial_pending`;
      } else if (user?.email_confirmed_at) {
        // Email was just confirmed
        redirectUrl = `${requestUrl.origin}/${locale}/member/account?message=email_confirmed`;
      } else {
        // Generic success redirect
        redirectUrl = `${requestUrl.origin}/${locale}/auth-pages/auth-confirm`;
      }
      return NextResponse.redirect(redirectUrl);
    }

    if (token_hash) {
      if (type === "email_change") {
        // change email

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
          redirectUrl = `${requestUrl.origin}/${locale}/member/account?message=email_pending`;
        } else {
          redirectUrl = `${requestUrl.origin}/${locale}/member/account?message=email_confirmed`;
        }
        return NextResponse.redirect(redirectUrl);
      }

      // pw reset
      if (type === "recovery") {
        const { data, error } = await supabase.auth.verifyOtp({
          type: "recovery",
          token_hash,
        });
        if (error) {
          const errorReason = error.message.includes("expired")
            ? "expired"
            : "invalid";
          redirectUrl = `${requestUrl.origin}/${locale}/pwRecovery?message=token_${errorReason}`;
          return NextResponse.redirect(redirectUrl);
        }

        redirectUrl = `${requestUrl.origin}/${locale}/auth-pages/auth-pwreset?verified=true`;
        // redirectUrl = `${requestUrl.origin}/${locale}/auth-pages/auth-pwreset?token_hash=${token_hash}&type=${type}`;
        return NextResponse.redirect(redirectUrl);
      }
      // no match of type
      return NextResponse.redirect(
        new URL("/auth-pages/auth-error", request.url)
      );
    }
    // no match of type or no token
    return NextResponse.redirect(
      new URL("/auth-pages/auth-error", request.url)
    );
  } catch (error) {
    return NextResponse.redirect(
      new URL("/auth-pages/auth-error", request.url)
    );
  }
}
